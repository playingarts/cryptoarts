import { FC, forwardRef, HTMLAttributes } from "react";
import Arrow from "../../Icons/Arrow";
import ButtonTemplate from "../ButtonTemplate";

const ArrowButton: FC<
  HTMLAttributes<HTMLElement> & { variant: "default" | "border" }
> = ({ children, variant, ...props }) => {
  return (
    <ButtonTemplate
      {...props}
      css={(theme) => [
        {
          color: "white",
          paddingLeft: 15,
          transition: theme.transitions.fast(["background", "border-color"]),
        },
        variant === "default"
          ? {
              background: theme.colors.dark_gray,
              "&:hover": {
                background: theme.colors.dark_gray_hover,
              },
            }
          : {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: theme.colors.dark_gray,
              background: "transparent",
              "&:hover": {
                background: theme.colors.dark_gray_hover,
              },
            },
      ]}
    >
      {children}

      <Arrow />
    </ButtonTemplate>
  );
};

export default forwardRef(ArrowButton);
