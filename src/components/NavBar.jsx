import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "./ScrollTop";
import { login } from "./loginfile";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {
  const [page, setpage] = useState("");
  const [isloggedIn, setloggedIn] = useState(false);
  const [userlogin, setuserlogin] = useState({ mail: "", password: "" });
  const loc = useLocation();

  useEffect(() => {
    if (userlogin.mail == "" && userlogin.password == "") {
      if (login.mail !== "" && login.password !== "") {
        setuserlogin(
          (userlogin.mail = login.mail),
          (userlogin.password = login.password)
        );
        setloggedIn(true);
        localStorage.setItem("islogin", JSON.stringify(true));
      } else {
        setloggedIn(false);
        localStorage.setItem("islogin", JSON.stringify(false));
      }
    }
  }, [login.mail, login.password]);

  useEffect(() => {
    setpage(loc.pathname);
  }, [loc.pathname]);

  useEffect(() => {
    setloggedIn(login.mail !== "");
    localStorage.setItem(
      "islogin",
      login.mail !== "" ? JSON.stringify(true) : JSON.stringify(false)
    );
  });

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
            onClick={ScrollToTop}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => setpage("/")}
              className={page === "/" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={() => setpage("/about")}
              className={page === "/about" ? "active" : ""}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/blog"
              onClick={() => setpage("/blog")}
              className={page === "/blog" ? "active" : ""}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contactus"
              onClick={() => setpage("/contactus")}
              className={page === "/contactus" ? "active" : ""}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              onClick={() => setpage("/login")}
              className={page === "/login" ? "active" : ""}
            >
              {isloggedIn ? (
                <>
                  <FaUserCircle size={33} />
                </>
              ) : (
                "Login"
              )}
            </Nav.Link>
          </Nav>
          <Nav.Link
            className="bt ms-2 d-flex align-items-center justify-content-center"
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
