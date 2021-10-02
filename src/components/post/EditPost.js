import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "./PostForm";
import { getPostById } from "../../data/postData";

// Uses postForm component, this component allows user to edit their post.
const EditPost = (props) => {
  const { post } = useParams();
  const link = `/allposts/${post}`;
  const currentPost = getPostById(post);
  return (
    <PostForm
      user={props.user}
      redirect={link}
      pageTitle="Edit Post"
      currentPost={currentPost}
      postId={post}
      updatePostData={props.updatePostData}
      buttonText="Update"
    />
  );
};

export default EditPost;
