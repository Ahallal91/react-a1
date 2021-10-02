import React from "react";
import PostForm from "./PostForm";

// Uses post form component to make a post for the user.
const Post = (props) => {
  const currentPost = { title: "", postContent: "" };
  return (
    <PostForm
      user={props.user}
      redirect="/allPosts"
      pageTitle="Make a Post"
      currentPost={currentPost}
      addPostData={props.addPostData}
      addPost={"addPost"}
      buttonText="Post"
    />
  );
};

export default Post;
