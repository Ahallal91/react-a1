import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { getPostById } from "../../data/postData";
import PostReply from "../modal/PostReply";
import replyValidator from "../validators/ReplyValidator";
import useForm from "../utils/useForm";
import DeleteModal from "../modal/DeleteModal";
import AllReplies from "./AllReplies";
import { getImageUrl } from "../api/Images";
import { getAvatarByUser } from "../../data/userData";

// This component is a parent component for AllReplies. It displays a Single
// post, and allows the user that posted it to delete/edit it. It also handles
// replies as a modal.
const SinglePost = (props) => {
  const [replyModal, setReplyModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { post } = useParams();
  const currentPost = getPostById(post);
  const postDate = new Date(currentPost.postDate);

  // adds reply to current post and resets postContent for reply modal.
  const reply = () => {
    setReplyModal(false);
    props.addReplyPostData(post, props.user.email, values.postContent);
    values.postContent = "";
  };

  const { values, errors, handleChange, handleSubmit } = useForm(reply, replyValidator);

  // handles deletion for the modal (deletes the post and all its replies)
  function onDeleteHandler(e) {
    e.preventDefault();
    props.deletePostData(post);
    setDeleteModal(false);
  }

  return (
    <>
      {currentPost.deleted ? (
        <h1 className="p-3 text-danger">This post was removed.</h1>
      ) : (
        <Container className="singlepost__container">
          <h1 className="page-header">
            <Image
              className="profile-image"
              width={50}
              height={50}
              src={`../images/avatars/${getAvatarByUser(currentPost.user)}.jpg`}
              roundedCircle
            />{" "}
            {currentPost.title}
          </h1>
          <span>
            Posted By{" "}
            <i>
              <strong>{currentPost.user}</strong>
            </i>{" "}
            on the{" "}
            <i>
              <strong>
                {postDate.getDate()}/{postDate.getMonth()}/{postDate.getYear()}
              </strong>
            </i>
          </span>
          <div className="singlepost__body">
            <div className="singlepost__body-text">
              <p className="singlepost__text">{currentPost.postContent}</p>
            </div>
            <Image
              className="singlepost__body-image"
              width={400}
              height={400}
              src={getImageUrl(currentPost.imageName)}
            />
          </div>

          <Button onClick={() => setReplyModal(true)}>Reply</Button>
          <PostReply
            show={replyModal}
            handleClose={() => setReplyModal(false)}
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            reply={reply}
            title={currentPost.title}
            user={props.user}
          />
          {props.user.email === currentPost.user && (
            <div className="profile-icon">
              <a href={`/editpost/${post}`}>
                <AiFillEdit></AiFillEdit>
              </a>
              <AiTwotoneDelete
                onClick={() => setDeleteModal(true)}
                className="delete-icon"
              ></AiTwotoneDelete>
            </div>
          )}
        </Container>
      )}
      <DeleteModal
        onDeleteHandler={onDeleteHandler}
        show={deleteModal}
        handleClose={() => setDeleteModal(false)}
        modalTitle="Delete Post"
        modalBody="Click Confirm to Delete your post."
      />
      <Container>
        <AllReplies
          user={props.user}
          replies={currentPost.replies}
          deleteReplyData={props.deleteReplyData}
          updateReplyData={props.updateReplyData}
        />
      </Container>
    </>
  );
};

export default SinglePost;
