import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { user } from "../components/loginfile";
import Swal from "sweetalert2";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setdetails] = useState({
    name: "",
    mail: "",
    blood: "",
    password: "",
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

    if (!details.password) {
      res.password = "Password is required";
    }
    const verifypass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (
      details.password &&
      details.password.length < 6 &&
      !verifypass.test(details.password)
    ) {
      res.password =
        "Password must be at least 6 characters long and special character";
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
    user.push(details);
    showAlert("Registration Success", "Signed Up SuccessFully", "success");
    navigate("/login");
  };

  function showAlert(data, msg, status) {
    Swal.fire({
      title: data,
      text: msg,
      icon: status,
    });
  }

  return (
    <Container className="signup-container my-4 animate__animated animate__fadeIn">
      <Form className="signup-form shadow-sm p-3 rounded">
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="text-center mb-3 head-sig">Sign Up</h2>
        </div>

        <Row className="mb-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">User Name</Form.Label>
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
        </Row>

        <Row>
          <Col md={12}>
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
        </Row>

        <Row className="mb-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="signup-label">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={details.password}
                  onChange={(e) =>
                    setdetails({
                      ...details,
                      password: e.target.value,
                    })
                  }
                  isInvalid={!!errors.password}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    height: "1px",
                    marginTop: "10px",
                    padding: "10px",
                  }}
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    style={{ padding: "5px" }}
                  ></i>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
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

        <Form.Group className="mb-2">
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

        <Form.Group className="mb-2">
          <Form.Label className="signup-label">Gender</Form.Label>
          <div className="d-flex">
            <Form.Check
              type="radio"
              id="male"
              label="Male"
              name="Gender"
              className="signup-radio me-3"
              value="Male"
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
              label="Prefer not to say"
              name="Gender"
              className="signup-radio"
              value="Prefer not to say"
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

        <Form.Group className="mb-2">
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

        <Row className="mb-2">
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
  );
}

export default SignUp;
