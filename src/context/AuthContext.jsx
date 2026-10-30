import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";
import Swal from "sweetalert2";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and check authentication via secure httpOnly cookie on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await authService.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        // No active or valid cookie
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Event listener for automated session expiration from API interceptor
    const handleSessionExpired = () => {
      setUser(null);
      Swal.fire({
        title: "Session Expired",
        text: "Your session has expired. Please log in again to continue.",
        icon: "warning",
        confirmButtonColor: "#dc3545",
      });
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, []);

  // Login handler - sets httpOnly cookie on backend
  const login = async (mail, password) => {
    const res = await authService.login(mail, password);
    if (res.success && res.user) {
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || "Login failed");
  };

  // Register handler - sets httpOnly cookie on backend
  const register = async (details) => {
    const res = await authService.register(details);
    if (res.success && res.user) {
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || "Registration failed");
  };

  // Logout handler - clears httpOnly cookie on backend
  const logout = async (notify = true) => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn("Logout request error:", err);
    } finally {
      setUser(null);

      // Clean up legacy localStorage keys if any existed
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("islogin");

      if (notify) {
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  // Update profile handler
  const updateProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    if (res.success && res.user) {
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || "Failed to update profile");
  };

  // Change password handler
  const changePassword = async (passwordData) => {
    return await authService.changePassword(passwordData);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isDonor = user?.role === "donor";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        isDonor,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
