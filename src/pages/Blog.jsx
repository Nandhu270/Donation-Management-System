import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../components/ScrollTop";
import { contentService } from "../services/api";
import {
  FaArrowRight,
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Transfusion Science",
    "Donor Guidelines",
    "Patient Impact",
    "Emergency Care",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await contentService.getArticles(activeCategory);
        if (res.success) {
          setArticles(res.articles);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen py-14 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
            <FaFileAlt className="text-slate-500 text-[10px]" /> Editorial & Clinical Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Articles, Guidelines & Case Studies
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Stay informed on transfusion science, blood donor safety, and verified patient accounts supported by our voluntary community.
          </p>
        </div>

        {/* Featured Core Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Clinical Reference
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Blood Group Compatibility & Biological Benefits
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review the universal donor and recipient matrix, clinical health impacts on resting blood pressure and iron stores, and medical prerequisites.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/blog/blood"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800"
              >
                <span>Read Full Compatibility Guide</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Donor Experience
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Step-by-Step Donation Walkthrough & Recovery Advice
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                A friendly, reassuring guide explaining registration, health checks, the 8-minute collection, and simple post-donation recovery practices.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/blog/process"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-700"
              >
                <span>Review The 4-Step Process</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-slate-900 text-white font-semibold"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid (Dynamic from API) */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 font-medium">
            Loading articles from database...
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            No published articles found under this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <article
                key={art._id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2">
                      <span className="text-slate-600 font-semibold">{art.category}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={art.link || "/blog/blood"}
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800"
                  >
                    <span>Read Article</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
