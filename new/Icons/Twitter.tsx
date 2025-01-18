import { FC, HTMLAttributes } from "react";

const Twitter: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_98_1188)">
      <mask
        id="mask0_98_1188"
        css={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26"
      >
        <path d="M26 0H0V26H26V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_98_1188)">
        <path
          d="M15.4735 11.0036L25.1526 0H22.859L14.4546 9.55425L7.74211 0H0L10.1507 14.4477L0 25.9867H2.29376L11.169 15.897L18.2579 25.9867H26L15.473 11.0036H15.4735ZM12.3319 14.575L11.3034 13.1363L3.12024 1.68872H6.64332L13.2473 10.9273L14.2757 12.366L22.8601 24.3747H19.337L12.3319 14.5756V14.575Z"
          fill="currentColor"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_98_1188">
        <rect width="26" height="26" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Twitter;
