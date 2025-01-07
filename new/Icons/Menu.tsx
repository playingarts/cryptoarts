import { FC, HTMLAttributes } from "react";

const Menu: FC<HTMLAttributes<SVGElement> & { animateOnHover?: boolean }> = ({
  ...props
}) => (
  <svg
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 15.5H3"
      stroke="#333333"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19 7.5H3"
      stroke="#333333"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default Menu;
