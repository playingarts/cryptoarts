import { useEffect } from "react";
import Grid from "../../../Grid";
import ArrowButton from "../../../Buttons/ArrowButton";
import ExploreButton from "../../../Buttons/ExploreButton";
import Text from "../../../Text";
import HeroCard from "./HeroCard";
import Link from "../../../Link";
import { useHeroCarousel } from "../../../../contexts/heroCarouselContext";

const texts = [
  "\u201CIt's not just playing cards, but a gallery right in your hands.\u201D",
  "\u201CWhere art and play come together in every playing card.\u201D",
  "\u201CBeautifully crafted decks of cards that showcase global artists.\u201D",
];

const Hero = () => {
  const { currentCard, quoteIndex, onReady } = useHeroCarousel();

  // Signal ready when first card is available
  useEffect(() => {
    if (currentCard) {
      onReady();
    }
  }, [currentCard, onReady]);

  const background = currentCard?.cardBackground || "transparent";

  return (
    <Grid
      css={(theme) => [
        {
          minHeight: 709,
          background,
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
          <span>{texts[quoteIndex % texts.length]}</span>
        </Text>
        <div css={{ display: "flex", gap: 15, marginTop: 30 }}>
          <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "#about"}>
            <ExploreButton color="accent">Discover</ExploreButton>
          </Link>
          <ArrowButton
            bordered={true}
            color="accent"
            href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/shop"}
          >
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
        <HeroCard />
      </div>
    </Grid>
  );
};

export default Hero;
