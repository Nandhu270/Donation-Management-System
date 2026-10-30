import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { contactService, contentService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
} from "react-icons/fa";

export default function ContactUs() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mail: user?.mail || "",
    subject: "",
    msg: "",
  });

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    "General Inquiry",
    "Acute Blood Coordination",
    "Hospital / NGO Partnership",
    "Volunteer Blood Camps",
    "80G Tax Exemption Certificate",
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await contentService.getFaqs();
        if (res.success) {
          setFaqs(res.faqs);
        }
      } catch (err) {
        console.error("Error loading FAQs:", err);
      }
    };

    fetchFaqs();
  }, []);

  const validateForm = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Please enter your full name";
    if (!formData.mail.trim()) {
      err.mail = "Please enter your email address";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.mail)) err.mail = "Enter a valid email address";
    }
    if (!formData.subject.trim()) err.subject = "Please specify the subject or category";
    if (!formData.msg.trim()) err.msg = "Please write a brief description of your request";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const err = validateForm();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    try {
      setLoading(true);
      await contactService.submitInquiry(formData);

      await Swal.fire({
        title: "Inquiry Received",
        text: "Thank you for reaching out. A LifeLink support coordinator will review your message and reply promptly.",
        icon: "success",
        confirmButtonColor: "#0f172a",
      });

      setFormData({
        name: user?.name || "",
        mail: user?.mail || "",
        subject: "",
        msg: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting contact inquiry:", error);
      Swal.fire({
        title: "Transmission Error",
        text: error.response?.data?.message || "Could not transmit your message. Please check connection and try again.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            Contact & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Our Coordination Desk
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Whether you require assistance with emergency blood matching, hospital partnership, or 80G tax receipt inquiries, our team is available to assist.
          </p>
        </div>

        {/* 2-Column Contact Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-5">
            {/* Emergency Hotline Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Emergency Coordination Desk
              </span>
              <h3 className="text-xl font-bold">24/7 Acute Blood Hotline</h3>
              <a
                href="tel:+91985452964"
                className="text-2xl font-extrabold text-white block hover:text-red-300 transition-colors"
              >
                +91 985-452-964
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                Staffed around the clock for hospital medical officers, intensive care units, and emergency patient families.
              </p>
            </div>

            {/* General Office Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Headquarters
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <FaMapMarkerAlt className="text-slate-400 mt-0.5 shrink-0" />
                  <span>15C, Chennai Mall Road, Anna Salai, Chennai, Tamil Nadu - 600002</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaEnvelope className="text-slate-400 shrink-0" />
                  <a href="mailto:admin@donatefeedback.in" className="hover:text-slate-900">
                    admin@donatefeedback.in
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <FaClock className="text-slate-400 mt-0.5 shrink-0" />
                  <span>Office: Mon to Sat, 9:00 AM – 6:00 PM (Emergency Desk operates 24/7)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href="https://www.facebook.com/share/17y5ajEhdR/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <FaFacebookF className="text-xs" />
                </a>
                <a
                  href="https://x.com/nandhaNK27"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <FaTwitter className="text-xs" />
                </a>
                <a
                  href="https://www.instagram.com/itz__nandhu__nk__/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <FaInstagram className="text-xs" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nandhakumar-p-v/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <FaLinkedinIn className="text-xs" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-xs text-slate-500 mb-5">
                Our support desk reviews messages and typically replies within 2 to 4 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.mail}
                      onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                    />
                    {errors.mail && (
                      <p className="text-xs text-red-600 mt-1">{errors.mail}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Category / Subject <span className="text-red-600">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: cat })}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          formData.subject === cat
                            ? "bg-slate-900 text-white font-semibold"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter or select category..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.msg}
                    onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                    placeholder="Provide details about your query or hospital requirements..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-600 focus:bg-white text-slate-900"
                  />
                  {errors.msg && (
                    <p className="text-xs text-red-600 mt-1">{errors.msg}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs disabled:opacity-60"
                >
                  {loading ? "Transmitting Message..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Dynamic FAQ Accordion from API */}
        {faqs.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs max-w-4xl mx-auto">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Frequently Asked Inquiries
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={faq._id || i}
                  className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 py-3 text-left font-semibold text-xs text-slate-900 flex items-center justify-between hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`text-[9px] text-slate-400 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-3 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
