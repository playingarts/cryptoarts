import { FC, HTMLAttributes } from "react";

const ScandiBlock: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      css={[
        { display: "flex", borderTop: "1px black solid", alignItems: "center" },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScandiBlock;
