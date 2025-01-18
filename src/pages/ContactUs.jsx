import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/contactus.css";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function ContactUs() {
  return (
    <>
      <Container
        fluid
        className="mt-4 d-flex align-items-center justify-content-center head"
      >
        <h2>Get In Touch With Us</h2>
      </Container>
      <Container fluid className="mt-4 d-flex topics-container">
        <Container fluid className="topic1">
          <Container className="heading">
            <h2>General Info</h2>
          </Container>
          <Container className="mt-4 para-con">
            <p>Email:</p>
            <p style={{ color: "red" }}>admin@donatefeedback.in</p>
            <p>Phone:</p>
            <p>985-452-964</p>
          </Container>
          <div className="links-con">
            <FaFacebook size={30} className="social-icon facebook-con" />
            <FaInstagram size={30} className="social-icon instagram-con" />
            <FaTwitter size={30} className="social-icon twitter-con" />
            <FaLinkedin size={30} className="social-icon linkedin-con" />
          </div>
        </Container>
        <Container fluid className="topic2">
          <Container className="heading">
            <h2>Contact Us</h2>
          </Container>
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control type="text" placeholder="Enter Your Name" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control type="email" placeholder="name@example.com" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control type="text" />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control as="textarea" rows={3} />
              </Col>
            </Form.Group>
            <Button type="submit" variant="outline-danger">
              Send
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
}
