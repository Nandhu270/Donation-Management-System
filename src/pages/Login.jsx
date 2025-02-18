import React, { useEffect, useState } from "react";
import "../css/login.css";
import { Button, Container, Row, Col, Card, CardBody, InputGroup } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { login, details, user, blood } from "../components/loginfile";
import { FaUser, FaEnvelope, FaTint, FaPhoneAlt, FaVenusMars, FaMapMarkerAlt, FaFlag, FaHashtag} from "react-icons/fa";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Login() {
  const [userlogin, setUserLogin] = useState({
    mail: "",
    password: "",
  });
  const [islogin, setlogin] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let formErrors = {};

    if (!userlogin.mail) {
      formErrors.mail = "Email is required";
    }

    const verifyemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (userlogin.mail && !verifyemail.test(userlogin.mail)) {
      formErrors.maill = "Please enter a valid email address";
    }

    if (!userlogin.password) {
      formErrors.password = "Password is required";
    }
    const verifypass =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (
      userlogin.password &&
      userlogin.password.length < 6 &&
      !verifypass.test(userlogin.password)
    ) {
      formErrors.password =
        "Password must be at least 6 characters long and special character";
    }
    return formErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const matchedUser = user.find(
      (data) =>
        data.mail === userlogin.mail &&
        data.password === userlogin.password
    );

    if (matchedUser) {
      login.mail = userlogin.mail;
      login.password = userlogin.password;
      setlogin(true);
      navigate("/");
    } else {
      alert("Invalid Mail ID or Password");
    }
  };

  const loggingout = () => {
    if (login.mail && login.password) {
      setUserLogin({ mail: "", password: ""});
      login.mail = "";
      login.password = "";
      setlogin(false);
      navigate("/");
    } else {
      alert("Logout Failed");
    }
  };

  useEffect(() => {
    setlogin(login.mail != "");
  });

  const loggeduser = user.find(
    (data) =>
      data.mail === login.mail &&
      data.password === login.password
  );

  const profileDetails = loggeduser
  ? [
      { icon: <FaUser />, label: "Name", value: loggeduser.name },
      { icon: <FaEnvelope />, label: "Email", value: loggeduser.mail },
      { icon: <FaTint />, label: "Blood Group", value: loggeduser.blood },
      { icon: <FaPhoneAlt />, label: "Mobile", value: loggeduser.mobile },
      { icon: <FaVenusMars />, label: "Gender", value: loggeduser.gender },
      { icon: <FaMapMarkerAlt />, label: "Address", value: loggeduser.address },
      { icon: <FaHashtag />, label: "Pincode", value: loggeduser.pincode },
      { icon: <FaFlag />, label: "Country", value: loggeduser.country },
    ]
  : [];

  return (
    <>
      {!islogin ? (
        <>
          <Container
            fluid
            className="mt-4 d-flex justify-content-center align-items-center con-login animate__animated animate__fadeIn"
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
                      View your donations, receipts, and manage your recurring
                      plans with your favorite organizations.
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
                      You can donate to your favorite organizations without
                      filling out the donation form. Giving has never been
                      easier!
                    </p>
                  </li>
                </ul>
              </Col>

              <Col xs={12} md={6} className="form-section">
                <h1>Donor Login</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Col xs={12} sm={11} md={11}>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={userlogin.mail}
                        onChange={(e) =>
                          setUserLogin({
                            ...userlogin,
                            mail: e.target.value,
                          })
                        }
                        isInvalid={!!errors.mail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mail}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Col xs={12} sm={11} md={11}>
                      <InputGroup >
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={userlogin.password}
                          onChange={(e) =>
                            setUserLogin({
                              ...userlogin,
                              password: e.target.value,
                            })
                          }
                          isInvalid={!!errors.password}
                        />
                        <InputGroup.Text
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer",height:'1px',marginTop:'10px',padding:'10px'}}
                        >
                          <i
                            className={
                              showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                            } style={{padding:'5px'}}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Form.Check type="checkbox" label="Remember Me" />
                  <Button type="submit" variant="outline-danger mt-2 bt-log">
                    Login
                  </Button>
                  <p className="mt-2">
                    Not Registered Yet?{" "}
                    <span>
                      <Link to="/signup" className="link-log">
                        Create an Account
                      </Link>
                    </span>
                  </p>
                </Form>
              </Col>
            </Row>
          </Container>

          <Container
            fluid
            className="d-flex align-items-center justify-content-center con-fot text-center"
          >
            <h4 className="animate__animated animate__fadeIn">
              Like you, over a million people have donated to support 50,000+
              nonprofit causes around the world. Thank you for your help in
              making our world a better place.
            </h4>
          </Container>
        </>
      ) : (
        <>
          <Container
            fluid
            className="mt-4 d-flex justify-content-center align-items-center animate__animated animate__fadeIn"
          >
            <Card className="profile-card shadow-lg p-3">
              <CardBody className="d-flex flex-column align-items-center text-white p-4">
                <div className="profile-img mb-3">
                  <FaUser size={70} />
                </div>
                <h2 className="profile-title mb-3">My Profile</h2>
                <Row className="w-100 g-2 text-center text-md-start">
                  {
                  profileDetails.map((item, index) => (
                    <Col
                      key={index}
                      xs={12}
                      sm={6}
                      className="profile-item d-flex align-items-center gap-1"
                    >
                      <span
                        className="profile-icon"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {item.icon}
                      </span>
                      <strong className="me-1">{item.label}:</strong>{" "}
                      <span>{item.value}</span>
                    </Col>
                  ))
                  }
                </Row>
                <Button
                  className="mt-3"
                  variant="outline-danger"
                  onClick={loggingout}
                >
                  Logout
                </Button>
              </CardBody>
            </Card>
          </Container>
          <Container className="d-flex align-items-center justify-content-center gap-3 mt-3 box-profile animate__animated animate__fadeIn ">
            <Card className="profile-donate">
              <CardBody className="text-center">
                <h3>Amount Donated</h3>
                <h3>{details[Math.floor(Math.random() * 13) + 1].payement} </h3>
              </CardBody>
            </Card>
            <Card className="blood-donate">
              <CardBody className="text-center">
                <h3>Blood Donated</h3>
                <h3>{blood[Math.floor(Math.random() * 15) + 1]}</h3>
              </CardBody>
            </Card>
          </Container>
          <Container
            fluid
            className="d-flex align-items-center justify-content-center text-center py-4"
          >
            <h4
              className="animate__animated animate__fadeIn text-muted w-75"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
            >
              Like you, over a million people have donated to support 50,000+
              nonprofit causes around the world. Thank you for your help in
              making our world a better place.
            </h4>
          </Container>
        </>
      )}
    </>
  );
}
