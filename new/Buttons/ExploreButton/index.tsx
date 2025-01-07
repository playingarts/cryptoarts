import { FC, HTMLAttributes } from "react";
import ButtonTemplate from "../Templates/ButtonTemplate";
import Explore from "../../Icons/Explore";

const ExploreButton: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <ButtonTemplate
      {...props}
      css={(theme) => [
        {
          color: "white",
          background: theme.colors.dark_gray,
          paddingRight: 15,
          "&:hover": {
            background: theme.colors.dark_gray_hover,
          },
        },
      ]}
    >
      <Explore /> {children}
    </ButtonTemplate>
  );
};

export default ExploreButton;
