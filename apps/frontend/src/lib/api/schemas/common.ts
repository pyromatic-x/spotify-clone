import type { TAlbumCard } from "./album";
import type { TArtistCard } from "./artist";
import type { TPlaylistCard } from "./playlist";
import type { TUserCard } from "./user";

export type TEntityCard = TArtistCard | TPlaylistCard | TAlbumCard | TUserCard;
export type TEntityTypes = "album" | "playlist" | "artist" | "user";
