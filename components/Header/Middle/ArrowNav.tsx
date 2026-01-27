import { useRouter } from "next/router";
import { useDecks } from "../../../hooks/deck";
import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useHeroCardsContext } from "../../Pages/Deck/HeroCardsContext";
import { useCardPageContext } from "../../Pages/CardPage/CardPageContext";

export default () => {
  const router = useRouter();
  const { query: { deckId, artistSlug: routerArtistSlug } } = router;
  const { prefetchHeroCards } = useHeroCardsContext();

  // Use CardPageContext for instant navigation on card pages
  let cardPageContext: ReturnType<typeof useCardPageContext> | null = null;
  try {
    cardPageContext = useCardPageContext();
  } catch {
    // Not on a card page or context not available
  }

  // Use context values if available, otherwise fall back to router
  const artistSlug = cardPageContext?.artistSlug || (typeof routerArtistSlug === "string" ? routerArtistSlug : undefined);
  const cardNavigation = cardPageContext?.cardNavigation;

  // Use full decks query - same cache as Hero component
  const { decks } = useDecks({ skip: !deckId });

  const { palette } = usePalette();

  const { displayNumber, max, prevSlug, nextSlug, isFuturePage } = useMemo(() => {
    if (!deckId || !decks) return { displayNumber: 0, max: 0, prevSlug: "", nextSlug: "", isFuturePage: false };

    // Filter out future-ii for navigation (it's combined with future in the UI)
    const filteredDecks = decks.filter((deck) => deck.slug !== "future-ii");

    const currentIndex = filteredDecks.findIndex((deck) => deck.slug === deckId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredDecks.length - 1;
    const nextIndex = currentIndex < filteredDecks.length - 1 ? currentIndex + 1 : 0;

    // Display order: zero(1), one(2), two(3), three(4), special(5), future(6), future-ii(7), crypto(8)
    // Since future-ii is hidden but takes slot 7, crypto should display as 8
    const isCrypto = deckId === "crypto";
    const displayNumber = isCrypto ? 8 : currentIndex + 1;

    return {
      displayNumber,
      max: decks.length, // Show total including future-ii
      prevSlug: filteredDecks[prevIndex].slug,
      nextSlug: filteredDecks[nextIndex].slug,
      isFuturePage: deckId === "future",
    };
  }, [deckId, decks]);

  // Proactively prefetch adjacent decks when landing on a new deck (deck pages only)
  useEffect(() => {
    if (!artistSlug && prevSlug && nextSlug) {
      prefetchHeroCards(prevSlug);
      prefetchHeroCards(nextSlug);
      router.prefetch(`/${prevSlug}`);
      router.prefetch(`/${nextSlug}`);
    }
  }, [artistSlug, prevSlug, nextSlug, prefetchHeroCards, router]);

  // Prefetch hero cards and page route on hover (backup for edge cases)
  const handlePrefetch = useCallback(
    (slug: string) => {
      prefetchHeroCards(slug);
      router.prefetch(`/${slug}`);
    },
    [prefetchHeroCards, router]
  );

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (artistSlug && cardPageContext && cardNavigation) {
          // Card page: navigate to previous card
          cardPageContext.navigateToCard(cardNavigation.prevSlug);
        } else if (deckId && prevSlug) {
          // Deck page: navigate to previous deck
          router.push(`/${prevSlug}`);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (artistSlug && cardPageContext && cardNavigation) {
          // Card page: navigate to next card
          cardPageContext.navigateToCard(cardNavigation.nextSlug);
        } else if (deckId && nextSlug) {
          // Deck page: navigate to next deck
          router.push(`/${nextSlug}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artistSlug, cardPageContext, cardNavigation, deckId, prevSlug, nextSlug, router]);

  // Card page navigation handlers (instant via context)
  const handlePrevCard = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (cardPageContext && cardNavigation) {
        cardPageContext.navigateToCard(cardNavigation.prevSlug);
      }
    },
    [cardPageContext, cardNavigation]
  );

  const handleNextCard = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (cardPageContext && cardNavigation) {
        cardPageContext.navigateToCard(cardNavigation.nextSlug);
      }
    },
    [cardPageContext, cardNavigation]
  );

  // Animated counter for loading state - counts up quickly then settles on real number
  const [animatedIndex, setAnimatedIndex] = useState(1);
  const [animatedMax, setAnimatedMax] = useState(55);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigationLoading = cardPageContext?.navigationLoading ?? false;

  // When navigation data loads, animate to the correct number
  useEffect(() => {
    if (cardNavigation) {
      // Clear any running animation
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      // Set final values
      setAnimatedIndex(cardNavigation.currentIndex + 1);
      setAnimatedMax(cardNavigation.max);
    } else if (artistSlug && !cardNavigation) {
      // Loading state - animate the counter
      let count = 1;
      animationRef.current = setInterval(() => {
        count = (count % 55) + 1;
        setAnimatedIndex(count);
      }, 50);
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [cardNavigation, artistSlug]);

  // Card page navigation - show immediately with arrows, animate counter while loading
  if (artistSlug && deckId) {
    const hasNavigation = !!cardNavigation;
    const displayNumber = hasNavigation ? cardNavigation.currentIndex + 1 : animatedIndex;
    const displayMax = hasNavigation ? cardNavigation.max : animatedMax;

    return (
      <Text
        typography="p-s"
        css={[
          {
            display: "flex",
            alignItems: "center",
            paddingRight: 66,
            justifyContent: "end",
          },
        ]}
      >
        <span css={[{ marginRight: 5 }]}>
          <NavButton
            css={[
              { transform: "rotate(180deg)" },
              !hasNavigation && { cursor: "default" },
            ]}
            onClick={hasNavigation ? handlePrevCard : undefined}
          />
        </span>
        <span css={[{ marginRight: 5 }]}>
          <NavButton
            css={[!hasNavigation && { cursor: "default" }]}
            onClick={hasNavigation ? handleNextCard : undefined}
          />
        </span>
        <span
          css={(theme) => [
            { marginLeft: 30 },
            palette === "dark" && { color: theme.colors.white75 },
          ]}
        >
          Card {displayNumber.toString().padStart(2, "0")} /
          {" " + displayMax.toString().padStart(2, "0")}
        </span>
      </Text>
    );
  }

  // Deck page navigation
  return deckId && decks ? (
    <Text
      typography="p-s"
      css={[
        {
          display: "flex",
          alignItems: "center",
          paddingRight: 66,
          justifyContent: "end",
        },
      ]}
    >
      <span
        css={[{ marginRight: 5 }]}
        onMouseEnter={() => handlePrefetch(prevSlug)}
        onTouchStart={() => handlePrefetch(prevSlug)}
      >
        <Link href={prevSlug}>
          <NavButton css={[{ transform: "rotate(180deg)" }]} />
        </Link>
      </span>
      <span
        css={[{ marginRight: 5 }]}
        onMouseEnter={() => handlePrefetch(nextSlug)}
        onTouchStart={() => handlePrefetch(nextSlug)}
      >
        <Link href={nextSlug}>
          <NavButton />
        </Link>
      </span>
      <span
        css={(theme) => [
          { marginLeft: 30 },
          palette === "dark" && { color: theme.colors.white75 },
        ]}
      >
        {decks ? (isFuturePage ? "Decks " : "Deck ") : ""}
        {isFuturePage
          ? `${displayNumber.toString().padStart(2, "0")} + 07 `
          : `${displayNumber.toString().padStart(2, "0")} `}/
        {" " + max.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : undefined;
};
