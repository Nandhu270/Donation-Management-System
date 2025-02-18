import React, { useState } from "react";
import "../css/searchdonor.css";
import { Container, Form, Col, Button, Card, CardBody } from "react-bootstrap";
import { details } from "../components/loginfile.js";

function SearchDonor() {
  const [search, setsearch] = useState({blood: "", country: "", pincode: "", msg: ""});
  const [userFound, setuserFound] = useState(false);
  const [foundDonor, setFoundDonor] = useState(null);
  const [bloodtype, setbloodtype] = useState(null);
  const [errors,setErrors] = useState({})

  const validateForm = ()=>{
    const result = {};

    if(!search.blood){
      result.blood = "Enter the Blood Type"
    }

    if(!search.country){
      result.country = "Enter the Country"
    }

    if(!search.pincode){
      result.pincode = "Enter the Pincode"
    }

    const verifypin = /^[0-9]+$/
    if(search.pincode && !verifypin.test(search.pincode)){
      result.pincode = "Enter Valid Pincode"
    }
    
    if(!search.msg){
      result.msg = "Enter the Message"
    }

    return result;
  }

  const handleSearch = (e) => {

    e.preventDefault();
    setErrors({});
    const res = validateForm();

    if(Object.keys(res).length > 0){
      setErrors(res);
      return;
    }

    if (
      search.blood !== "" &&
      search.country !== "" &&
      search.pincode !== "" &&
      search.msg !== ""
    ) {
      const result = details.filter((data) => {
        return (
          data.blood.toLowerCase().includes(search.blood.toLowerCase()) &&
          data.country.toLowerCase().includes(search.country.toLowerCase()) &&
          data.pincode.toString().includes(search.pincode.toString())
        );
      });

      if (result.length > 0) {
        setuserFound(true);
        setFoundDonor(result[0].pincode);
        setbloodtype(result[0].blood);
      } else {
        setuserFound(true);
        setFoundDonor(null);
        setbloodtype(null);
      }
    }
  };

  return (
    <>
      {!userFound ? (
        <>
          <Container
            fluid
            className="search-donor-container mt-4 animate__animated animate__fadeIn"
          >
            <h1 className="search-donor-heading">Search Donor</h1>
            <Form className="search-donor-form">
              <Form.Group className="form-group-custom">
                <Form.Label className="form-label-custom">
                  Blood Group
                </Form.Label>
                <Col xs={12} sm={11} md={11} className="form-col-custom">
                  <Form.Control
                    type="text"
                    placeholder="Enter Blood Group"
                    className="form-control-custom"
                    value={search.blood}
                    onChange={(e) =>
                      setsearch({ ...search, blood: e.target.value })
                    }
                    required
                    isInvalid = {!!errors.blood}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.blood}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group className="form-group-custom">
                <Form.Label className="form-label-custom">Country</Form.Label>
                <Col xs={12} sm={11} md={11} className="form-col-custom">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Country"
                    className="form-control-custom"
                    value={search.country}
                    onChange={(e) =>
                      setsearch({ ...search, country: e.target.value })
                    }
                    required
                    isInvalid = {!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group className="form-group-custom">
                <Form.Label className="form-label-custom">Pincode</Form.Label>
                <Col xs={12} sm={11} md={11} className="form-col-custom">
                  <Form.Control
                    type="number"
                    placeholder="Enter Pincode"
                    className="form-control-custom"
                    value={search.pincode}
                    onChange={(e) =>
                      setsearch({ ...search, pincode: e.target.value })
                    }
                    required
                    isInvalid = {!!errors.pincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pincode}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group className="form-group-custom">
                <Form.Label className="form-label-custom">
                  Your Message
                </Form.Label>
                <Col xs={12} sm={11} md={11} className="form-col-custom">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your message here..."
                    className="form-control-custom"
                    value={search.msg}
                    onChange={(e) =>
                      setsearch({ ...search, msg: e.target.value })
                    }
                    required
                    isInvalid = {!!errors.msg}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.msg}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <div className="button-container">
                <Button
                  type="button"
                  variant="outline-danger"
                  className="send-button"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </Form>
          </Container>
        </>
      ) : (
        <>
          {foundDonor != null && bloodtype != null ? (
            <>
              <Container className="mt-4 d-flex flex-column justify-content-center align-items-center gap-2">
                <h1 className="text-center">Donors Found</h1>
                {details
                  .filter(
                    (data) =>
                      data.pincode === foundDonor && data.blood === bloodtype
                  )
                  .map((data) => (
                    <Card className="w-50" key={data.mobile}>
                      <CardBody>
                        <p>
                          <strong>Name:</strong> {data.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {data.email}
                        </p>
                        <p>
                          <strong>Phone Number:</strong> {data.mobile}
                        </p>
                        <p>
                          <strong>Blood Type:</strong> {data.blood}
                        </p>
                        <p>
                          <strong>Gender:</strong> {data.gender}
                        </p>
                      </CardBody>
                    </Card>
                  ))}
              </Container>
            </>
          ) : (
            <>
              <Container className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-center">No Donor Found</h1>
                <img
                  src="https://i.pinimg.com/736x/2c/63/b1/2c63b16208a3b8d89167232e56a9d9c6.jpg"
                  alt="No donor"
                  width={300}
                  height={400}
                ></img>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}

export default SearchDonor;
