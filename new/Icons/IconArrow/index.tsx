import { FC, HTMLAttributes } from "react";

const IconArrow: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 5.7V16.5M17 16.5H6.2M17 16.5L5 4.5"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconArrow;
