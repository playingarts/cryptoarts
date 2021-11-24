import { FC, HTMLAttributes } from "react";
import Link from "../Link";
import * as classes from "./styles";

const Nav: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <nav {...props} css={classes.root}>
      <Link href="/" css={classes.link}>
        Zero
      </Link>

      <Link href="/" css={classes.link}>
        one
      </Link>

      <Link href="/" css={classes.link}>
        two
      </Link>

      <Link href="/" css={classes.link}>
        three
      </Link>

      <Link href="/" css={classes.link}>
        special
      </Link>

      <Link href="/" css={classes.link}>
        future
      </Link>

      <Link href="/" css={classes.link}>
        crypto
      </Link>
    </nav>
  );
};

export default Nav;
