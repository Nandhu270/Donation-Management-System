import React, { useState, useEffect } from "react";
import { adminService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaUserShield,
  FaHandHoldingHeart,
  FaSyncAlt,
  FaHospital,
  FaFileAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

// Tab Subcomponents
import OverviewTab from "../components/admin/OverviewTab";
import EmergencyRequestsTab from "../components/admin/EmergencyRequestsTab";
import CampaignsTab from "../components/admin/CampaignsTab";
import ArticlesTab from "../components/admin/ArticlesTab";
import UsersTab from "../components/admin/UsersTab";
import DonationsTab from "../components/admin/DonationsTab";
import InquiriesTab from "../components/admin/InquiriesTab";
import FaqsTab from "../components/admin/FaqsTab";

// Modal Subcomponents
import RequestModal from "../components/admin/RequestModal";
import CampaignModal from "../components/admin/CampaignModal";
import ArticleModal from "../components/admin/ArticleModal";
import FaqModal from "../components/admin/FaqModal";

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
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isActive: res.isActive } : u))
        );
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  // Handle Emergency Request Creation
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    if (!requestForm.hospital.trim() || !requestForm.location.trim() || !requestForm.patient.trim()) {
      Swal.fire("Missing Fields", "Hospital name, location, and patient details are required.", "warning");
      return;
    }

    try {
      const res = await adminService.createEmergencyRequest(requestForm);
      if (res.success) {
        Swal.fire("Created", "Emergency blood request added successfully.", "success");
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
    if (!campaignForm.title.trim() || !campaignForm.focus.trim() || !campaignForm.desc.trim()) {
      Swal.fire("Missing Fields", "Campaign title, focus area, and description are required.", "warning");
      return;
    }
    if (Number(campaignForm.goal) <= 0 || isNaN(Number(campaignForm.goal))) {
      Swal.fire("Invalid Goal", "Funding goal must be a positive number.", "warning");
      return;
    }

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
    if (!articleForm.title.trim() || !articleForm.excerpt.trim()) {
      Swal.fire("Missing Fields", "Article title and excerpt are required.", "warning");
      return;
    }

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
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      Swal.fire("Missing Fields", "Question and answer are required.", "warning");
      return;
    }

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

  const tabs = [
    { id: "overview", label: "Overview & KPIs", icon: <FaUsers /> },
    { id: "requests", label: "Hospital Requests", icon: <FaHospital /> },
    { id: "campaigns", label: "Relief Campaigns", icon: <FaHandHoldingHeart /> },
    { id: "articles", label: "Articles & Blog", icon: <FaFileAlt /> },
    { id: "users", label: "User Directory", icon: <FaUserShield /> },
    { id: "donations", label: "Donation Ledger", icon: <FaMoneyBillWave /> },
    { id: "inquiries", label: "Inquiries Desk", icon: <FaEnvelope /> },
    { id: "faqs", label: "FAQs Manager", icon: <FaQuestionCircle /> },
  ];

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

        {/* Tab Navigation Bar */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold">
          {tabs.map((tab) => (
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

        {/* Tab Views */}
        {activeTab === "overview" && (
          <OverviewTab stats={stats} setActiveTab={setActiveTab} />
        )}

        {activeTab === "requests" && (
          <EmergencyRequestsTab
            emergencyRequests={emergencyRequests}
            handleToggleRequest={handleToggleRequest}
            handleDeleteRequest={handleDeleteRequest}
            onOpenModal={() => setModalType("request")}
          />
        )}

        {activeTab === "campaigns" && (
          <CampaignsTab
            campaigns={campaigns}
            handleDeleteCampaign={handleDeleteCampaign}
            onOpenModal={() => setModalType("campaign")}
          />
        )}

        {activeTab === "articles" && (
          <ArticlesTab
            articles={articles}
            handleDeleteArticle={handleDeleteArticle}
            onOpenModal={() => setModalType("article")}
          />
        )}

        {activeTab === "users" && (
          <UsersTab
            users={users}
            currentAdmin={currentAdmin}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            userPage={userPage}
            setUserPage={setUserPage}
            userPagination={userPagination}
            handleRoleChange={handleRoleChange}
            handleUserStatusToggle={handleUserStatusToggle}
            fetchTabData={fetchTabData}
          />
        )}

        {activeTab === "donations" && (
          <DonationsTab
            donations={donations}
            handleDeleteDonation={handleDeleteDonation}
          />
        )}

        {activeTab === "inquiries" && (
          <InquiriesTab
            inquiries={inquiries}
            handleDeleteInquiry={handleDeleteInquiry}
          />
        )}

        {activeTab === "faqs" && (
          <FaqsTab
            faqs={faqs}
            handleDeleteFaq={handleDeleteFaq}
            onOpenModal={() => setModalType("faq")}
          />
        )}

        {/* Modals */}
        {modalType === "request" && (
          <RequestModal
            requestForm={requestForm}
            setRequestForm={setRequestForm}
            handleCreateRequest={handleCreateRequest}
            onClose={() => setModalType(null)}
          />
        )}

        {modalType === "campaign" && (
          <CampaignModal
            campaignForm={campaignForm}
            setCampaignForm={setCampaignForm}
            handleCreateCampaign={handleCreateCampaign}
            onClose={() => setModalType(null)}
          />
        )}

        {modalType === "article" && (
          <ArticleModal
            articleForm={articleForm}
            setArticleForm={setArticleForm}
            handleCreateArticle={handleCreateArticle}
            onClose={() => setModalType(null)}
          />
        )}

        {modalType === "faq" && (
          <FaqModal
            faqForm={faqForm}
            setFaqForm={setFaqForm}
            handleCreateFaq={handleCreateFaq}
            onClose={() => setModalType(null)}
          />
        )}
      </div>
    </div>
  );
}
