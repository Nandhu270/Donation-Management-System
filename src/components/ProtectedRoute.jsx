import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner, Container, Alert } from "react-bootstrap";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" variant="danger" />
        <span className="ms-3 text-secondary">Verifying authentication...</span>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center p-4 shadow-sm">
          <h4>Access Denied (403 Forbidden)</h4>
          <p className="mb-0">
            You do not have administrative privileges to access this area. Current role:{" "}
            <strong>{user?.role || "standard user"}</strong>.
          </p>
        </Alert>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;

