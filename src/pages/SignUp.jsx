import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import TailwindAlert from "../components/common/TailwindAlert";
import PageTransition from "../components/common/PageTransition";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTint,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeartbeat,
  FaHandsHelping,
  FaSignInAlt,
} from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null); // { field, message }

  const [details, setdetails] = useState({
    name: "",
    mail: "",
    blood: "",
    password: "",
    mobile: "",
    birth: "",
    gender: "",
    address: "",
    country: "India",
    pincode: "",
    role: "donor", // Default to donor
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const res = {};

    if (!details.name.trim()) {
      res.name = "Enter your full name";
    }

    if (!details.blood) {
      res.blood = "Select your blood group";
    }

    if (!details.mail) {
      res.mail = "Enter a valid email address";
    } else {
      const verifyemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!verifyemail.test(details.mail.trim())) {
        res.mail = "Please enter a valid email address (e.g. user@example.com)";
      }
    }

    if (!details.password) {
      res.password = "Password is required";
    } else {
      const verifypass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
      if (!verifypass.test(details.password)) {
        res.password =
          "Min 6 characters with letters, numbers, and a special character.";
      }
    }

    if (!details.mobile) {
      res.mobile = "Enter 10-digit mobile number";
    } else {
      const verifynum = /^[0-9]{10}$/;
      if (!verifynum.test(String(details.mobile).trim())) {
        res.mobile = "Mobile number must be exactly 10 digits";
      }
    }

    if (!details.birth) {
      res.birth = "Enter your date of birth";
    }

    if (!details.gender) {
      res.gender = "Select your gender";
    }

    if (!details.address.trim()) {
      res.address = "Enter your street address";
    }

    if (!details.country) {
      res.country = "Select your country";
    }

    if (!details.pincode) {
      res.pincode = "Enter your postal pincode";
    } else {
      const verifypin = /^[0-9]{3,10}$/;
      if (!verifypin.test(String(details.pincode).trim())) {
        res.pincode = "Enter a valid postal code";
      }
    }

    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const res = validateForm();
    if (Object.keys(res).length > 0) {
      setErrors(res);
      toast.warning("Please fill in all required fields properly.", "Incomplete Form");
      return;
    }

    try {
      setSubmitting(true);
      await register({
        name: details.name.trim(),
        blood: details.blood,
        mail: details.mail.trim().toLowerCase(),
        password: details.password,
        mobile: Number(details.mobile),
        birth: details.birth,
        gender: details.gender,
        address: details.address.trim(),
        country: details.country,
        pincode: Number(details.pincode),
        role: details.role,
      });

      toast.success("Account created successfully! Welcome to the platform.", "Registration Complete");

      Swal.fire({
        title: "Registration Successful!",
        text: `Welcome ${details.name}! Your account is now active.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;
      const errorField = data?.field; // 'mobile', 'mail', etc.
      const errorMsg = data?.message || err.message || "Registration failed. Please check your details.";

      // Record exact server error for inline Tailwind alert banner
      setServerError({
        field: errorField,
        message: errorMsg,
      });

      // Specific Phone Number Conflict (Duplicate Mobile)
      if (status === 409 && errorField === "mobile") {
        setErrors((prev) => ({
          ...prev,
          mobile: "This phone number is already registered to another account.",
        }));

        toast.error(
          `Phone number ${details.mobile} is already in use. Please enter a different number.`,
          "Phone Number Already Registered"
        );

        Swal.fire({
          title: "Phone Number Already In Use",
          text: `The mobile number ${details.mobile} is already registered to another user account. Please check your number or log in if this is your account.`,
          icon: "warning",
          confirmButtonColor: "#dc2626",
          confirmButtonText: "I'll use another number",
        });
      }
      // Specific Email Conflict (Duplicate Mail)
      else if (status === 409 && (errorField === "mail" || !errorField)) {
        setErrors((prev) => ({
          ...prev,
          mail: "This email is already associated with an account.",
        }));

        toast.warning(
          `Email ${details.mail} already exists. Please log in instead.`,
          "Email Already Registered"
        );

        Swal.fire({
          title: "Email Already Registered",
          text: `An account already exists for ${details.mail}. Would you like to log in instead?`,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#dc2626",
          cancelButtonColor: "#64748b",
          confirmButtonText: "Go to Login",
          cancelButtonText: "Change Email",
        }).then((result) => {
          if (result.isConfirmed) navigate("/login");
        });
      }
      // General Error
      else {
        toast.error(errorMsg, "Registration Error");
        Swal.fire({
          title: "Registration Error",
          text: errorMsg,
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 sm:p-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-3 backdrop-blur-sm">
            <FaHeartbeat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Create an Account
          </h1>
          <p className="mt-2 text-red-100 text-sm sm:text-base max-w-md mx-auto">
            Join thousands of life-savers, blood donors, and generous charitable supporters.
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          {/* Server Error Alert Banner */}
          {serverError && (
            <TailwindAlert
              type="error"
              title={
                serverError.field === "mobile"
                  ? "Phone Number Conflict"
                  : serverError.field === "mail"
                  ? "Email Already In Use"
                  : "Registration Issue"
              }
              message={serverError.message}
              onClose={() => setServerError(null)}
              action={
                serverError.field === "mail" && (
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-semibold hover:bg-red-700 transition"
                  >
                    <FaSignInAlt /> Go to Login
                  </button>
                )
              }
              className="mb-6"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role / Participation Mode Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                I want to join as:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setdetails({ ...details, role: "donor" })}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    details.role === "donor"
                      ? "border-red-500 bg-red-50/50 ring-2 ring-red-500/20 text-red-900"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      details.role === "donor" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FaTint className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Blood Donor & Volunteer</div>
                    <div className="text-xs text-gray-500">Available to help patients in emergency</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setdetails({ ...details, role: "user" })}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    details.role === "user"
                      ? "border-red-500 bg-red-50/50 ring-2 ring-red-500/20 text-red-900"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      details.role === "user" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <FaHandsHelping className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">General Supporter</div>
                    <div className="text-xs text-gray-500">Donate funds & support campaigns</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Full Name & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={details.name}
                    onChange={(e) => setdetails({ ...details, name: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm transition outline-none ${
                      errors.name
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                        : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    }`}
                    disabled={submitting}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                    <FaTint />
                  </span>
                  <select
                    value={details.blood}
                    onChange={(e) => setdetails({ ...details, blood: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm transition outline-none bg-white ${
                      errors.blood
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                        : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    }`}
                    disabled={submitting}
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
                  </select>
                </div>
                {errors.blood && <p className="text-xs text-red-600 mt-1">{errors.blood}</p>}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={details.mail}
                  onChange={(e) => setdetails({ ...details, mail: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm transition outline-none ${
                    errors.mail
                      ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400 text-red-900"
                      : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  }`}
                  disabled={submitting}
                />
              </div>
              {errors.mail && (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.mail}</p>
              )}
            </div>

            {/* Password & Phone Number (With Unique Phone Error Highlight) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={details.password}
                    onChange={(e) => setdetails({ ...details, password: e.target.value })}
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
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                      errors.mobile ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={details.mobile}
                    onChange={(e) => {
                      setdetails({ ...details, mobile: e.target.value });
                      if (errors.mobile) setErrors({ ...errors, mobile: null });
                    }}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm transition outline-none ${
                      errors.mobile
                        ? "border-red-500 bg-red-50/50 text-red-900 ring-2 ring-red-400/50"
                        : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    }`}
                    disabled={submitting}
                  />
                </div>
                {errors.mobile && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1 font-semibold">
                    <span>{errors.mobile}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    value={details.birth}
                    onChange={(e) => setdetails({ ...details, birth: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm transition outline-none ${
                      errors.birth
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                        : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    }`}
                    disabled={submitting}
                  />
                </div>
                {errors.birth && <p className="text-xs text-red-600 mt-1">{errors.birth}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 mt-2.5">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={details.gender === g}
                        onChange={(e) => setdetails({ ...details, gender: e.target.value })}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3 text-gray-400">
                  <FaMapMarkerAlt />
                </span>
                <textarea
                  rows={2}
                  placeholder="Door/street address, locality, city"
                  value={details.address}
                  onChange={(e) => setdetails({ ...details, address: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border text-sm transition outline-none resize-none ${
                    errors.address
                      ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  }`}
                  disabled={submitting}
                />
              </div>
              {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            </div>

            {/* Country & Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={details.country}
                  onChange={(e) => setdetails({ ...details, country: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm transition outline-none bg-white ${
                    errors.country
                      ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  }`}
                  disabled={submitting}
                >
                  <option value="">-- Select Country --</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Others">Others</option>
                </select>
                {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pincode / Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 638001"
                  value={details.pincode}
                  onChange={(e) => setdetails({ ...details, pincode: e.target.value })}
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm transition outline-none ${
                    errors.pincode
                      ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-400"
                      : "border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  }`}
                  disabled={submitting}
                />
                {errors.pincode && <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl shadow-md hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
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
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <span>Register & Join Now</span>
                )}
              </button>
            </div>

            {/* Footer Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-red-600 hover:text-red-700 hover:underline"
              >
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default SignUp;
