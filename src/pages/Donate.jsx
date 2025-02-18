import React, { useEffect, useState } from "react";
import "../css/Donate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";

export default function Donate() {
  const navigate = useNavigate();

  const [details, setdetails] = useState({
    currency: "",
    amount: "",
    paytype: "",
    mail: "",
    name: "",
    blood: "",
    mobile: "",
    birth: "",
    gender: "",
    address: "",
    country: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const res = {};

    if (!details.currency) {
      res.currency = "Select Currency Type";
    }

    if (!details.amount) {
      res.amount = "Enter Amount";
    }
    const verifypay = /^[0-9]+$/;
    if (details.amount && !verifypay.test(details.amount)) {
      res.amount = "Enter Valid Amount";
    }

    if (!details.paytype) {
      res.paytype = "Select Payement Type";
    }

    if (!details.mail) {
      res.mail = "Enter Valid Mail Id";
    }
    const verifyemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (details.mail && !verifyemail.test(details.mail)) {
      res.mail = "Please enter a valid email address";
    }

    if (!details.name) {
      res.name = "Enter Your UserName";
    }

    if (!details.blood) {
      res.blood = "Enter Blood Type";
    }

    if (!details.mobile) {
      res.mobile = "Enter Mobile Number";
    }
    const verifynum = /^[0-9]{10}$/;
    if (details.mobile && !verifynum.test(details.mobile)) {
      res.mobile = "Enter a valid Mobile Number";
    }

    if (!details.birth) {
      res.birth = "Enter Date of Birth";
    }

    if (!details.gender) {
      res.gender = "Select Your Gender";
    }

    if (!details.address) {
      res.address = "Enter Your Address";
    }

    if (!details.country) {
      res.country = "Select Your Country";
    }

    if (!details.pincode) {
      res.pincode = "Enter the Pincode";
    }

    const verifypin = /^[0-9]+$/;
    if (details.pincode && !verifypin.test(details.pincode)) {
      res.pincode = "Enter Valid Pincode";
    }

    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const res = validateForm();

    if (Object.keys(res).length > 0) {
      setErrors(res);
      return;
    }

    if (!confirm("Proceed to Payment")) {
      alert("Transaction Denied!...");
    } else {
      alert("Donated SuccessFully! Thank You!...");
      navigate("/");
    }
  };

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
                <Form.Select
                  className="signup-input"
                  required
                  value={details.currency}
                  onChange={(e) =>
                    setdetails({ ...details, currency: e.target.value })
                  }
                  isInvalid={!!errors.currency}
                >
                  <option value="">---</option>
                  <option value="India">INR</option>
                  <option value="America">USD</option>
                  <option value="England">EUR</option>
                  <option value="Russia">GBP</option>
                  <option value="France">JPY</option>
                  <option value="Germany">KRW</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.currency}
                </Form.Control.Feedback>
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
                  required
                  value={details.amount}
                  onChange={(e) => {
                    setdetails({ ...details, amount: e.target.value });
                  }}
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group>
                <Form.Label className="signup-label">Payement Type</Form.Label>
                <Form.Select
                  className="signup-input"
                  required
                  value={details.paytype}
                  onChange={(e) =>
                    setdetails({ ...details, paytype: e.target.value })
                  }
                  isInvalid={!!errors.paytype}
                >
                  <option value="">-- Select Type --</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Digital Wallets">Digital Wallets</option>
                  <option value="Net Banking">Net Banking</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.paytype}
                </Form.Control.Feedback>
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
                  required
                  value={details.mail}
                  onChange={(e) => {
                    setdetails({ ...details, mail: e.target.value });
                  }}
                  isInvalid={!!errors.mail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mail}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label className="signup-label">UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  className="signup-input"
                  required
                  value={details.name}
                  onChange={(e) => {
                    setdetails({ ...details, name: e.target.value });
                  }}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
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
                  required
                  value={details.blood}
                  onChange={(e) => {
                    setdetails({ ...details, blood: e.target.value });
                  }}
                  isInvalid={!!errors.blood}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.blood}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="signup-label">Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Mobile Number"
                  className="signup-input"
                  required
                  value={details.mobile}
                  onChange={(e) => {
                    setdetails({ ...details, mobile: e.target.value });
                  }}
                  isInvalid={!!errors.mobile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-2 animate__animated animate__fadeIn">
            <Form.Label className="signup-label">Birth Date</Form.Label>
            <Form.Control
              type="date"
              className="signup-input"
              required
              value={details.birth}
              onChange={(e) => {
                setdetails({ ...details, birth: e.target.value });
              }}
              isInvalid={!!errors.birth}
            />
            <Form.Control.Feedback type="invalid">
              {errors.birth}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2 animate__animated animate__fadeIn">
            <Form.Label className="signup-label">Gender</Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                id="male"
                value="Male"
                label="Male"
                name="Gender"
                className="signup-radio me-3"
                checked={details.gender === "Male"}
                onChange={(e) =>
                  setdetails({ ...details, gender: e.target.value })
                }
                isInvalid={!!errors.gender}
              />
              <Form.Check
                type="radio"
                id="female"
                label="Female"
                name="Gender"
                className="signup-radio me-3"
                value="Female"
                checked={details.gender === "Female"}
                onChange={(e) =>
                  setdetails({ ...details, gender: e.target.value })
                }
                isInvalid={!!errors.gender}
              />
              <Form.Check
                type="radio"
                id="prefer-not"
                value="Prefer not to say"
                label="Prefer not to say"
                name="Gender"
                className="signup-radio"
                checked={details.gender === "Prefer not to say"}
                onChange={(e) =>
                  setdetails({ ...details, gender: e.target.value })
                }
                isInvalid={!!errors.gender}
              />
            </div>
            <Form.Control.Feedback
              type="invalid"
              style={{ display: errors.gender ? "block" : "none" }}
            >
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2 animate__animated animate__fadeIn">
            <Form.Label className="signup-label">Address</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Address"
              rows={2}
              className="signup-input"
              required
              value={details.address}
              onChange={(e) => {
                setdetails({ ...details, address: e.target.value });
              }}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-2 animate__animated animate__fadeIn">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="signup-label">Country</Form.Label>
                <Form.Select
                  className="signup-input"
                  required
                  value={details.country}
                  onChange={(e) =>
                    setdetails({ ...details, country: e.target.value })
                  }
                  isInvalid={!!errors.country}
                >
                  <option value="">-- Select Country --</option>
                  <option value="India">India</option>
                  <option value="America">America</option>
                  <option value="England">England</option>
                  <option value="Russia">Russia</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Others">Others</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="signup-label">Pincode</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Postal Code"
                  className="signup-input"
                  required
                  value={details.pincode}
                  onChange={(e) => {
                    setdetails({ ...details, pincode: e.target.value });
                  }}
                  isInvalid={!!errors.pincode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.pincode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-3">
            <Button
              type="submit"
              variant="outline-danger bt-sig"
              onClick={handleSubmit}
            >
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
