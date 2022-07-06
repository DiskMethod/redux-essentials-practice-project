import React from "react";

import { useParams, Link, Outlet } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { useGetPostQuery } from "../../api/apiSlice";

import PostNotfound from "./PostNotFound";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  let content;

  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <>
        <article className="post">
          <h2>{post.title}</h2>
          <div>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="post-content">{post.content}</p>
          <ReactionButtons post={post} />
          <Link to="edit" className="button">
            Edit Post
          </Link>
        </article>
        <Outlet />
      </>
    );
  } else {
    content = <PostNotfound />;
  }

  return <section>{content}</section>;
};

export default SinglePostPage;
