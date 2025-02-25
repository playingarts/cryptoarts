import { FC, forwardRef, HTMLAttributes, useState } from "react";
import Arrow from "../../Icons/Arrow";
import Button, { Props } from "../Button";
import Chevron from "../../../components/Icons/Chevron";
import Dot from "../../Icons/Dot";

const ArrowButton: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  size = "big",
  ...props
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Button
      {...props}
      size={size}
      css={[{ paddingRight: size === "big" ? 10 : 3 }]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}

      {size === "big" ? (
        <Arrow css={{ marginLeft: 10 }} />
      ) : (
        <Dot
          css={(theme) => [
            {
              position: "relative",
              transition: theme.transitions.fast("left"),
            },
          ]}
          style={{ left: hover ? 3 : 0 }}
        />
      )}
    </Button>
  );
};

export default forwardRef(ArrowButton);
