import React,{useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../css/Process.css";
import { useNavigate } from "react-router-dom";

function Process() {
  const navigate = useNavigate();

    function handleScroll(){
      const ele = document.querySelectorAll('.fade_in');
      ele.forEach((dt)=>{
        const res = dt.getBoundingClientRect();
          if(res.top < window.innerHeight && res.bottom >= 0){
            if(!dt.classList.contains('show'))
                dt.classList.add('show');
          }else{
            if(dt.classList.contains('show'))
              dt.classList.remove('show');
          }
      })
    }
  
    useEffect(()=>{
      window.addEventListener("scroll",handleScroll);
      handleScroll();
      return ()=>{
        window.removeEventListener("scroll",handleScroll);
      }
    })

  return (
    <>
      <Container fluid className="process-container fade_in">
        <h1 className="main-heading fade_in">How To Donate Blood</h1>
        <h3 className="subheading fade_in">Here’s how you do it</h3>
        <ul className="process-steps fade_in">
          <li>Allow about an hour for donation</li>
          <li>Take photo ID with you (your driving license is fine!)</li>
          <li>If you feel nervous, tell one of our nurses</li>
          <li>
            Everything is better with company, so ask a friend to come with you!
          </li>
        </ul>

        <h3 className="eligibility-heading fade_in">Who can donate?</h3>
        <p className="eligibility-text fade_in">You can probably donate blood if:</p>
        <ul className="eligibility-list fade_in">
          <li>
            You are 18 or over. In Finland, the oldest age at which you can give
            blood for the first time is 59.
          </li>
          <li>You weigh between 50 and 199 kilograms.</li>
          <li>
            You are in good overall health. Most diseases and medications do not
            prevent you from giving blood.
          </li>
        </ul>

        <div className="importance-section fade_in">
          <h3 className="importance-heading fade_in">
            Why Blood Donation is Important
          </h3>
          <p className="fade_in">
            Blood donation plays a critical role in saving lives. Every day,
            hospitals and emergency services require blood to treat patients
            suffering from trauma, surgeries, or chronic illnesses. Your
            donation can be the difference between life and death for someone in
            need.
          </p>
        </div>

        <div className="blood-types fade_in">
          <h3 className="blood-types-heading">Types of Blood Donations</h3>
          <ul className="blood-types-list fade_in">
            <li>
              <strong>Whole Blood Donation:</strong> Donating a full unit of
              blood for general use.
            </li>
            <li>
              <strong>Platelet Donation:</strong> Used to treat cancer and other
              diseases that affect blood clotting.
            </li>
            <li>
              <strong>Plasma Donation:</strong> Donated plasma is essential for
              burn victims, trauma patients, and more.
            </li>
          </ul>
        </div>

        <div className="aftercare-tips fade_in">
          <h3 className="aftercare-heading">Aftercare Tips</h3>
          <p>
            After donating blood, it’s important to take care of yourself.
            Follow these tips for a smooth recovery:
          </p>
          <ul>
            <li>Rest for at least 10-15 minutes.</li>
            <li>Drink plenty of water.</li>
            <li>Avoid strenuous activity for the rest of the day.</li>
            <li>Eat iron-rich foods to help replenish your blood supply.</li>
          </ul>
        </div>

        <div className="myths-facts myth-pro fade_in">
          <h3 className="myths-facts-heading">
            Blood Donation Myths and Facts
          </h3>

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

          <Row className="myths-facts-section fade_in">
            <Col md={6} className="myth-box fade_in">
              <h3 className="myth-title">Myth</h3>
              <p>"I’m too old to donate blood."</p>
            </Col>
            <Col md={6} className="fact-box fade_in">
              <h3 className="fact-title">Fact</h3>
              <p>
                As long as you meet the other requirements, you can donate at
                any age up to 60-70 years old depending on the country’s
                guidelines.
              </p>
            </Col>
          </Row>

          <Row className="myths-facts-section fade_in">
            <Col md={6} className="myth-box fade_in">
              <h3 className="myth-title">Myth</h3>
              <p>"Blood donation takes a long time."</p>
            </Col>
            <Col md={6} className="fact-box fade_in">
              <h3 className="fact-title">Fact</h3>
              <p>
                The donation process typically takes less than 10 minutes, and
                the whole visit takes about 45 minutes.
              </p>
            </Col>
          </Row>
        </div>

        <div className="statistics-section fade_in">
          <h3 className="statistics-heading">Statistics and Impact</h3>
          <p>
            Every year, millions of lives are saved thanks to blood donors like
            you. Here's how your donation impacts the community:
          </p>
          <ul>
            <li>One donation can save up to three lives.</li>
            <li>Every two seconds, someone in the U.S. needs blood.</li>
            <li>
              Less than 10% of the eligible population donates blood each year,
              making you part of an exclusive group that can save lives.
            </li>
          </ul>
        </div>

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
    </>
  );
}

export default Process;
