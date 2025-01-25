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
      },
    ]}
  >
    <div
      css={[
        {
          position: "absolute",
          left: -220,
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
              height: 350,
            },
            marginTop: 28.41,
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
          src={card.img}
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
          src={card.img}
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
          src={card.img}
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
          src={card.img}
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
