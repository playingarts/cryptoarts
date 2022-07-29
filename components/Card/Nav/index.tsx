import { ClassNames, Theme } from "@emotion/react";
import { CSSInterpolation, CSSObject } from "@emotion/serialize";
import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  useEffect,
} from "react";
import { breakpoints } from "../../../source/enums";
import Button from "../../Button";
import Chevron from "../../Icons/Chevron";
import Cross from "../../Icons/Cross";
import ThickChevron from "../../Icons/ThickChevron";
import Link, { Props as LinkProps } from "../../Link";
import { useSize } from "../../SizeProvider";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  prevLink?: LinkProps["href"];
  nextLink?: LinkProps["href"];
  closeLink?: LinkProps["href"];
  options?: Omit<LinkProps, "href" | "color">;
  nextLinkOptions?: Omit<LinkProps, "href" | "color">;
  prevLinkOptions?: Omit<LinkProps, "href" | "color">;
  closeLinkOptions?: Omit<LinkProps, "href" | "color"> & {
    css?: ((_: Theme) => CSSInterpolation) | CSSObject;
  };
  disableKeys?: boolean;
  stopOnMobile?: boolean;
}

const CardNav: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    nextLinkOptions,
    prevLinkOptions,
    prevLink,
    nextLink,
    closeLink,
    children,
    options,
    disableKeys,
    closeLinkOptions,
    stopOnMobile,
    ...props
  },
  ref
) => {
  const { push } = useRouter();

  useEffect(() => {
    if (disableKeys) {
      return;
    }

    const keyHandler = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft" && prevLink) {
        return push(prevLink, undefined, options);
      }

      if (event.code === "ArrowRight" && nextLink) {
        return push(nextLink, undefined, options);
      }

      if (event.code === "Escape" && closeLink) {
        return push(closeLink, undefined, options);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [push, prevLink, nextLink, closeLink, disableKeys]);

  const { width } = useSize();

  return (
    <div {...props} ref={ref}>
      <div
        css={(theme) => [
          {
            position: "sticky",
            top: "100vh",
            // top: theme.spacing(36.5),
            // bottom: "-100vh",
            zIndex: 1,
            [theme.maxMQ.sm]: [stopOnMobile && { position: "relative" }],
          },
        ]}
      >
        {prevLink && (
          <Button
            {...options}
            {...prevLinkOptions}
            component={Link}
            Icon={width >= breakpoints.sm ? Chevron : ThickChevron}
            href={prevLink}
            css={(theme) => ({
              top: "-100vh",
              // bottom: theme.spacing(44.5),
              position: "absolute",
              left: 0,
              transform: `translate(${theme.spacing(5)}px, ${theme.spacing(
                37.2
              )}px) rotate(-180deg)`,

              [theme.mq.sm]: {
                width: theme.spacing(3.2),
                height: theme.spacing(5.7),
              },
              [theme.maxMQ.sm]: {
                width: theme.spacing(2),
                height: theme.spacing(1.3),
                transform: `translate(${theme.spacing(2.5)}px, ${theme.spacing(
                  29.75
                )}px) rotate(-180deg)`,
              },
            })}
          />
        )}
        {nextLink && (
          <Button
            {...options}
            {...nextLinkOptions}
            component={Link}
            Icon={width >= breakpoints.sm ? Chevron : ThickChevron}
            href={nextLink}
            css={(theme) => ({
              top: "-100vh",
              position: "absolute",
              // top: theme.spacing(-42.5),
              bottom: theme.spacing(44.5),
              right: 0,
              transform: `translate(-${theme.spacing(5)}px, ${theme.spacing(
                37.2
              )}px)`,
              [theme.mq.sm]: {
                width: theme.spacing(3.2),
                height: theme.spacing(5.7),
              },
              [theme.maxMQ.sm]: {
                width: theme.spacing(2),
                height: theme.spacing(1.3),
                transform: `translate(-${theme.spacing(2.5)}px, ${theme.spacing(
                  29.75
                )}px)`,
              },
            })}
          />
        )}
        {closeLink && (
          <ClassNames>
            {({ cx, css, theme }) => (
              <Button
                {...options}
                {...closeLinkOptions}
                component={Link}
                Icon={Cross}
                href={closeLink}
                {...(closeLinkOptions && {
                  className: cx(
                    css(
                      typeof closeLinkOptions.css === "function"
                        ? closeLinkOptions.css(theme)
                        : closeLinkOptions.css
                    )
                  ),
                })}
                css={(theme) => ({
                  position: "absolute",
                  right: 0,
                  top: "-100vh",
                  transform: `translate(-${theme.spacing(5)}px, ${theme.spacing(
                    14
                  )}px)`,
                  [theme.mq.sm]: {
                    borderRadius: "100%",
                    border: `${theme.spacing(0.2)}px solid currentColor`,
                  },
                  [theme.maxMQ.sm]: {
                    transform: `translate(-${theme.spacing(
                      1.5
                    )}px, ${theme.spacing(11)}px)`,
                  },
                })}
              />
            )}
          </ClassNames>
        )}
      </div>

      {children}
    </div>
  );
};

export default forwardRef(CardNav);
