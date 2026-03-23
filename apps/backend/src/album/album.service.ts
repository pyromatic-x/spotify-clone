import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { FilterQuery, Model } from "mongoose";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import {
	buildAuthorLookup,
	buildInLibraryLookup,
	buildRandomSample,
} from "src/helpers/aggregate.helpers";
// biome-ignore lint/style/useImportType: runtime import
import { TrackService } from "src/track/track.service";
import type { CurrentUser } from "src/user/decorators/user.decorator";
import { toObjectId } from "src/utils";
import { Album } from "./album.schema";
import type { AlbumCard } from "./dto/album-card.dto";
import type { AlbumPage } from "./dto/album-page.dto";

@Injectable()
export class AlbumService {
	constructor(
		@InjectModel(Album.name) private model: Model<Album>,
		private tracks: TrackService,
	) {}

	async getAlbumPage({ id, user }: { id: string; user: CurrentUser }) {
		const response = await this.model.aggregate([
			{ $match: { _id: toObjectId(id) } },
			{ $limit: 1 },
			...buildAuthorLookup("artists"),
			...buildInLibraryLookup(user._id),
			{
				$addFields: {
					is_personal: {
						$cond: {
							if: {
								$or: [
									{ $eq: ["$author._id", toObjectId(user._id)] },
									{ $eq: ["$made_for", toObjectId(user._id)] },
								],
							},
							then: true,
							else: false,
						},
					},
				},
			},
		]);

		if (!response.length) throw new NotFoundException();

		const album = response[0] as AlbumPage;

		const track_ids = album.tracks.map((t) => t._id);
		const tracks = await this.tracks.getMany({
			query: { _id: { $in: track_ids } },
			user,
		});

		const more_by_author = await this.getMany({
			query: {
				$and: [{ _id: { $ne: album._id } }, { author: album.author._id }],
			},
			limit: 10,
		});

		const data = {
			...album,
			tracks,
			more_by_author,
		} as AlbumPage;

		return data;
	}

	async getMany({
		query = {},
		limit = DEFAULT_QUERY_LIMIT,
		random,
	}: {
		query: FilterQuery<Album>;
		random?: number;
		limit?: number;
	}): Promise<Array<AlbumCard> | undefined> {
		const response = await this.model.aggregate([
			{ $match: query },
			{ $limit: limit },
			...buildRandomSample(random),
			...buildAuthorLookup("artists"),
			{
				$project: {
					_id: 1,
					entity: "album",
					picture_url: 1,
					description: 1,
					author: 1,
					name: 1,
				},
			},
		]);

		if (!response.length) return undefined;

		return response as Array<AlbumCard>;
	}

	async getFeed({ page }: { page: number }) {
		const per_page = 5;
		const skip = (page - 1) * per_page;

		const albums = await this.model.aggregate([
			{ $match: {} },
			{ $skip: skip },
			{ $limit: per_page },
			...buildAuthorLookup("artists"),
			{
				$project: {
					_id: 1,
					entity: "album",
					album_type: "$type",
					picture_url: 1,
					description: 1,
					released_at: 1,
					author: 1,
					name: 1,
				},
			},
		]);

		const total = await this.model.countDocuments();

		return {
			page: Number(page),
			per_page,
			albums,
			has_more: skip + per_page < total,
		};
	}

	getOne(query: FilterQuery<Album>) {
		return this.model.findOne(query);
	}
}
