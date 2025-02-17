import React, { useEffect } from "react";
import "../css/Donate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/signup.css";

export default function Donate() {
  const handleScroll = () => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        if (!el.classList.contains("show")) {
          el.classList.add("show");
        }
      } else {
        if (el.classList.contains("show")) {
          el.classList.remove("show");
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Container
        fluid
        className="mt-4 d-flex align-items-center justify-content-center head-don animate__animated animate__fadeIn"
      >
        <h2>Donate</h2>
      </Container>
      <Container
        className="signup-container my-4 animate__animated animate__fadeIn
      "
      >
        <Form className="signup-form shadow-sm  p-3 rounded ">
          <Row className="mb-2 animate__animated animate__fadeIn">
            <Col md={2}>
              <Form.Group>
                <Form.Label className="signup-label">Currency</Form.Label>
                <Form.Select className="signup-input">
                  <option value="India">INR</option>
                  <option value="America">USD</option>
                  <option value="England">EUR</option>
                  <option value="Russia">GBP</option>
                  <option value="France">JPY</option>
                  <option value="Germany">KRW</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label className="signup-label">
                  Payement Amount
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  className="signup-input"
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label className="signup-label">Payement Type</Form.Label>
                <Form.Select className="signup-input">
                  <option value="">-- Select Type --</option>
                  <option value="India">UPI</option>
                  <option value="America">Credit Card</option>
                  <option value="England">Debit Card</option>
                  <option value="Russia">Bank Transfer</option>
                  <option value="France">Digital Wallets</option>
                  <option value="Germany">Net Banking</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label className="signup-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email Address"
                  className="signup-input"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label className="signup-label">UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  className="signup-input"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-2 animate__animated animate__fadeIn">
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

          <Form.Group className="mb-2 animate__animated animate__fadeIn">
            <Form.Label className="signup-label">Birth Date</Form.Label>
            <Form.Control type="date" className="signup-input" />
          </Form.Group>

          <Form.Group className="mb-2 animate__animated animate__fadeIn">
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

          <Form.Group className="mb-2 animate__animated animate__fadeIn">
            <Form.Label className="signup-label">Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Address"
              rows={2}
              className="signup-input"
            />
          </Form.Group>

          <Row className="mb-2 animate__animated animate__fadeIn">
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

      <Container
        fluid
        className="mt-4 d-flex justify-content-around donation-section-container fade-in"
      >
        <Container className="donation-section fade-in">
          <h1>Donate Within India</h1>
          <p>
            <strong>Account Name:</strong> Donation Club
          </p>
          <p>
            <strong>Account Number:</strong> 4012356978
          </p>
          <p>
            <strong>Account Type:</strong> Current
          </p>
          <p>
            <strong>IFS Code:</strong> ICH102254
          </p>
          <p>
            <strong>Bank Name:</strong> Deva Bank
          </p>
          <p>
            <strong>Bank Address:</strong> 15C, Chennai Mall Road, Chennai
          </p>
        </Container>
        <Container className="donation-section fade-in">
          <h1>Donate From Abroad</h1>
          <p>
            <strong>Account Name:</strong> Donation Club
          </p>
          <p>
            <strong>Account Number:</strong> 3021456987
          </p>
          <p>
            <strong>Account Type:</strong> Current
          </p>
          <p>
            <strong>Swift Code:</strong> CCH102254
          </p>
          <p>
            <strong>Bank Name:</strong> International Bank
          </p>
          <p>
            <strong>Bank Address:</strong> 25B/C2, New Delhi East Road, Delhi
          </p>
        </Container>
      </Container>
    </>
  );
}
