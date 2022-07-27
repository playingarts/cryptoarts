import { FC, HTMLAttributes } from "react";

const ThickChevron: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    // width="13"
    // height="21"
    viewBox="0 0 13 21"
    fill="currentColor"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.820882 20.0862C0.359058 19.5731 0.400656 18.7827 0.913794 18.3209L9.88144 10.25L0.913795 2.17912C0.400657 1.7173 0.35906 0.926934 0.820884 0.413796C1.28271 -0.0993415 2.07307 -0.140939 2.58621 0.320886L12.5862 9.32089C12.8496 9.55794 13 9.89565 13 10.25C13 10.6044 12.8496 10.9421 12.5862 11.1791L2.58621 20.1791C2.07307 20.6409 1.28271 20.5993 0.820882 20.0862Z"
    />
  </svg>
);

export default ThickChevron;
