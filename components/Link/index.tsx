import { FC, HTMLAttributes } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { Interpolation, Theme } from "@emotion/react";

export interface Props
  extends NextLinkProps,
    HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  component?: "a" | "button";
  activeCss?: Interpolation<Theme>;
}

const Link: FC<Props> = ({
  component: Component = "a",
  children,
  style,
  activeCss,
  ...props
}) => {
  const router = useRouter();
  const {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref = props.passHref ? props.passHref : Component === "a",
    prefetch,
    locale,
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
        <span
          css={new RegExp(`^${href}`, "i").test(router.asPath) && activeCss}
        >
          {children}
        </span>
      </Component>
    </NextLink>
  );
};

export default Link;
