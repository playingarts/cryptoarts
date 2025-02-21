import { FC, HTMLAttributes } from "react";
import { mockCard as card } from "../../../../../mocks/card";

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
            boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
          },
          width: 360,
          height: 506,
          "img:nth-child(2)": { transform: "rotate(5deg)" },
          "img:nth-child(1)": { transform: "rotate(-12deg)" },
        },
      ]}
    >
      <img
        loading="lazy"
        src={
          "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/8-of-clubs-zutto.jpg"
        }
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
        src={
          // "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-antonio-uve.jpg"
          "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/8-of-clubs-zutto.jpg"
        }
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
        src={
          "https://s3.amazonaws.com/img.playingarts.com/one-big-hd/7-of-spades-muxxi.jpg"
        }
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
