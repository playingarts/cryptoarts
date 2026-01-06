import { FC, HTMLAttributes } from "react";

const Rating: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3414_3223)">
      <path
        d="M23 8.41205H13.818L11 0L8.182 8.41205H-1L6.5105 13.5879L3.5855 22L11 16.7868L18.4145 22L15.484 13.5879L23 8.41205Z"
        fill="#F4C542"
      />
    </g>
    <defs>
      <clipPath id="clip0_3414_3223">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Rating;
