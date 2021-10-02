import { userExistValidation } from "../../data/userData";

// validates that the email is not empty and that it is the correct format
function validateEmail(email, errors) {
  if (!email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }
  return errors;
}

// ensures email is not already in the system
function validateEmailExists(email, errors) {
  if (userExistValidation(email)) {
    errors.email = "Email address already exists";
  }
}

function validateName(name, errors) {
  if (!name) {
    errors.name = "Name is required";
  }
}

// checks password for correct characters
function validatePassword(password, errors) {
  if (!password) {
    errors.password = "Password is required";
  } else if (!/^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{6,}$/.test(password)) {
    errors.password =
      "Passwords must contain uppercase, lowercase, punctuation and numbers and be at least 6 characters.";
  }
}

// ensures confirmPassword and password match
function validatePasswordMatch(password, confirmPassword, errors) {
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match.";
  }
}

// ensures that a profile avatar is selected for the user
function validateAvatarSelect(avatar, errors) {
  if (!avatar) {
    errors.avatar = "You must select an avatar";
  }
}

export {
  validateEmail,
  validateEmailExists,
  validateName,
  validatePassword,
  validatePasswordMatch,
  validateAvatarSelect,
};
