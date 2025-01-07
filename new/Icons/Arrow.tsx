import { FC, HTMLAttributes } from "react";

const Arrow: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.8485 3.36325L19.4853 11M19.4853 11L11.8485 18.6368M19.4853 11H2.51471"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default Arrow;
