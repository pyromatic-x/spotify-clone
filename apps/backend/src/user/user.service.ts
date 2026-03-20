import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
	type FilterQuery,
	isValidObjectId,
	type Model,
	type ObjectId,
} from "mongoose";
import { AlbumService } from "src/album/album.service";
import { ArtistService } from "src/artist/artist.service";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import type { LibraryEntity } from "src/library/dto/library.dto";
import type { Library } from "src/library/library.schema";
import { LibraryService } from "src/library/library.service";
import { PlaylistService } from "src/playlist/playlist.service";
import { TrackService } from "src/track/track.service";
import { toObjectId } from "src/utils";
import type { CurrentUser } from "./decorators/user.decorator";
import type { UserCard } from "./dto/user-card.dto";
import type { UserPage } from "./dto/user-page.dto";
import type { UserPlayback } from "./dto/user-playback.dto";
import type { UserQueue } from "./dto/user-queue.dto";
import { User } from "./user.schema";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private model: Model<User>,
		@Inject(forwardRef(() => LibraryService))
		private library: LibraryService,
		@Inject(forwardRef(() => TrackService))
		private tracks: TrackService,
		@Inject(forwardRef(() => ArtistService))
		private artists: ArtistService,
		@Inject(forwardRef(() => PlaylistService))
		private playlists: PlaylistService,
		@Inject(forwardRef(() => AlbumService))
		private albums: AlbumService,
	) {}

	async exists(id: string): Promise<boolean> {
		return Boolean(await this.model.exists({ _id: toObjectId(id) }));
	}

	async getUser(id: string) {
		const user = await this.model.findById(id).lean();

		if (!user) throw new NotFoundException();

		return {
			_id: String(user._id),
			name: user.name,
			picture_url: user.picture_url,
		};
	}

	async getUserPage({
		id,
		user,
	}: {
		id: string;
		user: CurrentUser;
	}): Promise<UserPage> {
		const profile = await this.getUserProfile(id);

		const [followers, following, recent_artists, playlists, top_tracks] =
			await Promise.all([
				this.getUserFollowers({ id, limit: 10 }),
				this.getUserFollowing({ id, limit: 10 }),
				this.artists.getMany({ query: {}, random: 10 }),
				this.playlists.getMany({
					query: { privacy: "public", author: toObjectId(user._id) },
					limit: 10,
				}),
				this.tracks.getMany({ query: {}, random: 4, user }),
			]);

		return {
			...profile,
			...followers,
			...following,
			recent_artists,
			playlists,
			top_tracks,
			is_owner: String(user._id) === String(profile._id),
		} as UserPage;
	}

	private async getUserProfile(id: string) {
		const response = await this.model.aggregate([
			{ $match: { _id: toObjectId(id) } },
			{ $project: { _id: 1, name: 1, picture_url: 1, accent: 1 } },
		]);

		if (!response.length) throw new NotFoundException();
		return response[0];
	}

	async getUserFollowers({ id, limit }: { id: string; limit?: number }) {
		const followers_query: { query: Partial<Library> } = {
			query: { target_id: toObjectId(id), entity_type: "user" },
		};

		const followers = (
			await this.library.getMany({ ...followers_query, limit })
		).map(this.transformLibraryEntityToUserCard);
		const followers_count = await this.library.getCount(followers_query);

		return {
			followers: followers.length ? followers : undefined,
			followers_count,
		};
	}

	async getUserFollowing({ id, limit }: { id: string; limit?: number }) {
		const following_query: { query: Partial<Library> } = {
			query: { user_id: toObjectId(id), entity_type: "user" },
		};

		const following = (
			await this.library.getMany({ ...following_query, limit })
		).map(this.transformLibraryEntityToUserCard);
		const following_count = await this.library.getCount(following_query);

		return {
			following: following.length ? following : undefined,
			following_count,
		};
	}

	async findOne(
		query: object = {},
		{ withPassword = false } = {},
	): Promise<User> {
		const q = this.model.findOne<User>(query);
		if (withPassword) q.select("+password");
		const user = await q.lean();

		if (!user) throw new NotFoundException();

		return user as User;
	}

	transformLibraryEntityToUserCard(entity: LibraryEntity): UserCard {
		const { author: _, ...rest } = entity.entity;

		return {
			...rest,
			entity: "user",
		};
	}

	async getUserQueueTracks({
		user,
	}: {
		user: CurrentUser;
	}): Promise<UserQueue> {
		const response = await this.model
			.findById({ _id: toObjectId(user._id) })
			.lean();

		if (!response || !response.queue?.tracks) throw new NotFoundException();

		return {
			source: response.queue.source,
			tracks: await this.tracks.getMany({
				query: { _id: { $in: response.queue.tracks } },
				user,
			}),
		};
	}

	async changeQueue({
		user_id,
		entity,
		track_id,
		_id,
	}: {
		_id: string;
		entity: "artist" | "playlist" | "album";
		track_id?: string;
		user_id: CurrentUser["_id"];
	}): Promise<UserQueue | undefined> {
		const { trackIds, name } = await this.resolveQueueSource(entity, _id);

		if (!trackIds.length) return undefined;

		const userDoc = await this.model.findById(user_id).lean();
		if (!userDoc) return undefined;

		const currentUser: CurrentUser = {
			_id: String(userDoc._id),
			name: userDoc.name,
		};

		const tracks = await this.tracks.getMany({
			query: { _id: { $in: trackIds } },
			user: currentUser,
		});

		return {
			source: { _id: toObjectId(_id), entity, name },
			tracks,
			track_id,
		};
	}

	private async resolveQueueSource(
		entity: "artist" | "playlist" | "album",
		_id: string,
	): Promise<{ trackIds: Array<ObjectId>; name: string }> {
		const objectId = toObjectId(_id);

		if (entity === "album") {
			const album = await this.albums.getOne({ _id: objectId });
			return {
				trackIds: album?.tracks ?? [],
				name: album?.name ?? "",
			};
		}

		if (entity === "playlist") {
			const playlist = await this.playlists.getOne({ _id: objectId });
			return {
				trackIds: playlist?.tracks.map((t) => t._id) ?? [],
				name: playlist?.name ?? "",
			};
		}

		const artist = await this.artists.getOne({ _id: objectId });
		const raw = await this.tracks.getManyRaw({ author: objectId });
		return {
			trackIds: raw.map((t) => t._id),
			name: artist?.name ?? "",
		};
	}

	async updateUserPlayback({
		user_id,
		payload,
	}: {
		user_id: ObjectId;
		payload: Partial<UserPlayback>;
	}): Promise<UserPlayback | undefined> {
		const updateFields: Record<string, unknown> = {};

		for (const key in payload) {
			const rawValue = payload[key as keyof UserPlayback];
			const value =
				isValidObjectId(rawValue) && typeof rawValue === "string"
					? toObjectId(rawValue)
					: rawValue;
			updateFields[`playback.${key}`] = value;
		}

		const result = await this.model.findOneAndUpdate(
			{ _id: user_id },
			{ $set: updateFields },
			{ returnDocument: "after", lean: true },
		);

		return result?.playback;
	}

	async getMany({
		query = {},
		limit = DEFAULT_QUERY_LIMIT,
		random,
	}: {
		query: FilterQuery<User>;
		random?: number;
		limit?: number;
	}): Promise<Array<UserCard> | undefined> {
		const response = await this.model.aggregate([
			{ $match: query },
			{ $limit: limit },
			...(random ? [{ $sample: { size: random } }] : []),
			{
				$project: {
					_id: 1,
					name: 1,
					entity: "user",
					picture_url: 1,
					accent: 1,
				},
			},
		]);

		if (!response.length) return undefined;

		return response as Array<UserCard>;
	}

	async getSettings({ user }: { user: CurrentUser }) {
		const response = await this.model
			.findById(user._id)
			.select("settings")
			.lean();
		return response?.settings;
	}

	async updateSettings({
		payload,
		user,
	}: {
		payload: object;
		user: CurrentUser;
	}) {
		const response = await this.model
			.findByIdAndUpdate(
				user._id,
				{
					$set: flattenObject({ settings: payload } as Record<string, unknown>),
				},
				{ new: true, returnDocument: "after" },
			)
			.select("settings")
			.lean();

		return response?.settings;
	}
}

const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function flattenObject(
	obj: Record<string, unknown>,
	prefix = "",
): Record<string, unknown> {
	const result: Record<string, unknown> = {};

	for (const key of Object.keys(obj)) {
		if (DANGEROUS_KEYS.has(key)) continue;

		const value = obj[key];
		const newKey = prefix ? `${prefix}.${key}` : key;

		if (value !== null && typeof value === "object" && !Array.isArray(value)) {
			Object.assign(
				result,
				flattenObject(value as Record<string, unknown>, newKey),
			);
		} else {
			result[newKey] = value;
		}
	}

	return result;
}
