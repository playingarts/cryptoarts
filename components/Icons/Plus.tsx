import { FC, HTMLAttributes } from "react";

const Plus: FC<HTMLAttributes<SVGElement>> = ({ style, ...props }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ verticalAlign: "top", ...style }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1C12 0.447715 11.5523 0 11 0C10.4477 0 10 0.447715 10 1V10H1C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12H10V21C10 21.5523 10.4477 22 11 22C11.5523 22 12 21.5523 12 21V12H21C21.5523 12 22 11.5523 22 11C22 10.4477 21.5523 10 21 10H12V1Z"
        fill="url(#paint0_linear_942_1881)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_942_1881"
          x1="3.09084"
          y1="3.44624e05"
          x2="18.9987"
          y2="0.0537459"
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
