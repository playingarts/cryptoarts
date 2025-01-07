import React, { FC, HTMLAttributes } from "react";
import Text from "../Text";

type Props = {};

const ButtonTemplate: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <Text
      css={[
        {
          userSelect: "none",
          height: 45,
          borderRadius: 7,
          color: "white",
          fontSize: 25,
          fontWeight: 400,
          lineHeight: "45px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          paddingLeft: 10,
          paddingRight: 10,
          boxSizing: "border-box",
          display: "flex",
          gap: 10,
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
          },
        },
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ButtonTemplate;
