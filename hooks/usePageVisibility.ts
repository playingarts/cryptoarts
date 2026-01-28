import { useState, useEffect } from "react";

/**
 * Hook that tracks page visibility state
 * Returns true when the page is visible, false when hidden (user switched tabs)
 * Useful for pausing auto-scrolling carousels when user navigates away
 */
export const usePageVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if document is available (SSR safety)
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    // Set initial state
    setIsVisible(document.visibilityState === "visible");

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
};
