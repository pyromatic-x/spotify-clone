import { createSlice } from "@reduxjs/toolkit";
import { theme } from "../../theme";

const defaultHomePageBackground = theme.palette.background.purple;

const initialState = {
  leftMenuCollapsed: false,
  showGreeting: true,
  homePageBackground: defaultHomePageBackground,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toggleLeftMenu(state, action) {
      return {
        ...state,
        leftMenuCollapsed: action.payload || !state.leftMenuCollapsed,
      };
    },
    toggleGreeting(state) {
      return {
        ...state,
        showGreeting: !state.showGreeting,
      };
    },
    changeHomePageBackground(state, action) {
      return {
        ...state,
        homePageBackground: action.payload || defaultHomePageBackground,
      };
    },
    setToken(state, action) {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { toggleLeftMenu, toggleGreeting, changeHomePageBackground } =
  applicationSlice.actions;
export default applicationSlice.reducer;
