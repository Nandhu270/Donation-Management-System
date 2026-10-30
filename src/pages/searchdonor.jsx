import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { donorService } from "../services/api";
import { scrollToTop } from "../components/ScrollTop";
import {
  FaSearch,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheck,
  FaArrowLeft,
  FaCopy,
  FaInfoCircle,
} from "react-icons/fa";

export default function SearchDonor() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [search, setSearch] = useState({
    blood: "",
    country: "India",
    pincode: "",
    msg: "",
  });

  const [availableOnly, setAvailableOnly] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [foundDonor, setFoundDonor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const bloodGroups = [
    { label: "A+", value: "A+ve" },
    { label: "A-", value: "A-ve" },
    { label: "B+", value: "B+ve" },
    { label: "B-", value: "B-ve" },
    { label: "O+", value: "O+ve" },
    { label: "O-", value: "O-ve" },
    { label: "AB+", value: "AB+ve" },
    { label: "AB-", value: "AB-ve" },
  ];

  const validateForm = () => {
    const result = {};
    if (!search.blood) {
      result.blood = "Please select the required blood group";
    }
    if (!search.country) {
      result.country = "Please enter country name";
    }
    if (!search.pincode) {
      result.pincode = "Enter your postal pincode";
    } else {
      const verifypin = /^[0-9]+$/;
      if (!verifypin.test(search.pincode)) {
        result.pincode = "Enter a valid numeric pincode";
      }
    }
    return result;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!isAuthenticated) {
      Swal.fire({
        title: "Sign In Required",
        text: "Please sign in to your LifeLink account to connect directly with registered voluntary donors.",
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

    try {
      setLoading(true);
      const data = await donorService.searchDonors({
        blood: search.blood,
        country: search.country,
        pincode: search.pincode,
        availableOnly: availableOnly ? "true" : "false",
      });

      setUserFound(true);
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
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPhoneNumber = (phone, id) => {
    navigator.clipboard.writeText(String(phone));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {!userFound ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                <FaSearch className="text-slate-500 text-[10px]" /> Verified Donor Directory
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Find a Voluntary Blood Donor
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Locate voluntary donors in your locality and contact them directly for acute hospital transfusions.
              </p>
            </div>

            {/* Helpline Notice */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <FaPhoneAlt className="text-red-600 text-xs shrink-0" />
                <span>
                  Immediate hospital emergency? Call our 24/7 hotline: <strong>+91 985-452-964</strong>
                </span>
              </div>
              <a
                href="tel:+91985452964"
                className="shrink-0 font-semibold text-red-700 hover:text-red-800"
              >
                Call Hotline
              </a>
            </div>

            {/* Search Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <form onSubmit={handleSearch} className="space-y-5">
                {/* Blood Group Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Blood Group Required <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {bloodGroups.map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => setSearch({ ...search, blood: b.value })}
                        className={`py-2.5 rounded-lg font-bold text-xs border transition-colors ${
                          search.blood === b.value
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                  {errors.blood && (
                    <p className="text-xs text-red-600 mt-1">{errors.blood}</p>
                  )}
                </div>

                {/* Country & Pincode Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Country <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={search.country}
                      onChange={(e) => setSearch({ ...search, country: e.target.value })}
                      placeholder="e.g. India"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                    />
                    {errors.country && (
                      <p className="text-xs text-red-600 mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Postal Pincode <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                      <input
                        type="text"
                        value={search.pincode}
                        onChange={(e) => setSearch({ ...search, pincode: e.target.value })}
                        placeholder="e.g. 600001"
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                      />
                    </div>
                    {errors.pincode && (
                      <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>

                {/* Patient / Hospital Details */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hospital / Patient Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={search.msg}
                    onChange={(e) => setSearch({ ...search, msg: e.target.value })}
                    placeholder="e.g. City General Hospital, ICU Ward 2, Patient: R. Sundaram (Immediate Transfusion Needed)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Querying Donor Database...</span>
                    </>
                  ) : (
                    <>
                      <FaSearch className="text-xs" />
                      <span>Search Registered Donors</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Search Results View */
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Active Query
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  Blood Group: <strong className="text-red-700">{search.blood}</strong> • Pincode: <strong>{search.pincode}</strong>
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setUserFound(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <FaArrowLeft className="text-[10px]" />
                <span>Modify Query</span>
              </button>
            </div>

            {foundDonor && foundDonor.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium px-1">
                  Showing <strong>{foundDonor.length}</strong> verified voluntary donor(s) in this locality:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {foundDonor.map((donor) => {
                    const isAvailable = donor.isAvailableForDonation !== false;
                    const donorId = donor._id || donor.mobile;

                    return (
                      <div
                        key={donorId}
                        className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                {donor.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <FaMapMarkerAlt className="text-slate-400 text-[10px]" />
                                <span>{donor.country} • Pincode {donor.pincode}</span>
                              </p>
                            </div>

                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {donor.blood || search.blood}
                            </span>
                          </div>

                          <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-600 space-y-1 mb-4 border border-slate-100">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Gender:</span>
                              <span className="font-medium text-slate-800">{donor.gender || "Unspecified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Status:</span>
                              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                                <FaCheck className="text-[9px]" /> {isAvailable ? "Available to Donate" : "Resting Interval"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Direct Call Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <a
                            href={`tel:${donor.mobile}`}
                            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2"
                          >
                            <FaPhoneAlt className="text-[10px]" />
                            <span>Call {donor.mobile}</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => copyPhoneNumber(donor.mobile, donorId)}
                            title="Copy number"
                            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            {copiedId === donorId ? (
                              <FaCheck className="text-emerald-600 text-xs" />
                            ) : (
                              <FaCopy className="text-slate-500 text-xs" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Polite Empty State */
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/90 shadow-xs max-w-md mx-auto space-y-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-sm mx-auto">
                  <FaInfoCircle />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    No Direct Matches in Pincode {search.pincode}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    There are currently no active voluntary donors with blood group <strong>{search.blood}</strong> registered under postal code <strong>{search.pincode}</strong>.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setUserFound(false)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                  >
                    Try an Adjacent Pincode
                  </button>

                  <Link
                    to="/signup"
                    onClick={scrollToTop}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors block text-center"
                  >
                    Register as a Donor in this Locality
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
