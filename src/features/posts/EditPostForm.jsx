import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostQuery, useEditPostMutation } from "../../api/apiSlice";

import Spinner from "../../components/Spinner";

const EditPostForm = () => {
  const { postId } = useParams();

  const { data: post } = useGetPostQuery(postId);
  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const navigate = useNavigate();

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({
        id: postId,
        title,
        content,
      });
      navigate(`/posts/${postId}`);
    }
  };

  const onCloseEdit = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <section>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
        <button type="button" onClick={onCloseEdit}>
          Close Edit
        </button>
        {isLoading && <Spinner text="Loading..." />}
      </form>
    </section>
  );
};

export default EditPostForm;
