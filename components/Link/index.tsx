"use client";

import { ClassNames, CSSObject, Theme } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes, useCallback } from "react";

const HEADER_OFFSET = 50;

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
    onClick,
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

  // For hash-only links, use custom scroll handling with consistent offset
  const isHashLink = typeof href === "string" && href.startsWith("#");

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHashLink && typeof href === "string") {
        e.preventDefault();
        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Always use position when at scroll 0 (header in "top" state)
          // The header marginTop changes from -75 to -60 when scrolled, causing layout shift
          // So we measure relative to scroll 0 state and add compensation
          const elementRect = targetElement.getBoundingClientRect();
          const currentScroll = window.scrollY;
          const absoluteTop = elementRect.top + currentScroll;

          // If we're scrolled down, the header layout changes cause a 5px shift
          // Compensate to ensure consistent scroll position
          const headerCompensation = currentScroll > 600 ? 5 : 0;
          const targetScrollPosition = absoluteTop - HEADER_OFFSET - headerCompensation;

          window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth"
          });

          // Update URL hash without scrolling
          window.history.pushState(null, "", href);
        }
      }
      onClick?.(e);
    },
    [href, isHashLink, onClick]
  );

  return (
    <ClassNames>
      {({ cx, css, theme }) => (
        <NextLink
          shallow={shallow}
          href={href}
          as={as}
          replace={replace}
          scroll={isHashLink ? false : scroll}
          passHref={passHref}
          prefetch={prefetch}
          locale={locale}
          {...other}
          ref={ref}
          onClick={handleClick}
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
