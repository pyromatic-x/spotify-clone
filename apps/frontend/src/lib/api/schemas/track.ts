import type { TArtist } from "./artist";

export interface TTrack {
	readonly _id: string;
	name: string;
	duration: number;
	audio_url: string;
	explicit: boolean;
	times_listened: string;
	added_at: string;
	credits: {
		performed_by: string;
		written_by: string;
		produced_by: string;
	};
	added_to_playlists: Array<string>;
	author: {
		readonly _id: string;
		name: string;
	};
	album: {
		readonly _id: string;
		name: string;
		picture_url: string;
		video_url: string;
	};
	in_library: boolean;
}

export interface TNowPlaying {
	readonly _id: TTrack["_id"];
	name: TTrack["name"];
	author: Omit<TArtist, "verified" | "picture_url"> & {
		is_following: boolean;
		followers: number;
	};
	album: {
		readonly _id: string;
		name: string;
		picture_url: string;
		accent: string;
		video_url: string;
	};
	credits: Array<{ role: string; name: string; readonly _id?: string }>;
	in_library: boolean;
}
