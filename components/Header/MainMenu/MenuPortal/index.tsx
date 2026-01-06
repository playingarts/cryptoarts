import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const MenuPortal = ({
  children,
  show,
}: {
  children: ReactNode;
  show: boolean;
}) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("menuportal");
  }, []);
  return show && ref.current ? createPortal(children, ref.current) : null;
};

export default MenuPortal;
