import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <Container className="container-box">
      <h1>Welcome to Vibe Check!</h1>
      <div className="homepage__container">
        <div>
          <p>
            Do you feel it’s been difficult to communicate with friends and keep in touch during
            lockdown? Well, Vibe Check is here to help you out. Vibe Check is a friendly network
            that helps you keep in touch with students.
          </p>
          <h5>Sign up today... </h5>
          <Button className="homepage__button" href="/signin">
            Check the Vibe!
          </Button>
        </div>
        <img alt="students" src="images/homepage-image.jpg" className="homepage__image" />
      </div>
    </Container>
  );
};

export default Home;
