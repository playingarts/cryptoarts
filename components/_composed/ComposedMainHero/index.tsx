import { CSSObject } from "@emotion/serialize";
import { FC, Fragment, HTMLAttributes } from "react";
import { theme } from "../../../pages/_app";
import { breakpoints } from "../../../source/enums";
import Card from "../../Card";
import SizeProvider, { useSize } from "../../SizeProvider";

const cards = [
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/8-of-spades-gary-fernandez.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/4-of-hearts-steve-simpson.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/4-of-spades-inkration-studio.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-dimonds-burnt-toast-creative.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/232.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/104.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/10-of-spades-bratislav-milenkovic.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/7-of-spades-muxxi.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/future/cards/card-antonio-uve.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/two-small-hd/8-of-diamonds-mathis-rekowski.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
  {
    _id: "card",
    video: "",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/000.jpg",
    value: "",
    suit: "",
    info: "",
    deck: "",
    artist: "",
    opensea: "",
  },
];

const commonCss: CSSObject = {
  display: "inline-block",
  position: "relative",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
};

const ComposedMainHero: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const { width } = useSize();
  return (
    <SizeProvider>
      <div {...props}>
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[0] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%)",
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[1] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[2] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%)",
            },
          ]}
        />
        <br />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[3] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%)",
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[4] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[5] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%)",
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[6] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
            },
          ]}
        />
        <br />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[7] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%) rotate(-10.62deg)",
              top: theme.spacing(20.3),
              left: theme.spacing(7),
              zIndex: 1,
              [theme.maxMQ.sm]: {
                top: theme.spacing(35.5),
              },
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[8] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={(theme) => [
            {
              ...commonCss,
              [theme.mq.sm]: {
                top: theme.spacing(3.4),
              },
            },
          ]}
        />
        <Card
          interactive={true}
          noInfo={true}
          card={(cards[9] as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%)",
            },
          ]}
        />
        {width >= breakpoints.sm && (
          <Fragment>
            <br />
            <Card
              interactive={true}
              noInfo={true}
              card={(cards[10] as unknown) as GQL.Card}
              customSize={true}
              filter={true}
              css={(theme) => [
                {
                  ...commonCss,
                  transform: "translateX(100%) rotate(30deg)",
                  marginLeft: theme.spacing(1),
                  top: theme.spacing(38.5),
                },
              ]}
            />
          </Fragment>
        )}
      </div>
    </SizeProvider>
  );
};

export default ComposedMainHero;
