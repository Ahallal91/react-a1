import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateEmailExists,
  validateAvatarSelect,
} from "./UserValidator";

// specific method used to validate signup, it calls on methods in UserValidator.
export default function signUpValidator(values) {
  let errors = {};
  validateName(values.name, errors);
  validateEmail(values.email, errors);
  validateEmailExists(values.email, errors);
  validatePassword(values.password, errors);
  validatePasswordMatch(values.password, values.confirmPassword, errors);
  validateAvatarSelect(values.avatar, errors);

  return errors;
}
