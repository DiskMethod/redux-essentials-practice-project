import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "./postsSlice";

// import { useGetPostQuery } from "../../api/apiSlice";
import { postUpdated } from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
        })
      );
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
      </form>
    </section>
  );
};

export default EditPostForm;
