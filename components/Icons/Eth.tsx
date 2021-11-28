import { FC, HTMLAttributes } from "react";

const Eth: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="16"
    height="24"
    viewBox="0 0 16 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.94399 17.97L0.579987 13.62L7.94299 24L15.313 13.62L7.94099 17.97H7.94399ZM8.05599 0L0.689987 12.223L8.05499 16.577L15.42 12.227L8.05599 0Z" />
  </svg>
);

export default Eth;
