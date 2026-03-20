import type { TAlbumCard, TAlbumPage } from "../../schemas/album";
import type { TArtistPage } from "../../schemas/artist";
import type { TEntityCard, TEntityTypes } from "../../schemas/common";
import type { TGenrePage, TGenres } from "../../schemas/genre";
import type { TLibrary } from "../../schemas/library";
import type { TPersonal } from "../../schemas/personal";
import type { TPlaylistPage } from "../../schemas/playlist";
import type { TQueue } from "../../schemas/queue";
import type { TSearchResponse } from "../../schemas/search";
import type { TNowPlaying, TTrack } from "../../schemas/track";
import type { TUser, TUserPage, TUserSettings } from "../../schemas/user";

export type TGetMethods = {
	"auth/verify": {
		response: boolean;
	};
	user: {
		response: TUser;
	};
	settings: {
		response: TUserSettings;
	};
	"user/{id}": {
		pathParams: { id: string };
		response: TUserPage;
	};
	queue: {
		response: TQueue;
	};
	library: {
		response: TLibrary;
	};
	"artist/{id}": {
		pathParams: { id: string };
		response: TArtistPage;
	};
	"artist/{id}/liked-tracks": {
		pathParams: { id: string };
		response: Array<TTrack>;
	};
	"album/{id}": {
		pathParams: { id: string };
		response: TAlbumPage;
	};
	"playlist/{id}": {
		pathParams: { id: string };
		response: TPlaylistPage;
	};
	"track/{id}/now-playing": {
		pathParams: { id: string };
		response: TNowPlaying;
	};
	personal: {
		response: TPersonal;
	};
	"personal/{category}": {
		pathParams: { category: string };
		response: {
			title: string;
			entities: Array<TEntityCard>;
		};
	};
	genres: {
		response: TGenres;
	};
	"genres/{id}": {
		pathParams: { id: string };
		response: TGenrePage;
	};
	feed: {
		response: {
			page: number;
			per_page: number;
			has_more: boolean;
			albums: Array<TAlbumCard>;
		};
		searchParams: {
			page: number;
		};
	};
	search: {
		searchParams: {
			query: string;
		};
		response: TSearchResponse;
	};
	"is-following/{type}/{id}": {
		pathParams: {
			type: TEntityTypes;
			id: string;
		};
		response: {
			following: boolean;
		};
	};
};
