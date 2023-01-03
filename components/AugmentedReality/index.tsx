import { FC, HTMLAttributes } from "react";
import { breakpoints } from "../../source/enums";
import BlockTitle from "../BlockTitle";
import Grid from "../Grid";
import Line from "../Line";
import { useSize } from "../SizeProvider";
import StatBlock from "../StatBlock";
import StoreButtons from "../StoreButtons";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  palette: "dark" | "light";
}

const AugmentedReality: FC<Props> = ({ palette, ...props }) => {
  const { width } = useSize();
  return (
    <Grid>
      <StatBlock
        {...props}
        css={(theme) => [
          {
            background:
              "url(https://s3.amazonaws.com/img.playingarts.com/www/static/ar_app.png) bottom right no-repeat",
            gridColumn: "1 / -1",

            [theme.maxMQ.sm]: [
              {
                padding: 0,
                background: "none",
              },
            ],
            [theme.mq.sm]: {
              backgroundColor: theme.colors.white,
              padding: theme.spacing(10.5),
              [theme.maxMQ.md]: {
                padding: theme.spacing(7.5),
                backgroundPositionX: "120%",
              },
              backgroundSize: "50%",
              // paddingTop: theme.spacing(10.5),
              // paddingBottom: theme.spacing(10.5),
            },
          },
        ]}
      >
        <BlockTitle
          palette={width >= breakpoints.sm ? "light" : palette}
          title="Augmented Reality"
          variant={"h3"}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                gridTemplateColumns: `repeat(auto-fill, ${theme.spacing(
                  7.5
                )}px)`,
              },
            },
          ]}
          noLine={width >= breakpoints.sm}
        >
          <Grid
            css={(theme) => [
              {
                [theme.maxMQ.sm]: {
                  background:
                    "url(https://s3.amazonaws.com/img.playingarts.com/www/static/ar_app.png) bottom right no-repeat",
                  backgroundPosition: "center bottom",
                  backgroundSize: `${theme.spacing(42)}px ${theme.spacing(
                    34.5
                  )}px`,
                  paddingBottom: theme.spacing(33.6),
                },
              },
            ]}
          >
            <div
              css={(theme) => [
                {
                  gridColumn: "2 / span 5",
                  [theme.maxMQ.sm]: {
                    gridColumn: "1/-1",
                  },
                },
              ]}
            >
              <Text variant="body2">
                Playing Arts is a collective art project for creative people who
                are into Art, Playing Cards, NFTs and sometimes magic.
              </Text>
              {width >= breakpoints.sm && (
                <Line palette={palette} spacing={1} />
              )}
              <StoreButtons palette="dark" ButtonProps={{ color: "black" }} />
            </div>
          </Grid>
        </BlockTitle>
      </StatBlock>
    </Grid>
  );
};

export default AugmentedReality;
