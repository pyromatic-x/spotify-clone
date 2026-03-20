export const QUERY_KEY_USER = "USER";
export const QUERY_KEY_USER_SETTINGS = "USER/SETTINGS";

export const QUERY_KEY_PLAYBACK = "PLAYBACK";
export const QUERY_KEY_QUEUE = "QUEUE";
export const QUERY_KEY_LIBRARY = "LIBRARY";
export const QUERY_KEY_GENRES = "GENRES";
export const QUERY_KEY_FEED = "FEED";

export const QUERY_KEY_PERSONAL = "PERSONAL";
export const QUERY_KEY_PERSONAL_MADE_FOR_YOU = "";
export const QUERY_KEY_PERSONAL_NEW_RELEASES = "";
export const QUERY_KEY_PERSONAL_FAVORITE_ARTISTS = "";

export const QUERY_KEY_SEARCH = (query: string) => `SEARCH/${query}`;

export const QUERY_KEY_ARTIST = (id: string) => `ARTIST/${id}`;
export const QUERY_KEY_ARTIST_LIKED_TRACKS = (id: string) =>
	`ARTIST/LIKED-TRACKS/${id}`;

export const QUERY_KEY_ARTIST_PAGE = (id: string) => `ARTIST-PAGE/${id}`;
export const QUERY_KEY_ALBUM_PAGE = (id: string) => `ALBUM-PAGE/${id}`;
export const QUERY_KEY_USER_PAGE = (id: string) => `USER-PAGE/${id}`;
export const QUERY_KEY_PLAYLIST_PAGE = (id: string) => `PLAYLIST-PAGE/${id}`;
export const QUERY_KEY_GENRE_PAGE = (id: string) => `GENRE-PAGE/${id}`;

export const QUERY_KEY_TRACK_NOW_PLAYING = (id: string) => `NOW-PLAYING/${id}`;
