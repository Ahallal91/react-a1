// Validates reply
export default function replyValidator(values) {
  let errors = {};
  if (!values.postContent) {
    errors.postContent = "Your reply must have content.";
  }
  return errors;
}
