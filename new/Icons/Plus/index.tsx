import { FC, HTMLAttributes } from "react";

const Plus: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.4706 11H2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.9854 19.4852V2.51465"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Plus;
