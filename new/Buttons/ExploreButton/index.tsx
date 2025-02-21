import { FC, HTMLAttributes } from "react";
import Explore from "../../Icons/Explore";
import Button, { Props } from "../Button";

const ExploreButton: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      css={[
        {
          paddingLeft: 10,
        },
      ]}
    >
      <Explore css={[{ marginRight: 10 }]} /> {children}
    </Button>
  );
};

export default ExploreButton;
