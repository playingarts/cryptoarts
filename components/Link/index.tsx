import { forwardRef, ForwardRefRenderFunction, HTMLAttributes } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { ClassNames, Theme, CSSObject } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

export interface Props
  extends NextLinkProps,
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
          <Component
            {...other}
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
        </NextLink>
      )}
    </ClassNames>
  );
};

export default forwardRef(Link);
