import { FC, HTMLAttributes } from "react";

export interface Props {
  inset?: boolean;
  opacity?: number;
}

const ScandiBlock: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  inset = false,
  opacity = 1,
  ...props
}) => {
  return (
    <div
      css={[
        {
          display: "flex",
          boxShadow: inset
            ? `inset 0px 1px 0px rgba(0, 0, 0, ${opacity})`
            : `0px -1px 0px rgba(0, 0, 0, ${opacity})`,
          alignItems: "center",
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScandiBlock;
