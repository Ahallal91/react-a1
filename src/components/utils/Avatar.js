import React from "react";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

// Displays a select and the image of the selected image. Can be used in forms
// to pick an avatar. Value must be set from parent component and handleChange
// must also be passed from parent.
const Avatar = (props) => {
  return (
    <>
      <Form.Label>Select your Avatar</Form.Label>
      <Form.Select onChange={props.handleChange} aria-label="Default select example" name="avatar">
        <option value={props.values.avatar}>Please select an Avatar</option>
        {[...Array(9).keys()].map((k) => {
          return (
            <option key={k} value={k + 1}>
              {k + 1}
            </option>
          );
        })}
      </Form.Select>
      {props.values.avatar && (
        <Image
          className="profile-image"
          width={150}
          height={150}
          src={`images/avatars/${props.values.avatar}.jpg`}
          roundedCircle
        />
      )}
    </>
  );
};

export default Avatar;
