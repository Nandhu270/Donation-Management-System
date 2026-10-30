import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

/**
 * Reusable Tailwind CSS Alert Banner Component
 * @param {('error'|'warning'|'success'|'info')} type
 * @param {string} title
 * @param {string} message
 * @param {Function} onClose
 * @param {React.ReactNode} action
 */
export default function TailwindAlert({
  type = "info",
  title,
  message,
  onClose,
  action,
  className = "",
}) {
  const styles = {
    error: {
      wrapper: "bg-red-50 border-l-4 border-red-500 text-red-900 shadow-sm",
      icon: <FaTimesCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />,
      titleColor: "text-red-800",
      textColor: "text-red-700",
      closeBtn: "text-red-500 hover:bg-red-100",
    },
    warning: {
      wrapper: "bg-amber-50 border-l-4 border-amber-500 text-amber-900 shadow-sm",
      icon: <FaExclamationTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />,
      titleColor: "text-amber-800",
      textColor: "text-amber-700",
      closeBtn: "text-amber-500 hover:bg-amber-100",
    },
    success: {
      wrapper: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 shadow-sm",
      icon: <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />,
      titleColor: "text-emerald-800",
      textColor: "text-emerald-700",
      closeBtn: "text-emerald-500 hover:bg-emerald-100",
    },
    info: {
      wrapper: "bg-sky-50 border-l-4 border-sky-500 text-sky-900 shadow-sm",
      icon: <FaInfoCircle className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />,
      titleColor: "text-sky-800",
      textColor: "text-sky-700",
      closeBtn: "text-sky-500 hover:bg-sky-100",
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`rounded-r-lg p-4 transition-all duration-300 ease-in-out my-3 ${current.wrapper} ${className}`}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {current.icon}
          <div>
            {title && (
              <h4 className={`text-sm font-bold ${current.titleColor} mb-0.5`}>
                {title}
              </h4>
            )}
            <div className={`text-sm ${current.textColor} font-normal leading-relaxed`}>
              {message}
            </div>
            {action && <div className="mt-2.5">{action}</div>}
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${current.closeBtn} focus:outline-none`}
            aria-label="Dismiss alert"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

