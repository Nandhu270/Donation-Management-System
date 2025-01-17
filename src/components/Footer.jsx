import React from "react";
import { Container } from "react-bootstrap";
import "../css/Footer.css";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <Container className="footer-content">
        <div className="box">
          <div>
            <h1>Find Fortune</h1>
            <p>
              Hope for Children is an international charity working towards a
              world where every child has a happy childhood that sets them up
              for a positive future.
            </p>
            <button
              type="submit"
              className="newsletter-button"
              onClick={() => navigate("/donate")}
            >
              Donate
            </button>
          </div>
          <div className="use">
            <h1>Useful Links</h1>
            <Link to="/about">About Us</Link>
            <Link to="/blog">FAQ</Link>
            <Link to="/donate">Do Charity</Link>
            <Link to="/login">My Account</Link>
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div>
            <h1>Follow Us</h1>
            <p>
              Follow us on social media to stay updated with our latest
              initiatives.
            </p>
            <div className="links">
              <FaFacebook size={30} className="social-icon facebook" />
              <FaInstagram size={30} className="social-icon instagram" />
              <FaTwitter size={30} className="social-icon twitter" />
              <FaLinkedin size={30} className="social-icon linkedin" />
            </div>
          </div>
          <div>
            <h1>Newsletter</h1>
            <p>
              Stay informed about our latest projects. Subscribe to our
              newsletter!
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Donate Company. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
