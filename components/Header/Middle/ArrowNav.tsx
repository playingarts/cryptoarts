import { useRouter } from "next/router";
import { useDecks } from "../../../hooks/deck";
import { useCallback, useMemo, useEffect } from "react";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useHeroCardsContext } from "../../Pages/Deck/HeroCardsContext";

export default () => {
  const router = useRouter();
  const { query: { deckId } } = router;
  const { prefetchHeroCards } = useHeroCardsContext();

  // Use full decks query - same cache as Hero component
  const { decks } = useDecks({ skip: !deckId });

  const { palette } = usePalette();

  const { counter, max, prevSlug, nextSlug } = useMemo(() => {
    if (!deckId || !decks) return { counter: 0, max: 0, prevSlug: "", nextSlug: "" };

    const currentIndex = decks.findIndex((deck) => deck.slug === deckId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : decks.length - 1;
    const nextIndex = currentIndex < decks.length - 1 ? currentIndex + 1 : 0;

    return {
      counter: currentIndex,
      max: decks.length,
      prevSlug: decks[prevIndex].slug,
      nextSlug: decks[nextIndex].slug,
    };
  }, [deckId, decks]);

  // Proactively prefetch adjacent decks when landing on a new deck
  useEffect(() => {
    if (prevSlug && nextSlug) {
      prefetchHeroCards(prevSlug);
      prefetchHeroCards(nextSlug);
      router.prefetch(`/${prevSlug}`);
      router.prefetch(`/${nextSlug}`);
    }
  }, [prevSlug, nextSlug, prefetchHeroCards, router]);

  // Prefetch hero cards and page route on hover (backup for edge cases)
  const handlePrefetch = useCallback(
    (slug: string) => {
      prefetchHeroCards(slug);
      router.prefetch(`/${slug}`);
    },
    [prefetchHeroCards, router]
  );

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
        <Link href={prevSlug} shallow={true}>
          <NavButton css={[{ transform: "rotate(180deg)" }]} />
        </Link>
      </span>
      <span
        css={[{ marginRight: 5 }]}
        onMouseEnter={() => handlePrefetch(nextSlug)}
        onTouchStart={() => handlePrefetch(nextSlug)}
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
