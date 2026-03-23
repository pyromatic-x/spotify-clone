import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { FilterQuery, Model } from "mongoose";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import {
	buildAuthorLookup,
	buildInLibraryLookup,
	buildRandomSample,
} from "src/helpers/aggregate.helpers";
import { LibraryService } from "src/library/library.service";
import type { CurrentUser } from "src/user/decorators/user.decorator";
import { toObjectId } from "src/utils";
import type { NowPlaying } from "./dto/now-playing.dto";
import type { TrackDto } from "./dto/track.dto";
import { Track } from "./track.schema";

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(Track.name) private model: Model<Track>,
		@Inject(forwardRef(() => LibraryService))
		private library: LibraryService,
	) {}

	async getMany({
		query,
		limit = DEFAULT_QUERY_LIMIT,
		random,
		user,
	}: {
		query: FilterQuery<Track>;
		user: CurrentUser;
		limit?: number;
		random?: number;
	}) {
		const response = await this.model.aggregate<TrackDto>([
			{ $match: query },
			{ $limit: limit },
			...buildRandomSample(random),
			...buildAuthorLookup("artists", { _id: 1, name: 1 }),
			{
				$lookup: {
					from: "albums",
					localField: "album",
					foreignField: "_id",
					pipeline: [
						{
							$project: {
								_id: 1,
								name: 1,
								picture_url: 1,
								video_url: 1,
							},
						},
					],
					as: "album",
				},
			},
			{
				$unwind: "$album",
			},
			{
				$lookup: {
					from: "playlists",
					let: { track_id: "$_id" },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [
										{
											$or: [
												{ $eq: ["$author", toObjectId(user._id)] },
												{ $eq: ["$made_for", toObjectId(user._id)] },
											],
										},
										{ $in: ["$$track_id", "$tracks._id"] },
									],
								},
							},
						},
						{
							$limit: 1,
						},
						{
							$project: {
								_id: 1,
							},
						},
					],
					as: "in_library",
				},
			},
			{
				$unset: ["plays", "albumOrder"],
			},
			{
				$addFields: {
					in_library: {
						$cond: {
							if: { $gt: [{ $size: "$in_library" }, 0] },
							then: true,
							else: false,
						},
					},
				},
			},
		]);

		if (!response?.length) return [];

		return response;
	}

	async getManyRaw(query: FilterQuery<Track>) {
		return this.model.find(query);
	}

	async getNowPlaying({ id, user }: { id: string; user: CurrentUser }) {
		const response = await this.model.aggregate([
			{ $match: { _id: toObjectId(id) } },
			{ $limit: 1 },
			...buildAuthorLookup("artists", {
				_id: 1,
				name: 1,
				backdrop_url: 1,
				about: 1,
				listeners: 1,
				links: 1,
			}),
			{
				$lookup: {
					from: "albums",
					localField: "album",
					foreignField: "_id",
					pipeline: [
						{
							$project: {
								_id: 1,
								name: 1,
								picture_url: 1,
								video_url: 1,
								accent: 1,
							},
						},
					],
					as: "album",
				},
			},
			{ $unwind: "$album" },
			...buildInLibraryLookup(user._id),
			{
				$project: {
					_id: 1,
					name: 1,
					author: 1,
					album: 1,
					credits: 1,
					in_library: 1,
				},
			},
		]);

		if (response.length && response[0]) {
			const result = response[0] as NowPlaying;

			const is_following = await this.library.isFollowing({
				target_id: toObjectId(String(result.author._id)),
				type: "artist",
				user_id: user._id,
			});

			const credits = [
				{
					_id: result.author._id,
					role: "Main Artist",
					name: result.author.name,
				},
				{
					role: "Composer, Lyricist",
					name: result.author.name,
				},
			];

			return {
				...result,
				credits,
				author: {
					...result.author,
					is_following,
				},
			};
		}

		throw new NotFoundException();
	}
}
