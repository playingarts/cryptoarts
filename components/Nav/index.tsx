import { FC, HTMLAttributes } from "react";
import Link from "next/link";
import * as classes from "./styles";

const Nav: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <nav {...props} css={classes.root}>
      <Link href="/">
        <a css={classes.link}>Zero</a>
      </Link>

      <Link href="/">
        <a css={classes.link}>one</a>
      </Link>

      <Link href="/">
        <a css={classes.link}>two</a>
      </Link>

      <Link href="/">
        <a css={classes.link}>three</a>
      </Link>

      <Link href="/">
        <a css={classes.link}>special</a>
      </Link>

      <Link href="/">
        <a css={classes.link}>future</a>
      </Link>

      <Link href="/">
        <a css={classes.link}>crypto</a>
      </Link>
    </nav>
  );
};

export default Nav;
