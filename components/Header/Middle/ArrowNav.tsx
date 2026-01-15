import { useRouter } from "next/router";
import { useDecks } from "../../../hooks/deck";
import { useCardsForDeck, useCard } from "../../../hooks/card";
import { useCallback, useMemo, useEffect } from "react";
import { sortCards } from "../../../source/utils/sortCards";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useHeroCardsContext } from "../../Pages/Deck/HeroCardsContext";

export default () => {
  const router = useRouter();
  const { query: { deckId, artistSlug } } = router;
  const { prefetchHeroCards } = useHeroCardsContext();

  // Use full decks query - same cache as Hero component
  const { decks } = useDecks({ skip: !deckId });

  // Get current deck for card queries
  const currentDeck = useMemo(() =>
    decks?.find((d) => d.slug === deckId),
    [decks, deckId]
  );

  // First, fetch the current card to get its edition (needed for Future deck filtering)
  const { card: currentCard } = useCard({
    variables: { slug: artistSlug, deckSlug: deckId },
    skip: !artistSlug || !deckId,
  });

  // Fetch cards when on a card page (artistSlug is present)
  // Use same hook as Pop component for consistent card ordering
  // Include edition parameter for Future deck to match Pop behavior
  const { cards } = useCardsForDeck({
    variables: { deck: currentDeck?._id, edition: currentCard?.edition },
    skip: !artistSlug || !currentDeck?._id,
  });

  const { palette } = usePalette();

  // Card page navigation (when artistSlug is present)
  // Match Pop component exactly - sort cards and use all of them (no filtering)
  const cardNavigation = useMemo(() => {
    if (!artistSlug || !cards || cards.length === 0) return null;

    // Sort cards to match the order shown in CardList and Pop
    const sortedCards = sortCards(cards);

    const currentIndex = sortedCards.findIndex(
      (card) => card.artist?.slug === artistSlug
    );

    if (currentIndex === -1) return null;

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sortedCards.length - 1;
    const nextIndex = currentIndex < sortedCards.length - 1 ? currentIndex + 1 : 0;

    return {
      displayNumber: currentIndex + 1,
      max: sortedCards.length,
      prevSlug: sortedCards[prevIndex].artist?.slug || "",
      nextSlug: sortedCards[nextIndex].artist?.slug || "",
    };
  }, [artistSlug, cards]);

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

  // Prefetch card pages when on card page
  useEffect(() => {
    if (artistSlug && cardNavigation && deckId) {
      router.prefetch(`/${deckId}/${cardNavigation.prevSlug}`);
      router.prefetch(`/${deckId}/${cardNavigation.nextSlug}`);
    }
  }, [artistSlug, cardNavigation, deckId, router]);

  // Prefetch hero cards and page route on hover (backup for edge cases)
  const handlePrefetch = useCallback(
    (slug: string) => {
      prefetchHeroCards(slug);
      router.prefetch(`/${slug}`);
    },
    [prefetchHeroCards, router]
  );

  // Card page navigation
  if (artistSlug && cardNavigation && deckId) {
    return (
      <Text
        typography="paragraphSmall"
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
          <Link href={`/${deckId}/${cardNavigation.prevSlug}`}>
            <NavButton css={[{ transform: "rotate(180deg)" }]} />
          </Link>
        </span>
        <span css={[{ marginRight: 5 }]}>
          <Link href={`/${deckId}/${cardNavigation.nextSlug}`}>
            <NavButton />
          </Link>
        </span>
        <span
          css={(theme) => [
            { marginLeft: 30 },
            palette === "dark" && { color: theme.colors.white75 },
          ]}
        >
          Card {cardNavigation.displayNumber.toString().padStart(2, "0")} /
          {" " + cardNavigation.max.toString().padStart(2, "0")}
        </span>
      </Text>
    );
  }

  // Deck page navigation
  return deckId && decks ? (
    <Text
      typography="paragraphSmall"
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
