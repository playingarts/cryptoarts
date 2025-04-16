import { FC, HTMLAttributes } from "react";
import { mockCard as card } from "../../../../../mocks/card";
import Grid from "../../../../../components/Grid";
import Card from "../../../../Card";

const CardSmall: FC<HTMLAttributes<HTMLElement>> = () => (
  <Grid
    css={(theme) => [
      {
        position: "absolute",
        height: "100%",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: "none",
        zIndex: 1,
        [theme.maxMQ.sm]: {
          opacity: 0.08,
        },
      },
    ]}
  >
    <div
      css={(theme) => [
        {
          position: "absolute",
          left: -210,
          height: "100%",
          [theme.maxMQ.sm]: {
            height: "200%",
          },
          gridColumn: "1/-1",
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            position: "sticky",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            "> *": {
              position: "relative",
              top: 0,
              left: 0,
              marginTop: 7,
              marginBottom: 7,

              width: 240,
              height: 336,
            },
            marginTop: 63,
            marginBottom: 70,
            top: 350,
            [theme.maxMQ.sm]: {
              top: 100,
            },

            transform: "rotate(-15deg)",
            ">:nth-child(4)": { gridColumn: 2 },
            ">:nth-child(3)": { top: 150 },
            ">:nth-child(1)": { top: 250 },
          },
        ]}
      >
        {[
          "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-dimonds-burnt-toast-creative.jpg",
          "https://s3.amazonaws.com/img.playingarts.com/contest/retina/232.jpg",
          "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/8-of-clubs-zutto.jpg",
          "https://s3.amazonaws.com/img.playingarts.com/contest/retina/104.jpg",
        ].map((item) => (
          <Card
            card={{ img: item } as unknown as GQL.Card}
            size="small"
            noArtist
          />
        ))}
      </div>
    </div>
  </Grid>
);

export default CardSmall;
