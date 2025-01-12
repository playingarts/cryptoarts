import { FC, forwardRef, HTMLAttributes } from "react";
import Arrow from "../../../Icons/Arrow";
import ButtonTemplate from "../ButtonTemplate";

export interface Props {
  variant?: "default" | "border" | "accent";
}

const ArrowButton: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <ButtonTemplate
      {...props}
      css={(theme) => [
        {
          paddingLeft: 15,
          transition: theme.transitions.fast(["background", "border-color"]),
        },
        variant === "default" || variant === "accent"
          ? [
              {
                color: "white",
                background:
                  theme.colors[variant === "accent" ? "accent" : "dark_gray"],
              },
              variant === "default" && {
                "&:hover": {
                  background: theme.colors.dark_gray_hover,
                },
              },
            ]
          : {
              color: theme.colors.dark_gray,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: theme.colors.dark_gray,
              background: "transparent",
              "&:hover": {
                color: "white",
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
