// Validates posts
export default function postValidator(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Your post must have a title.";
  }
  if (!values.postContent) {
    errors.postContent = "Your post must have content.";
  }
  return errors;
}
