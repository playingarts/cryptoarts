import { FC, HTMLAttributes } from "react";

const Youtube: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_104_1781)">
        <path
          d="M18.6625 12.2781L9.9625 7.1C9.85625 7.0375 9.74688 7 9.62188 7C9.28125 7 9.00312 7.28125 9.00312 7.625H9V18.375H9.00312C9.00312 18.7188 9.28125 19 9.62188 19C9.75 19 9.85625 18.9563 9.97187 18.8938L18.6625 13.7219C18.8688 13.55 19 13.2906 19 13C19 12.7094 18.8688 12.4531 18.6625 12.2781Z"
          fill="currentColor"
        />
        <path
          d="M18.7391 1H7.26087C3.80309 1 1 3.80309 1 7.26087V18.7391C1 22.1969 3.80309 25 7.26087 25H18.7391C22.1969 25 25 22.1969 25 18.7391V7.26087C25 3.80309 22.1969 1 18.7391 1Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_1781">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Youtube;
