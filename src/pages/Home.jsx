import React, { useEffect } from "react";
import { Container, Button, Carousel, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const backgroundImages = [
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608342381036-15657da6bf58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://i.pinimg.com/736x/72/14/21/7214211d5a47a0e7fcd23182a192e9c6.jpg",
    "https://images.unsplash.com/photo-1589104760192-ccab0ce0d90f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleScroll = () => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        if (!el.classList.contains("show")) {
          el.classList.add("show");
        }
      } else {
        if (el.classList.contains("show")) {
          el.classList.remove("show");
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Container fluid className="carousel-container fade-in">
        <Carousel fade>
          {backgroundImages.map((img, idx) => (
            <Carousel.Item key={idx} interval={1500} pause="hover">
              <Container
                fluid
                className="carousel-bg"
                style={{ backgroundImage: `url(${img})` }}
              >
                <Row className="overlay align-items-center justify-content-center text-center">
                  <Col>
                    <h1 className="text-light">Join the Life-Saving Cause</h1>
                    <p className="text-light">
                      Be a Hero, Donate Something Today that you Can!...
                    </p>
                    <div className="button-content">
                      <Button
                        variant="outline-light"
                        className="home-btn"
                        onClick={() => navigate("/signup")}
                      >
                        Join as a Donor
                      </Button>
                      <Button
                        variant="outline-light"
                        className="home-btn"
                        onClick={() => navigate("/searchdonor")}
                      >
                        Search Donor
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container fluid className="content-container mt-3 ">
        <div className="fade-in">
          <h1>Help End Homelessness</h1>
          <p>
            Support Veterans, Domestic Violence Victims, and Foster Care Youth
            Campaign Overview: COHAP Outreach Corporation, a 501(c)(3)
            non-profit organization, is on a mission to end homelessness and
            create stable futures for those most vulnerable. We are dedicated to
            protecting veterans, domestic violence survivors, formerly
            incarcerated individuals, and young adults aging out of foster care
            from the threat of homelessness.
          </p>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div className="fade-in">
          <h1>Our Vision</h1>
          <p>
            We believe in empowering individuals to rebuild their lives, thrive,
            and escape the cycle of homelessness. By providing safe and secure
            housing, along with essential support services, we aim to equip
            these individuals with the tools and confidence they need to
            succeed.
          </p>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div className="fade-in">
          <h1>Why Your Support Matters</h1>
          <p>Your donation will directly impact lives by funding:</p>
          <ul>
            <li>
              Emergency hotel stays for those in immediate need of shelter.
            </li>
            <li>
              The purchase and renovation of two multi-unit residential
              buildings and single-family homes to serve as shared living spaces
              for young adults aging out of foster care.
            </li>
            <li>
              Long-term housing solutions for veterans and survivors of domestic
              violence.
            </li>
          </ul>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div className="fade-in">
          <h1>Our GOAL</h1>
          <p>
            With your help, we can raise $600,000 to secure these housing units
            and create safe environments for those at risk of homelessness. This
            will help reduce the growing numbers of homeless individuals in our
            communities and provide them with a path to stability.
          </p>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div className="fade-in">
          <h1>How You Can Help</h1>
          <p>
            Every donation brings us closer to ending homelessness. No amount is
            too small—whether it helps cover one night of safe shelter or
            contributes toward the purchase of a home, your support matters.
          </p>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div className="fade-in">
          <h1>Donate Today and Give the Gift of Hope</h1>
          <p>
            By contributing to this campaign, you are making a direct impact on
            the lives of veterans, domestic violence victims, and young adults
            transitioning out of foster care. Together, we can make a lasting
            difference in our community and give these individuals the second
            chance they deserve.
          </p>
          <p>
            Join us in the fight to end homelessness. Your generosity will
            create change, one life at a time.
          </p>
        </div>
      </Container>
      <Container
        fluid
        className="mt-4 d-flex align-items-center justify-content-center fade-in"
      >
        <div className="video-wrapper fade-in">
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/0CbFrom3Qkk?si=ev6Ra3sor2SH7Nff"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="responsive-iframe"
          ></iframe>
        </div>
      </Container>
    </>
  );
}
