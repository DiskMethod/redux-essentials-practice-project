import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
// import { sub } from "date-fns";

// const initialState = [
//   {
//     id: "1",
//     title: "First Post!",
//     content: "Hello!",
//     userId: "0",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "Second Post",
//     content: "More Text",
//     userId: "1",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
// ];

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const post = state.entities[id];
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.entities[postId];
      if (post) {
        post.reactions[reaction] += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.posts = state.posts.concat(action.payload);
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await client.post("/fakeApi/posts", initialPost);
    return response.data;
  }
);

export const { postUpdated, reactionAdded } = postsSlice.actions;

// export const selectAllPosts = (state) => state.posts.posts;

// export const selectPostById = (state, postId) => {
//   return state.posts.posts.find((post) => post.id === postId);
// };

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);

export default postsSlice.reducer;
