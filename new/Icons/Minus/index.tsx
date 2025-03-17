import { FC, HTMLAttributes } from "react";

const Minus: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.9706 11.5H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Minus;
