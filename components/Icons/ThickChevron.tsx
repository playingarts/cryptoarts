import { FC, HTMLAttributes } from "react";

const ThickChevron: FC<
  HTMLAttributes<SVGElement> & { width?: number; height?: number }
> = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="currentColor"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8209 26.0862C11.3591 25.5731 11.4007 24.7827 11.9138 24.3209L20.8814 16.25L11.9138 8.17912C11.4007 7.7173 11.3591 6.92693 11.8209 6.4138C12.2827 5.90066 13.0731 5.85906 13.5862 6.32089L23.5862 15.3209C23.8496 15.5579 24 15.8956 24 16.25C24 16.6044 23.8496 16.9421 23.5862 17.1791L13.5862 26.1791C13.0731 26.6409 12.2827 26.5993 11.8209 26.0862Z"
    />
  </svg>
);

export default ThickChevron;
