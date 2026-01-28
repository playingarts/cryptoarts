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
import { getNavigationDeck, clearNavigationDeck } from "../navigationDeckStore";
import { HEADER_OFFSET } from "../../../../styles/theme";

type SlideState = "visible" | "sliding-out" | "sliding-in";

// Animated counter that counts up from 0 to target value
type AnimatedNumberProps = {
  value: string;
  duration?: number;
  startAnimation: boolean;
};

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value, duration = 1500, startAnimation }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimatedRef = useRef(false);

  // Extract numeric value and suffix (e.g., "1037" -> 1037, "")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";
  // Preserve leading zeros
  const padLength = numericMatch ? numericMatch[1].length : 0;

  useEffect(() => {
    if (!startAnimation || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Animate from 0 to target
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * targetNumber);

      // Pad with leading zeros if needed
      const paddedValue = current.toString().padStart(padLength, "0");
      setDisplayValue(paddedValue + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startAnimation, targetNumber, suffix, padLength, duration]);

  // Reset animation when story closes
  useEffect(() => {
    if (!startAnimation) {
      hasAnimatedRef.current = false;
      setDisplayValue("0");
    }
  }, [startAnimation]);

  return <span>{displayValue}</span>;
};

interface HeroProps extends HTMLAttributes<HTMLElement> {
  heroCards?: HeroCardProps[];
}

const Hero: FC<HeroProps> = ({ heroCards, ...props }) => {
  const router = useRouter();
  const { query: { deckId: routerDeckId } } = router;

  // During fallback (router.isFallback = true), router.query is empty
  // Parse deckId from pathname to enable data fetching immediately
  const pathDeckId = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    return pathParts.length >= 1 ? pathParts[0] : undefined;
  }, [router.asPath]); // Re-compute when route changes

  // Use router query when available, fallback to pathname parsing
  const deckId = typeof routerDeckId === "string" ? routerDeckId : pathDeckId;

  const { palette } = usePalette();

  // Get navigation deck for instant display during fallback
  const [navDeck, setNavDeck] = useState(() => getNavigationDeck());

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
  // Initialize displayedDeck with navDeck if available (for instant display)
  const [displayedDeck, setDisplayedDeck] = useState<typeof deck>(() => {
    // If we have navDeck from card popup navigation, create a partial deck object
    if (navDeck && navDeck.slug === deckId) {
      return {
        _id: "nav",
        slug: navDeck.slug,
        title: navDeck.title,
        info: navDeck.description || "",
      } as unknown as typeof deck;
    }
    return undefined;
  });
  // Track the deck we're transitioning to, to avoid cleanup issues
  const transitioningToRef = useRef<string | null>(null);

  // Clear navigation deck once real deck data arrives
  useEffect(() => {
    if (deck && navDeck) {
      clearNavigationDeck();
      setNavDeck(null);
    }
  }, [deck, navDeck]);

  // Sync displayedDeck with deck changes
  useEffect(() => {
    if (!deck) return;

    // Initial load - set immediately without animation
    // Also replace navDeck placeholder with real deck data
    if (!displayedDeck || displayedDeck._id === "nav") {
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
          paddingTop: HEADER_OFFSET.desktop,
          paddingBottom: theme.spacing(6),
          background:
            theme.colors[palette === "dark" ? "spaceBlack" : "soft_gray"],
          [theme.maxMQ.sm]: { paddingTop: HEADER_OFFSET.tablet },
          [theme.maxMQ.xsm]: { paddingTop: HEADER_OFFSET.mobile, paddingBottom: theme.spacing(3) },
        },
      ]}
    >
      <div css={(theme) => [{ gridColumn: "span 6", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}>
        {displayedDeck ? (
          <>
            <Text
              typography="h0"
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
                { marginTop: theme.spacing(3) },
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
            {/* Title skeleton - matches newh0 typography (85px fontSize, 100% lineHeight) */}
            <div
              css={{
                height: 85,
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
              css={(theme) => ({
                marginTop: theme.spacing(3),
                display: "flex",
                flexDirection: "column",
                gap: 8,
              })}
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
        <div css={(theme) => [{ marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(1.5) }]}>
          <ArrowButton color="accent" size="medium" href={displayedDeck?.product?.slug || displayedDeck?.product?.short ? `/shop/${displayedDeck.product.slug || displayedDeck.product.short.toLowerCase().replace(/\s/g, "")}` : undefined}>Shop now</ArrowButton>
          <ButtonTemplate
            palette={palette}
            bordered={true}
            color="accent"
            size="medium"
            css={(theme) => [
              {
                paddingLeft: 10,
              },
              palette === "dark" && {
                color: theme.colors.white,
                "&:hover": {
                  color: theme.colors.white,
                },
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
        <Grid
          css={(theme) => [{ paddingTop: 90, [theme.maxMQ.xsm]: { paddingTop: theme.spacing(6) } }]}
          ref={ref}
        >
          <div
            css={(theme) => [
              {
                gridColumn: "span 6",
                opacity: showStory ? 1 : 0,
                transform: showStory ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s",
                [theme.maxMQ.sm]: { gridColumn: "1 / -1" },
              },
            ]}
          >
            <Text
              css={(theme) => [
                palette === "dark" && { color: theme.colors.white75 },
              ]}
            >
              Released in 2013, Edition One brought together 55 visionary
              artists from around the globe to transform a deck of cards into a
              stunning blend of art and play.
            </Text>
            <Grid auto={true} css={(theme) => [{ paddingTop: theme.spacing(6) }]}>
              {[
                ["55", "Artists"],
                ["2013", "Launch Year"],
                ["1037", "Backers on KS"],
              ].map((data, index) => (
                <div
                  key={JSON.stringify(data)}
                  css={(theme) => [
                    {
                      gridColumn: "span 2",
                      paddingTop: 15,
                      boxShadow: palette === "dark"
                        ? "0px -1px 0px rgba(255, 255, 255, 0.1)"
                        : "0px -1px 0px rgba(0, 0, 0, 1)",
                      [theme.maxMQ.xsm]: {
                        gridColumn: "1 / -1", // Full width on mobile
                      },
                    },
                  ]}
                >
                  <Text
                    typography="h3"
                    css={(theme) => [
                      palette === "dark" && { color: theme.colors.white75 },
                    ]}
                  >
                    <AnimatedNumber value={data[0]} startAnimation={showStory} duration={1500} />
                  </Text>
                  <Text
                    typography="h4"
                    css={(theme) => [
                      palette === "dark" && { color: theme.colors.white75 },
                    ]}
                  >
                    {data[1]}
                  </Text>
                </div>
              ))}
            </Grid>
          </div>
          <div
            css={(theme) => [
              {
                gridColumn: "span 4 /-1",
                alignSelf: "end",
                [theme.maxMQ.sm]: { gridColumn: "1 / -1", marginTop: theme.spacing(6) },
              },
            ]}
          >
            <KickStarterLine css={palette === "dark" ? { color: "white", opacity: 0.75 } : undefined} />
            <Text
              typography="p-s"
              css={(theme) => [
                { marginTop: theme.spacing(3) },
                palette === "dark" && { color: theme.colors.white75 },
              ]}
            >
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
