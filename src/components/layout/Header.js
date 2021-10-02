import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = () => {
  return (
    <Container fluid className="hero__container bg-dark">
      <img alt="person writing" src="../images/header.jpg" className="hero__image" />
      <Row lg={1}>
        <Col md={3} className="hero__text">
          <h1 className="header__header-text">Vibe Check</h1>
          <h4 className="header__header-paragraph">Your student social network</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
