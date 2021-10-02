import React from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useForm from "./utils/useForm";
import Error from "./utils/Error";
import registerValidator from "./validators/RegisterValidator";
import { addUser } from "../data/userData";
import Avatar from "./utils/Avatar";

// Allows user to sign up, validates registration using registerValidator method.
const SignUp = (props) => {
  let history = useHistory();

  // This method is called by the useEffect in useForm on succesful register
  const register = () => {
    addUser(values.name, values.email, values.password, values.avatar);
    history.push("/signin");
  };

  const { values, errors, handleChange, handleSubmit } = useForm(register, registerValidator);
  return (
    <>
      <h1 className="page-header">Sign Up</h1>
      <Form className="container-box" onSubmit={handleSubmit}>
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
        <Error message={errors.name} />
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Error message={errors.email} />
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
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
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
