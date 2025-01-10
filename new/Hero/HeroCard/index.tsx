import { FC, HTMLAttributes } from "react";
import { mockCard as card } from "../../../mocks/card";

const HeroCard: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div
      css={[
        {
          position: "relative",
          "> *": {
            position: "absolute",
            top: 0,
            left: 0,
          },
          width: 360,
          height: 506,
          "img:nth-child(2)": { transform: "rotate(7.58deg)" },
          "img:nth-child(1)": { transform: "rotate(-15deg)" },
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
    </div>
  );
};

export default HeroCard;
