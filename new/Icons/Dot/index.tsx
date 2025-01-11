import { FC, HTMLAttributes } from "react";

const Dot: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.15685 2.99994L11.3029 8.15679L6.14605 13.3028"
      stroke="#333333"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default Dot;
