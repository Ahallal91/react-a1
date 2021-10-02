import React from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Error from "../utils/Error";

// data from this modal is sent via the SinglePost component and must travel back to the parent.
const PostReply = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Replying to {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="container-box" onSubmit={props.handleSubmit}>
          <Col xs={6} md={4}>
            <Image
              className="profile-image"
              width={50}
              height={50}
              src={`/images/avatars/${props.user.avatar}.jpg`}
              roundedCircle
            />
            <span className="mx-2">{props.user.email} </span>
          </Col>
          <FloatingLabel
            className="mb-3"
            controlId="floatingTextarea2"
            label="Please enter your message..."
          >
            <Form.Control
              name="postContent"
              value={props.values.postContent || ""}
              onChange={props.handleChange}
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "250px" }}
              required
            />
          </FloatingLabel>
          <Error message={props.errors.title} />
          <Error message={props.errors.postContent} />
          <Button variant="primary" type="submit">
            Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostReply;
