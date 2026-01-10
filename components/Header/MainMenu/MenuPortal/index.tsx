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

  useEffect(() => {
    const element = document.getElementById("menuportal");
    if (!element && process.env.NODE_ENV === "development") {
      console.warn("MenuPortal: #menuportal element not found in DOM");
    }
    ref.current = element;
    setMounted(true);
  }, []);

  if (!mounted || !show || !ref.current) return null;
  return createPortal(children, ref.current);
};

export default MenuPortal;
