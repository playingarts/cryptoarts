import { FC, HTMLAttributes } from "react";

const Spades: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M13 6.59696L5.93893 19.3483H20.061L13 6.59696ZM14.613 1.76778C13.8985 0.477471 12.1015 0.477471 11.387 1.76778L1.11587 20.316C0.404901 21.5999 1.29983 23.2 2.72888 23.2H23.2711C24.7001 23.2 25.5951 21.5999 24.8841 20.316L14.613 1.76778Z"
    />
  </svg>
);

export default Spades;
