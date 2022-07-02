import React from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
