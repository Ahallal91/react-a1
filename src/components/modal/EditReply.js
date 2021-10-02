import React from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Error from "../utils/Error";

// data must be sent and retrieved from the parent of this modal.
// Handleclose, HandleSubmit, image, previousContent and current content.
const EditReply = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Editing Reply</Modal.Title>
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
          <p className="mt-1">Current Reply: {props.previousContent}</p>
          <FloatingLabel
            className="mb-3"
            controlId="floatingTextarea2"
            label="Enter text here to update..."
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
          <Error message={props.errors.postContent} />
          <Button variant="primary" type="submit">
            Update Reply
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditReply;
