import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  CLIENT_ID,
  CLIENT_SECRET,
  ALBUM_IDS,
  COUNTRY_CODE,
  LIBRARY_ARTIST_IDS,
  LOCALE,
  ENDPOINTS,
} from "../../constants";
import transform from "../../utils/transformApiResults";

export const token = createApi({
  reducerPath: "tokenAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.TOKEN,
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => "",
      transformResponse: (val) => {
        return {
          access_token: val.access_token,
          expires_at: Math.round(new Date().getTime() / 1000) + val.expires_in,
        };
      },
    }),
  }),
});

export const api = createApi({
  reducerPath: "spotifyAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.API,
    method: "GET",
    prepareHeaders(headers) {
      const token = JSON.parse(localStorage.getItem("token"));
      headers.set("Authorization", "Bearer ".concat(token?.access_token));
    },
  }),
  endpoints: (builder) => ({
    browse: builder.query({
      query: (q) =>
        `search?q=${q}&type=album%2Cshow%2Cepisode%2Ctrack%2Cartist%2Cplaylist&market=${COUNTRY_CODE}&limit=5&offset=0`,
      transformResponse: (val) => {
        return {
          albums: transform(val.albums.items, "albums"),
          artists: transform(val.artists.items, "artists"),
          playlists: transform(val.playlists.items, "playlists"),
          tracks: transform(val.tracks.items, "tracks", true).slice(0, 4),
          episodes: transform(val.episodes.items, "episodes"),
          podcasts: transform(val.shows.items, "podcasts"),
        };
      },
    }),
    getCategories: builder.query({
      query: () =>
        `browse/categories?country=NO&locale=en_US&limit=30&offset=0`,
      transformResponse: (val) => {
        return transform(val.categories.items, "categories", true);
      },
    }),
    getAlbums: builder.query({
      query: () => `albums?ids=${ALBUM_IDS.join(",")}`,
      transformResponse: (val) => {
        return transform(val.albums, "albums", true);
      },
    }),
    getPlaylists: builder.query({
      query: () =>
        `browse/featured-playlists?country=${COUNTRY_CODE}&locale=${LOCALE}&limit=5`,
      transformResponse: (val) => {
        return transform(val.playlists.items, "playlists", true);
      },
    }),
    getArtists: builder.query({
      query: () => `artists?ids=${LIBRARY_ARTIST_IDS.join(",")}`,
      transformResponse: (val) => {
        return transform(val.artists, "artists", true);
      },
    }),
  }),
});

export const { useGetTokenQuery } = token;

export const {
  useGetAlbumsQuery,
  useGetArtistsQuery,
  useGetPlaylistsQuery,
  useBrowseQuery,
  useGetCategoriesQuery,
} = api;
