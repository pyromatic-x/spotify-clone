import type { TArtistCard } from "./artist";
import type { TPlaylistCard } from "./playlist";
import type { TTrack } from "./track";

export type TUser = {
	_id: string;
	name: string;
	picture_url: string;
};

export interface TUserPage {
	_id: string;
	name: string;
	accent: string;
	picture_url: string;
	following_count: number;
	followers_count: number;
	following: Array<TUserCard>;
	followers: Array<TUserCard>;
	recent_artists: Array<TArtistCard>;
	playlists: Array<TPlaylistCard>;
	top_tracks?: Array<TTrack>;
	is_owner: boolean;
}

export interface TUserCard {
	_id: string;
	name: string;
	picture_url: string;
	entity: "user";
	accent: string;
}

export interface TUserSettings {
	language: "en";
	quality: {
		streaming: "auto";
		normalize: boolean;
	};
	library: {
		compact: boolean;
	};
	display: {
		show_now_playing: boolean;
		show_canvas: boolean;
	};
	social: {
		show_playlists: boolean;
		show_following: boolean;
		share_activity: boolean;
	};
}
