import React, { useState } from "react";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import DeleteModal from "../modal/DeleteModal";
import EditReply from "../modal/EditReply";
import replyValidator from "../validators/ReplyValidator";
import useForm from "../utils/useForm";
import { getAvatarByUser } from "../../data/userData";

// Displays all the replies for a post, this component is used with SinglePost
const AllReplies = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [replyid, setReplyid] = useState(null);

  // handles the editing of the reply modal
  function setEditStates(replyid, editModal) {
    setReplyid(replyid);
    setEditModal(editModal);
  }
  // updates the reply once it passes validation from the useform.
  const updateReply = () => {
    setEditModal(false);
    props.updateReplyData(replyid, values.postContent);
    values.postContent = "";
  };
  const { values, errors, handleChange, handleSubmit } = useForm(updateReply, replyValidator);

  // handles deletion for the modal (deletes the post and all its replies)
  function setDeleteStates(replyid, deleteModal) {
    setReplyid(replyid);
    setDeleteModal(deleteModal);
  }

  // deletes the reply
  function onDeleteHandler(e) {
    e.preventDefault();
    props.deleteReplyData(replyid);
    setDeleteModal(false);
  }

  return (
    <>
      <h2 className="page-header">Replies</h2>
      <Container>
        {props.replies ? (
          Object.keys(props.replies).map((reply, key) => {
            const postDate = new Date(props.replies[reply].postDate);
            return props.replies[reply].deleted ? (
              <div key={key} className="allreplies__container p-2">
                <span className="allposts__title text-danger">This reply was removed</span>
              </div>
            ) : (
              <div key={key} className="allreplies__container">
                <Image
                  className="profile-image"
                  width={50}
                  height={50}
                  src={`/images/avatars/${getAvatarByUser(props.replies[reply].user)}.jpg`}
                  roundedCircle
                />
                <div>
                  <span className="allposts__title">{props.replies[reply].content}</span>
                  <span>Posted By: {props.replies[reply].user}</span>
                  <span className="allposts__date">
                    Post Date: {postDate.getDate()}/{postDate.getMonth()}/{postDate.getYear()}
                  </span>
                </div>
                {props.user.email === props.replies[reply].user && (
                  <section className="allreplies-icons-container">
                    <button
                      className="allreplies-icons text-primary"
                      onClick={() => setEditStates(reply, true)}
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => setDeleteStates(reply, true)}
                      className="allreplies-icons text-danger"
                    >
                      <AiTwotoneDelete />
                    </button>
                  </section>
                )}
                <DeleteModal
                  onDeleteHandler={onDeleteHandler}
                  show={deleteModal}
                  handleClose={() => setDeleteModal(false)}
                  modalTitle="Delete Reply"
                  modalBody="Click Confirm to Delete your reply."
                />
                <EditReply
                  show={editModal}
                  handleClose={() => setEditModal(false)}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  updateReply={updateReply}
                  user={props.user}
                  previousContent={props.replies[reply].content}
                />
              </div>
            );
          })
        ) : (
          <h4>No Replies yet, why don't you make one?</h4>
        )}
      </Container>
    </>
  );
};

export default AllReplies;
