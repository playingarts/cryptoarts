import { FC, HTMLAttributes } from "react";
import Link from "next/link";
import * as classes from "./styles";
import { cx } from "@emotion/css";

const Nav: FC<HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
  return (
    <nav {...props} className={cx(className, classes.root)}>
      <Link href="/">
        <a className={classes.link}>Zero</a>
      </Link>

      <Link href="/">
        <a className={classes.link}>one</a>
      </Link>

      <Link href="/">
        <a className={classes.link}>two</a>
      </Link>

      <Link href="/">
        <a className={classes.link}>three</a>
      </Link>

      <Link href="/">
        <a className={classes.link}>special</a>
      </Link>

      <Link href="/">
        <a className={classes.link}>future</a>
      </Link>

      <Link href="/">
        <a className={classes.link}>crypto</a>
      </Link>
    </nav>
  );
};

export default Nav;
