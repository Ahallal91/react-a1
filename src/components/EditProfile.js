import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useForm from "./utils/useForm";
import Error from "./utils/Error";
import profileValidator from "./validators/ProfileValidator";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Avatar from "./utils/Avatar";

// This component allows user to edit their name, password and avatar.
const EditProfile = (props) => {
  let history = useHistory();

  // This method is called by the useEffect in useForm on succesful update
  const updateProfile = () => {
    props.updateUserData(values.name, props.user.email, values.password, values.avatar);
    history.push("/profile");
  };

  const { values, errors, handleChange, handleSubmit } = useForm(updateProfile, profileValidator);

  // sets values to validate password in profileValidator
  useEffect(() => {
    values.email = props.user.email;
  }, []);

  return (
    <>
      <h1 className="page-header">Edit Profile</h1>
      <Form className="container-box" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Email (cannot be changed)</Form.Label>
          <Form.Control name="email" value={props.user.email} type="text" disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            value={values.name || ""}
            type="text"
            placeholder="Enter Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCurrentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            name="currentPassword"
            onChange={handleChange}
            value={values.currentPassword || ""}
            type="password"
            placeholder="Current Password"
            required
          />
        </Form.Group>
        <Error message={errors.currentPassword} />
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            value={values.password || ""}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Error message={errors.password} />
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword || ""}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Error message={errors.confirmPassword} />
        <Avatar handleChange={handleChange} values={values} />
        <Error message={errors.avatar} />
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditProfile;
