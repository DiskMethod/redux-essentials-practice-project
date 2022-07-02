import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import PostNotfound from "./features/posts/PostNotFound";

import { worker } from "./api/server";

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: "bypass" });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                index
                element={
                  <>
                    <AddPostForm />
                    <PostsList />
                  </>
                }
              />
              <Route path="/posts/:postId" element={<SinglePostPage />} />
              <Route path="/posts/*" element={<PostNotfound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

start();
