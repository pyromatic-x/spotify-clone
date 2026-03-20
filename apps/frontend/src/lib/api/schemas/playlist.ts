import type { TTrack } from "./track";

export interface TPlaylistCard {
	readonly _id: string;
	name: string;
	picture_url: string;
	description: string;
	entity: "playlist";
	accent: string;
	is_collection: boolean;
	author: {
		readonly _id: string;
		name: string;
		picture_url: string;
	};
}

export interface TPlaylistPage {
	readonly _id: string;
	name: string;
	author: {
		_id: string;
		name: string;
		picture_url: string;
	};
	description: string;
	created_at: string;
	made_for: string;
	picture_url: string;
	privacy: "public" | "private";
	accent: string;
	in_library: boolean;
	is_personal: boolean;
	is_liked_songs: boolean;
	tracks: Array<TTrack>;
	tracks_count: string;
	total_duration: number;
}
