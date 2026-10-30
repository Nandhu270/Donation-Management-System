import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Row, Col, Modal, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { authService } from "../services/api";
import TailwindAlert from "../components/common/TailwindAlert";
import PageTransition from "../components/common/PageTransition";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaPhoneAlt,
  FaVenusMars,
  FaMapMarkerAlt,
  FaFlag,
  FaHashtag,
  FaShieldAlt,
  FaEdit,
  FaKey,
  FaSignOutAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

export default function Login() {
  const { user, isAuthenticated, isAdmin, login, logout, updateProfile, changePassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ mail: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loginAlert, setLoginAlert] = useState(null);

  // Profile data
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);

  // Edit Profile Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    mobile: "",
    address: "",
    country: "",
    pincode: "",
    blood: "",
    gender: "",
    isAvailableForDonation: true,
  });

  // Change Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        mobile: user.mobile || "",
        address: user.address || "",
        country: user.country || "",
        pincode: user.pincode || "",
        blood: user.blood || "",
        gender: user.gender || "",
        isAvailableForDonation: user.isAvailableForDonation !== false,
      });

      // Fetch user's own donations
      authService
        .getMyDonations()
        .then((res) => {
          if (res.success) {
            setDonatedAmount(res.totalAmount || 0);
            setDonationCount(res.count || 0);
          }
        })
        .catch((err) => console.log("Donations fetch error:", err));
    }
  }, [user]);

  const validateLoginForm = () => {
    const errs = {};
    if (!credentials.mail) {
      errs.mail = "Email address is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(credentials.mail.trim())) {
        errs.mail = "Please enter a valid email address";
      }
    }

    if (!credentials.password) {
      errs.password = "Password is required";
    }

    return errs;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoginAlert(null);

    const formErrors = validateLoginForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.warning("Please enter your email and password.", "Login Form");
      return;
    }

    try {
      setSubmitting(true);
      const res = await login(credentials.mail.trim().toLowerCase(), credentials.password);

      toast.success(`Welcome back, ${res.user.name}!`, "Login Successful");

      Swal.fire({
        title: `Welcome, ${res.user.name}!`,
        text: `Logged in successfully as ${res.user.role.toUpperCase()}`,
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Invalid email or password";
      setLoginAlert(msg);
      toast.error(msg, "Authentication Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(editForm);
      setShowEditModal(false);
      toast.success("Profile updated successfully!", "Profile Saved");
      Swal.fire("Updated!", "Your profile information has been saved.", "success");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Could not update profile.";
      toast.error(msg, "Update Error");
      Swal.fire("Update Failed", msg, "error");
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrors({});

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordErrors({ confirmPassword: "New passwords do not match." });
      return;
    }

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passRegex.test(passwordForm.newPassword)) {
      setPasswordErrors({
        newPassword:
          "Password must be at least 6 characters long and include a letter, number, and special character.",
      });
      return;
    }

    try {
      await changePassword(passwordForm);
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated successfully!", "Security Updated");
      Swal.fire("Success", "Password updated successfully!", "success");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to change password.";
      toast.error(msg, "Password Error");
      Swal.fire("Error", msg, "error");
    }
  };

  const profileDetails = user
    ? [
        { icon: <FaUser className="text-red-500" />, label: "Full Name", value: user.name },
        { icon: <FaEnvelope className="text-red-500" />, label: "Email Address", value: user.mail },
        { icon: <FaTint className="text-red-500" />, label: "Blood Group", value: user.blood },
        { icon: <FaPhoneAlt className="text-red-500" />, label: "Mobile Number", value: user.mobile },
        { icon: <FaVenusMars className="text-red-500" />, label: "Gender", value: user.gender },
        { icon: <FaMapMarkerAlt className="text-red-500" />, label: "Address", value: user.address },
        { icon: <FaHashtag className="text-red-500" />, label: "Pincode", value: user.pincode },
        { icon: <FaFlag className="text-red-500" />, label: "Country", value: user.country },
      ]
    : [];

  return (
    <PageTransition className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {!isAuthenticated ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Info Panel */}
            <div className="bg-gradient-to-br from-red-600 to-rose-700 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-6">
                  <FaShieldAlt /> Secure Authentication
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
                  Welcome Back to the Donor Portal
                </h2>
                <p className="text-red-100 text-sm mb-6 leading-relaxed">
                  Log in to manage your donations, track your impact, and respond to urgent life-saving requests.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Full Privacy Protection</h4>
                      <p className="text-xs text-red-100">
                        Passwords hashed with bcrypt & protected with JWT session tokens.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Blood Availability Status</h4>
                      <p className="text-xs text-red-100">
                        Set your availability status to respond to local blood emergency drives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-red-500/40 text-xs text-red-200">
                Together, over 50,000+ donors are making healthcare and emergency relief possible.
              </div>
            </div>

            {/* Right Login Form */}
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Donor Sign In</h3>
              <p className="text-sm text-gray-500 mb-6">Enter your registered credentials below</p>

              {loginAlert && (
                <TailwindAlert
                  type="error"
                  title="Invalid Credentials"
                  message={loginAlert}
                  onClose={() => setLoginAlert(null)}
                  className="mb-4"
                />
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={credentials.mail}
                      onChange={(e) => setCredentials({ ...credentials, mail: e.target.value })}
                      className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm transition outline-none ${
                        errors.mail
                          ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                          : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      }`}
                      disabled={submitting}
                    />
                  </div>
                  {errors.mail && <p className="text-xs text-red-600 mt-1">{errors.mail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-lg border text-sm transition outline-none ${
                        errors.password
                          ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                          : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      }`}
                      disabled={submitting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 pt-3">
                  Not registered yet?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-red-600 hover:text-red-700 hover:underline"
                  >
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated User Dashboard */
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold shadow-inner border border-white/30">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">{user?.name}</h2>
                  <p className="text-red-100 text-sm">{user?.mail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    user?.role === "admin"
                      ? "bg-amber-400 text-amber-950"
                      : user?.role === "donor"
                      ? "bg-white text-red-600"
                      : "bg-blue-100 text-blue-900"
                  }`}
                >
                  {user?.role === "admin" && "🛡️ "}
                  {user?.role?.toUpperCase() || "USER"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user?.isAvailableForDonation
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {user?.isAvailableForDonation ? "Available for Blood" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* Profile Information Grid */}
            <div className="p-6 sm:p-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                Account Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {profileDetails.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="font-bold text-sm text-gray-900 truncate">
                      {item.value || "N/A"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-sm shadow-sm transition"
                  >
                    <FaShieldAlt /> Open Admin Center
                  </button>
                )}

                <button
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg text-sm transition"
                >
                  <FaEdit /> Edit Profile
                </button>

                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg text-sm transition"
                >
                  <FaKey /> Change Password
                </button>

                <button
                  onClick={() => logout(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg text-sm transition ml-auto"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Donation Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl flex-shrink-0">
                <FaHeart />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Total Funds Contributed
                </p>
                <h3 className="text-2xl font-extrabold text-emerald-600">
                  ₹{Number(donatedAmount).toLocaleString("en-IN")}
                </h3>
                <p className="text-xs text-gray-500">{donationCount} donation(s) on record</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl flex-shrink-0">
                <FaTint />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Registered Blood Group
                </p>
                <h3 className="text-2xl font-extrabold text-red-600">{user?.blood || "N/A"}</h3>
                <p className="text-xs text-gray-500">
                  {user?.isAvailableForDonation
                    ? "Active & ready to respond to alerts"
                    : "Currently resting"}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile Information</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleEditProfileSubmit}>
              <Modal.Body className="space-y-3">
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mobile Phone (10 digits)</Form.Label>
                  <Form.Control
                    type="tel"
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Blood Group</Form.Label>
                      <Form.Select
                        value={editForm.blood}
                        onChange={(e) => setEditForm({ ...editForm, blood: e.target.value })}
                      >
                        <option value="A+ve">A+</option>
                        <option value="A-ve">A-</option>
                        <option value="B+ve">B+</option>
                        <option value="B-ve">B-</option>
                        <option value="O+ve">O+</option>
                        <option value="O-ve">O-</option>
                        <option value="AB+ve">AB+</option>
                        <option value="AB-ve">AB-</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        value={editForm.gender}
                        onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        value={editForm.country}
                        onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="number"
                        value={editForm.pincode}
                        onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Check
                  type="switch"
                  id="modal-availability-switch"
                  label="Available for emergency blood donation requests"
                  checked={editForm.isAvailableForDonation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, isAvailableForDonation: e.target.checked })
                  }
                  className="mt-3"
                />
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Change Password Modal */}
          <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleChangePasswordSubmit}>
              <Modal.Body className="space-y-3">
                <Form.Group>
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Min 6 chars, letters, numbers & special character"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    isInvalid={!!passwordErrors.newPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordErrors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    isInvalid={!!passwordErrors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordErrors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm"
                >
                  Update Password
                </button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      )}
    </PageTransition>
  );
}
