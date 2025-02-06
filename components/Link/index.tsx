import { ClassNames, CSSObject, Theme } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

export interface Props
  extends Omit<NextLinkProps, "onClick" | "onMouseEnter" | "onTouchStart">,
    HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  component?: "button";
  activeCss?: ((_: Theme) => CSSInterpolation) | CSSObject;
  target?: HTMLAnchorElement["target"];
}

const Link: ForwardRefRenderFunction<
  NextLinkProps | HTMLButtonElement,
  Props
> = (
  {
    component: Component = NextLink,
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
    passHref = props.passHref ? props.passHref : Component === NextLink,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <ClassNames>
      {({ cx, css, theme }) => (
        <Component
          {...other}
          href={href}
          as={as}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          passHref={passHref}
          prefetch={prefetch}
          locale={locale}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
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
        </Component>
      )}
    </ClassNames>
  );
};

export default forwardRef(Link);
