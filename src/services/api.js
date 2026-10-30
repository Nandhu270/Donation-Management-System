import axios from "axios";

const API_BASE_URL = "http://localhost:5174";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial: Allows browser to transmit and receive httpOnly cookies across ports
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
      // If token expired or invalid, trigger session expiration
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

// Admin Service APIs
export const adminService = {
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
};

// Donor Service APIs
export const donorService = {
  searchDonors: async (params = {}) => {
    const response = await api.get("/api/donors/search", { params });
    return response.data;
  },
};

export default api;
