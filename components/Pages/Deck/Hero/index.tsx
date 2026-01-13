import { FC, HTMLAttributes, useRef, useState, useEffect, useMemo } from "react";
import Grid from "../../../Grid";
import Text from "../../../Text";
import { useDecks } from "../../../../hooks/deck";
import ArrowButton from "../../../Buttons/ArrowButton";
import ButtonTemplate from "../../../Buttons/Button";
import Plus from "../../../Icons/Plus";
import HeroCards from "./HeroCards";
import { useRouter } from "next/router";
import { usePalette } from "../DeckPaletteContext";
import KickStarterLine from "../../../Icons/KickStarterLine";
import Error from "../../../Error";
import { HeroCardProps } from "../../../../pages/[deckId]";

type SlideState = "visible" | "sliding-out" | "sliding-in";

interface HeroProps extends HTMLAttributes<HTMLElement> {
  heroCards?: HeroCardProps[];
}

const Hero: FC<HeroProps> = ({ heroCards, ...props }) => {
  const {
    query: { deckId },
  } = useRouter();

  const { palette } = usePalette();

  // Fetch ALL decks once - they stay in cache for instant navigation
  const { decks, loading, error, refetch } = useDecks();

  // Find current deck from cached decks array
  const deck = useMemo(() => {
    return decks?.find((d) => d.slug === deckId);
  }, [decks, deckId]);

  const [showStory, setShowStory] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Track displayed deck for transition
  const [slideState, setSlideState] = useState<SlideState>("visible");
  const [displayedDeck, setDisplayedDeck] = useState<typeof deck>(undefined);
  // Track the deck we're transitioning to, to avoid cleanup issues
  const transitioningToRef = useRef<string | null>(null);

  // Sync displayedDeck with deck changes
  useEffect(() => {
    if (!deck) return;

    // Initial load - set immediately without animation
    if (!displayedDeck) {
      setDisplayedDeck(deck);
      setSlideState("visible");
      return;
    }

    // Same deck - no change needed
    if (deck._id === displayedDeck._id) {
      transitioningToRef.current = null;
      return;
    }

    // Already transitioning to this deck - don't restart
    if (transitioningToRef.current === deck._id) {
      return;
    }

    // Different deck - animate transition
    transitioningToRef.current = deck._id;
    setSlideState("sliding-out");

    const slideOutTimer = setTimeout(() => {
      setDisplayedDeck(deck);
      setSlideState("sliding-in");

      setTimeout(() => {
        setSlideState("visible");
      }, 50);
    }, 150);

    return () => {
      clearTimeout(slideOutTimer);
    };
  }, [deck, displayedDeck]);

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

  if (error) {
    return <Error error={error} retry={() => refetch()} fullPage />;
  }

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 235,
          paddingBottom: 60,
          background:
            theme.colors[palette === "dark" ? "spaceBlack" : "soft_gray"],
        },
      ]}
    >
      <div css={[{ gridColumn: "span 6" }]}>
        {displayedDeck ? (
          <>
            <Text
              typography="newh0"
              css={(theme) => [
                palette === "dark" && { color: "white" },
                {
                  transition: slideState === "sliding-in"
                    ? "none"
                    : "transform 0.15s ease-out, opacity 0.15s ease-out",
                },
              ]}
              style={getSlideStyles()}
            >
              {displayedDeck.title}
            </Text>
            <Text
              css={(theme) => [
                { marginTop: 30 },
                palette === "dark" && { color: "white", opacity: 0.75 },
                {
                  transition: slideState === "sliding-in"
                    ? "none"
                    : "transform 0.15s ease-out, opacity 0.15s ease-out",
                },
              ]}
              style={getSlideStyles()}
            >
              {displayedDeck.info}
            </Text>
          </>
        ) : (
          <>
            {/* Title skeleton */}
            <div
              css={{
                height: 72,
                width: 280,
                borderRadius: 8,
                background:
                  palette === "dark"
                    ? "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)"
                    : "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
                "@keyframes shimmer": {
                  "0%": { backgroundPosition: "200% 0" },
                  "100%": { backgroundPosition: "-200% 0" },
                },
              }}
            />
            {/* Description skeleton */}
            <div
              css={{
                marginTop: 30,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                css={{
                  height: 20,
                  width: "100%",
                  borderRadius: 4,
                  background:
                    palette === "dark"
                      ? "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)"
                      : "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
              <div
                css={{
                  height: 20,
                  width: "85%",
                  borderRadius: 4,
                  background:
                    palette === "dark"
                      ? "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)"
                      : "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
              <div
                css={{
                  height: 20,
                  width: "70%",
                  borderRadius: 4,
                  background:
                    palette === "dark"
                      ? "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)"
                      : "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite linear",
                }}
              />
            </div>
          </>
        )}
        <div css={[{ marginTop: 30, display: "flex", gap: 15 }]}>
          <ArrowButton color="accent" href={displayedDeck?.product?.short ? `/shop/${displayedDeck.product.short.toLowerCase().replace(/\s/g, "")}` : undefined}>Shop now</ArrowButton>
          <ButtonTemplate
            palette={palette}
            bordered={true}
            color={palette === "dark" ? "white" : "accent"}
            css={(theme) => [
              {
                paddingLeft: 10,
              },
            ]}
            onClick={() => setShowStory(!showStory)}
          >
            <Plus
              css={(theme) => [
                {
                  marginRight: 5,
                  rotate: showStory ? "135deg" : "0deg",
                  transition: theme.transitions.fast("rotate"),
                },
              ]}
            />
            {showStory ? "Hide" : "Story"}
          </ButtonTemplate>
        </div>
      </div>
      <HeroCards sticky={!showStory} heroCards={heroCards} />
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            transition: theme.transitions.fast("height"),
            overflow: "hidden",
          },
          {
            height: showStory
              ? ref.current
                ? ref.current.clientHeight
                : 0
              : 0,
          },
        ]}
      >
        <Grid css={[{ paddingTop: 90 }]} ref={ref}>
          <div css={[{ gridColumn: "span 6" }]}>
            <Text>
              Released in 2013, Edition One brought together 55 visionary
              artists from around the globe to transform a deck of cards into a
              stunning blend of art and play.
            </Text>
            <Grid auto={true} css={[{ paddingTop: 60 }]}>
              {[
                ["55", "Artist"],
                ["2013", "Launch Year"],
                ["1037", "Backers on KS"],
              ].map((data) => (
                <div
                  key={JSON.stringify(data)}
                  css={(theme) => [
                    {
                      gridColumn: "span 2",
                      paddingTop: 15,
                      boxShadow: "0px -1px 0px rgba(0, 0, 0, 1)",
                    },
                  ]}
                >
                  <Text typography="newh3">{data[0]}</Text>
                  <Text typography="newh4">{data[1]}</Text>
                </div>
              ))}
            </Grid>
          </div>
          <div
            css={[
              {
                gridColumn: "span 4 /-1",
                alignSelf: "end",
              },
            ]}
          >
            <KickStarterLine />
            <Text typography="paragraphSmall" css={[{ marginTop: 30 }]}>
              Backed by over 1,000 supporters on Kickstarter and funded in less
              than an hour, Edition One quickly became a favorite among
              collectors and art enthusiasts worldwide.
            </Text>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default Hero;
