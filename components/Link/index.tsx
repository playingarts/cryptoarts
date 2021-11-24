import { FC, HTMLAttributes } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export interface Props
  extends NextLinkProps,
    HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  component?: "a" | "button";
}

const Link: FC<Props> = ({
  component: Component = "a",
  children,
  ...props
}) => {
  const {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
    style,
    ...other
  } = props;

  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <Component {...other} style={{ ...style, textDecoration: "none" }}>
        {children}
      </Component>
    </NextLink>
  );
};

export default Link;
