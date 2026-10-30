import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../components/ScrollTop";
import {
  FaShieldAlt,
  FaCheck,
  FaArrowRight,
  FaUsers,
  FaHospital,
} from "react-icons/fa";

export default function About() {
  const principles = [
    {
      title: "Radical Transparency",
      description: "Every monetary donation is directed to verified medical trusts and hospital relief funds. Complete financial ledgers and audited reports are maintained with zero diversion.",
    },
    {
      title: "Zero Intermediary Delays",
      description: "When an emergency patient needs blood, minutes determine survival. Our registry connects patient families directly to local voluntary donors without call center delays.",
    },
    {
      title: "Patient-First Healthcare Equity",
      description: "We believe no child or family should be denied critical cardiac surgery or trauma care due to economic hardship. We partner directly with hospital relief desks.",
    },
    {
      title: "Community Resilience",
      description: "Building an engaged, verified voluntary donor network in every city to safeguard community blood supplies ahead of unforeseen crises.",
    },
  ];

  const leadership = [
    {
      name: "John Doe",
      role: "Founder & Lead Technology Architect",
      background: "Computer Scientist & Digital Healthcare Systems Specialist",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "David Mary",
      role: "Chief Medical & Transfusion Advisor",
      background: "MD Transfusion Medicine • 18+ Years Hospital Leadership",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Maddy John",
      role: "Legal Governance & Section 80G Officer",
      background: "Non-Profit Regulatory & Ethical Compliance Counsel",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            About LifeLink Foundation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bridging The Critical Gap Between Need And Care
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            LifeLink was established on a single principle: no human life should be compromised because blood was unavailable or because emergency medical care was unaffordable.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900">
              From Acute Hospital Shortages to a Direct Lifesaver Network
            </h2>
            <p>
              In tertiary trauma hospitals across Indian cities, family members routinely spend frantic hours calling acquaintances, blood banks, and social media groups trying to locate rare blood units for surgery or intensive care transfusions.
            </p>
            <p>
              LifeLink was built by healthcare technologists and physicians to eliminate these administrative barriers. Our platform maintains an active, verified directory of voluntary donors who can be reached directly via phone, reducing average contact time from several hours down to under 15 minutes.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-800">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                100% Free Public Registry
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                Section 80G Certified Non-Profit
              </span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
                alt="Hospital Medical Care"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Foundational Principles */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Governance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Foundational Operational Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((pr, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2"
              >
                <h3 className="text-sm font-bold text-slate-900">{pr.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pr.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documentary Video Showcase */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white text-center space-y-4">
          <div className="max-w-xl mx-auto space-y-1">
            <h3 className="text-lg font-bold">Documentary: The Value of Rapid Blood Matching</h3>
            <p className="text-xs text-slate-400">
              Witness how direct donor coordination supports frontline emergency surgeons.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden aspect-video max-w-3xl mx-auto border border-slate-800 bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/lhucarMcm_U?si=v_iUShTEhQXgNQVE"
              title="LifeLink Overview Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Leadership & Advisory Council */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Leadership
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Advisory Board & Council
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs text-center space-y-3"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border border-slate-200 shadow-2xs">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{leader.name}</h4>
                  <p className="text-xs font-semibold text-red-700 mt-0.5">{leader.role}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{leader.background}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Join the community of voluntary lifesavers.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Whether you register as an on-call voluntary blood donor or contribute toward surgical aid, your support directly impacts a patient in acute need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              to="/signup"
              onClick={scrollToTop}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs"
            >
              Register as Donor
            </Link>
            <Link
              to="/donate"
              onClick={scrollToTop}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors"
            >
              Make Financial Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
