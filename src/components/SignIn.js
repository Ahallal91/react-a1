import { useHistory } from "react-router-dom";
import useForm from "./utils/useForm";
import Error from "./utils/Error";
import loginValidator from "./validators/LoginValidator";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Signs user in by calling setLoggedIn from App.js if user passes loginValidator
const SignIn = (props) => {
  let history = useHistory();

  // This method is called by the useEffect in useForm on succesful login
  const login = () => {
    props.setLoggedIn();
    history.push("/profile");
  };

  const { values, errors, handleChange, handleSubmit } = useForm(login, loginValidator);

  return (
    <>
      <h1 className="page-header">Sign In</h1>
      <Form onSubmit={handleSubmit} className="container-box">
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
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </>
  );
};

export default SignIn;
