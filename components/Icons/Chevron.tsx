import { FC, HTMLAttributes } from "react";

const Chevron: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    viewBox="0 0 32 57"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.67598 0.262845C1.26886 -0.110348 0.63629 -0.082846 0.263097 0.324272C-0.110096 0.731391 -0.0825942 1.36396 0.324524 1.73715L29.5201 28.4999L0.32428 55.2629C-0.0828385 55.636 -0.11034 56.2686 0.262853 56.6757C0.636046 57.0828 1.26861 57.1104 1.67573 56.7372L31.6594 29.2521C31.6864 29.2283 31.7124 29.2029 31.7373 29.1757C32.1105 28.7686 32.083 28.136 31.6759 27.7628L1.67598 0.262845Z"
    />
  </svg>
);

export default Chevron;
