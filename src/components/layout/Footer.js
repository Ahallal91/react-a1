import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <Container fluid className="footer__container bg-dark">
        <Row lg={1} className="footer__container-text">
          <Col sm={1} className="footer__text">
            <FaFacebookF className="footer__footer-text"></FaFacebookF>
          </Col>
          <Col sm={1} className="footer__text">
            <FaTwitter className="footer__footer-text"></FaTwitter>
          </Col>
          <Col sm={1} className="footer__text">
            <FaYoutube className="footer__footer-text"></FaYoutube>
          </Col>
          <Col sm={2}>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Nav>
                <Nav.Link href="/contact">Contact Us</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
