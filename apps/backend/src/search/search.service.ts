/** biome-ignore-all lint/style/useImportType: runtime import */

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { AlbumService } from "src/album/album.service";
import type { AlbumCard } from "src/album/dto/album-card.dto";
import { ArtistService } from "src/artist/artist.service";
import type { PlaylistCard } from "src/playlist/dto/playlist-card.dto";
import { PlaylistService } from "src/playlist/playlist.service";
import { TrackService } from "src/track/track.service";
import type { CurrentUser } from "src/user/decorators/user.decorator";
import { UserService } from "src/user/user.service";
import { escapeRegex } from "src/utils";
import { Genre } from "./search.schema";

type TGenrePage = Genre & {
	items: Array<{ title: string; entities: Array<AlbumCard | PlaylistCard> }>;
};

@Injectable()
export class SearchService {
	constructor(
		@InjectModel(Genre.name) private model: Model<Genre>,
		private albums: AlbumService,
		private playlists: PlaylistService,
		private artists: ArtistService,
		private users: UserService,
		private tracks: TrackService,
	) {}

	async getGenres() {
		return this.model.find();
	}

	async getGenrePage({
		id,
		user: _user,
	}: {
		id: string;
		user: CurrentUser;
	}): Promise<TGenrePage> {
		const page = await this.model.findById(id).lean();

		if (!page) throw new NotFoundException();

		const albums = await this.albums.getMany({ query: {}, random: 10 });
		const popular = await this.playlists.getMany({ query: {}, random: 10 });
		const best = await this.playlists.getMany({ query: {}, random: 10 });

		const res: TGenrePage = {
			...page,
			items: [],
		};

		if (popular?.length) {
			res.items.push({
				title: `Popular ${page.title} playlists`,
				entities: popular,
			});
		}
		if (best?.length) {
			res.items.push({
				title: `Best of ${page.title}`,
				entities: best,
			});
		}
		if (albums?.length) {
			res.items.push({
				title: `New releases ${page.title}`,
				entities: albums,
			});
		}

		return res;
	}

	async search({ query, user }: { query: string; user: CurrentUser }) {
		const sanitized = escapeRegex(query.slice(0, 200));
		const regex = new RegExp(sanitized, "i");

		const [tracks, artists, albums, playlists, users] = await Promise.all([
			this.tracks.getMany({
				query: { name: regex },
				limit: 4,
				user,
			}),
			this.artists.getMany({
				query: { name: regex },
				limit: 10,
			}),
			this.albums.getMany({
				query: { name: regex },
				limit: 10,
			}),
			this.playlists.getMany({
				query: { name: regex },
				limit: 10,
			}),
			this.users.getMany({
				query: { name: regex },
				limit: 10,
			}),
		]);

		return {
			tracks: tracks.length ? tracks : undefined,
			artists,
			albums,
			playlists,
			users,
		};
	}
}
