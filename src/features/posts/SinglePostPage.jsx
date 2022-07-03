import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link, Outlet } from "react-router-dom";

import PostNotfound from "./PostNotFound";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => {
    return state.posts.find((post) => post.id === postId);
  });

  if (!post) {
    return <PostNotfound />;
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to="edit" className="button">
          Edit Post
        </Link>
      </article>
      <Outlet />
    </section>
  );
};

export default SinglePostPage;
