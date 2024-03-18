import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./reducers/playerSlice";
import applicationSlice from "./reducers/applicationSlice";
import librarySlice from "./reducers/librarySlice";
import browseSlice from "./reducers/browseSlice";
import { api, token } from "./services/spotify";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    player: playerSlice,
    application: applicationSlice,
    library: librarySlice,
    browse: browseSlice,
    [api.reducerPath]: api.reducer,
    [token.reducerPath]: token.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(token.middleware),
});

setupListeners(store.dispatch);
