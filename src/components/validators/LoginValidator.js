import { validateEmail, validatePassword } from "./UserValidator";
import { userValidation } from "../../data/userData";

// Validates login for user, calls on specific methods from UserValidator
export default function loginValidator(values) {
  let errors = {};
  validateEmail(values.email, errors);
  validatePassword(values.password, errors);
  validateLogin(values.email, values.password, errors);
  return errors;
}

function validateLogin(email, password, errors) {
  if (!userValidation(email, password)) {
    errors.password = "Username or Password is incorrect";
  }
}
