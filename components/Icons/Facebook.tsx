import { FC, HTMLAttributes } from "react";

const Facebook: FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.2013 3.02148C28.0219 3.02148 29.5 4.49963 29.5 6.32023V26.7227C29.5 28.5433 28.0219 30.0215 26.2013 30.0215H20.5867V19.8482H24.0988L24.7671 15.4913H20.5867V12.6638C20.5867 11.4719 21.1707 10.31 23.0431 10.31H24.9438V6.60062C24.9438 6.60062 23.2188 6.30626 21.5697 6.30626C18.1268 6.30626 15.8765 8.3929 15.8765 12.1705V15.4913H12.0494V19.8482H15.8765V30.0215H5.79875C3.97814 30.0215 2.5 28.5433 2.5 26.7227V6.32023C2.5 4.49963 3.97809 3.02148 5.79875 3.02148H26.2013V3.02148Z"
    />
  </svg>
);

export default Facebook;
