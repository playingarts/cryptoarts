import { FC, HTMLAttributes } from "react";

const Menu: FC<HTMLAttributes<SVGElement> & { animateOnHover?: boolean }> = ({
  ...props
}) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 15.5H3H19Z" fill="currentColor" />
    <path
      d="M19 15.5H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 7.5H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Menu;
