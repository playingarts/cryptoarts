import { Interpolation, Theme } from "@emotion/react";
import { colord } from "colord";
import { FC, Fragment } from "react";
import { useResizeDetector } from "react-resize-detector";
import { theme } from "../../pages/_app";
import { breakpoints } from "../../source/enums";
import Button, { Props as ButtonProps } from "../Button";
import Grid, { Props as GridProps } from "../Grid";
import ThickChevron from "../Icons/ThickChevron";
import { useTruncate } from "../Layout";
import Line from "../Line";
import { useSize } from "../SizeProvider";
import Text from "../Text";

export interface Props extends Omit<GridProps, "title"> {
  buttonProps?: ButtonProps & { css?: Interpolation<Theme> };
  title: string | JSX.Element;
  subTitleText?: string | JSX.Element;
  variant?: "h2" | "h3" | "h4";
  action?: JSX.Element;
  alwaysSubtitle?: boolean;
  noLine?: boolean;
  palette?: "light" | "dark";
}

const BlockTitle: FC<Props> = ({
  title,
  subTitleText,
  buttonProps,
  variant = "h2",
  action,
  alwaysSubtitle,
  noLine,
  palette = "light",
  children,
  ...props
}) => {
  const { truncate, setTruncate } = useTruncate();

  const { height = 0, ref } = useResizeDetector();

  const { width } = useSize();

  return (
    <Fragment>
      <Grid
        short={true}
        {...props}
        {...(setTruncate &&
          truncate !== undefined && { onClick: () => setTruncate(!truncate) })}
      >
        <div css={{ gridColumn: "1/-1", position: "relative" }}>
          <Text
            component="h2"
            variant={variant}
            css={(theme) => [
              {
                [theme.maxMQ.sm]: [theme.typography.h3],
                margin: 0,
                gridColumn: buttonProps ? "1/7" : "1/ -1",
                [theme.maxMQ.sm]: {
                  gridColumn: "1/ span 5",
                },
              },
            ]}
          >
            {title}
          </Text>
          {subTitleText &&
            (!alwaysSubtitle
              ? !alwaysSubtitle && width >= breakpoints.sm
              : true) && (
              <Text
                css={(theme) => [
                  {
                    margin: 0,
                    marginTop: theme.spacing(2),

                    [theme.maxMQ.sm]: {
                      marginTop: theme.spacing(1),
                    },
                  },
                  action || buttonProps
                    ? {
                        gridColumn: "1 / span 7",
                        [theme.maxMQ.md]: {
                          gridColumn: "1 / span 6",
                        },
                      }
                    : {
                        gridColumn: "1 / -1",
                      },
                ]}
                variant="body2"
              >
                {subTitleText}
              </Text>
            )}
          {truncate !== undefined && width < breakpoints.sm && (
            <div
              css={(theme) => [
                {
                  gridColumn: "span 1/-1",
                  display: "flex",
                  zIndex: 1,
                  [theme.maxMQ.sm]: {
                    justifyContent: "flex-end",
                  },
                  [theme.mq.sm]: {
                    gridColumn: "span 3 / -1",
                    alignSelf: "flex-end",
                    justifyContent: "flex-end",
                  },
                },
              ]}
            >
              {width >= breakpoints.sm &&
                (action || <Button {...buttonProps} />)}
              {width < breakpoints.sm && truncate !== undefined && (
                <Button
                  iconProps={{
                    css: [
                      {
                        transform: truncate
                          ? "rotate(90deg)"
                          : "rotate(-90deg)",
                      },
                      palette === "light"
                        ? {
                            color: truncate
                              ? theme.colors.black
                              : colord(theme.colors.black)
                                  .alpha(1)
                                  .toRgbString(),
                          }
                        : {
                            color: truncate
                              ? theme.colors.white
                              : colord(theme.colors.white)
                                  .alpha(1)
                                  .toRgbString(),
                          },
                    ],
                  }}
                  css={{
                    float: "right",
                    position: "absolute",
                    right: 0,
                    bottom: -3,
                  }}
                  Icon={ThickChevron}
                />
              )}
            </div>
          )}
          {(action || buttonProps) && width >= breakpoints.sm && (
            <div
              css={[
                // action && action.props.onClick
                //   ? {
                //       alignSelf: "flex-end",
                //     }
                //   : { marginTop: theme.spacing(0) },
                {
                  // gridColumn: "span 3 / -1",
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                },
              ]}
            >
              {action || <Button {...buttonProps} />}
            </div>
          )}
        </div>
        {!noLine && (
          <div css={{ gridColumn: "-1 / 1" }}>
            <Line
              palette={palette}
              spacing={3}
              css={(theme) => ({
                [theme.maxMQ.sm]: {
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                },
              })}
            />
          </div>
        )}
      </Grid>
      {
        <div
          css={(theme) => [
            {
              [theme.maxMQ.sm]: {
                transition: theme.transitions.fast("height"),
                height: truncate !== true ? height : 0,
                // overflow: "hidden",
                contain: "paint",
              },
              gridColumn: "1/-1",
            },
          ]}
        >
          <div ref={ref} css={{ position: "relative" }}>
            {children ||
              (width < breakpoints.sm && (
                <Text
                  css={(theme) => [
                    {
                      margin: 0,
                      paddingTop: theme.spacing(2),
                    },
                    action || buttonProps
                      ? {
                          gridColumn: "1 / span 7",
                          [theme.maxMQ.md]: {
                            gridColumn: "1 / span 6",
                          },
                        }
                      : {
                          gridColumn: "1 / -1",
                        },
                  ]}
                  variant="body2"
                >
                  {/* {subTitleText} */}
                </Text>
              ))}
          </div>
        </div>
      }
    </Fragment>
  );
};

export default BlockTitle;
