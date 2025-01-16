import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../css/Home.css";

export default function Home() {
  return (
    <>
      <Container
        fluid
        className="background-container mt-3 text-center d-flex align-items-center justify-content-center"
      >
        <div className="content">
          <h1>Join the Life-Saving Cause</h1>
          <p>Be a Hero, Donate Something Today that you Can!...</p>
          <div className="button-content">
            <Button variant="outline-info">Join as a Donor</Button>
            <Button variant="outline-info">Search Donor</Button>
          </div>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <h1>How You Can Help</h1>
          <p>
            Every donation brings us closer to ending homelessness. No amount is
            too small—whether it helps cover one night of safe shelter or
            contributes toward the purchase of a home, your support matters.
          </p>
        </div>
      </Container>
      <Container fluid className="content-container mt-3 ">
        <div>
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
        className="mt-4 d-flex align-items-center justify-content-center"
      >
        <div className="video-wrapper">
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
