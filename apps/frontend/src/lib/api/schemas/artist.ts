import type { TAlbumCard } from "./album";
import type { TPlaylistCard } from "./playlist";
import type { TTrack } from "./track";

export type TArtistLinkServices = "Twitter" | "Facebook" | "Instagram";

export interface TArtist {
	_id: string;
	name: string;
	accent: string;
	verified: boolean;
	backdrop_url: string;
	picture_url: string;
	page_accent: string;
	about: {
		author: string;
		picture_url: string;
		text: string;
	};
	listeners: {
		monthly: string;
		world: Array<{ city: string; value: string }>;
	};
	links: Array<{ service: TArtistLinkServices; link: string }>;
}

export interface TArtistCard {
	_id: string;
	name: string;
	picture_url: string;
	entity: "artist";
	accent: string;
}

export interface TArtistPage extends TArtist {
	in_library: boolean;
	popular_tracks: Array<TTrack>;
	albums: Array<TAlbumCard>;
	similar_artists: Array<TArtistCard>;
	discovered_on_playlists: Array<TPlaylistCard>;
	pick: TAlbumCard;
}
