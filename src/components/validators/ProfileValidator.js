import {
  validateName,
  validatePassword,
  validatePasswordMatch,
  validateAvatarSelect,
} from "./UserValidator";
import { userCurrentPasswordValidate } from "../../data/userData";

// specific method used to validate profile, it calls on methods in UserValidator.
export default function profileValidator(values) {
  let errors = {};
  validateName(values.name, errors);
  validatePassword(values.password, errors);
  validatePasswordMatch(values.password, values.confirmPassword, errors);
  checkCurrentPassword(values.email, values.currentPassword, errors);
  validateAvatarSelect(values.avatar, errors);

  return errors;
}

function checkCurrentPassword(email, currentPassword, errors) {
  if (!userCurrentPasswordValidate(email, currentPassword)) {
    errors.currentPassword = "Current password is incorrect.";
  }
}
