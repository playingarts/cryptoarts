import { FC, HTMLAttributes } from "react";

type Props = {};

const Explore: FC<HTMLAttributes<SVGElement>> = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 9.2125H12.9362L18.19 6.18625L17.4025 4.81375L12.1488 7.85125L15.1862 2.5975L13.8138 1.81L10.7875 7.06375V1H9.2125V7.06375L6.18625 1.81L4.81375 2.5975L7.85125 7.85125L2.5975 4.81375L1.81 6.18625L7.06375 9.2125H1V10.7875H7.06375L1.81 13.8138L2.5975 15.1862L7.85125 12.1488L4.81375 17.4025L6.18625 18.19L9.2125 12.9362V19H10.7875V12.9362L13.8138 18.19L15.1862 17.4025L12.1488 12.1488L17.4025 15.1862L18.19 13.8138L12.9362 10.7875H19V9.2125Z"
        fill="black"
      />
    </svg>
  );
};

export default Explore;
