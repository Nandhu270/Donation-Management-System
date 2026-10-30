import React, { createContext, useContext, useState, useCallback } from "react";
import TailwindAlert from "../components/common/TailwindAlert";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = "info", title = "", message = "", duration = 5000, action = null }) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 9);
      const newToast = { id, type, title, message, action };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toast = {
    error: (message, title = "Error", action = null, duration = 6000) =>
      addToast({ type: "error", title, message, action, duration }),
    warning: (message, title = "Warning", action = null, duration = 6000) =>
      addToast({ type: "warning", title, message, action, duration }),
    success: (message, title = "Success", action = null, duration = 4000) =>
      addToast({ type: "success", title, message, action, duration }),
    info: (message, title = "Information", action = null, duration = 4500) =>
      addToast({ type: "info", title, message, action, duration }),
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}

      {/* Floating Tailwind Toast Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 shadow-xl rounded-lg"
          >
            <TailwindAlert
              type={t.type}
              title={t.title}
              message={t.message}
              action={t.action}
              onClose={() => removeToast(t.id)}
              className="my-0 border-l-4"
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};

export default ToastContext;

