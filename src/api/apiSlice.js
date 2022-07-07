import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (result = [], error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.map(({ id }) => ({ type: "Post", id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

console.log(apiSlice);

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice;
