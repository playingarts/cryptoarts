import { useRouter } from "next/router";
import { useDecks } from "../../../hooks/deck";
import { CardsForDeckQuery } from "../../../hooks/card";
import { useMemo, useCallback, useRef } from "react";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useApolloClient } from "@apollo/client/react";

export default () => {
  const { query: { deckId } } = useRouter();
  const client = useApolloClient();
  const prefetchedRef = useRef<Set<string>>(new Set());

  // Use full decks query - same cache as Hero component
  const { decks } = useDecks({ skip: !deckId });

  const { palette } = usePalette();

  const { counter, max, prevSlug, nextSlug, prevDeckId, nextDeckId } = useMemo(() => {
    if (!deckId || !decks) return { counter: 0, max: 0, prevSlug: "", nextSlug: "", prevDeckId: "", nextDeckId: "" };

    const currentIndex = decks.findIndex((deck) => deck.slug === deckId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : decks.length - 1;
    const nextIndex = currentIndex < decks.length - 1 ? currentIndex + 1 : 0;

    return {
      counter: currentIndex,
      max: decks.length,
      prevSlug: decks[prevIndex].slug,
      nextSlug: decks[nextIndex].slug,
      prevDeckId: decks[prevIndex]._id,
      nextDeckId: decks[nextIndex]._id,
    };
  }, [deckId, decks]);

  // Intent-based prefetching: fetch cards + preload hero images
  const prefetchDeck = useCallback(async (targetDeckId: string) => {
    // Skip if already prefetched this session
    if (prefetchedRef.current.has(targetDeckId)) return;
    prefetchedRef.current.add(targetDeckId);

    const deck = decks?.find(d => d._id === targetDeckId);

    try {
      const { data } = await client.query<Pick<GQL.Query, "cards">>({
        query: CardsForDeckQuery,
        variables: { deck: targetDeckId },
      });

      // Preload hero card images (first 2 cards based on deterministic selection)
      const cards = data?.cards;
      if (cards && cards.length >= 2) {
        // Match the seed logic from HeroCards component
        const seed = deck?.slug ? deck.slug.split("").reduce((a: number, b: string) => a + b.charCodeAt(0), 0) : 0;
        const idx1 = seed % cards.length;
        const idx2 = (seed + Math.floor(cards.length / 2)) % cards.length;
        const heroIdxs = [idx1, idx2 === idx1 ? (idx2 + 1) % cards.length : idx2];

        heroIdxs.forEach(idx => {
          const card = cards[idx];
          if (card?.img) {
            const img = new Image();
            img.src = card.img;
          }
        });
      }
    } catch (e) {
      // Silent fail - prefetch is best-effort
      prefetchedRef.current.delete(targetDeckId);
    }
  }, [client, decks]);

  // Handlers for intent-based prefetching
  const handlePrevIntent = useCallback(() => {
    if (prevDeckId) prefetchDeck(prevDeckId);
  }, [prevDeckId, prefetchDeck]);

  const handleNextIntent = useCallback(() => {
    if (nextDeckId) prefetchDeck(nextDeckId);
  }, [nextDeckId, prefetchDeck]);

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
        onMouseEnter={handlePrevIntent}
        onTouchStart={handlePrevIntent}
        css={[{ marginRight: 5 }]}
      >
        <Link href={prevSlug} shallow={true}>
          <NavButton css={[{ transform: "rotate(180deg)" }]} />
        </Link>
      </span>
      <span
        onMouseEnter={handleNextIntent}
        onTouchStart={handleNextIntent}
        css={[{ marginRight: 5 }]}
      >
        <Link href={nextSlug} shallow={true}>
          <NavButton />
        </Link>
      </span>
      <span
        css={(theme) => [
          { marginLeft: 30 },
          palette === "dark" && { color: theme.colors.white75 },
        ]}
      >
        {decks ? "Deck " : ""}
        {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + max.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : undefined;
};
