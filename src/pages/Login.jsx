import React,{useEffect, useState} from "react";
import "../css/login.css";
import { Button, Container, Row, Col, Card, CardBody, CardHeader } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { login, details } from "../components/loginfile";
import { FaUser, FaEnvelope, FaTint, FaPhoneAlt, FaVenusMars, FaMapMarkerAlt, FaFlag, FaHashtag } from "react-icons/fa";

export default function Login() {

  const [userlogin, setUserLogin] = useState({ username: "",name: "", password: "" });
  const[islogin, setlogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userlogin.username != "" && userlogin.password !== " " && userlogin.name != " ") {
      login.username = userlogin.username;
      login.password = userlogin.password;
      login.name = userlogin.name;
      setlogin(true);
      navigate("/");
    } else {
      alert("Invalid UserName and Password");
    }
  };


  const loggingout = ()=>{
    if(login.username !== "" && login.password !== "" && login.name !== ""){
      userlogin.username = "";
      userlogin.password = "";
      userlogin.name = "";
      login.name = "";
      login.username="";
      login.password="";
      setlogin(false);
      navigate("/");
    }else{
      alert("Logout Failed");
    }
  }

  useEffect(()=>{
    setlogin(login.name!="");
  })

  return (
    <>
      {!islogin ? 
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
                  View your donations, receipts, and manage your recurring plans
                  with your favorite organizations.
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
                  You can donate to your favorite organizations without filling
                  out the donation form. Giving has never been easier!
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
                  <Form.Control type="email" placeholder="name@example.com" value={userlogin.username} onChange={(e)=>setUserLogin({...userlogin,username:e.target.value})} required/>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>UserName</Form.Label>
                <Col xs={12} sm={11} md={11}>
                  <Form.Control type="text" placeholder="Enter your UserName" value={userlogin.name} onChange={(e)=>setUserLogin({...userlogin,name:e.target.value})} required/>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Col xs={12} sm={11} md={11}>
                  <Form.Control type="password" placeholder="Password" value={userlogin.password} onChange={(e)=>setUserLogin({...userlogin,password:e.target.value})} required/>
                </Col>
              </Form.Group>

              <Form.Check type="checkbox" label="Remember Me" />
              <Button type="submit" variant="outline-danger mt-2 bt-log" onClick={handleSubmit}>
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
          nonprofit causes around the world. Thank you for your help in making
          our world a better place.
        </h4>
      </Container> 
      </> : 
      <>
      <Container
        fluid
        className="mt-4 d-flex justify-content-center align-items-center animate__animated animate__fadeIn"
      >
        <Card className="profile-card shadow-lg p-3" >
          <CardBody className="d-flex flex-column align-items-center text-white p-4">
            <div className="profile-img mb-3">
              <FaUser size={70} />
            </div>
            <h2 className="profile-title mb-3">My Profile</h2>
            <Row className="w-100 g-2 text-center text-md-start">
              {[  
                { icon: <FaUser />, label: "Name", value: details.name },
                { icon: <FaEnvelope />, label: "Email", value: details.email },
                { icon: <FaTint />, label: "Blood Group", value: details.blood },
                { icon: <FaPhoneAlt />, label: "Mobile", value: details.mobile },
                { icon: <FaVenusMars />, label: "Gender", value: details.gender },
                { icon: <FaMapMarkerAlt />, label: "District", value: details.district },
                { icon: <FaHashtag />, label: "Pincode", value: details.pincode },
                { icon: <FaFlag />, label: "Country", value: details.country }
              ].map((item, index) => (
                <Col key={index} xs={12} sm={6} className="profile-item d-flex align-items-center gap-1">
                  <span className="profile-icon" style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  <strong className="me-1">{item.label}:</strong> <span>{item.value}</span>
                </Col>
              ))}
            </Row>
            <Button className="mt-3" variant="outline-danger" onClick={loggingout}>Logout</Button>
          </CardBody>
        </Card>
      </Container>
      <Container fluid className="d-flex align-items-center justify-content-center text-center py-4">
        <h4 className="animate__animated animate__fadeIn text-muted w-75" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
          Like you, over a million people have donated to support 50,000+ nonprofit causes around the world. Thank you for your help in making our world a better place.
        </h4>
      </Container>
      </>
      }
      
    </>
  );
}

