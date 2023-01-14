import { CSSObject } from "@emotion/serialize";
import { FC, Fragment, HTMLAttributes, useEffect, useState } from "react";
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

const emptyCard = {
  _id: "",
  video: "",
  img: "",
  value: "",
  suit: "",
  info: "",
  deck: "",
  artist: "",
  opensea: "",
};

const commonCss: CSSObject = {
  display: "inline-block",
  position: "relative",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
};

const ComposedMainHero: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const { width } = useSize();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <SizeProvider>
      <div {...props}>
        <Card
          interactive={true}
          noInfo={true}
          card={((loaded ? cards[0] : emptyCard) as unknown) as GQL.Card}
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
          card={((loaded ? cards[1] : emptyCard) as unknown) as GQL.Card}
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
          card={((loaded ? cards[2] : emptyCard) as unknown) as GQL.Card}
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
          card={((loaded ? cards[3] : emptyCard) as unknown) as GQL.Card}
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
          card={((loaded ? cards[4] : emptyCard) as unknown) as GQL.Card}
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
          card={((loaded ? cards[5] : emptyCard) as unknown) as GQL.Card}
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
          card={((loaded ? cards[6] : emptyCard) as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
            },
          ]}
        />
        <br />
        
        {/* 7 of spades card */}
        <Card
          interactive={true}
          noInfo={true}
          card={((loaded ? cards[7] : emptyCard) as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={[
            {
              ...commonCss,
              transform: "translateY(50%) rotate(-10.62deg)",
              top: theme.spacing(20.3),
              left: theme.spacing(4),
              zIndex: 1,
              [theme.maxMQ.md]: {
                left: theme.spacing(0),
              },
              [theme.maxMQ.sm]: {
                top: theme.spacing(34),
                left: theme.spacing(15),
              },
              [theme.maxMQ.xsm]: {
                left: theme.spacing(8.5),
              },
            },
          ]}
        />

        {/* 5 of spades card */}
        <Card
          interactive={true}
          noInfo={true}
          card={((loaded ? cards[8] : emptyCard) as unknown) as GQL.Card}
          customSize={true}
          filter={true}
          css={(theme) => [
            {
              ...commonCss,
              [theme.mq.sm]: {
                top: theme.spacing(0),
              },
            },
          ]}
        />
        
        <Card
          interactive={true}
          noInfo={true}
          card={((loaded ? cards[9] : emptyCard) as unknown) as GQL.Card}
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

            {/* backside card */}
            <Card
              interactive={true}
              noInfo={true}
              card={((loaded ? cards[10] : emptyCard) as unknown) as GQL.Card}
              customSize={true}
              filter={true}
              css={(theme) => [
                {
                  ...commonCss,
                  transform: "translateX(100%) rotate(30deg)",
                  marginLeft: -theme.spacing(5),
                  top: theme.spacing(43),
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
