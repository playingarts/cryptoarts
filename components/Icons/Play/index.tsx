import { FC, HTMLAttributes } from "react";

const Play: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.4938 9.41719L4.44375 1.65C4.28438 1.55625 4.12031 1.5 3.93281 1.5C3.42188 1.5 3.00469 1.92188 3.00469 2.4375H3V18.5625H3.00469C3.00469 19.0781 3.42188 19.5 3.93281 19.5C4.125 19.5 4.28437 19.4344 4.45781 19.3406L17.4938 11.5828C17.8031 11.325 18 10.9359 18 10.5C18 10.0641 17.8031 9.67969 17.4938 9.41719Z"
      fill="white"
    />
  </svg>
);

export default Play;
