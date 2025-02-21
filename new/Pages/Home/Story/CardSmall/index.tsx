import { FC, HTMLAttributes } from "react";
import { mockCard as card } from "../../../../../mocks/card";
import Grid from "../../../../../components/Grid";

const CardSmall: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid
    css={[
      {
        position: "absolute",
        height: "100%",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: "none",
      },
    ]}
  >
    <div
      css={[
        {
          position: "absolute",
          left: -210,
          height: "100%",
          gridColumn: "1/-1",
        },
      ]}
    >
      <div
        css={[
          {
            position: "sticky",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            "> *": {
              position: "relative",
              top: 0,
              left: 0,
              margin: "7px 5px",

              width: 240,
              height: 336,
              boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
            },
            marginTop: 63,
            marginBottom: 70,
            top: 350,
            //   top: 100,

            transform: "rotate(-15deg)",
            "img:nth-child(4)": { gridColumn: 2 },
            "img:nth-child(3)": { top: 150 },
            // "img:nth-child(2)": { top: 0, left: 250 },
            "img:nth-child(1)": { top: 250 },
          },
        ]}
      >
        <img
          loading="lazy"
          src={
            "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-dimonds-burnt-toast-creative.jpg"
          }
          alt={card.info}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                borderRadius: theme.spacing(1.5),
              },
              [theme.maxMQ.sm]: {
                borderRadius: theme.spacing(1),
              },
            },
          ]}
        />
        <img
          loading="lazy"
          src={
            "https://s3.amazonaws.com/img.playingarts.com/contest/retina/232.jpg"
          }
          alt={card.info}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                borderRadius: theme.spacing(1.5),
              },
              [theme.maxMQ.sm]: {
                borderRadius: theme.spacing(1),
              },
            },
          ]}
        />
        <img
          loading="lazy"
          src={
            "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/8-of-clubs-zutto.jpg"
          }
          alt={card.info}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                borderRadius: theme.spacing(1.5),
              },
              [theme.maxMQ.sm]: {
                borderRadius: theme.spacing(1),
              },
            },
          ]}
        />
        <img
          loading="lazy"
          src={
            "https://s3.amazonaws.com/img.playingarts.com/contest/retina/104.jpg"
          }
          alt={card.info}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                borderRadius: theme.spacing(1.5),
              },
              [theme.maxMQ.sm]: {
                borderRadius: theme.spacing(1),
              },
            },
          ]}
        />
      </div>
    </div>
  </Grid>
);

export default CardSmall;
