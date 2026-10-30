import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Badge, Spinner, Dropdown } from "react-bootstrap";
import { adminService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "../css/AdminDashboard.css";
import {
  FaUsers,
  FaUserShield,
  FaHeartbeat,
  FaHandHoldingHeart,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaBan,
  FaUserCog,
} from "react-icons/fa";

export default function AdminDashboard() {
  const { user: currentAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers({ search, role: roleFilter, page, limit: 10 }),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (usersRes.success) {
        setUsers(usersRes.users);
        setPagination(usersRes.pagination);
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data:", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Failed to load admin data.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [page, roleFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchDashboardData();
  };

  const handleRoleChange = async (userId, targetUserName, newRole) => {
    const confirmation = await Swal.fire({
      title: "Confirm Role Change",
      text: `Are you sure you want to change ${targetUserName}'s role to "${newRole.toUpperCase()}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change Role",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const res = await adminService.updateUserRole(userId, newRole);
      if (res.success) {
        Swal.fire("Updated!", res.message, "success");
        // Update user in local state immediately
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      Swal.fire(
        "Update Failed",
        err.response?.data?.message || "Failed to update role.",
        "error"
      );
    }
  };

  const handleStatusToggle = async (userId, targetUserName, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";
    const confirmation = await Swal.fire({
      title: `${action.toUpperCase()} Account?`,
      text: `Are you sure you want to ${action} ${targetUserName}'s account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: currentStatus ? "#d33" : "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Yes, ${action}`,
    });

    if (!confirmation.isConfirmed) return;

    try {
      const res = await adminService.toggleUserStatus(userId);
      if (res.success) {
        Swal.fire("Success", res.message, "success");
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isActive: res.isActive } : u))
        );
      }
    } catch (err) {
      Swal.fire(
        "Action Failed",
        err.response?.data?.message || "Failed to toggle status.",
        "error"
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <Container fluid="lg">
        <div className="admin-header d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <h2>
              <FaUserShield className="text-danger me-2" />
              Administrative Control Center
            </h2>
            <p className="text-muted mb-0">
              Manage system users, oversee access roles, and monitor live donation statistics.
            </p>
          </div>
          <div>
            <Badge bg="dark" className="p-2 fs-6">
              Logged in as: {currentAdmin?.name} ({currentAdmin?.mail})
            </Badge>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <Row className="g-3 mb-4">
          <Col xs={12} sm={6} lg={3}>
            <Card className="kpi-card bg-white">
              <Card.Body className="d-flex align-items-center">
                <div className="p-3 bg-light rounded-circle me-3 text-primary">
                  <FaUsers size={28} />
                </div>
                <div>
                  <h3 className="kpi-value text-primary">{stats?.totalUsers ?? "-"}</h3>
                  <div className="kpi-label">Total Users</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <Card className="kpi-card bg-white">
              <Card.Body className="d-flex align-items-center">
                <div className="p-3 bg-light rounded-circle me-3 text-danger">
                  <FaHeartbeat size={28} />
                </div>
                <div>
                  <h3 className="kpi-value text-danger">{stats?.totalDonors ?? "-"}</h3>
                  <div className="kpi-label">Registered Donors</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <Card className="kpi-card bg-white">
              <Card.Body className="d-flex align-items-center">
                <div className="p-3 bg-light rounded-circle me-3 text-warning">
                  <FaUserShield size={28} />
                </div>
                <div>
                  <h3 className="kpi-value text-warning">{stats?.totalAdmins ?? "-"}</h3>
                  <div className="kpi-label">Administrators</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={6} lg={3}>
            <Card className="kpi-card bg-white">
              <Card.Body className="d-flex align-items-center">
                <div className="p-3 bg-light rounded-circle me-3 text-success">
                  <FaHandHoldingHeart size={28} />
                </div>
                <div>
                  <h3 className="kpi-value text-success">
                    {stats?.totalDonationAmount != null
                      ? `₹${Number(stats.totalDonationAmount).toLocaleString("en-IN")}`
                      : "-"}
                  </h3>
                  <div className="kpi-label">Funds Collected</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* User Management Section */}
        <Card className="admin-table-card">
          <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h5 className="mb-0 fw-bold">User Directory & Role Management</h5>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <Form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Search name, email, blood..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="sm"
                  style={{ width: "220px" }}
                />
                <Button variant="outline-danger" size="sm" type="submit">
                  <FaSearch />
                </Button>
              </Form>

              <Form.Select
                size="sm"
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                style={{ width: "130px" }}
              >
                <option value="">All Roles</option>
                <option value="admin">Admins</option>
                <option value="donor">Donors</option>
                <option value="user">Users</option>
              </Form.Select>
            </div>
          </Card.Header>

          <Card.Body className="p-0">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-2 text-muted">Loading user accounts...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-5 text-muted">
                No users found matching current filters.
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="table-custom mb-0">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Blood Group</th>
                      <th>Current Role</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const isSelf = u._id === currentAdmin?._id;
                      return (
                        <tr key={u._id}>
                          <td>
                            <div className="fw-bold">{u.name}</div>
                            <div className="text-muted small">{u.mail}</div>
                            <div className="text-muted small">Ph: {u.mobile}</div>
                          </td>
                          <td>
                            <span className="blood-badge">{u.blood}</span>
                          </td>
                          <td>
                            <span className={`badge-role-${u.role || "user"}`}>
                              {(u.role || "user").toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <div className="small">{u.address}</div>
                            <div className="text-muted small">
                              {u.country} - {u.pincode}
                            </div>
                          </td>
                          <td>
                            {u.isActive !== false ? (
                              <Badge bg="success" className="d-inline-flex align-items-center gap-1">
                                <FaCheckCircle size={10} /> Active
                              </Badge>
                            ) : (
                              <Badge bg="danger" className="d-inline-flex align-items-center gap-1">
                                <FaBan size={10} /> Deactivated
                              </Badge>
                            )}
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-2">
                              {/* Role Selector Dropdown */}
                              <Dropdown align="end">
                                <Dropdown.Toggle
                                  variant="outline-secondary"
                                  size="sm"
                                  id={`role-dropdown-${u._id}`}
                                  disabled={isSelf}
                                  title={isSelf ? "Cannot change your own role here" : "Change Role"}
                                >
                                  <FaUserCog className="me-1" /> Role
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    active={u.role === "admin"}
                                    onClick={() => handleRoleChange(u._id, u.name, "admin")}
                                  >
                                    Promote to Admin
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    active={u.role === "donor"}
                                    onClick={() => handleRoleChange(u._id, u.name, "donor")}
                                  >
                                    Set as Donor
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    active={u.role === "user"}
                                    onClick={() => handleRoleChange(u._id, u.name, "user")}
                                  >
                                    Set as Standard User
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>

                              {/* Status Toggle Button */}
                              <Button
                                variant={u.isActive !== false ? "outline-danger" : "outline-success"}
                                size="sm"
                                disabled={isSelf}
                                title={isSelf ? "Cannot deactivate yourself" : "Toggle Status"}
                                onClick={() => handleStatusToggle(u._id, u.name, u.isActive !== false)}
                              >
                                {u.isActive !== false ? "Deactivate" : "Activate"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>

          {pagination.totalPages > 1 && (
            <Card.Footer className="bg-white d-flex justify-content-between align-items-center">
              <span className="text-muted small">
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total accounts)
              </span>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </Card.Footer>
          )}
        </Card>
      </Container>
    </div>
  );
}

