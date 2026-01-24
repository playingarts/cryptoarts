import { useEffect, useState } from "react";
import Grid from "../../../Grid";
import ArrowButton from "../../../Buttons/ArrowButton";
import ExploreButton from "../../../Buttons/ExploreButton";
import Text from "../../../Text";
import HeroCard from "./HeroCard";
import Link from "../../../Link";
import { useHeroCarousel } from "../../../Contexts/heroCarousel";

const HERO_TEXTS = [
  "\u201CIt's not just playing cards, but a gallery right in your hands.\u201D",
  "\u201CWhere art and play come together in every playing card.\u201D",
  "\u201CBeautiful decks of cards that showcase global artists.\u201D",
  "\u201CCollectible art you can shuffle, deal, and display.\u201D",
  "\u201CEvery card tells a story, every deck is a masterpiece.\u201D",
  "\u201CFrom artists' studios worldwide to the palm of your hand.\u201D",
  "\u201CLimited editions, unlimited imagination. Art worth holding onto.\u201D",
] as const;

export const HERO_QUOTE_COUNT = HERO_TEXTS.length;

type SlideState = "visible" | "sliding-out" | "sliding-in";

const Hero = () => {
  const { currentCard, quoteIndex, onReady } = useHeroCarousel();
  const [slideState, setSlideState] = useState<SlideState>("visible");
  const [displayedQuoteIndex, setDisplayedQuoteIndex] = useState(quoteIndex);

  // Signal ready when first card is available
  useEffect(() => {
    if (currentCard) {
      onReady();
    }
  }, [currentCard, onReady]);

  // Animate text change with slide up
  useEffect(() => {
    if (quoteIndex !== displayedQuoteIndex) {
      // Start sliding out (current text slides up and fades)
      setSlideState("sliding-out");

      const timer = setTimeout(() => {
        // Change text and start sliding in (new text slides up from below)
        setDisplayedQuoteIndex(quoteIndex);
        setSlideState("sliding-in");

        // Return to visible state
        setTimeout(() => {
          setSlideState("visible");
        }, 50);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [quoteIndex, displayedQuoteIndex]);

  // Get transform and opacity based on slide state
  const getSlideStyles = () => {
    switch (slideState) {
      case "sliding-out":
        return { transform: "translateY(-20px)", opacity: 0 };
      case "sliding-in":
        return { transform: "translateY(20px)", opacity: 0 };
      case "visible":
      default:
        return { transform: "translateY(0)", opacity: 1 };
    }
  };

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
              // Mobile styles - to be implemented
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
              transition: slideState === "sliding-in"
                ? "none"
                : "transform 0.3s ease-out, opacity 0.3s ease-out",
              [theme.mq.sm]: {
                marginTop: 30,
              },
            },
          ]}
          style={getSlideStyles()}
        >
          <span>{HERO_TEXTS[displayedQuoteIndex % HERO_TEXTS.length]}</span>
        </Text>
        <div css={{ display: "flex", gap: 15, marginTop: 30 }}>
          <Link href="#about">
            <ExploreButton color="accent" css={{ fontSize: 20 }}>Discover</ExploreButton>
          </Link>
          <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/shop"}>
            <ArrowButton bordered color="accent" css={{ fontSize: 20 }}>
              Shop
            </ArrowButton>
          </Link>
        </div>
      </div>
      <div
        css={(theme) => [
          {
            gridColumn: "span 3",
            paddingLeft: 130,
            paddingBottom: 6,

            [theme.maxMQ.sm]: {
              // Mobile styles - to be implemented
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
