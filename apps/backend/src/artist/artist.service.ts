/** biome-ignore-all lint/style/useImportType: runtime import */

import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { FilterQuery, Model, ObjectId } from "mongoose";
import { AlbumService } from "src/album/album.service";
import type { AlbumCard } from "src/album/dto/album-card.dto";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import {
	buildInLibraryLookup,
	buildRandomSample,
} from "src/helpers/aggregate.helpers";
import { PlaylistService } from "src/playlist/playlist.service";
import type { Track } from "src/track/track.schema";
import { TrackService } from "src/track/track.service";
import type { CurrentUser } from "src/user/decorators/user.decorator";
import { toObjectId } from "src/utils";
import { Artist } from "./artist.schema";
import type { ArtistCard } from "./dto/artist-card.dto";
import type { ArtistPage } from "./dto/artist-page.dto";

@Injectable()
export class ArtistService {
	constructor(
		@InjectModel(Artist.name) private model: Model<Artist>,
		private tracks: TrackService,
		private albums: AlbumService,
		@Inject(forwardRef(() => PlaylistService))
		private playlists: PlaylistService,
	) {}

	async getMany({
		query = {},
		limit = DEFAULT_QUERY_LIMIT,
		random,
	}: {
		query: FilterQuery<Artist>;
		random?: number;
		limit?: number;
	}): Promise<Array<ArtistCard> | undefined> {
		const response = await this.model.aggregate([
			{ $match: query },
			{ $limit: limit },
			...buildRandomSample(random),
			{
				$project: {
					_id: 1,
					entity: "artist",
					picture_url: 1,
					description: 1,
					name: 1,
				},
			},
		]);

		if (!response.length) return undefined;

		return response as Array<ArtistCard>;
	}

	async getArtistPage({ id, user }: { id: string; user: CurrentUser }) {
		const response = await this.model.aggregate([
			{ $match: { _id: toObjectId(id) } },
			...buildInLibraryLookup(user._id),
		]);

		if (!response.length) throw new NotFoundException();

		const artist = response[0] as ArtistPage;

		const popular_tracks = await this.tracks.getMany({
			query: { author: toObjectId(id) },
			random: 10,
			user,
		});

		const pick = await this.albums.getMany({
			query: { author: toObjectId(id) },
			limit: 1,
		});

		const albums = await this.albums.getMany({
			query: { author: toObjectId(id) },
			limit: 10,
		});

		const similar_artists = await this.getMany({
			query: { _id: { $ne: toObjectId(id) } },
		});

		const discovered_on_playlists = await this.getPlaylistsWithArtist({
			id: toObjectId(id),
		});

		const data = {
			...artist,
			popular_tracks,
			albums,
			similar_artists,
			discovered_on_playlists,
			pick: pick?.[0] as AlbumCard | undefined,
		};

		return data;
	}

	async getPlaylistsWithArtist({ id }: { id: ObjectId }) {
		const response = await this.model.aggregate([
			{
				$match: { _id: id },
			},
			{
				$limit: 1,
			},
			{
				$lookup: {
					from: "tracks",
					localField: "_id",
					foreignField: "author",
					as: "tracks",
				},
			},
			{
				$project: {
					tracks: 1,
				},
			},
		]);

		if (!response?.length) return undefined;

		const track_ids = (response[0].tracks as Array<Track>).map((t) => t._id);

		if (!track_ids?.length) return undefined;

		const playlists = await this.playlists.getMany({
			query: {
				"tracks._id": { $in: track_ids },
				privacy: "public",
			},
			random: 10,
		});

		return playlists;
	}

	async getLikedTrackCount({ id, user }: { id: ObjectId; user: CurrentUser }) {
		const playlists = await this.playlists.getUserPlaylists({ user });

		const track_ids = playlists.flatMap((t) => t.tracks).map((t) => t._id);

		const tracks = await this.tracks.getMany({
			query: {
				_id: { $in: track_ids },
				author: id,
			},
			user,
		});

		return tracks.length;
	}

	async getArtistLikedTracks({ id, user }: { id: string; user: CurrentUser }) {
		const playlists = await this.playlists.getUserPlaylists({ user });

		const raw_track = playlists.flatMap((t) => t.tracks);

		const track_ids = raw_track.map((t) => t._id);

		const tracks = await this.tracks.getMany({
			query: {
				_id: { $in: track_ids },
				author: toObjectId(id),
			},
			user,
		});

		return tracks.map((track) => ({
			...track,
			added_at: raw_track.find((t) => String(t._id) === String(track._id))
				?.added_at,
		}));
	}

	getOne(query: FilterQuery<Artist>) {
		return this.model.findOne(query);
	}
}
