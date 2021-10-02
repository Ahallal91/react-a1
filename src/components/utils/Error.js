import React from "react";

// Displays standard error message for the app.
const Error = (props) => {
  return <p className="text-danger">{props.message}</p>;
};
export default Error;
