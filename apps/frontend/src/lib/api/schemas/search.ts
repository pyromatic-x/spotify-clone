import type { TAlbumCard } from "./album";
import type { TArtistCard } from "./artist";
import type { TPlaylistCard } from "./playlist";
import type { TTrack } from "./track";
import type { TUserCard } from "./user";

export type TSearchResponse = null | {
	tracks?: Array<TTrack>;
	artists?: Array<TArtistCard>;
	albums?: Array<TAlbumCard>;
	playlists?: Array<TPlaylistCard>;
	users?: Array<TUserCard>;
};
