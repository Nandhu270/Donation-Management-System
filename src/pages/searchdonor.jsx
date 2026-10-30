import React, { useState } from "react";
import "../css/searchdonor.css";
import { Container, Form, Col, Button, Card, CardBody, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { donorService } from "../services/api";

function SearchDonor() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [search, setsearch] = useState({
    blood: "",
    country: "India",
    pincode: "",
    msg: "",
  });
  const [userFound, setuserFound] = useState(false);
  const [foundDonor, setFoundDonor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const result = {};

    if (!search.blood) {
      result.blood = "Select the Blood Group";
    }

    if (!search.country) {
      result.country = "Select or Enter Country";
    }

    if (!search.pincode) {
      result.pincode = "Enter the Pincode";
    } else {
      const verifypin = /^[0-9]+$/;
      if (!verifypin.test(search.pincode)) {
        result.pincode = "Enter a valid postal pincode";
      }
    }

    return result;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!isAuthenticated) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to search and connect with registered donors.",
        icon: "warning",
        confirmButtonColor: "#dc3545",
      });
      navigate("/login");
      return;
    }

    const res = validateForm();
    if (Object.keys(res).length > 0) {
      setErrors(res);
      return;
    }

    try {
      setLoading(true);
      const data = await donorService.searchDonors({
        blood: search.blood,
        country: search.country,
        pincode: search.pincode,
        availableOnly: "false",
      });

      setuserFound(true);
      if (data.success && data.donors && data.donors.length > 0) {
        setFoundDonor(data.donors);
      } else {
        setFoundDonor(null);
      }
    } catch (err) {
      console.error("Error fetching donors:", err);
      Swal.fire({
        title: "Search Error",
        text: err.response?.data?.message || "Could not retrieve donor records from server.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!userFound ? (
        <Container fluid className="search-donor-container mt-4 animate__animated animate__fadeIn">
          <h1 className="search-donor-heading">Find a Blood Donor</h1>
          <p className="text-center text-muted mb-4">
            Search our verified database of life-saving donors by blood group and location.
          </p>

          <Form className="search-donor-form shadow-sm p-4 rounded bg-white" onSubmit={handleSearch}>
            <Form.Group className="form-group-custom mb-3">
              <Form.Label className="form-label-custom fw-semibold">Blood Group</Form.Label>
              <Col xs={12} sm={11} md={11} className="form-col-custom">
                <Form.Select
                  className="form-control-custom"
                  required
                  value={search.blood}
                  onChange={(e) => setsearch({ ...search, blood: e.target.value })}
                  isInvalid={!!errors.blood}
                >
                  <option value="">-- Select Blood Group --</option>
                  <option value="A+ve">A+</option>
                  <option value="A-ve">A-</option>
                  <option value="B+ve">B+</option>
                  <option value="B-ve">B-</option>
                  <option value="O+ve">O+</option>
                  <option value="O-ve">O-</option>
                  <option value="AB+ve">AB+</option>
                  <option value="AB-ve">AB-</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.blood}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="form-group-custom mb-3">
              <Form.Label className="form-label-custom fw-semibold">Country</Form.Label>
              <Col xs={12} sm={11} md={11} className="form-col-custom">
                <Form.Control
                  type="text"
                  placeholder="Enter Country (e.g. India)"
                  className="form-control-custom"
                  value={search.country}
                  onChange={(e) => setsearch({ ...search, country: e.target.value })}
                  required
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="form-group-custom mb-3">
              <Form.Label className="form-label-custom fw-semibold">Pincode / Postal Code</Form.Label>
              <Col xs={12} sm={11} md={11} className="form-col-custom">
                <Form.Control
                  type="number"
                  placeholder="Enter 6-digit Pincode"
                  className="form-control-custom"
                  value={search.pincode}
                  onChange={(e) => setsearch({ ...search, pincode: e.target.value })}
                  required
                  isInvalid={!!errors.pincode}
                />
                <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group className="form-group-custom mb-3">
              <Form.Label className="form-label-custom fw-semibold">Urgent Requirement Details</Form.Label>
              <Col xs={12} sm={11} md={11} className="form-col-custom">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Hospital name, patient condition, number of units required..."
                  className="form-control-custom"
                  value={search.msg}
                  onChange={(e) => setsearch({ ...search, msg: e.target.value })}
                />
              </Col>
            </Form.Group>

            <div className="button-container text-center mt-3">
              <Button
                type="submit"
                variant="danger"
                className="px-4 py-2 fw-bold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Searching Donors...
                  </>
                ) : (
                  "Search Donors"
                )}
              </Button>
            </div>
          </Form>
        </Container>
      ) : (
        <Container className="my-5 d-flex flex-column align-items-center">
          <div className="d-flex justify-content-between align-items-center w-100 mb-4" style={{ maxWidth: "750px" }}>
            <h2 className="mb-0 text-danger fw-bold">Search Results</h2>
            <Button variant="outline-secondary" onClick={() => setuserFound(false)}>
              ← New Search
            </Button>
          </div>

          {foundDonor != null && foundDonor.length > 0 ? (
            <div className="w-100 d-flex flex-column gap-3 align-items-center" style={{ maxWidth: "750px" }}>
              <p className="text-muted w-100">
                Found <strong>{foundDonor.length}</strong> matching verified donor(s) in your area:
              </p>
              {foundDonor.map((donor) => (
                <Card className="w-100 shadow-sm border-0 rounded-3" key={donor._id || donor.mobile}>
                  <CardBody className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="mb-1 fw-bold text-dark">{donor.name}</h5>
                        <div className="text-muted small">
                          Location: {donor.country} - Pincode {donor.pincode}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end gap-1">
                        <Badge bg="danger" className="fs-6 px-3 py-1">
                          {donor.blood}
                        </Badge>
                        {donor.isAvailableForDonation !== false ? (
                          <Badge bg="success">Available Now</Badge>
                        ) : (
                          <Badge bg="secondary">Temporarily Unavailable</Badge>
                        )}
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-secondary small">
                        <strong>Gender:</strong> {donor.gender || "Not specified"}
                      </span>
                      <a
                        href={`tel:${donor.mobile}`}
                        className="btn btn-sm btn-outline-danger px-3"
                      >
                        📞 Call Donor: {donor.mobile}
                      </a>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h3 className="text-muted mb-3">No matching donors currently found</h3>
              <p className="text-secondary" style={{ maxWidth: "450px" }}>
                We could not find active donors matching blood group <strong>{search.blood}</strong> in pincode <strong>{search.pincode}</strong>.
              </p>
              <Button variant="danger" onClick={() => setuserFound(false)} className="mt-2">
                Try a different location or blood group
              </Button>
            </div>
          )}
        </Container>
      )}
    </>
  );
}

export default SearchDonor;
