import { FC, HTMLAttributes } from "react";
import { mockCard as card } from "../../../mocks/card";

const CardSmall: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <div
    css={[
      {
        position: "absolute",
        gridColumn: "1 / -1",
        height: "100%",
        left: 80,
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
          marginTop: 70,
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
            width: "100%",
            height: "100%",
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
            width: "100%",
            height: "100%",
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
            width: "100%",
            height: "100%",
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
            width: "100%",
            height: "100%",
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
);

export default CardSmall;
