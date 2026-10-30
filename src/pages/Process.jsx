import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../components/ScrollTop";
import {
  FaCheck,
  FaClock,
  FaArrowRight,
  FaFileAlt,
  FaHeart,
} from "react-icons/fa";

export default function Process() {
  const steps = [
    {
      step: "Step 01",
      title: "Preparation (The Night Before & Morning Of)",
      timeframe: "Prior to arrival",
      description: "Hydrate adequately by drinking 500ml of water or fresh juice. Consume a balanced, iron-rich meal (e.g., lentils, beans, spinach, oats). Avoid alcohol consumption for 24 hours prior to donation.",
      checklist: [
        "Drink at least 500ml of water before leaving",
        "Eat a light, nutritious breakfast or lunch",
        "Carry a government photo ID (Aadhaar, Driving License, Voter ID)",
      ],
    },
    {
      step: "Step 02",
      title: "Confidential Screening & Health Evaluation",
      timeframe: "10 to 15 minutes",
      description: "A qualified medical officer conducts a brief confidential health review. Resting blood pressure, pulse rate, body temperature, and hemoglobin level are checked through a painless finger-prick test.",
      checklist: [
        "Confidential questionnaire review",
        "Blood pressure, pulse, and temperature check",
        "Hemoglobin verification (must be ≥ 12.5 g/dL)",
      ],
    },
    {
      step: "Step 03",
      title: "The Donation Procedure",
      timeframe: "8 to 10 minutes",
      description: "You relax comfortably in an ergonomic donor recliner. A trained phlebotomist prepares your arm with an antiseptic wipe and uses a single-use sterile kit to collect approximately 350ml or 450ml of whole blood.",
      checklist: [
        "Strictly sterile, single-use needle and tubing kit",
        "Continuous oversight by on-duty nursing staff",
        "Collection takes less than 10 minutes",
      ],
    },
    {
      step: "Step 04",
      title: "Recovery & Refreshments",
      timeframe: "10 to 15 minutes",
      description: "Rest in the recovery lounge while enjoying complimentary juice and light snacks. Resting allows blood pressure to stabilize and plasma volume replenishment begins immediately.",
      checklist: [
        "Rest quietly for 10-15 minutes",
        "Complimentary juice, biscuits, and water provided",
        "Digital donor verification certificate issued",
      ],
    },
  ];

  const donationTypes = [
    {
      title: "Whole Blood Donation",
      volume: "350 ml or 450 ml",
      interval: "Every 90 days",
      application: "Trauma surgery, accident cases, acute maternal hemorrhages, and chronic severe anemia.",
    },
    {
      title: "Platelet Apheresis",
      volume: "Single therapeutic unit",
      interval: "Every 14 days",
      application: "Leukemia and cancer patients undergoing chemotherapy, organ transplants, and clotting disorders.",
    },
    {
      title: "Plasma Donation",
      volume: "Approx. 500 ml",
      interval: "Every 28 days",
      application: "Critical burn patients, traumatic shock resuscitation, and immune deficiency immunoglobulin therapies.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            <FaClock className="text-slate-500 text-[10px]" /> Walkthrough & Timeline
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Voluntary Blood Donation Process
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            From arrival to sipping your post-donation juice, the entire hospital visit takes approximately 45 minutes. The blood collection itself takes just 8 to 10 minutes.
          </p>
        </div>

        {/* 4-Step Sequential Roadmap */}
        <div className="space-y-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-6"
            >
              <div className="shrink-0 flex md:flex-col items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-slate-900 text-white uppercase tracking-wider">
                  {st.step}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                  {st.timeframe}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.description}
                </p>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {st.checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <FaCheck className="text-emerald-600 text-[10px] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Types of Donations Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="max-w-2xl mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Types of Blood Product Donations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accredited hospital centers separate donations into life-saving therapeutic components:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donationTypes.map((type, i) => (
              <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{type.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
                    <span className="font-semibold text-slate-700">{type.volume}</span>
                    <span>•</span>
                    <span>{type.interval}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Primary Clinical Use:</strong> {type.application}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post-Donation Recovery Care */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold">
              Post-Donation Care & Recovery Advice
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ensure smooth physical recovery by following these simple recommendations over the next 24 hours:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <h5 className="font-bold text-white mb-1">Increase Fluid Intake</h5>
              <p className="text-slate-400">Drink an additional 4 to 6 glasses of water to assist rapid plasma volume restoration.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <h5 className="font-bold text-white mb-1">Avoid Heavy Straining</h5>
              <p className="text-slate-400">Avoid vigorous exercise or lifting heavy weights with the donation arm for the rest of the day.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <h5 className="font-bold text-white mb-1">Eat Wholesome Meals</h5>
              <p className="text-slate-400">Enjoy iron-rich foods such as beans, whole grains, lentils, and citrus fruits.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <h5 className="font-bold text-white mb-1">Keep Dressing Dry</h5>
              <p className="text-slate-400">Keep the sterile adhesive bandage on your arm for at least 4 hours to maintain cleanliness.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Ready to schedule a voluntary donation?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Join thousands of active donors who dedicate 45 minutes of their year to save patient lives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              to="/signup"
              onClick={scrollToTop}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs"
            >
              Sign Up as Voluntary Donor
            </Link>
            <Link
              to="/searchdonor"
              onClick={scrollToTop}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors"
            >
              Search Active Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
