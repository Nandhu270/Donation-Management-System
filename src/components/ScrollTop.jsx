import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Helper function that can safely be called from onClick event handlers
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Route listener component that automatically scrolls to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
