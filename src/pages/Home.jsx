import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToTop } from "../components/ScrollTop";
import { contentService } from "../services/api";
import {
  FaSearch,
  FaHeart,
  FaShieldAlt,
  FaCheck,
  FaArrowRight,
  FaHospital,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaQuoteLeft,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [quickBlood, setQuickBlood] = useState("O+");
  const [quickPincode, setQuickPincode] = useState("");

  // Live state from backend APIs
  const [urgentHospitalRequests, setUrgentHospitalRequests] = useState([]);
  const [featuredCauses, setFeaturedCauses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [publicStats, setPublicStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [reqRes, campRes, statRes, testRes] = await Promise.all([
          contentService.getEmergencyRequests(),
          contentService.getCampaigns(),
          contentService.getPublicStats(),
          contentService.getTestimonials(),
        ]);

        if (reqRes.success) setUrgentHospitalRequests(reqRes.requests);
        if (campRes.success) setFeaturedCauses(campRes.campaigns);
        if (statRes.success) setPublicStats(statRes.stats);
        if (testRes.success) setTestimonials(testRes.testimonials);
      } catch (err) {
        console.error("Error loading dynamic home content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigate("/searchdonor");
    scrollToTop();
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200/80 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Voluntary Blood Matching & Emergency Care</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                A community network for voluntary blood donation and healthcare relief.
              </h1>

              <p className="text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                LifeLink connects emergency patients directly with verified voluntary blood donors in their neighborhood. Transparent, non-profit, and built to save lives without broker delays.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/searchdonor"
                  onClick={scrollToTop}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs"
                >
                  <FaSearch className="text-xs" />
                  <span>Search Donors Near You</span>
                </Link>

                <Link
                  to="/donate"
                  onClick={scrollToTop}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors"
                >
                  <FaHeart className="text-xs text-red-600" />
                  <span>Make a Financial Contribution</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-600 text-xs" />
                  <span>Section 80G Tax Exempt</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-600 text-xs" />
                  <span>Verified Contact Numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-emerald-600 text-xs" />
                  <span>Zero Intermediary Fees</span>
                </div>
              </div>
            </div>

            {/* Right Search Tool Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <div className="border-b border-slate-200 pb-4 mb-5">
                  <h3 className="text-base font-bold text-slate-900">
                    Find Available Donors
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select blood group and postal code to connect immediately
                  </p>
                </div>

                <form onSubmit={handleQuickSearch} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Blood Group Required
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((grp) => (
                        <button
                          key={grp}
                          type="button"
                          onClick={() => setQuickBlood(grp)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                            quickBlood === grp
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {grp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Postal Pincode / City
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                      <input
                        type="text"
                        value={quickPincode}
                        onChange={(e) => setQuickPincode(e.target.value)}
                        placeholder="e.g. 600001 or Chennai"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <FaSearch className="text-xs" />
                    <span>Search Verified Registry</span>
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-500">
                  <FaClock className="text-slate-400 text-xs shrink-0" />
                  <span>Immediate access: Phone numbers are visible to signed-in users.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Hospital Needs Notice (Dynamic from API) */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Live Hospital Requests
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Patients Currently Awaiting Matched Donors
              </h2>
            </div>
            <Link
              to="/searchdonor"
              onClick={scrollToTop}
              className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-1.5"
            >
              <span>View All Registered Donors</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {loading ? (
            <div className="py-10 text-center text-xs text-slate-400">Loading active emergency hospital cases...</div>
          ) : urgentHospitalRequests.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
              No critical hospital requests currently pending. All recent requests have been fulfilled.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {urgentHospitalRequests.map((req) => (
                <div
                  key={req._id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded font-bold text-xs bg-red-50 text-red-700 border border-red-200">
                        Blood: {req.blood}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {req.urgency}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {req.hospital}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{req.location}</p>
                    <p className="text-xs text-slate-700 font-medium mt-2">{req.patient}</p>
                  </div>

                  <Link
                    to="/searchdonor"
                    onClick={scrollToTop}
                    className="w-full py-1.5 px-3 rounded text-center text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    Find Matching Donors
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Three Core Initiatives */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Core Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How LifeLink Serves Communities in Crisis
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Three pillars designed to address critical healthcare gaps from acute blood shortages to surgical financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center text-base mb-4">
                  <FaHeart />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Emergency Blood Registry
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  A transparent directory connecting patient families directly with voluntary donors based on blood compatibility and locality pincode. No broker fees, no automated waiting queues.
                </p>
              </div>
              <Link
                to="/searchdonor"
                onClick={scrollToTop}
                className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-1.5"
              >
                <span>Search Local Donors</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-base mb-4">
                  <FaHospital />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Pediatric Surgery Sponsorship
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Direct financial grants sent to partner hospital trusts to cover congenital heart procedures, pediatric oncology therapies, and intensive care stays for underprivileged children.
                </p>
              </div>
              <Link
                to="/donate"
                onClick={scrollToTop}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1.5"
              >
                <span>Sponsor a Patient</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-base mb-4">
                  <FaShieldAlt />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Transitional Support & Lodging
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Assisting patients and family members traveling to metropolitan medical centers with emergency lodging stipends, nutritional support, and care navigation.
                </p>
              </div>
              <Link
                to="/about"
                onClick={scrollToTop}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <span>Learn About Our Care Model</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Live Impact Metrics (Dynamic from API) */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {publicStats?.transfusionsFacilitated?.toLocaleString("en-IN") || "15,400+"}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Transfusions Facilitated</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {publicStats?.totalDonors ? `${publicStats.totalDonors}+` : "3,850+"}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Registered Voluntary Donors</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {publicStats?.totalFundsCollected
                  ? `₹${Number(publicStats.totalFundsCollected).toLocaleString("en-IN")}`
                  : "₹48.5 Lakhs"}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Medical Aid Disbursed</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {publicStats?.averageResponseTime || "< 15 Mins"}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Average Response Window</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Patient Campaigns (Dynamic from API) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Direct Relief Campaigns
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Active Medical Aid Programs
              </h2>
            </div>
            <Link
              to="/donate"
              onClick={scrollToTop}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
            >
              <span>Contribute to Aid</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {loading ? (
            <div className="py-10 text-center text-xs text-slate-400">Loading active campaigns...</div>
          ) : featuredCauses.length === 0 ? (
            <div className="p-6 bg-white rounded-xl text-center text-xs text-slate-500">
              No active campaigns listed currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCauses.map((cause) => {
                const percentage = Math.min(100, Math.round((cause.raised / cause.goal) * 100));

                return (
                  <div
                    key={cause._id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative bg-slate-100">
                        <img
                          src={cause.image}
                          alt={cause.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-semibold bg-white/95 text-slate-800 shadow-xs">
                          {cause.focus}
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="text-sm font-bold text-slate-900 mb-2">
                          {cause.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {cause.desc}
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-900 font-bold">
                              ₹{Number(cause.raised).toLocaleString("en-IN")} raised
                            </span>
                            <span className="text-slate-500">
                              Goal: ₹{Number(cause.goal).toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-red-600 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                            <span>{percentage}% of target</span>
                            <span>{cause.beneficiaries}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link
                        to="/donate"
                        onClick={scrollToTop}
                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center block text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                      >
                        Contribute to this Program
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How the Process Works */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Transparent & Direct
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How Voluntary Blood Matching Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A 3-step workflow designed to connect patients with donors without delay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Step 1
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Select Blood Type & Pincode
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter the recipient's required blood group and hospital locality. Our registry queries verified donors living within direct driving distance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Step 2
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Direct Telephone Contact
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly via verified phone call. You can communicate hospital location, patient requirements, and timing without any intermediary holding queue.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Step 3
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Hospital Transfusion & Verification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The donor arrives at the hospital blood bank. Standard screening and collection take place safely under certified medical supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentary & Live Testimonials (Dynamic from API) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Documentary & Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Real Impact In Patient Emergencies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Watch how our network coordinates with physicians and voluntary donors to support critical trauma cases.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black aspect-video shadow-sm">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0CbFrom3Qkk?si=ev6Ra3sor2SH7Nff"
              title="LifeLink Documentary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Testimonials List */}
          {testimonials.length > 0 && (
            <div className="mt-8 space-y-4">
              {testimonials.map((t) => (
                <div
                  key={t._id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <FaQuoteLeft className="text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                    <span className="text-[11px] font-bold text-slate-900 mt-1 block">
                      {t.author} • {t.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Register as a voluntary blood donor in your city.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            One 45-minute voluntary donation can support up to three patients undergoing emergency surgery, cancer chemotherapy, or traumatic recovery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              onClick={scrollToTop}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors"
            >
              Sign Up as Voluntary Donor
            </Link>
            <Link
              to="/donate"
              onClick={scrollToTop}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              Contribute to Patient Aid
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
