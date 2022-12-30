import { ClassNames, Theme } from "@emotion/react";
import { CSSInterpolation, CSSObject } from "@emotion/serialize";
import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  useEffect,
} from "react";
import Button from "../../Button";
import Cross from "../../Icons/Cross";
import ThickChevron from "../../Icons/ThickChevron";
import Link, { Props as LinkProps } from "../../Link";

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

  return (
    <div {...props} ref={ref} css={{ position: "relative" }}>
      <div
        css={[
          {
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            // todo: max width
            // maxWidth: theme.spacing(150),
            // margin: "0 auto",
            // left: "50%",
            // transform: "translateX(-50%)",
            // // transform: "rotate(15deg)",
            pointerEvents: "none",
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              // width: "100%",
              position: "sticky",
              // top: 425,
              height: "55%",
              top: 0,
              // top: theme.spacing(36.5),
              // bottom: "-100vh",
              zIndex: 5,
              [theme.maxMQ.sm]: [stopOnMobile && { position: "relative" }],
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                maxWidth: theme.spacing(142),
                margin: "0 auto",
                top: theme.spacing(37.2),
                padding: `0 ${theme.spacing(5)}px`,
                boxSizing: "content-box",
                position: "relative",
                [theme.maxMQ.sm]: {
                  padding: `0 ${theme.spacing(1)}px`,
                  top: theme.spacing(28),
                },
              },
            ]}
          >
            <div
              css={{
                position: "relative",
              }}
            >
              {prevLink && (
                <Button
                  {...options}
                  {...prevLinkOptions}
                  component={Link}
                  Icon={ThickChevron}
                  href={prevLink}
                  css={(theme) => [
                    {
                      zIndex: 50,
                      pointerEvents: "auto",

                      transform: `rotate(-180deg)`,

                      borderRadius: "100%",
                      width: theme.spacing(5),
                      height: theme.spacing(5),
                      [theme.mq.sm]: {
                        background: theme.colors.dark_gray,
                        transition: theme.transitions.fast("all"),
                        "&:hover": {
                          color: theme.colors.white,
                        },
                      },
                    },
                  ]}
                />
              )}
              {nextLink && (
                <Button
                  {...options}
                  {...nextLinkOptions}
                  component={Link}
                  Icon={ThickChevron}
                  href={nextLink}
                  css={(theme) => ({
                    pointerEvents: "auto",
                    position: "absolute",
                    right: 0,
                    borderRadius: "100%",
                    width: theme.spacing(5),
                    height: theme.spacing(5),
                    [theme.mq.sm]: {
                      background: theme.colors.dark_gray,
                      transition: theme.transitions.fast("all"),
                      "&:hover": {
                        color: theme.colors.white,
                      },
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
                        pointerEvents: "auto",
                        borderRadius: "100%",
                        width: theme.spacing(5),
                        height: theme.spacing(5),
                        top: -theme.spacing(18),
                        [theme.mq.sm]: {
                          top: -theme.spacing(23.5),
                          background: theme.colors.dark_gray,
                          transition: theme.transitions.fast("all"),
                          "&:hover": {
                            color: theme.colors.white,
                          },
                        },
                      })}
                    />
                  )}
                </ClassNames>
              )}
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default forwardRef(CardNav);
