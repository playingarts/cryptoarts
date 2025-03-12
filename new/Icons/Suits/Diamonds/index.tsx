import { FC, HTMLAttributes } from "react";

const Diamonds: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.08328 14L14.1329 22.0496L22.1826 14L14.1329 5.95036L6.08328 14ZM2.22102 12.7126L12.8455 2.08809C13.5565 1.37707 14.7093 1.37707 15.4203 2.0881L26.0448 12.7126C26.7559 13.4236 26.7559 14.5764 26.0448 15.2874L15.4203 25.9119C14.7093 26.6229 13.5565 26.6229 12.8455 25.9119L2.22101 15.2874C1.50999 14.5764 1.50999 13.4236 2.22102 12.7126Z"
      fill="currentColor"
    />
  </svg>
);

export default Diamonds;
