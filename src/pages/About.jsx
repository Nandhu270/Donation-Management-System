import React from "react";
import "../css/About.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/About.css";

export default function About() {
  return (
    <>
      <Container
        fluid
        className="mt-4 d-flex align-items-center justify-content-center head"
      >
        <h2>Who We Are</h2>
      </Container>
      <Container fluid className="mt-4 clearfix img-content">
        <img
          src="https://i.pinimg.com/736x/6d/a3/f4/6da3f49398637d4870eb5787bafa1fca.jpg"
          className="img-fluid rounded-circle border border-primary help"
          alt="Please Wait"
        />
        <p>
          A platform driven by compassion and a shared belief in the power of
          generosity. We are a dedicated team of changemakers committed to
          bridging the gap between those in need and those who care enough to
          help. Founded on the principles of empathy and community, our
          organization supports a wide range of initiatives, including poverty
          alleviation, education, healthcare, disaster relief, and environmental
          sustainability. Whether it’s funding a child’s education, providing
          meals to families in crisis, or supporting frontline workers.
        </p>
        <p>
          We prioritize transparency and accountability. We provide detailed
          updates on how donations are utilized, showcasing the tangible impact
          of your kindness.
        </p>
        <p>
          We believe in the power of collective action. When individuals come
          together with a shared purpose, extraordinary things happen. By
          donating, volunteering, or spreading the word, you become an essential
          part of a global movement to create a fairer, kinder, and more
          inclusive world.
        </p>
        <p>
          Join us in making a difference. Together, we can turn hope into
          reality, one act of generosity at a time.
        </p>
      </Container>
      <Container fluid className="mt-4 clearfix img-content1">
        <div className="blood">
          <img
            src="https://blood-donation-management-system-flame.vercel.app/static/media/about%20(1).772232e1d315bb70ae7e.jpg"
            className="img-fluid rounded-circle border border-danger img"
            alt="Please Wait"
          />
        </div>
        <p>
          Blood donation is a vital aspect of healthcare systems around the
          world, providing a critical resource for emergency situations, medical
          procedures, and ongoing treatment for a variety of conditions. Blood
          donors are individuals who volunteer to donate blood, either for
          general use or for specific individuals who require transfusions.
        </p>
        <p>
          The content related to blood donors may include information about the
          importance of blood donation, how blood is collected and processed,
          the benefits and risks of donating blood, and the eligibility criteria
          for blood donors. This content may also cover topics such as the
          different blood types and their compatibility, the use of blood in
          medical treatments, and the role of blood banks and transfusion
          centers in managing blood supplies.
        </p>
        <p>
          Resources for blood donors may also include tools for finding local
          blood drives or donation centers, information on how to prepare for a
          blood donation, and resources for tracking blood donations and
          managing donor profiles.
        </p>
      </Container>
      <Container
        fluid
        className="mt-4 d-flex align-items-center justify-content-center"
      >
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/lhucarMcm_U?si=v_iUShTEhQXgNQVE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="responsive-iframe"
          ></iframe>
        </div>
      </Container>
    </>
  );
}
