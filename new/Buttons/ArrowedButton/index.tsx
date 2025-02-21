import { FC, HTMLAttributes } from "react";
import IconArrow from "../../Icons/IconArrow";
import Button, { Props } from "../Button";

const ArrowedButton: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  ...props
}) => (
  <Button base={true} noColor={true} {...props}>
    <IconArrow css={[{ marginRight: 10 }]} />
    {children}
  </Button>
);

export default ArrowedButton;
