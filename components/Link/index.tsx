"use client";

import { ClassNames, CSSObject, Theme } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

export interface Props
  extends Omit<NextLinkProps, "onClick" | "onMouseEnter" | "onTouchStart">,
    HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  component?: "a" | "button";
  activeCss?: ((_: Theme) => CSSInterpolation) | CSSObject;
  target?: HTMLAnchorElement["target"];
}

const Link: ForwardRefRenderFunction<HTMLAnchorElement, Props> = (
  {
    component: Component = "a",
    children,
    style,
    activeCss,
    className,
    ...props
  },
  ref
) => {
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
    <ClassNames>
      {({ cx, css, theme }) => (
        <NextLink
          shallow={true}
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          passHref={passHref}
          prefetch={prefetch}
          locale={locale}
          {...other}
          ref={ref}
          css={{ color: "inherit" }}
          style={{ ...style, textDecoration: "none" }}
          className={cx(
            className,
            activeCss &&
              typeof href === "string" &&
              new RegExp(`^${href}($|/|\\?)`, "i").test(router.asPath) &&
              css(
                typeof activeCss === "function" ? activeCss(theme) : activeCss
              )
          )}
        >
          {children}
        </NextLink>
      )}
    </ClassNames>
  );
};

export default forwardRef(Link);
