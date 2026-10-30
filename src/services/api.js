import axios from "axios";

const API_BASE_URL = "http://localhost:5174";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor: Handle Token Expiration and Session Termination
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const code = error.response.data?.code;
      if (code === "TOKEN_EXPIRED" || code === "INVALID_TOKEN") {
        window.dispatchEvent(new Event("auth:session-expired"));
      }
    }
    return Promise.reject(error);
  }
);

// Auth Service APIs
export const authService = {
  login: async (mail, password) => {
    const response = await api.post("/api/auth/login", { mail, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/api/auth/profile", profileData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put("/api/auth/change-password", passwordData);
    return response.data;
  },

  getMyDonations: async () => {
    const response = await api.get("/api/auth/my-donations");
    return response.data;
  },
};

// Public Content Service APIs
export const contentService = {
  getEmergencyRequests: async () => {
    const response = await api.get("/api/emergency-requests");
    return response.data;
  },

  getCampaigns: async () => {
    const response = await api.get("/api/campaigns");
    return response.data;
  },

  getArticles: async (category = "") => {
    const params = category && category !== "All" ? { category } : {};
    const response = await api.get("/api/articles", { params });
    return response.data;
  },

  getFaqs: async () => {
    const response = await api.get("/api/faqs");
    return response.data;
  },

  getTestimonials: async () => {
    const response = await api.get("/api/testimonials");
    return response.data;
  },

  getPublicStats: async () => {
    const response = await api.get("/api/stats/public");
    return response.data;
  },
};

// Admin Service APIs
export const adminService = {
  // Users
  getUsers: async (params = {}) => {
    const response = await api.get("/api/admin/users", { params });
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await api.patch(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  },

  toggleUserStatus: async (userId) => {
    const response = await api.patch(`/api/admin/users/${userId}/status`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/api/admin/stats");
    return response.data;
  },

  // Emergency Requests
  getEmergencyRequests: async () => {
    const response = await api.get("/api/admin/emergency-requests");
    return response.data;
  },

  createEmergencyRequest: async (data) => {
    const response = await api.post("/api/admin/emergency-requests", data);
    return response.data;
  },

  updateEmergencyRequest: async (id, data) => {
    const response = await api.put(`/api/admin/emergency-requests/${id}`, data);
    return response.data;
  },

  toggleEmergencyRequest: async (id) => {
    const response = await api.patch(`/api/admin/emergency-requests/${id}/toggle`);
    return response.data;
  },

  deleteEmergencyRequest: async (id) => {
    const response = await api.delete(`/api/admin/emergency-requests/${id}`);
    return response.data;
  },

  // Campaigns
  getCampaigns: async () => {
    const response = await api.get("/api/admin/campaigns");
    return response.data;
  },

  createCampaign: async (data) => {
    const response = await api.post("/api/admin/campaigns", data);
    return response.data;
  },

  updateCampaign: async (id, data) => {
    const response = await api.put(`/api/admin/campaigns/${id}`, data);
    return response.data;
  },

  deleteCampaign: async (id) => {
    const response = await api.delete(`/api/admin/campaigns/${id}`);
    return response.data;
  },

  // Articles
  getArticles: async () => {
    const response = await api.get("/api/admin/articles");
    return response.data;
  },

  createArticle: async (data) => {
    const response = await api.post("/api/admin/articles", data);
    return response.data;
  },

  updateArticle: async (id, data) => {
    const response = await api.put(`/api/admin/articles/${id}`, data);
    return response.data;
  },

  deleteArticle: async (id) => {
    const response = await api.delete(`/api/admin/articles/${id}`);
    return response.data;
  },

  // Inquiries Desk
  getInquiries: async () => {
    const response = await api.get("/api/admin/inquiries");
    return response.data;
  },

  deleteInquiry: async (id) => {
    const response = await api.delete(`/api/admin/inquiries/${id}`);
    return response.data;
  },

  // Donations Ledger
  getDonations: async () => {
    const response = await api.get("/api/admin/donations");
    return response.data;
  },

  deleteDonation: async (id) => {
    const response = await api.delete(`/api/admin/donations/${id}`);
    return response.data;
  },

  // FAQs
  getFaqs: async () => {
    const response = await api.get("/api/admin/faqs");
    return response.data;
  },

  createFaq: async (data) => {
    const response = await api.post("/api/admin/faqs", data);
    return response.data;
  },

  updateFaq: async (id, data) => {
    const response = await api.put(`/api/admin/faqs/${id}`, data);
    return response.data;
  },

  deleteFaq: async (id) => {
    const response = await api.delete(`/api/admin/faqs/${id}`);
    return response.data;
  },
};

// Donor Service APIs
export const donorService = {
  searchDonors: async (params = {}) => {
    const response = await api.get("/api/donors/search", { params });
    return response.data;
  },
};

// General Inquiries & Contact Service
export const contactService = {
  submitInquiry: async (data) => {
    const response = await api.post("/contactus", data);
    return response.data;
  },
};

// Donation Service
export const donationService = {
  createDonation: async (data) => {
    const response = await api.post("/donate", data);
    return response.data;
  },
  getAllDonations: async () => {
    const response = await api.get("/amount");
    return response.data;
  },
};

export default api;
