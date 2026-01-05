import { FC, HTMLAttributes } from "react";

const Hearts: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M13 17.403L20.0611 4.65172L5.93894 4.65172L13 17.403ZM11.387 22.2322C12.1015 23.5225 13.8985 23.5225 14.613 22.2322L24.8841 3.68398C25.5951 2.40007 24.7002 0.799952 23.2711 0.799951L2.72889 0.79995C1.29984 0.799949 0.404911 2.40007 1.11588 3.68398L11.387 22.2322Z"
    />
  </svg>
);

export default Hearts;
