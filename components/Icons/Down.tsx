import { FC, HTMLAttributes } from "react";

const Down: FC<
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
      d="M6.4138 10.3209C6.92694 9.85907 7.7173 9.90066 8.17913 10.4138L16.25 19.3814L24.3209 10.4138C24.7827 9.90066 25.5731 9.85907 26.0862 10.3209C26.5994 10.7827 26.641 11.5731 26.1791 12.0862L17.1791 22.0862C16.9421 22.3496 16.6044 22.5 16.25 22.5C15.8957 22.5 15.5579 22.3496 15.3209 22.0862L6.32089 12.0862C5.85907 11.5731 5.90067 10.7827 6.4138 10.3209Z"
    />
  </svg>
);

export default Down;
