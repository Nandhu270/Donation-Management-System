import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../pics/logo.png";
import "../css/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <Navbar bg="light" data-bs-theme="light" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {" "}
          <img
            alt="a"
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contactus">
              ContactUs
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
          <Nav.Link
              className="bt d-flex align-items-center justify-content-center"
              as={Link}
              to="/donate"
            >
              <span className="me-2">Donate</span>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "red", fontSize: "1.2rem" }}
              />
            </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
