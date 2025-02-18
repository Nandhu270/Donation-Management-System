import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import Donate from "../pages/Donate";
import Login from "../pages/Login";
import About from "../pages/About";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SignUp from "../pages/SignUp";
import Blood from "../pages/Blood";
import Process from "../pages/Process";
import ScrollToTop from "./ScrollTop";
import SearchDonor from "../pages/searchdonor";

function HomePage() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog/blood" element={<Blood />} />
        <Route path="/blog/process" element={<Process />} />
        <Route path="/searchdonor" element={<SearchDonor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default HomePage;
