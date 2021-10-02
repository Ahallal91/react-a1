import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// DeleteModal, pass in custom title, body, close and delete functionality in props.
const DeleteModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.modalBody}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.handleClose} variant="danger">
          Cancel
        </Button>
        <Button onClick={props.onDeleteHandler} variant="primary">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
