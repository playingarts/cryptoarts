import { FC, HTMLAttributes } from "react";

type Props = {};

const Explore: FC<HTMLAttributes<SVGElement>> = (props: Props) => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 10.7125H13.9362L19.19 7.68625L18.4025 6.31375L13.1488 9.35125L16.1862 4.0975L14.8138 3.31L11.7875 8.56375V2.5H10.2125V8.56375L7.18625 3.31L5.81375 4.0975L8.85125 9.35125L3.5975 6.31375L2.81 7.68625L8.06375 10.7125H2V12.2875H8.06375L2.81 15.3138L3.5975 16.6862L8.85125 13.6488L5.81375 18.9025L7.18625 19.69L10.2125 14.4362V20.5H11.7875V14.4362L14.8138 19.69L16.1862 18.9025L13.1488 13.6488L18.4025 16.6862L19.19 15.3138L13.9362 12.2875H20V10.7125Z"
        fill="white"
      />
    </svg>
  );
};

export default Explore;
