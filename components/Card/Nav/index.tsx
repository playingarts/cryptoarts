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
            [theme.maxMQ.sm]: {
              position: "relative",
              top: "85vh",
            },
            top: "100vh",
            zIndex: 1,
            color: theme.colors.text_subtitle_light,
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
              position: "absolute",
              bottom: "50vh",
              left: 0,
              transform: `translate(${theme.spacing(
                5
              )}px, 50%) rotate(-180deg)`,

              [theme.mq.sm]: {
                width: theme.spacing(3.2),
                height: theme.spacing(5.7),
              },
              [theme.maxMQ.sm]: {
                width: theme.spacing(2),
                height: theme.spacing(1.3),
                transform: `translate(${theme.spacing(
                  2.5
                )}px, 50%) rotate(-180deg)`,
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
              position: "absolute",
              bottom: "50vh",
              right: 0,
              transform: `translate(-${theme.spacing(5)}px, 50%)`,
              [theme.mq.sm]: {
                width: theme.spacing(3.2),
                height: theme.spacing(5.7),
              },
              [theme.maxMQ.sm]: {
                width: theme.spacing(2),
                height: theme.spacing(1.3),
                transform: `translate(-${theme.spacing(2.5)}px, 50%)`,
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
                    top: "-90vh",
                    transform: `translate(-${theme.spacing(
                      1.5
                    )}px, ${theme.spacing(14)}px)`,
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
