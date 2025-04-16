import { useEffect, useState } from "react";
import Grid from "../../../../components/Grid";
import ArrowButton from "../../../Buttons/ArrowButton";
import ExploreButton from "../../../Buttons/ExploreButton";
import Text from "../../../Text";
import HeroCard from "./HeroCard";

const texts = [
  "“It’s not just playing cards, but a gallery right in your hands.”",
  "“Where art and play come together in every playing card.”",
  "“Beautifully crafted decks of cards that showcase global artists.”",
];

const Hero = () => {
  const [card, setCard] = useState<GQL.Card>({} as unknown as GQL.Card);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!card || Object.keys(card).length === 0) {
      return;
    }
    setIndex(index === texts.length - 1 ? 0 : index + 1);
  }, [card]);

  return (
    <Grid
      css={(theme) => [
        {
          minHeight: 709,
          background: card.cardBackground,
          transition: theme.transitions.fast("background"),
          alignContent: "end",
          paddingBottom: 60,
          paddingTop: 70,
          boxSizing: "border-box",
          overflow: "hidden",
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            gridColumn: "span 6",
            display: "grid",
            alignContent: "end",
            [theme.maxMQ.sm]: {
              padding: "0 20px",
            },
          },
        ]}
      >
        <Text
          typography="newh4"
          css={[
            {
              marginTop: 30,
            },
          ]}
        >
          Collective Art Project —
        </Text>
        <Text
          typography="newh2"
          css={(theme) => [
            {
              marginTop: 10,
              [theme.mq.sm]: {
                marginTop: 30,
              },
            },
          ]}
        >
          <span>{texts[index]}</span>
        </Text>
        <div css={{ display: "flex", gap: 15, marginTop: 30 }}>
          <ExploreButton color="accent">Discover</ExploreButton>
          <ArrowButton bordered={true} color="accent">
            Shop
          </ArrowButton>
        </div>
      </div>
      <div
        css={(theme) => [
          {
            gridColumn: "span 3",
            paddingLeft: 80,
            paddingBottom: 6,

            [theme.maxMQ.sm]: {
              order: -1,
              gridColumn: "1/-1",
              padding: 0,
              display: "grid",
              justifyContent: "center",
              marginTop: 30,
            },
          },
        ]}
      >
        <HeroCard setCard={setCard} />
      </div>
    </Grid>
  );
};

export default Hero;
