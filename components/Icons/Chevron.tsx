import { FC, HTMLAttributes } from "react";

const Chevron: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="32"
    height="57"
    viewBox="0 0 32 57"
    fill="currentColor"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.67598 0.262853C1.26886 -0.11034 0.63629 -0.0828387 0.263097 0.32428C-0.110096 0.731398 -0.0825942 1.36397 0.324524 1.73716L29.5201 28.4999L0.32428 55.2629C-0.0828384 55.6361 -0.11034 56.2686 0.262853 56.6757C0.636047 57.0829 1.26861 57.1104 1.67573 56.7372L31.6593 29.2522C31.6863 29.2284 31.7124 29.2029 31.7373 29.1757C32.1105 28.7686 32.083 28.136 31.6759 27.7628L1.67598 0.262853Z" />
  </svg>
);

export default Chevron;
