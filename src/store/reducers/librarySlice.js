import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/spotify";

const initialState = {
  _categories: ["playlists", "albums", "artists"],
  loading: true,
  filtered: [],
  initial: [],
  playlists: [],
  albums: [],
  artists: [],
  filters: {
    search: "",
    category: "",
  },
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    onSearch(state, action) {
      const { searchValue, categoryValue } = action.payload;

      const value =
        searchValue === null ? "" : searchValue || state.filters.search;
      const category =
        categoryValue === null
          ? ""
          : (categoryValue || state.filters.category).toLowerCase();

      if (!value && !category) {
        return {
          ...state,
          filtered: state.initial,
          filters: {
            category: "",
            search: "",
          },
        };
      }

      const array = category ? state[category] : state.initial;

      const regex = new RegExp(`${value}`, "gi");
      const filtered = array.filter((t) => {
        if (value && category) {
          return (
            t.type === category &&
            (regex.test(t.title) ||
              regex.test(t.subTitle) ||
              regex.test(t.author))
          );
        }
        if (category) {
          return t.type === category;
        }
        if (value) {
          return (
            regex.test(t.title) ||
            regex.test(t.subTitle) ||
            regex.test(t.author)
          );
        }
        return false;
      });

      return {
        ...state,
        filtered,
        filters: {
          ...state.filters,
          search: value,
          category,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAlbums.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        return {
          ...state,
          albums: payload,
          initial: [...state.initial, ...payload],
          filtered: [...state.filtered, ...payload],
          loading: false,
        };
      }
    );
    builder.addMatcher(
      api.endpoints.getArtists.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        return {
          ...state,
          artists: payload,
          initial: [...state.initial, ...payload],
          filtered: [...state.filtered, ...payload],
          loading: false,
        };
      }
    );
    builder.addMatcher(
      api.endpoints.getPlaylists.matchFulfilled,
      (state, action) => {
        const { payload } = action;

        return {
          ...state,
          playlists: payload,
          initial: [...state.initial, ...payload],
          filtered: [...state.filtered, ...payload],
          loading: false,
        };
      }
    );
  },
});

export const { onSearch } = librarySlice.actions;
export default librarySlice.reducer;
