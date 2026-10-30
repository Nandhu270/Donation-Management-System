import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { donationService } from "../services/api";
import {
  FaHeart,
  FaShieldAlt,
  FaCheck,
  FaUniversity,
  FaGlobe,
  FaCopy,
  FaLock,
} from "react-icons/fa";

export default function Donate() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [details, setDetails] = useState({
    currency: "INR",
    amount: "1000",
    paytype: "UPI",
    mail: "",
    name: "",
    blood: "",
    mobile: "",
    birth: "",
    gender: "Male",
    address: "",
    country: "India",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (user) {
      setDetails((prev) => ({
        ...prev,
        mail: user.mail || prev.mail,
        name: user.name || prev.name,
        blood: user.blood || prev.blood,
        mobile: user.mobile ? String(user.mobile) : prev.mobile,
        birth: user.birth ? user.birth.split("T")[0] : prev.birth,
        gender: user.gender || prev.gender,
        address: user.address || prev.address,
        country: user.country || prev.country,
        pincode: user.pincode ? String(user.pincode) : prev.pincode,
      }));
    }
  }, [user]);

  const presetAmounts = ["500", "1000", "2500", "5000", "10000"];

  const paymentModes = [
    { label: "UPI / QR / GPay / PhonePe", value: "UPI" },
    { label: "Credit Card", value: "Credit Card" },
    { label: "Debit Card", value: "Debit Card" },
    { label: "Net Banking", value: "Net Banking" },
    { label: "Digital Wallets", value: "Digital Wallets" },
    { label: "Direct Bank Wire", value: "Bank Transfer" },
  ];

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const validateForm = () => {
    const res = {};
    if (!details.currency) res.currency = "Select currency";
    if (!details.amount) {
      res.amount = "Enter contribution amount";
    } else if (!/^[0-9]+$/.test(details.amount) || Number(details.amount) <= 0) {
      res.amount = "Enter a valid positive number";
    }

    if (!details.paytype) res.paytype = "Select payment type";
    if (!details.mail) {
      res.mail = "Enter email address for receipt";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(details.mail)) res.mail = "Enter a valid email address";
    }

    if (!details.name.trim()) res.name = "Enter your full name";
    if (!details.blood) res.blood = "Select your blood group";
    if (!details.mobile) {
      res.mobile = "Enter 10-digit mobile number";
    } else if (!/^[0-9]{10}$/.test(details.mobile)) {
      res.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!details.birth) res.birth = "Enter date of birth";
    if (!details.gender) res.gender = "Select your gender";
    if (!details.address.trim()) res.address = "Enter your street address";
    if (!details.country.trim()) res.country = "Select or enter country";
    if (!details.pincode) {
      res.pincode = "Enter postal code";
    } else if (!/^[0-9]+$/.test(details.pincode)) {
      res.pincode = "Enter a valid postal code";
    }

    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!isAuthenticated) {
      Swal.fire({
        title: "Sign In Required",
        text: "Please sign in to record your donation under your verified account and generate your official Section 80G tax certificate.",
        icon: "info",
        confirmButtonColor: "#0f172a",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const res = validateForm();
    if (Object.keys(res).length > 0) {
      setErrors(res);
      return;
    }

    const confirmation = await Swal.fire({
      title: "Confirm Contribution",
      html: `You are donating <strong>₹${Number(details.amount).toLocaleString("en-IN")}</strong> toward emergency medical relief and pediatric care.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Confirm and Donate",
    });

    if (!confirmation.isConfirmed) return;

    try {
      setLoading(true);
      await donationService.createDonation({
        currency: details.currency,
        amount: details.amount,
        paytype: details.paytype,
        mail: details.mail,
        name: details.name,
        blood: details.blood,
        mobile: details.mobile,
        birth: details.birth,
        gender: details.gender,
        address: details.address,
        country: details.country,
        pincode: details.pincode,
        userId: user?._id,
      });

      await Swal.fire({
        title: "Contribution Completed",
        text: "Thank you for your life-saving generosity. An official Section 80G tax receipt has been emailed to you.",
        icon: "success",
        confirmButtonColor: "#0f172a",
      });

      navigate("/");
    } catch (err) {
      console.error("Donation submission error:", err);
      Swal.fire({
        title: "Transaction Failed",
        text: err.response?.data?.message || "Error processing donation. Please check your details and try again.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            <FaHeart className="text-red-600 text-[10px]" /> Section 80G Tax-Exempt Contribution
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Make a Life-Saving Financial Donation
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Your contributions directly fund pediatric cardiac surgeries, emergency intensive care, and transitional lodging for patients in critical need.
          </p>
        </div>

        {/* 80G Tax Exemption Notice */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700">
            <FaShieldAlt className="text-emerald-600 text-sm shrink-0" />
            <div>
              <span className="font-bold text-slate-900">50% Tax Deduction under Section 80G</span>
              <p className="text-slate-500">Official digital receipt emailed within 15 minutes of contribution.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
            Govt. Verified
          </span>
        </div>

        {/* Donation Form Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Amount Selection */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Step 1 • Contribution Amount
                </span>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDetails({ ...details, amount: amt })}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      details.amount === amt
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    ₹{Number(amt).toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              {/* Amount Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Currency <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={details.currency}
                    onChange={(e) => setDetails({ ...details, currency: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Amount <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    value={details.amount}
                    onChange={(e) => setDetails({ ...details, amount: e.target.value })}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-bold focus:outline-none focus:border-red-600"
                  />
                  {errors.amount && (
                    <p className="text-xs text-red-600 mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Payment Method <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={details.paytype}
                    onChange={(e) => setDetails({ ...details, paytype: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  >
                    {paymentModes.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Donor Identification for 80G Certificate */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Step 2 • Donor Identification (For Section 80G Certificate)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="e.g. Anand Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Receipt Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={details.mail}
                    onChange={(e) => setDetails({ ...details, mail: e.target.value })}
                    placeholder="e.g. anand@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  {errors.mail && (
                    <p className="text-xs text-red-600 mt-1">{errors.mail}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Blood Group <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={details.blood}
                    onChange={(e) => setDetails({ ...details, blood: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  >
                    <option value="">-- Select --</option>
                    <option value="A+ve">A+</option>
                    <option value="A-ve">A-</option>
                    <option value="B+ve">B+</option>
                    <option value="B-ve">B-</option>
                    <option value="O+ve">O+</option>
                    <option value="O-ve">O-</option>
                    <option value="AB+ve">AB+</option>
                    <option value="AB-ve">AB-</option>
                  </select>
                  {errors.blood && (
                    <p className="text-xs text-red-600 mt-1">{errors.blood}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={details.mobile}
                    onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={details.birth}
                    onChange={(e) => setDetails({ ...details, birth: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  {errors.birth && (
                    <p className="text-xs text-red-600 mt-1">{errors.birth}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Billing Street Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  value={details.address}
                  onChange={(e) => setDetails({ ...details, address: e.target.value })}
                  placeholder="Street address, city, state..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Country <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={details.country}
                    onChange={(e) => setDetails({ ...details, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Postal Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    value={details.pincode}
                    onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
                    placeholder="e.g. 600001"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  {errors.pincode && (
                    <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Processing Contribution...</span>
                ) : (
                  <>
                    <FaLock className="text-xs" />
                    <span>Proceed to Donate ₹{Number(details.amount || 0).toLocaleString("en-IN")}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bank Transfer Details with Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <FaUniversity className="text-slate-600 text-sm" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Domestic NEFT / IMPS Transfer
              </h4>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Account Name:</span>
                <span className="font-semibold text-slate-900">LifeLink Foundation Trust</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-400">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">4012356978</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("4012356978", "acc_in")}
                    className="text-slate-400 hover:text-slate-900"
                    title="Copy Account Number"
                  >
                    {copiedKey === "acc_in" ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-400">IFSC Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">ICH102254</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("ICH102254", "ifsc")}
                    className="text-slate-400 hover:text-slate-900"
                    title="Copy IFSC"
                  >
                    {copiedKey === "ifsc" ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Bank & Branch:</span>
                <span>Deva Bank, Anna Salai, Chennai</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <FaGlobe className="text-slate-600 text-sm" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                International SWIFT Transfer
              </h4>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Account Name:</span>
                <span className="font-semibold text-slate-900">LifeLink International Relief</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-400">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">3021456987</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("3021456987", "acc_intl")}
                    className="text-slate-400 hover:text-slate-900"
                    title="Copy Account Number"
                  >
                    {copiedKey === "acc_intl" ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-400">SWIFT / BIC:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">CCH102254</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("CCH102254", "swift")}
                    className="text-slate-400 hover:text-slate-900"
                    title="Copy SWIFT"
                  >
                    {copiedKey === "swift" ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Bank & City:</span>
                <span>International Bank, New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
