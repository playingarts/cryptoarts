import { FC, HTMLAttributes } from "react";

const Edit: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.166 2.5L17.4993 5.83333L6.66602 16.6667H3.33268V13.3333L14.166 2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.666 5L14.9993 8.33333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Edit;
