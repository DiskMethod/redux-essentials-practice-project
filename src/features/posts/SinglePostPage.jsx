import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PostNotfound from "./PostNotFound";

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
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  );
};

export default SinglePostPage;
