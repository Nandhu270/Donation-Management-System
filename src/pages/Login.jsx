import React from "react";
import "../css/login.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Container
        fluid
        className="mt-4 d-flex justify-content-center align-items-center con-login"
      >
        <Row className="con-1">
          <Col xs={12} md={6} className="info-section">
            <h1>Welcome to Donor Portal</h1>
            <ul>
              <li>
                <h3>
                  <span>
                    <FaCheck style={{ color: "inherit" }} />
                  </span>
                  Manage Your Donations and Recurring Plans
                </h3>
                <p>
                  View your donations, receipts, and manage your recurring plans with your favorite organizations.
                </p>
              </li>
              <li>
                <h3>
                  <span>
                    <FaCheck style={{ color: "inherit" }} />
                  </span>
                  Quickly Donate to Your Favorite Organizations
                </h3>
                <p>
                  You can donate to your favorite organizations without filling out the donation form. Giving has never been easier!
                </p>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={6} className="form-section">
            <h1>Donor Login</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Col xs={12} sm={11} md={11}>
                <Form.Control type="email" placeholder="name@example.com" />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Col xs={12} sm={11} md={11}>
                <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group>

              <Form.Check type="checkbox" label="Remember Me" />
              <Button type="submit" variant="outline-danger mt-2 bt-log">Login</Button>
              <p className="mt-2">
                Not Registered Yet?{" "}
                <span>
                  <Link to="/signup" className="link-log">Create an Account</Link>
                </span>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container fluid className="d-flex align-items-center justify-content-center con-fot text-center">
        <h4>
          Like you, over a million people have donated to support 50,000+ nonprofit causes around the world. Thank you for your help in making our world a better place.
        </h4>
      </Container>
    </>
  );
}
