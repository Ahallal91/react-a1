import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Navigation = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Vibe Check</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {props.user !== null && (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/post">Post</Nav.Link>
                <Nav.Link href="/allposts">All Posts</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {props.user === null ? (
              <>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/signin">Sign In</Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text>Hi! {props.user.name} </Navbar.Text>
                <Nav.Link href="/signin" onClick={props.loggedOut}>
                  Sign Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
