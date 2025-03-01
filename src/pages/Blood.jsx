import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../css/Blood.css";
import { useNavigate } from "react-router-dom";

function Blood() {
  const navigate = useNavigate();

  function handleScroll() {
    const ele = document.querySelectorAll(".fade_in");
    ele.forEach((dt) => {
      const res = dt.getBoundingClientRect();
      if (res.top < window.innerHeight && res.bottom >= 0) {
        if (!dt.classList.contains("show")) dt.classList.add("show");
      } else {
        if (dt.classList.contains("show")) dt.classList.remove("show");
      }
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="blood-page">
      <Container fluid className="content-container fade_in">
        <h1 className="main-heading">The Importance of Blood Donation</h1>
        <p className="intro-paragraph fade_in">
          Every year, millions of people rely on blood donations for surgeries,
          accidents, cancer treatment, and chronic illnesses. Yet, less than 10%
          of eligible donors actually donate blood. Let’s bridge the gap!
        </p>
        <img
          src="https://plus.unsplash.com/premium_photo-1723187717117-93c7772572de?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="img-fluid rounded main-image fade_in"
          alt="Blood Donation"
        />
        <h2 className="section-heading fade_in">Benefits of Blood Donation</h2>
        <ul className="benefits-list fade_in">
          <li>Improves cardiovascular health by reducing iron levels.</li>
          <li>Stimulates blood cell production for better immunity.</li>
          <li>Helps save up to three lives with every donation.</li>
          <li>Provides free health screening during the donation process.</li>
          <li>Reduces harmful cholesterol and triglycerides in the blood.</li>
          <li>Fosters community connection and a sense of contribution.</li>
        </ul>
        <h2 className="section-heading fade_in">Are You Eligible to Donate?</h2>
        <p className="info-paragraph fade_in">
          Before donating, ensure you meet the following criteria:
        </p>
        <ul className="eligibility-list fade_in">
          <li>Age: 18–65 years old.</li>
          <li>Weight: Minimum 50 kg (110 lbs).</li>
          <li>Health: Free of infectious diseases.</li>
          <li>No recent tattoos or piercings (last 6 months).</li>
          <li>Not pregnant or breastfeeding.</li>
        </ul>
        <h2 className="section-heading fade_in">Myths vs Facts</h2>
        <Row className="myths-facts-section fade_in">
          <Col md={6} className="myth-box fade_in">
            <h3 className="myth-title">Myth</h3>
            <p>"Donating blood is painful."</p>
          </Col>
          <Col md={6} className="fact-box fade_in">
            <h3 className="fact-title">Fact</h3>
            <p>
              The process is virtually painless, with a minor pinch during
              needle insertion.
            </p>
          </Col>
        </Row>
        <Row className="myths-facts-section fade_in">
          <Col md={6} className="myth-box fade_in">
            <h3 className="myth-title">Myth</h3>
            <p>"I might contract a disease from donating blood."</p>
          </Col>
          <Col md={6} className="fact-box fade_in">
            <h3 className="fact-title">Fact</h3>
            <p>
              All equipment used is sterile and single-use, ensuring donor
              safety.
            </p>
          </Col>
        </Row>
        <div className="cta-section fade_in">
          <h2 className="cta-heading">Be a Hero – Donate Blood Today</h2>
          <p className="cta-text">
            Join the community of lifesavers and make a difference. Every drop
            counts.
          </p>
          <Button
            variant="outline-danger cta-button"
            onClick={() => navigate("/donate")}
          >
            Register Now
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Blood;
