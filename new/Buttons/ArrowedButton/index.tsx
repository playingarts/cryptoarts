import { FC, HTMLAttributes } from "react";
import ButtonTemplate from "../Templates/ButtonTemplate";
import IconArrow from "../../Icons/IconArrow";

const ArrowedButton: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => (
  <ButtonTemplate
    css={(theme) => [
      {
        padding: "0 0",
        color: theme.colors.dark_gray,
      },
    ]}
    {...props}
  >
    <IconArrow css={[{ marginRight: 10 }]} />
    {children}
  </ButtonTemplate>
);

export default ArrowedButton;
