import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthMiddleware from "./AuthMiddleware";
import { RouterProvider } from "react-router-dom";

import { theme } from "./theme.js";
import Router from "./Router.js";
import { CssBaseline, ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthMiddleware>
          <RouterProvider router={Router} />
        </AuthMiddleware>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
