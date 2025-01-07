import { ClassNames, CSSObject, Theme } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";

export interface Props
  extends Omit<NextLinkProps, "onClick" | "onMouseEnter" | "onTouchStart">,
    HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  component?: "a" | "button";
  activeCss?: ((_: Theme) => CSSInterpolation) | CSSObject;
  target?: HTMLAnchorElement["target"];
}

const Link: ForwardRefRenderFunction<
  HTMLAnchorElement | HTMLButtonElement,
  Props
> = (
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
        <Component
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
          {...(Component === "a" &&
            ({
              href,
              as,
              replace,
              shallow,
              passHref,
              prefetch,
              locale,
              scroll,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any))}
          {...other}
        >
          {children}
        </Component>
      )}
    </ClassNames>
  );
};

export default forwardRef(Link);
