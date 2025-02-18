import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../css/Footer.css";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollTop";

function Footer() {
  const navigate = useNavigate();

  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  }, [location.pathname]);

  return (
    <footer
      className={`footer ${animate ? "animate__animated animate__fadeIn" : ""}`}
    >
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
            <Link to="/about" onClick={ScrollToTop}>
              <FaChevronRight /> About Us
            </Link>
            <Link to="/blog" onClick={ScrollToTop}>
              <FaChevronRight /> Blog
            </Link>
            <Link to="/donate" onClick={ScrollToTop}>
              <FaChevronRight /> Do Charity
            </Link>
            <Link to="/login" onClick={ScrollToTop}>
              <FaChevronRight /> My Account
            </Link>
            <Link to="/contactus" onClick={ScrollToTop}>
              <FaChevronRight /> Contact Us
            </Link>
          </div>
          <div>
            <h1>Follow Us</h1>
            <p>
              Follow us on social media to stay updated with our latest
              initiatives.
            </p>
            <div className="links">
              <a
                href="https://www.facebook.com/share/17y5ajEhdR/"
                target="_blank"
                style={{ color: "white" }}
              >
                <FaFacebook size={30} className="social-icon facebook" />
              </a>

              <a
                href="https://www.instagram.com/itz__nandhu__nk__/"
                target="_blank"
                style={{ color: "white" }}
              >
                <FaInstagram size={30} className="social-icon instagram" />
              </a>

              <a
                href="https://x.com/nandhaNK27"
                target="_blank"
                style={{ color: "white" }}
              >
                <FaTwitter size={30} className="social-icon twitter" />
              </a>

              <a
                href="https://www.linkedin.com/in/nandhakumar-p-v/"
                target="_blank"
                style={{ color: "white" }}
              >
                <FaLinkedin
                  style={{ cursor: "pointer" }}
                  size={30}
                  className="social-icon linkedin"
                />
              </a>
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
