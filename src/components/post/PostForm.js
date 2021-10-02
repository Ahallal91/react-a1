import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import useForm from "../utils/useForm";
import Error from "../utils/Error";
import postValidator from "../validators/PostValidator";
import { uploadImageUrl } from "../api/Images";

// This Component is a standard form for posts, it deals with images which
// get uploaded to an s3 bucket.
const PostForm = (props) => {
  const imageInput = useRef();
  const history = useHistory();
  const imageSize = 50;

  // This method is called by the useEffect in useForm on succesful post
  // it uploads the image to s3 then posts to localStorage through App.js
  // if this form is being used to edit, pass updatePostData method
  // if if this form is being used to add a post, pass addPostData method
  const post = async () => {
    const uploadResponse = await uploadImageUrl(imageInput);
    if (uploadResponse.status === "error") {
      errors.upload = "Unable to upload image";
    } else {
      if (props.addPostData) {
        props.addPostData(values.title, values.postContent, props.user.email, uploadResponse.value);
      }
      if (props.updatePostData) {
        props.updatePostData(props.postId, values.title, values.postContent, uploadResponse.value);
      }
      history.push(props.redirect);
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(post, postValidator, {
    title: props.currentPost.title,
    postContent: props.currentPost.postContent,
  });

  return (
    <>
      <h1 className="page-header">{props.pageTitle}</h1>
      <Form className="container-box" onSubmit={handleSubmit}>
        <Col xs={6} md={4}>
          <Image
            className="profile-image"
            width={imageSize}
            height={imageSize}
            src={`/images/avatars/${props.user.avatar}.jpg`}
            roundedCircle
          />
          <span className="mx-2">{props.user.email} </span>
        </Col>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            name="title"
            value={values.title || ""}
            onChange={handleChange}
            type="text"
            placeholder="Enter Title"
            required
          />
        </Form.Group>
        <FloatingLabel
          className="mb-3"
          controlId="floatingTextarea2"
          label="Please enter your message..."
        >
          <Form.Control
            name="postContent"
            value={values.postContent || ""}
            onChange={handleChange}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "250px" }}
            required
          />
        </FloatingLabel>
        <Error message={errors.title} />
        <Error message={errors.postContent} />
        <Form.Group controlId="formFile" className="mb-5">
          <Form.Label>Upload an image for your post</Form.Label>
          <Form.Control name="image" ref={imageInput} type="file" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          {props.buttonText}
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
