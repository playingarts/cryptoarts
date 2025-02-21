import { FC, forwardRef, HTMLAttributes } from "react";
import Arrow from "../../Icons/Arrow";
import Button, { Props } from "../Button";

const ArrowButton: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  ...props
}) => {
  return (
    <Button {...props} css={{ paddingRight: 10 }}>
      {children}

      <Arrow css={{ marginLeft: 10 }} />
    </Button>
  );
};

export default forwardRef(ArrowButton);
