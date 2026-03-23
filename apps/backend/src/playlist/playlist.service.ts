import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { FilterQuery, Model } from "mongoose";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import {
	buildAuthorLookup,
	buildInLibraryLookup,
	buildRandomSample,
} from "src/helpers/aggregate.helpers";
import { TrackService } from "src/track/track.service";
import type { CurrentUser } from "src/user/decorators/user.decorator";
import { toObjectId } from "src/utils";
import type { PlaylistCard } from "./dto/playlist-card.dto";
import type { PlaylistPage } from "./dto/playlist-page.dto";
import { Playlist } from "./playlist.schema";

@Injectable()
export class PlaylistService {
	constructor(
		@InjectModel(Playlist.name) private model: Model<Playlist>,
		private tracks: TrackService,
	) {}

	async getMany({
		query = {},
		limit = DEFAULT_QUERY_LIMIT,
		random,
	}: {
		query: FilterQuery<Playlist>;
		random?: number;
		limit?: number;
	}): Promise<Array<PlaylistCard> | undefined> {
		const response = await this.model.aggregate([
			{ $match: query },
			{ $limit: limit },
			...buildRandomSample(random),
			...buildAuthorLookup("users"),
			{
				$project: {
					_id: 1,
					name: 1,
					entity: "playlist",
					picture_url: 1,
					description: 1,
					author: 1,
					accent: 1,
				},
			},
		]);

		if (!response.length) return undefined;

		return response as Array<PlaylistCard>;
	}

	async getPlaylistPage({ id, user }: { id: string; user: CurrentUser }) {
		const response = await this.model.aggregate([
			{ $match: { _id: toObjectId(id) } },
			{ $limit: 1 },
			...buildAuthorLookup("users"),
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
					is_liked_songs: {
						$cond: {
							if: {
								$and: [
									{ $eq: ["$author._id", toObjectId(user._id)] },
									{ $eq: ["$name", "Liked Songs"] },
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

		const playlist = response[0] as PlaylistPage;

		const track_ids = playlist.tracks.map((t) => t._id);
		const tracks = await this.tracks.getMany({
			query: { _id: { $in: track_ids } },
			user,
		});
		const tracks_count = tracks.length ?? 0;
		const total_duration = tracks.reduce((p, c) => p + c.duration, 0);

		const recommended_tracks = await this.tracks.getMany({
			query: {},
			random: 10,
			user,
		});

		const data = {
			...playlist,
			tracks,
			tracks_count,
			total_duration,
			recommended_tracks,
		} as PlaylistPage;

		return data;
	}

	async getUserPlaylists({
		user,
	}: {
		user: CurrentUser;
	}): Promise<Array<Playlist>> {
		const id = toObjectId(user?._id);

		return this.model
			.find({
				$or: [{ made_for: id }, { author: id }],
			})
			.lean();
	}

	getOne(query: FilterQuery<Playlist>) {
		return this.model.findOne(query);
	}

	async isTrackLiked({ id, user }: { id: string; user: CurrentUser }) {
		const playlists = await this.getUserPlaylists({ user });

		return playlists
			.flatMap((t) => t.tracks.map((t) => String(t._id)))
			.includes(id);
	}

	async likeTrack({ id, user }: { id: string; user: CurrentUser }) {
		await this.model.findOneAndUpdate(
			{
				author: toObjectId(user._id),
				privacy: "likes",
			},
			{
				$addToSet: {
					tracks: {
						_id: toObjectId(id),
						added_at: new Date().toISOString(),
					},
				},
			},
		);

		return true;
	}
}
