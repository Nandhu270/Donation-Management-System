import React from "react";
import "../css/searchdonor.css";
import { Container, Form, Col, Button } from "react-bootstrap";

function SearchDonor() {
  return (
    <>
      <Container fluid className="search-donor-container mt-4 animate__animated animate__fadeIn">
        <h1 className="search-donor-heading">Search Donor</h1>
        <Form className="search-donor-form">
          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">Blood Group</Form.Label>
            <Col xs={12} sm={11} md={11} className="form-col-custom">
              <Form.Control
                type="text"
                placeholder="Enter Blood Group"
                className="form-control-custom"
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">Country</Form.Label>
            <Col xs={12} sm={11} md={11} className="form-col-custom">
              <Form.Control
                type="text"
                placeholder="Enter Your Country"
                className="form-control-custom"
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">Pincode</Form.Label>
            <Col xs={12} sm={11} md={11} className="form-col-custom">
              <Form.Control
                type="number"
                placeholder="Enter Pincode"
                className="form-control-custom"
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">Your Message</Form.Label>
            <Col xs={12} sm={11} md={11} className="form-col-custom">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message here..."
                className="form-control-custom"
              />
            </Col>
          </Form.Group>
          <div className="button-container">
            <Button
              type="submit"
              variant="outline-danger"
              className="send-button"
            >
              Send
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default SearchDonor;
