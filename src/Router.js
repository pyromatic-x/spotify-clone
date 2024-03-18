import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";
import Browse from "./pages/Browse.js";
import Home from "./pages/Home.js";
import Queue from "./pages/Queue.js";
import Error from "./pages/Error.js";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={
        <Root>
          <Error />
        </Root>
      }
    >
      <Route path="" element={<Home />} />
      <Route path="search" element={<Browse />} />
      <Route path="queue" element={<Queue />} />
    </Route>
  )
);
