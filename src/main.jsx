import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  
  LoginPage,
  HomePage,
  MyBlogsPage,
  SingUpPage,
  ViewBlogPage,
  WriteBlogPage,
  EditBlogPage,
} from "./pages/index.js";
import routes from "./config/routes.js";
import { Protected } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: (
      <Protected requireAuthentication={false}>
        <App />
      </Protected>
    ),
    children: [
      {
        path: "",
        element: (
          <Protected requireAuthentication={false}>
            <HomePage />
          </Protected>
        ),
      },
      {
        path: routes.myBlogs,
        element: (
          <Protected>
            <MyBlogsPage />
          </Protected>
        ),
      },
      {
        path: routes.createBlog,
        element: (
          <Protected>
            <WriteBlogPage />
          </Protected>
        ),
      },
      {
        path: routes.editBlog +'/:id',
        element: (
          <Protected>
            <EditBlogPage />
          </Protected>
        ),
      },
      {
        path: routes.viewBlog + "/:id",
        element: (
          <Protected requireAuthentication={false}>
            <ViewBlogPage />
          </Protected>
        ),
      },
    ],
  },

  {
    path: routes.login,
    element: (
      <Protected requireAuthentication={false}>
        <LoginPage />
      </Protected>
    ),
  },
  {
    path: routes.register,
    element: (
      <Protected requireAuthentication={false}>
        <SingUpPage />
      </Protected>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
