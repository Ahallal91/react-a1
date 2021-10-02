import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import DeleteModal from "./modal/DeleteModal";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { getPostByUser, getRepliesByUser } from "../data/postData";
import AllPosts from "./post/AllPosts";
import AllReplies from "./post/AllReplies";

// Displays the users profile, uses AllPosts and AllReplies component
// to display the users post/replies on their profile.
const Profile = (props) => {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  // properties for passing into html/modal boxes.
  const joinDate = new Date(props.user.joinDate);
  const formattedDate = `${joinDate.getDate()}/${joinDate.getMonth()}/${joinDate.getYear()}`;

  // handles the deletion for the modal (deletes the user)
  function onDeleteHandler(e) {
    props.deleteAllUserData();
    props.loggedOut();
    e.preventDefault();
    setModal(false);
    history.push("/");
  }
  return (
    <>
      <h1 className="page-header">Profile</h1>
      <Container className="container-box">
        <Card>
          <Card.Header as="h4">
            <Row className="my-2">
              <Col>
                <Image
                  className="profile-image"
                  width={150}
                  height={150}
                  src={`images/avatars/${props.user.avatar}.jpg`}
                  roundedCircle
                />
              </Col>
              <Row className="my-2">
                <Col>{props.user.name}</Col>
              </Row>
              <Col>{props.user.email}</Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Join Date</Card.Title>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text> {formattedDate}</Card.Text>
              </Col>
            </Row>
            <Col className="profile-icon">
              <a href="/editprofile">
                <AiFillEdit></AiFillEdit>
              </a>
              <AiTwotoneDelete
                onClick={() => setModal(true)}
                className="delete-icon"
              ></AiTwotoneDelete>
            </Col>
          </Card.Body>
        </Card>
      </Container>
      <DeleteModal
        onDeleteHandler={onDeleteHandler}
        show={modal}
        handleClose={() => setModal(false)}
        modalTitle="Delete Account"
        modalBody="Click Confirm to Delete your account. Note: this will delete all your posts and replies."
      />
      <AllPosts user={props.user} posts={getPostByUser(props.user.email)} />
      <AllReplies
        user={props.user}
        replies={getRepliesByUser(props.user.email)}
        deleteReplyData={props.deleteReplyData}
        updateReplyData={props.updateReplyData}
      />
    </>
  );
};

export default Profile;
