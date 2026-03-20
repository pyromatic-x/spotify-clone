import type { TTrack } from "./track";

export interface TAlbumPage {
	_id: string;
	name: string;
	picture_url: string;
	author: {
		_id: string;
		name: string;
		picture_url: string;
	};
	tracks: Array<TTrack>;
	in_library: boolean;
	accent: string;
	released_at: string;
	type: "album" | "single" | "ep";
	tracks_count: string;
	total_duration: number;
	more_by_author: Array<TAlbumCard>;
}

export interface TAlbumCard {
	_id: string;
	name: string;
	picture_url: string;
	description: string;
	entity: "album";
	accent: string;
	album_type: "single" | "album" | "ep";
	released_at: string;

	author: {
		_id: string;
		name: string;
		picture_url: string;
	};
}
