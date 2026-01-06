import { FC, HTMLAttributes } from "react";

const Star: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 8.02969H14.2006L11.5 0L8.79942 8.02969H0L7.19756 12.9703L4.39444 21L11.5 16.0238L18.6056 21L15.7972 12.9703L23 8.02969Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Star;
