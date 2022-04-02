import { FC, HTMLAttributes } from "react";

const CutoutChevron: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM17.1791 20.9138C16.7173 20.4007 15.9269 20.3591 15.4138 20.8209C14.9007 21.2827 14.8591 22.0731 15.3209 22.5862L24.3209 32.5862C24.5579 32.8496 24.8957 33 25.25 33C25.6044 33 25.9421 32.8496 26.1791 32.5862L35.1791 22.5862C35.641 22.0731 35.5994 21.2827 35.0862 20.8209C34.5731 20.3591 33.7827 20.4007 33.3209 20.9138L25.25 29.8814L17.1791 20.9138Z"
    />
  </svg>
);

export default CutoutChevron;
