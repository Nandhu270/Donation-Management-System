import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/signup.css";

function SignUp() {
  return (
    <Container className="signup-container my-4">
      <Form className="signup-form shadow-sm p-3 rounded">
        <h2 className="text-center mb-3 head-sig">Registration Form</h2>

        <Row className="mb-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                className="signup-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Blood Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Blood Group"
                className="signup-input"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2">
          <Form.Label className="signup-label">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email Address"
            className="signup-input"
          />
        </Form.Group>

        <Row className="mb-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                className="signup-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Mobile Number"
                className="signup-input"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2">
          <Form.Label className="signup-label">Birth Date</Form.Label>
          <Form.Control type="date" className="signup-input" />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="signup-label">Gender</Form.Label>
          <div className="d-flex">
            <Form.Check
              type="radio"
              id="male"
              label="Male"
              name="Gender"
              className="signup-radio me-3"
            />
            <Form.Check
              type="radio"
              id="female"
              label="Female"
              name="Gender"
              className="signup-radio me-3"
            />
            <Form.Check
              type="radio"
              id="prefer-not"
              label="Prefer not to say"
              name="Gender"
              className="signup-radio"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="signup-label">Address</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Address"
            rows={2}
            className="signup-input"
          />
        </Form.Group>

        <Row className="mb-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Country</Form.Label>
              <Form.Select className="signup-input">
                <option value="">-- Select Country --</option>
                <option value="India">India</option>
                <option value="America">America</option>
                <option value="England">England</option>
                <option value="Russia">Russia</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Pincode</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Postal Code"
                className="signup-input"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-3">
          <Button type="submit" variant="outline-danger bt-sig">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default SignUp;
