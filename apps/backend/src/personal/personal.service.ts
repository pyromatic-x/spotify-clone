/** biome-ignore-all lint/style/useImportType: runtime import */

import { Injectable } from "@nestjs/common";
import { AlbumService } from "src/album/album.service";
import { ArtistService } from "src/artist/artist.service";
import { DEFAULT_QUERY_LIMIT } from "src/constants";
import { PlaylistService } from "src/playlist/playlist.service";
import type { CurrentUser } from "src/user/decorators/user.decorator";
import { shuffleArray, toObjectId } from "src/utils";
import type { Personal } from "./dto/personal.dto";
import type { PERSONAL_CATEGORIES } from "./personal.controller";

const capitalizeFirstLetter = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

@Injectable()
export class PersonalService {
	constructor(
		private albums: AlbumService,
		private artists: ArtistService,
		private playlist: PlaylistService,
	) {}

	async get_category({
		category,
		user,
	}: {
		category: (typeof PERSONAL_CATEGORIES)[number];
		user: CurrentUser;
	}) {
		const methods: Record<
			(typeof PERSONAL_CATEGORIES)[number],
			(props: { user?: CurrentUser; limit?: number }) => Promise<{
				category: string;
				title?: string;
				subtitle?: string;
				entities: Array<unknown>;
			}>
		> = {
			"made-for-you": this.get_made_for_you,
			"new-releases": this.get_new_releases,
			"favorite-artists": this.get_favorite_artists,
			"top-mixes": this.get_top_mixes,
			"best-of-artists": this.get_best_artists,
		};

		const { entities } = await methods[category].bind(this, { user })();

		return {
			title: capitalizeFirstLetter(category.replaceAll("-", " ")),
			entities,
		};
	}

	get_personal({ user }: { user: CurrentUser }): Promise<Personal[""]> {
		return Promise.all([
			this.get_featured({ user }),
			this.get_made_for_you({ user, limit: 10 }),
			this.get_new_releases({ limit: 15 }),
			this.get_favorite_artists({ limit: 10 }),
			this.get_top_mixes({ limit: 10 }),
			this.get_best_artists({ limit: 10 }),
		]);
	}

	async get_featured({ user }: { user: CurrentUser }) {
		const likes =
			(await this.playlist.getMany({
				query: { author: toObjectId(user._id), privacy: "likes" },
				limit: 1,
			})) ?? [];

		const playlists =
			(await this.playlist.getMany({
				query: {
					privacy: {
						$ne: "likes",
					},
				},
				random: likes.length ? 3 : 4,
			})) ?? [];

		const albums =
			(await this.albums.getMany({
				query: {},
				random: 2,
			})) ?? [];

		const artists =
			(await this.artists.getMany({
				query: {},
				random: 2,
			})) ?? [];

		const rest = [...albums, ...playlists, ...artists];
		shuffleArray(rest);

		return {
			category: "featured",
			entities: [...likes, ...rest],
		};
	}

	async get_made_for_you({
		user,
		limit = DEFAULT_QUERY_LIMIT,
	}: {
		user: CurrentUser;
		limit?: number;
	}) {
		const entities =
			(await this.playlist.getMany({
				query: {
					made_for: toObjectId(user._id),
				},
				random: limit,
			})) || [];

		return {
			category: "made-for-you",
			title: user.name,
			subtitle: "Made for",
			entities,
		};
	}

	async get_new_releases({ limit = DEFAULT_QUERY_LIMIT }: { limit?: number }) {
		const entities =
			(await this.albums.getMany({
				query: {},
				random: limit,
			})) || [];

		return {
			category: "new-releases",
			title: `New releases`,
			entities,
		};
	}

	async get_top_mixes({ limit = DEFAULT_QUERY_LIMIT }: { limit?: number }) {
		const entities =
			(await this.playlist.getMany({
				query: {},
				random: limit,
			})) || [];

		return {
			category: "top-mixes",
			title: `Your top mixes`,
			entities,
		};
	}

	async get_favorite_artists({
		limit = DEFAULT_QUERY_LIMIT,
	}: {
		limit?: number;
	}) {
		const entities =
			(await this.artists.getMany({
				query: {},
				random: limit,
			})) || [];

		return {
			category: "favorite-artists",
			title: `Favorite artists`,
			entities,
		};
	}

	async get_best_artists({ limit = DEFAULT_QUERY_LIMIT }: { limit?: number }) {
		const entities =
			(await this.artists.getMany({
				query: {},
				random: limit,
			})) || [];

		return {
			category: "best-of-artists",
			title: `Best of artists`,
			subtitle: "Bringing together the top songs from an artist.",
			entities,
		};
	}
}
