import React from "react";
import "../css/Blog.css";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { DropletFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <>
      <Container className="blog-container">
        <h1 className="blog-title">Save Lives with Your Blood Donation</h1>
        <p className="blog-intro">
          Your donation can save lives. Join our blood donation campaign and
          make a difference today!
        </p>
        <Container
          fluid
          className="mt-4 d-flex align-items-center justify-content-center head-blog"
        >
          <Container fluid className="blog-section">
            <FontAwesomeIcon icon={faHeartbeat} size="3x" color="red" />
            <h1 className="blog-subtitle">Why Donate Blood?</h1>
            <p className="blog-text">
              Donating blood is a simple act that can save lives. Learn more
              about the benefits and the impact you can make while donating
              blood.
            </p>
            <Button
              variant="outline-danger"
              className="blog-button"
              onClick={() => navigate("/blog/blood")}
            >
              Learn More
            </Button>
          </Container>
          <Container fluid className="blog-section">
            <DropletFill color="red" size={47} />
            <h1 className="blog-subtitle">How to Donate?</h1>
            <p className="blog-text">
              Find out how you can donate blood and become a hero. Follow these
              simple steps to get started to how to donate blood.
            </p>
            <Button
              variant="outline-danger"
              className="blog-button"
              onClick={() => navigate("/blog/process")}
            >
              Learn More
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  );
}
