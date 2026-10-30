import React, { useState, useEffect } from "react";
import { adminService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaUserShield,
  FaHeart,
  FaHandHoldingHeart,
  FaSearch,
  FaCheck,
  FaUserCog,
  FaSyncAlt,
  FaPlus,
  FaTrash,
  FaEdit,
  FaHospital,
  FaFileAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";

export default function AdminDashboard() {
  const { user: currentAdmin } = useAuth();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [articles, setArticles] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [donations, setDonations] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Users filter state
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userPagination, setUserPagination] = useState({ totalPages: 1, total: 0 });

  // Modals state
  const [modalType, setModalType] = useState(null); // 'request', 'campaign', 'article', 'faq'

  // Form states for modals
  const [requestForm, setRequestForm] = useState({
    hospital: "",
    location: "",
    blood: "O-ve",
    patient: "",
    urgency: "Immediate",
    unitsRequired: 1,
    contactPhone: "+91 985-452-964",
  });

  const [campaignForm, setCampaignForm] = useState({
    title: "",
    focus: "Child Healthcare",
    image: "",
    goal: 500000,
    raised: 0,
    beneficiaries: "",
    desc: "",
  });

  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Transfusion Science",
    readTime: "4 min read",
    image: "",
    excerpt: "",
    link: "/blog/blood",
  });

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "General",
  });

  // Fetch data depending on active tab
  const fetchTabData = async () => {
    try {
      setLoading(true);
      if (activeTab === "overview") {
        const res = await adminService.getStats();
        if (res.success) setStats(res.stats);
      } else if (activeTab === "users") {
        const res = await adminService.getUsers({
          search: userSearch,
          role: roleFilter,
          page: userPage,
          limit: 10,
        });
        if (res.success) {
          setUsers(res.users);
          setUserPagination(res.pagination);
        }
      } else if (activeTab === "requests") {
        const res = await adminService.getEmergencyRequests();
        if (res.success) setEmergencyRequests(res.requests);
      } else if (activeTab === "campaigns") {
        const res = await adminService.getCampaigns();
        if (res.success) setCampaigns(res.campaigns);
      } else if (activeTab === "articles") {
        const res = await adminService.getArticles();
        if (res.success) setArticles(res.articles);
      } else if (activeTab === "inquiries") {
        const res = await adminService.getInquiries();
        if (res.success) setInquiries(res.inquiries);
      } else if (activeTab === "donations") {
        const res = await adminService.getDonations();
        if (res.success) setDonations(res.donations);
      } else if (activeTab === "faqs") {
        const res = await adminService.getFaqs();
        if (res.success) setFaqs(res.faqs);
      }
    } catch (err) {
      console.error(`Failed to load ${activeTab} data:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData();
  }, [activeTab, userPage, roleFilter]);

  // Handle user role change
  const handleRoleChange = async (userId, targetName, newRole) => {
    const confirm = await Swal.fire({
      title: "Confirm Role Update",
      text: `Update ${targetName}'s role to "${newRole.toUpperCase()}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Update Role",
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await adminService.updateUserRole(userId, newRole);
      if (res.success) {
        Swal.fire("Role Updated", res.message, "success");
        setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
      }
    } catch (err) {
      Swal.fire("Update Failed", err.response?.data?.message || err.message, "error");
    }
  };

  // Handle user status toggle
  const handleUserStatusToggle = async (userId, targetName, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";
    const confirm = await Swal.fire({
      title: `${action.toUpperCase()} Account?`,
      text: `Are you sure you want to ${action} ${targetName}'s account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: currentStatus ? "#dc2626" : "#0f172a",
      cancelButtonColor: "#64748b",
      confirmButtonText: `Yes, ${action}`,
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await adminService.toggleUserStatus(userId);
      if (res.success) {
        Swal.fire("Updated", res.message, "success");
        setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, isActive: res.isActive } : u)));
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  // Handle Emergency Request Creation
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.createEmergencyRequest(requestForm);
      if (res.success) {
        Swal.fire("Created", "Emergency blood request added.", "success");
        setModalType(null);
        fetchTabData();
        setRequestForm({
          hospital: "",
          location: "",
          blood: "O-ve",
          patient: "",
          urgency: "Immediate",
          unitsRequired: 1,
          contactPhone: "+91 985-452-964",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  // Toggle Emergency Request Status
  const handleToggleRequest = async (id) => {
    try {
      const res = await adminService.toggleEmergencyRequest(id);
      if (res.success) {
        setEmergencyRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, isActive: res.isActive } : r))
        );
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Delete Emergency Request
  const handleDeleteRequest = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Request?",
      text: "Remove this emergency request permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });
    if (!confirm.isConfirmed) return;

    try {
      await adminService.deleteEmergencyRequest(id);
      setEmergencyRequests((prev) => prev.filter((r) => r._id !== id));
      Swal.fire("Deleted", "Emergency request deleted.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Handle Campaign Creation
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.createCampaign(campaignForm);
      if (res.success) {
        Swal.fire("Created", "Campaign added successfully.", "success");
        setModalType(null);
        fetchTabData();
        setCampaignForm({
          title: "",
          focus: "Child Healthcare",
          image: "",
          goal: 500000,
          raised: 0,
          beneficiaries: "",
          desc: "",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  // Delete Campaign
  const handleDeleteCampaign = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Campaign?",
      text: "Are you sure you want to remove this campaign?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });
    if (!confirm.isConfirmed) return;

    try {
      await adminService.deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
      Swal.fire("Deleted", "Campaign removed.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Handle Article Creation
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.createArticle(articleForm);
      if (res.success) {
        Swal.fire("Published", "Article published successfully.", "success");
        setModalType(null);
        fetchTabData();
        setArticleForm({
          title: "",
          category: "Transfusion Science",
          readTime: "4 min read",
          image: "",
          excerpt: "",
          link: "/blog/blood",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Article?",
      text: "Remove this published article?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });
    if (!confirm.isConfirmed) return;

    try {
      await adminService.deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      Swal.fire("Deleted", "Article removed.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    try {
      await adminService.deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      Swal.fire("Removed", "Inquiry deleted.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Delete Donation Record
  const handleDeleteDonation = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Donation Record?",
      text: "Remove this financial transaction record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });
    if (!confirm.isConfirmed) return;

    try {
      await adminService.deleteDonation(id);
      setDonations((prev) => prev.filter((d) => d._id !== id));
      Swal.fire("Deleted", "Donation record deleted.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Handle FAQ Creation
  const handleCreateFaq = async (e) => {
    e.preventDefault();
    try {
      const res = await adminService.createFaq(faqForm);
      if (res.success) {
        Swal.fire("Added", "FAQ added successfully.", "success");
        setModalType(null);
        fetchTabData();
        setFaqForm({ question: "", answer: "", category: "General" });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  // Delete FAQ
  const handleDeleteFaq = async (id) => {
    try {
      await adminService.deleteFaq(id);
      setFaqs((prev) => prev.filter((f) => f._id !== id));
      Swal.fire("Deleted", "FAQ removed.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Administration Console
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Platform Content & System Governance
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Admin: <strong className="text-slate-800">{currentAdmin?.name || currentAdmin?.mail}</strong>
            </span>
            <button
              type="button"
              onClick={fetchTabData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs"
            >
              <FaSyncAlt className={`text-xs ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold">
          {[
            { id: "overview", label: "Overview & KPIs", icon: <FaUsers /> },
            { id: "requests", label: "Hospital Requests", icon: <FaHospital /> },
            { id: "campaigns", label: "Relief Campaigns", icon: <FaHandHoldingHeart /> },
            { id: "articles", label: "Articles & Blog", icon: <FaFileAlt /> },
            { id: "users", label: "User Directory", icon: <FaUserShield /> },
            { id: "donations", label: "Donation Ledger", icon: <FaMoneyBillWave /> },
            { id: "inquiries", label: "Inquiries Desk", icon: <FaEnvelope /> },
            { id: "faqs", label: "FAQs Manager", icon: <FaQuestionCircle /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & KPIS */}
        {/* ============================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500">Total Users</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {stats?.totalUsers ?? "-"}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500">Registered Donors</span>
                <div className="text-2xl font-extrabold text-red-700 mt-1">
                  {stats?.totalDonors ?? "-"}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500">Total Funds Collected</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {stats?.totalDonationAmount != null
                    ? `₹${Number(stats.totalDonationAmount).toLocaleString("en-IN")}`
                    : "-"}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-medium text-slate-500">Contact Inquiries</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {stats?.contactInquiries ?? "-"}
                </div>
              </div>
            </div>

            {/* Content summary grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Hospital Cases</span>
                <div className="text-xl font-bold text-slate-900">{stats?.emergencyRequests ?? 0} Listed</div>
                <button
                  type="button"
                  onClick={() => setActiveTab("requests")}
                  className="text-xs font-semibold text-red-700 hover:text-red-800"
                >
                  Manage Requests →
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Relief Campaigns</span>
                <div className="text-xl font-bold text-slate-900">{stats?.campaignsCount ?? 0} Active</div>
                <button
                  type="button"
                  onClick={() => setActiveTab("campaigns")}
                  className="text-xs font-semibold text-red-700 hover:text-red-800"
                >
                  Manage Campaigns →
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Published Articles</span>
                <div className="text-xl font-bold text-slate-900">{stats?.articlesCount ?? 0} Posts</div>
                <button
                  type="button"
                  onClick={() => setActiveTab("articles")}
                  className="text-xs font-semibold text-red-700 hover:text-red-800"
                >
                  Manage Articles →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: EMERGENCY BLOOD REQUESTS */}
        {/* ============================================================== */}
        {activeTab === "requests" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Hospital Emergency Requests</h3>
                <p className="text-xs text-slate-500">Cases displayed live on the Home page and Find Donors section</p>
              </div>
              <button
                type="button"
                onClick={() => setModalType("request")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
              >
                <FaPlus className="text-[10px]" /> Add Emergency Request
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-2.5 px-4">Hospital & Location</th>
                    <th className="py-2.5 px-3">Blood Group</th>
                    <th className="py-2.5 px-3">Patient Case</th>
                    <th className="py-2.5 px-3">Urgency</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {emergencyRequests.map((req) => (
                    <tr key={req._id}>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{req.hospital}</div>
                        <div className="text-slate-400 text-[11px]">{req.location}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold px-2 py-0.5 rounded bg-red-50 text-red-700">
                          {req.blood}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700">{req.patient}</td>
                      <td className="py-3 px-3 font-semibold text-slate-600">{req.urgency}</td>
                      <td className="py-3 px-3">
                        <button
                          type="button"
                          onClick={() => handleToggleRequest(req._id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            req.isActive !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {req.isActive !== false ? "Active (Live)" : "Fulfilled / Closed"}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteRequest(req._id)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                          title="Delete"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: RELIEF CAMPAIGNS */}
        {/* ============================================================== */}
        {activeTab === "campaigns" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Medical Relief Campaigns</h3>
                <p className="text-xs text-slate-500">Causes listed on the Home overview with live progress bars</p>
              </div>
              <button
                type="button"
                onClick={() => setModalType("campaign")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
              >
                <FaPlus className="text-[10px]" /> Add Campaign
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((camp) => (
                <div
                  key={camp._id}
                  className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {camp.focus}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{camp.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{camp.desc}</p>
                    <div className="text-xs font-medium text-slate-700 pt-1">
                      Raised: <strong>₹{Number(camp.raised).toLocaleString("en-IN")}</strong> / Goal: ₹{Number(camp.goal).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{camp.beneficiaries}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCampaign(camp._id)}
                      className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                      title="Delete Campaign"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ARTICLES & BLOG */}
        {/* ============================================================== */}
        {activeTab === "articles" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Articles & Educational Content</h3>
                <p className="text-xs text-slate-500">Published articles displayed on the Guides & Blog page</p>
              </div>
              <button
                type="button"
                onClick={() => setModalType("article")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
              >
                <FaPlus className="text-[10px]" /> Publish New Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div
                  key={art._id}
                  className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-700">{art.category}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{art.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{art.excerpt}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteArticle(art._id)}
                    className="p-1.5 rounded text-rose-600 hover:bg-rose-50 shrink-0"
                    title="Delete Article"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: USER DIRECTORY (Preserved & Full-Featured) */}
        {/* ============================================================== */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">User Directory</h3>
                <p className="text-xs text-slate-500">Manage user roles and toggle active membership</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  {["", "donor", "admin", "user"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRoleFilter(r);
                        setUserPage(1);
                      }}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        roleFilter === r ? "bg-white font-bold text-slate-900" : "text-slate-600"
                      }`}
                    >
                      {r === "" ? "All" : r.toUpperCase()}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user..."
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-40"
                />
                <button
                  type="button"
                  onClick={fetchTabData}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-2.5 px-4">User</th>
                    <th className="py-2.5 px-3">Blood</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => {
                    const isSelf = u._id === currentAdmin?._id;
                    const isActive = u.isActive !== false;

                    return (
                      <tr key={u._id}>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{u.name}</div>
                          <div className="text-slate-400 text-[11px]">{u.mail} • Ph: {u.mobile}</div>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-800">{u.blood || "—"}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              u.role === "admin"
                                ? "bg-amber-100 text-amber-800"
                                : u.role === "donor"
                                ? "bg-red-100 text-red-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {u.role || "user"}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${isActive ? "text-emerald-700" : "text-rose-700"}`}>
                            {isActive ? "Active" : "Deactivated"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <select
                            disabled={isSelf}
                            value={u.role || "user"}
                            onChange={(e) => handleRoleChange(u._id, u.name, e.target.value)}
                            className="text-[11px] border border-slate-200 rounded px-1.5 py-1 bg-white"
                          >
                            <option value="user">User</option>
                            <option value="donor">Donor</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            type="button"
                            disabled={isSelf}
                            onClick={() => handleUserStatusToggle(u._id, u.name, isActive)}
                            className={`px-2 py-1 rounded text-[11px] border ${
                              isActive ? "text-rose-700 bg-rose-50" : "text-emerald-700 bg-emerald-50"
                            }`}
                          >
                            {isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: DONATIONS LEDGER */}
        {/* ============================================================== */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Donation Transactions Ledger</h3>
              <p className="text-xs text-slate-500">Recorded financial contributions and tax certificate details</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-2.5 px-4">Donor Name & Mail</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Pay Mode</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donations.map((d) => (
                    <tr key={d._id}>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{d.name}</div>
                        <div className="text-slate-400 text-[11px]">{d.mail}</div>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-slate-900">
                        {d.currency} {Number(d.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3">{d.paytype}</td>
                      <td className="py-3 px-3 text-slate-600">{d.mobile}</td>
                      <td className="py-3 px-3 text-slate-500">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteDonation(d._id)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                          title="Delete Record"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: INQUIRIES DESK */}
        {/* ============================================================== */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Contact Inquiries Desk</h3>
              <p className="text-xs text-slate-500">Messages sent via the Contact Us form</p>
            </div>

            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{inq.name}</span>
                      <span className="text-slate-400">({inq.mail})</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {inq.subject}
                      </span>
                    </div>
                    <p className="text-slate-700">{inq.msg}</p>
                    <span className="text-[11px] text-slate-400">
                      Received: {new Date(inq.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteInquiry(inq._id)}
                    className="p-2 rounded text-rose-600 hover:bg-rose-50 shrink-0"
                    title="Remove Message"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: FAQS MANAGER */}
        {/* ============================================================== */}
        {activeTab === "faqs" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">FAQs Manager</h3>
                <p className="text-xs text-slate-500">Add or edit questions displayed on the Contact page</p>
              </div>
              <button
                type="button"
                onClick={() => setModalType("faq")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
              >
                <FaPlus className="text-[10px]" /> Add FAQ
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">{faq.question}</h4>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(faq._id)}
                    className="p-1.5 rounded text-rose-600 hover:bg-rose-50 shrink-0"
                    title="Delete FAQ"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODALS */}
        {/* ============================================================== */}

        {/* Add Emergency Request Modal */}
        {modalType === "request" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Add Hospital Emergency Request</h3>
                <button type="button" onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hospital Name *</label>
                  <input
                    type="text"
                    required
                    value={requestForm.hospital}
                    onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
                    placeholder="e.g. Apollo Hospital"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City / Location *</label>
                    <input
                      type="text"
                      required
                      value={requestForm.location}
                      onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                      placeholder="e.g. Chennai, TN"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Blood Group *</label>
                    <select
                      value={requestForm.blood}
                      onChange={(e) => setRequestForm({ ...requestForm, blood: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      {["A+ve", "A-ve", "B+ve", "B-ve", "O+ve", "O-ve", "AB+ve", "AB-ve"].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Details *</label>
                  <input
                    type="text"
                    required
                    value={requestForm.patient}
                    onChange={(e) => setRequestForm({ ...requestForm, patient: e.target.value })}
                    placeholder="e.g. Pediatric Cardiac Surgery"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Urgency Level</label>
                    <select
                      value={requestForm.urgency}
                      onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="Immediate">Immediate</option>
                      <option value="Critical">Critical</option>
                      <option value="Within 4 Hours">Within 4 Hours</option>
                      <option value="Within 6 Hours">Within 6 Hours</option>
                      <option value="Within 12 Hours">Within 12 Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={requestForm.contactPhone}
                      onChange={(e) => setRequestForm({ ...requestForm, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 border rounded-lg text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold"
                  >
                    Save Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Campaign Modal */}
        {modalType === "campaign" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Add Medical Relief Campaign</h3>
                <button type="button" onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.title}
                    onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                    placeholder="e.g. Emergency Cardiac Support"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Focus / Category *</label>
                    <input
                      type="text"
                      required
                      value={campaignForm.focus}
                      onChange={(e) => setCampaignForm({ ...campaignForm, focus: e.target.value })}
                      placeholder="e.g. Child Healthcare"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Goal (₹) *</label>
                    <input
                      type="number"
                      required
                      value={campaignForm.goal}
                      onChange={(e) => setCampaignForm({ ...campaignForm, goal: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={campaignForm.image}
                    onChange={(e) => setCampaignForm({ ...campaignForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Beneficiaries Tag</label>
                  <input
                    type="text"
                    value={campaignForm.beneficiaries}
                    onChange={(e) => setCampaignForm({ ...campaignForm, beneficiaries: e.target.value })}
                    placeholder="e.g. 15 children supported"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={campaignForm.desc}
                    onChange={(e) => setCampaignForm({ ...campaignForm, desc: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border rounded-lg text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold">
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Article Modal */}
        {modalType === "article" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Publish Article</h3>
                <button type="button" onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="Transfusion Science">Transfusion Science</option>
                      <option value="Donor Guidelines">Donor Guidelines</option>
                      <option value="Patient Impact">Patient Impact</option>
                      <option value="Emergency Care">Emergency Care</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                    <input
                      type="text"
                      value={articleForm.readTime}
                      onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={articleForm.image}
                    onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Excerpt / Summary *</label>
                  <textarea
                    rows={2}
                    required
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border rounded-lg text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold">
                    Publish Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add FAQ Modal */}
        {modalType === "faq" && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Add Frequently Asked Question</h3>
                <button type="button" onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Question *</label>
                  <input
                    type="text"
                    required
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Answer *</label>
                  <textarea
                    rows={3}
                    required
                    value={faqForm.answer}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border rounded-lg text-slate-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold">
                    Save FAQ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
