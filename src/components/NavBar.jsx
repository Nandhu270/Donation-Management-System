import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { scrollToTop } from "./ScrollTop";
import { FaUserCircle, FaShieldAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [page, setpage] = useState("");
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setpage(loc.pathname);
  }, [loc.pathname]);

  const handleLogout = () => {
    logout(true);
    navigate("/");
  };

  return (
    <Navbar bg="light" data-bs-theme="light" expand="md" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Logo"
            src={logo}
            width="45"
            height="45"
            className="d-inline-block align-top"
            onClick={scrollToTop}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className={page === "/" ? "active fw-semibold" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={page === "/about" ? "active fw-semibold" : ""}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/blog"
              className={page === "/blog" ? "active fw-semibold" : ""}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/searchdonor"
              className={page === "/searchdonor" ? "active fw-semibold" : ""}
            >
              Find Donors
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contactus"
              className={page === "/contactus" ? "active fw-semibold" : ""}
            >
              Contact
            </Nav.Link>

            {/* Admin Center Link for Admin Role */}
            {isAdmin && (
              <Nav.Link
                as={Link}
                to="/admin"
                className={`text-danger fw-bold d-flex align-items-center gap-1 ${
                  page === "/admin" ? "active" : ""
                }`}
              >
                <FaShieldAlt />
                <span>Admin</span>
              </Nav.Link>
            )}

            {/* User Account / Login Navigation */}
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <span className="d-inline-flex align-items-center gap-1 text-dark">
                    <FaUserCircle size={24} className="text-danger" />
                    <span className="fw-semibold ms-1">
                      {(user?.name || user?.mail || "User").split(" ")[0]}
                    </span>
                    <Badge
                      bg={user?.role === "admin" ? "warning" : user?.role === "donor" ? "danger" : "secondary"}
                      className="ms-1"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {user?.role?.toUpperCase()}
                    </Badge>
                  </span>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/login">
                  <FaUser className="me-2 text-secondary" /> My Profile
                </NavDropdown.Item>

                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <FaShieldAlt className="me-2 text-warning" /> Admin Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className={`fw-semibold ${page === "/login" ? "active" : ""}`}
              >
                Login
              </Nav.Link>
            )}
          </Nav>

          <Nav.Link
            className="bt ms-md-3 d-flex align-items-center justify-content-center"
            as={Link}
            to="/donate"
          >
            <span className="me-2">Donate</span>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "red", fontSize: "1.1rem" }}
            />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
