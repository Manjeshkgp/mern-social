import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Comments from "./pages/Comments";
import Search from "./pages/Search";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./store/store.js";
import CheckUser from "./authentication/CheckUser";
import UserIsAuthenticated from "./authentication/UserIsAuthenticated";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckUser>
            <Home socket={socket} />
          </CheckUser>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/profile",
        element: (
          <CheckUser>
            <Profile socket={socket} />
          </CheckUser>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <CheckUser>
            <EditProfile />
          </CheckUser>
        ),
      },
      {
        path: "/posts/:postId/comments",
        element: (
          <CheckUser>
            <Comments />
          </CheckUser>
        ),
      },
      {
        path: "/search",
        element: (
          <CheckUser>
            <Search />
          </CheckUser>
        ),
      },
      // {
      //   path: "/user/:username", // search user, follow & unfollow, edit profile with add photo✅,patch & delete request
      //   element:(<Profile/>) // add & delete comment✅, this isn't good (so ditch it) at small data: show home posts properly according to friends list
      // }, // messages page. all these functions should be added //⭐⭐Profile page desing having so many errors
    ],
  },
  {
    path: "*",
    element: (
      <CheckUser>
        <ErrorPage />
      </CheckUser>
    ),
  },
  {
    path: "/login",
    element: (
      <UserIsAuthenticated>
        <Login />
      </UserIsAuthenticated>
    ),
  },
  {
    path: "/signup",
    element: (
      <UserIsAuthenticated>
        <SignUp />
      </UserIsAuthenticated>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
