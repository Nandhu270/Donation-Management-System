import React from "react";

export default function PageTransition({ children, className = "" }) {
  return (
    <div
      className={`animate-fadeIn transition-opacity duration-300 ease-in-out min-h-[calc(100vh-140px)] ${className}`}
    >
      {children}
    </div>
  );
}

