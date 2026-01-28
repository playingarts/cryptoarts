"use client";

import { FC, HTMLAttributes, useState } from "react";
import Arrow from "../../Icons/Arrow";
import Button, { Props } from "../Button";
import Dot from "../../Icons/Dot";
import Link from "../../Link";

const ArrowButton: FC<
  HTMLAttributes<HTMLElement> & Props & { href?: string }
> = ({ children, size = "big", href, ...props }) => {
  const [hover, setHover] = useState(false);
  const button = (
    <Button
      {...props}
      size={size}
      css={[{ paddingRight: 10 }]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}

      {size === "big" || size === "medium" ? (
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
  return href ? <Link href={href}>{button}</Link> : button;
};

export default ArrowButton;
