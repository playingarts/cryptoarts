import { FC, HTMLAttributes } from "react";

const Plus: FC<HTMLAttributes<SVGElement>> = ({ style, ...props }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ verticalAlign: "top", ...style }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 6C17 5.44772 16.5523 5 16 5C15.4477 5 15 5.44772 15 6V15H6C5.44772 15 5 15.4477 5 16C5 16.5523 5.44772 17 6 17H15V26C15 26.5523 15.4477 27 16 27C16.5523 27 17 26.5523 17 26V17H26C26.5523 17 27 16.5523 27 16C27 15.4477 26.5523 15 26 15H17V6Z"
        fill="url(#paint0_linear_942_1878)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_942_1878"
          x1="8.09084"
          y1="5.00003"
          x2="23.9987"
          y2="5.05375"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#82A7F8" />
          <stop offset="0.5" stopColor="#A6FBF6" />
          <stop offset="1" stopColor="#CDB0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Plus;
