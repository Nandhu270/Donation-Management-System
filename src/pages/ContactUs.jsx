import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/contactus.css";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {

  const navigate = useNavigate();

  const[userdetails,setuserdetails] = useState({name:"",mail:"",subject:"",msg:""});
  const[errors,setErrors] = useState({})

  const validateForm = ()=>{
    let result = {};
    
    if(!userdetails.name){
      result.name = "Enter Your Name";
    }
    
    if(!userdetails.mail){
      result.mail = 'Enter Your Mail';
    }

    const verifyemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(userdetails.mail && !verifyemail.test(userdetails.mail)){
      result.mail = "Please enter a valid email address";
    }
    

    if(!userdetails.subject){
      result.subject = "Enter the Subject"
    }

    if(!userdetails.msg){
      result.msg = "Enter Some Message";
    }

    return result;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors({});
    
    const res = validateForm();

    if(Object.keys(res).length > 0){
      setErrors(res);
      return;
    }

    alert("Your Mail Was Sent SuccessFully");
    navigate("/")

  }

  return (
    <>
      <Container
        fluid
        className="mt-4 d-flex align-items-center justify-content-center head animate__animated animate__fadeIn"
      >
        <h2>Get In Touch With Us</h2>
      </Container>
      <Container fluid className="mt-4 d-flex topics-container">
        <Container fluid className="topic1">
          <Container className="heading animate__animated animate__fadeIn">
            <h2>General Info</h2>
          </Container>
          <Container className="mt-4 para-con animate__animated animate__fadeIn">
            <p>Email:</p>
            <p style={{ color: "red" }}>admin@donatefeedback.in</p>
            <p>Phone:</p>
            <p>985-452-964</p>
          </Container>
          <div className="links-con animate__animated animate__fadeIn">
            <a
              href="https://www.facebook.com/share/17y5ajEhdR/"
              target="_blank"
            >
              <FaFacebook size={30} className="social-icon facebook-con" />{" "}
            </a>

            <a
              href="https://www.instagram.com/itz__nandhu__nk__/"
              target="_blank"
            >
              <FaInstagram size={30} className="social-icon instagram-con" />
            </a>

            <a href="https://x.com/nandhaNK27" target="_blank">
              <FaTwitter size={30} className="social-icon twitter-con" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/nandhakumar-p-v/"
              target="_blank"
            >
              <FaLinkedin size={30} className="social-icon linkedin-con" />
            </a>
          </div>
        </Container>
        <Container fluid className="topic2">
          <Container className="heading animate__animated animate__fadeIn">
            <h2>Contact Us</h2>
          </Container>
          <Form
            className="mt-4 animate__animated animate__fadeIn"
            method="post"
          >
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  value={userdetails.name} 
                  onChange={(e)=>{
                    setuserdetails({...userdetails,name:e.target.value})
                  }}
                  required
                  isInvalid = {!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={userdetails.mail}
                  onChange={(e)=>{
                    setuserdetails({...userdetails,mail:e.target.value})
                  }}
                  required
                  isInvalid = {!!errors.mail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mail}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control type="text" value={userdetails.subject} 
                onChange={(e)=>{
                  setuserdetails({...userdetails,subject:e.target.value})
                }}
                required
                isInvalid={!!errors.subject}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Col xs={12} sm={11} md={11}>
                <Form.Control as="textarea" rows={3} v
                alue={userdetails.msg}
                onChange={(e)=>{
                  setuserdetails({...userdetails,msg:e.target.value})
                }}
                required 
                isInvalid={!!errors.msg}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.msg}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Button type="submit" variant="outline-danger" onClick={handleSubmit}>
              Send
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
}
