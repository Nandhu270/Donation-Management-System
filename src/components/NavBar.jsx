import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { scrollToTop } from "./ScrollTop";
import {
  FaHeart,
  FaUserCircle,
  FaShieldAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setBlogDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout(true);
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3"
          : "bg-white border-b border-slate-100 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src={logo}
              alt="LifeLink Foundation"
              className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  LifeLink
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 tracking-wider">
                  Non-Profit
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Blood & Healthcare Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              onClick={scrollToTop}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/") && location.pathname === "/"
                  ? "text-red-700 bg-red-50/70 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={scrollToTop}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-red-700 bg-red-50/70 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setBlogDropdownOpen(!blogDropdownOpen)}
                onBlur={() => setTimeout(() => setBlogDropdownOpen(false), 200)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/blog")
                    ? "text-red-700 bg-red-50/70 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>Guides & Articles</span>
                <FaChevronDown
                  className={`text-[9px] text-slate-400 transition-transform ${
                    blogDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {blogDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                  <Link
                    to="/blog"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-red-700"
                  >
                    Articles & Overview
                  </Link>
                  <Link
                    to="/blog/blood"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-red-700"
                  >
                    Blood Compatibility Guide
                  </Link>
                  <Link
                    to="/blog/process"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-red-700"
                  >
                    Step-by-Step Donation Process
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/searchdonor"
              onClick={scrollToTop}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/searchdonor")
                  ? "text-red-700 bg-red-50/70 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <FaSearch className="text-xs text-slate-400" />
              <span>Find Donors</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </Link>

            <Link
              to="/contactus"
              onClick={scrollToTop}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/contactus")
                  ? "text-red-700 bg-red-50/70 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={scrollToTop}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  isActive("/admin")
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <FaShieldAlt className="text-xs" />
                <span>Admin Console</span>
              </Link>
            )}
          </nav>

          {/* Right Action Section */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
                >
                  <FaUserCircle className="text-slate-600 text-lg" />
                  <span className="text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                    {(user?.name || user?.mail || "Account").split(" ")[0]}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      user?.role === "admin"
                        ? "bg-amber-100 text-amber-800"
                        : user?.role === "donor"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {user?.role || "user"}
                  </span>
                  <FaChevronDown
                    className={`text-[9px] text-slate-400 transition-transform ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[11px] text-slate-400 font-medium">Signed in as</p>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || "Registered Member"}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.mail}</p>
                    </div>

                    <Link
                      to="/login"
                      onClick={scrollToTop}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <FaUser className="text-slate-400 text-xs" />
                      <span>Account Settings & Profile</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={scrollToTop}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50"
                      >
                        <FaShieldAlt className="text-amber-500 text-xs" />
                        <span>Administrative Console</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left"
                    >
                      <FaSignOutAlt className="text-xs" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={scrollToTop}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Register Donor
                </Link>
              </div>
            )}

            {/* Donate Action Button */}
            <Link
              to="/donate"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors"
            >
              <FaHeart className="text-[10px]" />
              <span>Donate Funds</span>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/donate"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-600"
            >
              <FaHeart className="text-[10px]" />
              <span>Donate</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-lg px-5 py-6 space-y-4 max-h-[85vh] overflow-y-auto z-40">
          {isAuthenticated && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{user?.name || user?.mail}</h4>
                <p className="text-[11px] text-slate-500">{user?.mail}</p>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                {user?.role || "user"}
              </span>
            </div>
          )}

          <div className="space-y-1 text-sm font-medium">
            <Link
              to="/"
              onClick={() => {
                scrollToTop();
                setMobileMenuOpen(false);
              }}
              className="block p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => {
                scrollToTop();
                setMobileMenuOpen(false);
              }}
              className="block p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              About LifeLink
            </Link>

            <Link
              to="/searchdonor"
              onClick={() => {
                scrollToTop();
                setMobileMenuOpen(false);
              }}
              className="block p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Find Blood Donors
            </Link>

            <Link
              to="/blog"
              onClick={() => {
                scrollToTop();
                setMobileMenuOpen(false);
              }}
              className="block p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Guides & Articles
            </Link>

            <div className="pl-4 space-y-1">
              <Link
                to="/blog/blood"
                onClick={() => {
                  scrollToTop();
                  setMobileMenuOpen(false);
                }}
                className="block p-2 text-xs text-slate-600 hover:text-red-700"
              >
                Compatibility Guide
              </Link>
              <Link
                to="/blog/process"
                onClick={() => {
                  scrollToTop();
                  setMobileMenuOpen(false);
                }}
                className="block p-2 text-xs text-slate-600 hover:text-red-700"
              >
                Donation Process
              </Link>
            </div>

            <Link
              to="/contactus"
              onClick={() => {
                scrollToTop();
                setMobileMenuOpen(false);
              }}
              className="block p-2.5 rounded-lg text-slate-800 hover:bg-slate-50"
            >
              Contact Support
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => {
                  scrollToTop();
                  setMobileMenuOpen(false);
                }}
                className="block p-2.5 rounded-lg text-amber-800 bg-amber-50 font-semibold"
              >
                Admin Console
              </Link>
            )}
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => {
                    scrollToTop();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-center text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => {
                    scrollToTop();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-4 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => {
                    scrollToTop();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-4 rounded-lg text-center text-xs font-semibold text-white bg-red-600 hover:bg-red-700"
                >
                  Register Donor
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
