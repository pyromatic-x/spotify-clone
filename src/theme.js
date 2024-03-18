import { common } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import GothamTTF from "./fonts/Gotham-Black.otf";
import GothamBoldTTF from "./fonts/Gotham-Bold.otf";

export const theme = createTheme({
  typography: {
    fontFamily: "Gotham, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: common.black,
      paper: common.black,
      section: "#121212",
      card: "#100f0f",
      cardHover: "#181818",
      purple: "#381861",
    },
    text: {
      primary: common.white,
      secondary: "#b3b3b3",
      gray: "#3d3b40",
    },
    secondary: {
      main: "#b3b3b3",
      dark: "#100f0f",
      light: "#242424",
      light2: "#4d4c4c",
    },
    container: {
      main: "#121212",
    },
    section: "#121212",
    green: {
      main: "#1cd760",
    },
    grandis: "#FFCC66",
    white: "#ffffff",
    black: "#000000",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gotham';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Gotham'), local('Gotham-Black'), url(${GothamTTF}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Gotham';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Gotham'), local('Gotham-Bold'), url(${GothamBoldTTF}) format('otf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiTooltip: {
      defaultProps: {
        placement: "top",
        PopperProps: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
        enterDelay: 400,
        enterNextDelay: 400,
        disableTouchListener: false,
      },
    },
    MuiLink: {
      defaultProps: {
        sx: { cursor: "pointer" },
      },
    },
  },
});
