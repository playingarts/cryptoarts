import { FC, HTMLAttributes } from "react";

const Spades: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.4023 14L6.65099 6.93894L6.65099 21.0611L19.4023 14ZM24.2315 15.613C25.5218 14.8985 25.5218 13.1015 24.2315 12.387L5.68325 2.11588C4.39934 1.40492 2.79922 2.29984 2.79922 3.72889L2.79922 24.2711C2.79922 25.7002 4.39934 26.5951 5.68325 25.8841L24.2315 15.613Z"
      fill="currentColor"
    />
  </svg>
);

export default Spades;
