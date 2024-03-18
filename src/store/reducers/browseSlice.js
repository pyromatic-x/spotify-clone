import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/spotify";
import getTopSearchResult from "../../utils/getTopSearchResult";

const defaultData = {
  artists: [],
  playlists: [],
  albums: [],
  tracks: [],
  episodes: [],
  podcasts: [],
  top: null,
  total: 0,
};

const initialState = {
  loading: false,
  search: "",
  ...defaultData,
};

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {
    resetSearch(state) {
      return {
        ...state,
        ...defaultData,
        search: "",
        loading: false,
      };
    },
    toggleLoading(state, action) {
      return {
        ...state,
        loading: action.payload || !state.loading,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.browse.matchFulfilled, (state, action) => {
      const {
        artists = [],
        playlists = [],
        albums = [],
        tracks = [],
        episodes = [],
        podcasts = [],
      } = action.payload;

      const top = getTopSearchResult(action.payload);

      return {
        ...state,
        artists,
        playlists,
        albums,
        tracks,
        episodes,
        podcasts,
        top,
        loading: false,
        total:
          artists.length +
          playlists.length +
          albums.length +
          tracks.length +
          episodes.length +
          podcasts.length,
        search: action.meta.arg.originalArgs,
      };
    });
    builder.addMatcher(api.endpoints.browse.matchRejected, (state, action) => {
      return {
        ...state,
        ...defaultData,
        loading: false,
      };
    });
  },
});

export const { resetSearch, toggleLoading } = browseSlice.actions;
export default browseSlice.reducer;
