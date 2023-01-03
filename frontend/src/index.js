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
import { Provider } from "react-redux";
import store from "./store/store.js";
import CheckUser from "./authentication/CheckUser";
import UserIsAuthenticated from "./authentication/UserIsAuthenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckUser>
            <Home />
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
            <Profile />
          </CheckUser>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <CheckUser>
        <Home />
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
