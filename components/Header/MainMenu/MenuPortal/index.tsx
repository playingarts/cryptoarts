import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MenuPortal = ({
  children,
  show,
}: {
  children: ReactNode;
  show: boolean;
}) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    const element = document.getElementById("menuportal");
    if (!element && process.env.NODE_ENV === "development") {
      console.warn("MenuPortal: #menuportal element not found in DOM");
    }
    ref.current = element;
    setMounted(true);
  }, []);

  // Track if menu has ever been shown - once shown, keep mounted
  useEffect(() => {
    if (show && !hasBeenShown) {
      setHasBeenShown(true);
    }
  }, [show, hasBeenShown]);

  if (!mounted || !ref.current) return null;
  // Don't render until first shown, then keep mounted forever
  if (!hasBeenShown) return null;

  return createPortal(
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {children}
    </div>,
    ref.current
  );
};

export default MenuPortal;
