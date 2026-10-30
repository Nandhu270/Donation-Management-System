import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { scrollToTop } from "./ScrollTop";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    Swal.fire({
      title: "Subscribed Successfully",
      text: "You have joined the LifeLink donor newsletter. Periodic updates on blood camps and verified patient cases will be sent to your email.",
      icon: "success",
      confirmButtonColor: "#dc2626",
    });
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Emergency Strip */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <FaPhoneAlt className="text-red-500 text-xs shrink-0" />
            <span>24/7 Hospital & Emergency Blood Coordination Hotline:</span>
            <a
              href="tel:+91985452964"
              className="font-bold text-white hover:text-red-400 transition-colors"
            >
              +91 985-452-964
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Chennai • Bengaluru • Mumbai • New Delhi • Hyderabad</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About LifeLink */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-2.5 text-white focus:outline-none"
            >
              <img
                src={logo}
                alt="LifeLink"
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                LifeLink
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              A registered voluntary blood matching and emergency healthcare relief organization. We connect patients with voluntary donors in their neighborhood with zero intermediary fees.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                <FaShieldAlt className="text-xs text-emerald-400" />
                <span>80G Tax Exempted</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FaArrowRight className="text-[9px] text-slate-600" /> Home Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FaArrowRight className="text-[9px] text-slate-600" /> About Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to="/searchdonor"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FaArrowRight className="text-[9px] text-slate-600" /> Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/blood"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FaArrowRight className="text-[9px] text-slate-600" /> Blood Compatibility Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/process"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FaArrowRight className="text-[9px] text-slate-600" /> Donation Process
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FaArrowRight className="text-[9px] text-slate-600" /> Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Office Details
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-slate-500 mt-0.5 shrink-0" />
                <span>LifeLink HQ, 15C Chennai Mall Road, Anna Salai, Chennai, TN - 600002</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-slate-500 shrink-0" />
                <a
                  href="mailto:admin@donatefeedback.in"
                  className="hover:text-white transition-colors"
                >
                  admin@donatefeedback.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-slate-500 shrink-0" />
                <span>+91 985-452-964 (Direct Desk)</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/share/17y5ajEhdR/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <FaFacebookF className="text-xs" />
                </a>
                <a
                  href="https://x.com/nandhaNK27"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <FaTwitter className="text-xs" />
                </a>
                <a
                  href="https://www.instagram.com/itz__nandhu__nk__/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <FaInstagram className="text-xs" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nandhakumar-p-v/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <FaLinkedinIn className="text-xs" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Donor Updates
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive quarterly community impact reports and urgent blood camp alerts in your city.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} LifeLink Foundation. Non-Profit Organization registered under Section 80G. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" onClick={scrollToTop} className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link to="/about" onClick={scrollToTop} className="hover:text-slate-400">
              Terms of Use
            </Link>
            <Link to="/contactus" onClick={scrollToTop} className="hover:text-slate-400">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
