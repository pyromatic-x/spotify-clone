import type { TAlbumCard } from "./album";
import type { TPlaylistCard } from "./playlist";

export interface TGenrePage extends TGenre {
	items: Array<{
		title: string;
		entities: Array<TPlaylistCard | TAlbumCard>;
	}>;
}

export interface TGenre {
	_id: string;
	title: string;
	color: string;
	picture_url: string;
}

export type TGenres = Array<TGenre>;
