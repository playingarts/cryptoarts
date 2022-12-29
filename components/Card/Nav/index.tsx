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
                      // top: "-100vh",
                      // bottom: theme.spacing(44.5),
                      // position: "sticky",

                      // transform: `translate(${theme.spacing(
                      //   5
                      // )}px, ${theme.spacing(37.2)}px) rotate(-180deg)`,
                      // top: 372,

                      transform: `rotate(-180deg)`,

                      background: theme.colors.dark_gray,
                      borderRadius: "100%",
                      width: theme.spacing(5),
                      height: theme.spacing(5),
                      [theme.mq.sm]: {
                        transition: theme.transitions.fast("all"),
                        "&:hover": {
                          color: theme.colors.white,
                        },
                      },
                      // [theme.maxMQ.sm]: {
                      //   transform: `translate(calc(-50% + ${theme.spacing(
                      //     2.5
                      //   )}px + ${theme.spacing(
                      //     1.25
                      //   )}px), calc(-50% + ${theme.spacing(
                      //     29.75
                      //   )}px + ${theme.spacing(0.75)}px)) rotate(-180deg)`,
                      // },
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
                    // top: "-100vh",
                    pointerEvents: "auto",
                    position: "absolute",
                    // top: theme.spacing(-42.5),
                    // bottom: theme.spacing(44.5),
                    right: 0,
                    // transform: `translate(-${theme.spacing(5)}px, ${theme.spacing(
                    //   37.2
                    // )}px)`,
                    background: theme.colors.dark_gray,
                    borderRadius: "100%",
                    width: theme.spacing(5),
                    height: theme.spacing(5),
                    [theme.mq.sm]: {
                      transition: theme.transitions.fast("all"),
                      "&:hover": {
                        color: theme.colors.white,
                      },
                    },
                    [theme.maxMQ.sm]: {
                      // transform: `translate(calc(50% - ${theme.spacing(
                      //   2.5
                      // )}px - ${theme.spacing(
                      //   1.25
                      // )}px), calc(-50% + ${theme.spacing(
                      //   29.75
                      // )}px + ${theme.spacing(0.75)}px))`,
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
                        background: theme.colors.dark_gray,
                        position: "absolute",
                        // right: -50,
                        right: 0,
                        top: -theme.spacing(23.5),
                        // top: 0,
                        // top: "-100vh",
                        pointerEvents: "auto",
                        // transform: `translate(-${theme.spacing(
                        //   5
                        // )}px, ${theme.spacing(14)}px)`,
                        borderRadius: "100%",
                        width: theme.spacing(5),
                        height: theme.spacing(5),
                        [theme.mq.sm]: {
                          transition: theme.transitions.fast("all"),
                          "&:hover": {
                            color: theme.colors.white,
                          },
                        },
                        [theme.maxMQ.sm]: {
                          top: -theme.spacing(16),
                          // transform: `translate(-${theme.spacing(
                          //   1.5
                          // )}px, ${theme.spacing(11)}px)`,
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
