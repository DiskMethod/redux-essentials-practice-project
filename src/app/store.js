import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import userNotifications from "../features/notifications/notificationsSlice";
import { apiSlice } from "../api/apiSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    notifications: userNotifications,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
