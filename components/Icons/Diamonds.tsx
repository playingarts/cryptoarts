import { FC, HTMLAttributes } from "react";

const Diamonds: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M5.08302 13L13.1327 21.0496L21.1823 13L13.1327 4.95036L5.08302 13ZM1.22076 11.7126L11.8452 1.08809C12.5563 0.377069 13.7091 0.377071 14.4201 1.0881L25.0446 11.7126C25.7556 12.4236 25.7556 13.5764 25.0446 14.2874L14.4201 24.9119C13.7091 25.6229 12.5563 25.6229 11.8452 24.9119L1.22076 14.2874C0.509732 13.5764 0.509733 12.4236 1.22076 11.7126Z" />
  </svg>
);

export default Diamonds;
