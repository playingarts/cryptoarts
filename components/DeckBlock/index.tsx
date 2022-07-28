import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  HTMLAttributes,
} from "react";
import { breakpoints } from "../../source/enums";
import BlockTitle from "../BlockTitle";
import Button from "../Button";
import Grid from "../Grid";
import Bag from "../Icons/Bag";
import Line from "../Line";
import Link from "../Link";
import { useSize } from "../SizeProvider";
import Text from "../Text";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  deck: GQL.Deck;
  palette: "light" | "dark";
}

const DeckBlock: ForwardRefRenderFunction<HTMLElement, Props> = ({
  deck,
  palette,
  ...props
}) => {
  const { width } = useSize();
  return (
    <Grid
      css={(theme) => [
        {
          [theme.mq.sm]: {
            background: `url(${deck.image}) no-repeat`,
            backgroundSize: `${theme.spacing(50)}px ${theme.spacing(50)}px`,
            backgroundPosition: "bottom left",
            width: "fit-content",
            margin: "0 auto",
          },
        },
      ]}
    >
      <BlockTitle
        variant="h3"
        title={width < breakpoints.sm ? "Physical Deck" : deck.title}
        subTitleText={deck.description}
        noLine={true}
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              gridColumn: "1 / -1",
              order: -1,
            },
            [theme.mq.sm]: {
              gridColumn: "span 4 / 10",
              display: "block",
            },
            [theme.mq.md]: {
              gridColumn: "span 5 / 12",
            },
          },
        ]}
      >
        <Grid {...props} css={{ gridColumn: "1/-1" }}>
          {width < breakpoints.sm && (
            <Fragment>
              <Text variant="body2" css={[{ gridColumn: "1/-1" }]}>
                {deck.description}
              </Text>
              <div
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: [
                      {
                        gridColumn: "1 / -1",
                        height: theme.spacing(28),
                      },
                    ],
                    [theme.mq.sm]: {
                      gridColumn: "span 5",
                      gridRow: "span 3",
                    },
                    [theme.mq.md]: {
                      gridColumn: "span 6",
                    },
                    flexBasis: "50%",
                    display: "block",
                    background: `url(${deck.image}) 50% 50% no-repeat`,
                    backgroundSize: "contain",
                  },
                ]}
              />
            </Fragment>
          )}

          <dl
            css={(theme) => ({
              color: theme.colors.text_title_dark,
              margin: 0,
              [theme.maxMQ.sm]: [
                {
                  color:
                    palette === "dark"
                      ? theme.colors.white
                      : theme.colors.black,
                },
                {
                  gridColumn: "1 / -1",
                },
              ],
              [theme.mq.sm]: {
                gridColumn: "span 4 / 10",
              },
              [theme.mq.md]: {
                gridColumn: "span 5 / 12",
              },
            })}
          >
            <Line spacing={1} />
            {Object.entries(deck.properties).map(([key, value]) => (
              <Fragment key={key}>
                <div
                  css={(theme) => ({
                    display: "grid",
                    gap: theme.spacing(3),
                    gridTemplateColumns: `repeat(auto-fit, ${theme.spacing(
                      7.5
                    )}px) `,
                    paddingTop: theme.spacing(0.5),
                    paddingBottom: theme.spacing(0.5),
                  })}
                >
                  <Text
                    component="dt"
                    variant="h7"
                    css={(theme) => ({
                      color: theme.colors.text_subtitle_dark,
                      [theme.maxMQ.sm]: {
                        color:
                          palette === "dark"
                            ? theme.colors.text_subtitle_light
                            : theme.colors.text_subtitle_dark,
                      },
                    })}
                  >
                    {key}
                  </Text>
                  <Text
                    component="dd"
                    css={(theme) => [
                      {
                        gridColumn: "2 / -1",
                        fontSize: 16,
                        margin: 0,
                        color: theme.colors.text_subtitle_dark,
                        [theme.maxMQ.sm]: {
                          color:
                            palette === "dark"
                              ? theme.colors.text_title_light
                              : theme.colors.text_title_dark,
                        },
                      },
                    ]}
                  >
                    {value}
                  </Text>
                </div>
                <Line spacing={1} />
              </Fragment>
            ))}
          </dl>

          <Button
            color="black"
            component={Link}
            href="/shop"
            Icon={Bag}
            css={(theme) => [
              {
                width: "100%",
                justifyContent: "center",
                marginTop: theme.spacing(3.5),
                marginBottom: theme.spacing(2.5),
                [theme.maxMQ.sm]: [
                  {
                    gridColumn: "1 / -1",
                  },
                ],
                [theme.mq.sm]: {
                  gridColumn: "span 2/ 8",
                },
                [theme.mq.md]: {
                  gridColumn: "span 2/ 9",
                },
              },
              palette === "dark" &&
                width < breakpoints.sm && {
                  background: theme.colors.page_bg_light,
                  color: theme.colors.page_bg_dark,
                },
            ]}
          >
            Buy now
          </Button>
        </Grid>
      </BlockTitle>
    </Grid>
  );
};

export default forwardRef(DeckBlock);
