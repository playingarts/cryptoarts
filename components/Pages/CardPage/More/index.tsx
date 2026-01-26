import { FC, HTMLAttributes, useMemo, useRef, useState, useEffect, useCallback } from "react";
import Intro from "../../../Intro";
import NavButton from "../../../Buttons/NavButton";
import Grid from "../../../Grid";
import Card from "../../../Card";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../Pop";
import { useCardPageContext } from "../CardPageContext";

// Card item width + gap (preview size 285 + padding 15 + gap 30)
const ITEM_WIDTH = 300;
const ITEM_GAP = 30;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds between auto-scrolls
const SKELETON_COUNT = 6;

/** Skeleton card for loading state - matches cardSizesHover.preview (285x400) */
const CardSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    css={{
      width: 285,
      height: 400,
      flexShrink: 0,
      scrollSnapAlign: "start",
      borderRadius: 12,
      background: dark
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
);

const More: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Use context instead of separate queries - eliminates 3 duplicate fetches
  const { deck, sortedCards, artistSlug, deckId } = useCardPageContext();

  // Find current card from sorted cards (already loaded in context)
  const currentCard = useMemo(() => {
    if (!sortedCards || !artistSlug) return null;
    return sortedCards.find((c) => c.artist?.slug === artistSlug) || null;
  }, [sortedCards, artistSlug]);

  // Cards are already sorted in context, use directly
  const cards = sortedCards;

  // Shuffle cards randomly (Fisher-Yates)
  const shuffledCards = useMemo(() => {
    if (!cards || cards.length === 0) return [];
    const arr = [...cards];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [cards]);

  // Triple the items for infinite scroll effect
  const infiniteCards = useMemo(() => {
    if (!shuffledCards || shuffledCards.length === 0) return [];
    return [...shuffledCards, ...shuffledCards, ...shuffledCards];
  }, [shuffledCards]);

  // Format edition name for title (e.g., "chapter i" -> "Chapter I", "chapter ii" -> "Chapter II")
  const editionDisplayName = currentCard?.edition
    ? currentCard.edition
        .replace(/\b\w/g, (c: string) => c.toUpperCase())
        .replace(/\bIi\b/g, "II")
    : null;

  // Build the "More from" title with edition if applicable
  const moreFromTitle = deck
    ? `More from ${
        editionDisplayName && deck.slug === "future"
          ? `Future Edition ${editionDisplayName}`
          : deck.title + (editionDisplayName ? ` — ${editionDisplayName}` : "")
      }`
    : null;

  const [popupCard, setPopupCard] = useState<GQL.Card>();

  // Position in the middle set on mount
  useEffect(() => {
    if (!scrollRef.current || !shuffledCards || shuffledCards.length === 0) return;
    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    });
  }, [shuffledCards]);

  // Handle infinite scroll - jump to middle when reaching edges
  const handleScrollEnd = useCallback(() => {
    if (!scrollRef.current || !shuffledCards || shuffledCards.length === 0 || isScrollingRef.current) return;

    const el = scrollRef.current;
    const singleSetWidth = el.scrollWidth / 3;
    const maxScroll = el.scrollWidth - el.clientWidth;

    // If in the first set, jump to middle set
    if (el.scrollLeft < singleSetWidth * 0.5) {
      isScrollingRef.current = true;
      el.style.scrollSnapType = "none";
      el.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        el.style.scrollSnapType = "x mandatory";
        isScrollingRef.current = false;
      });
    }
    // If in the third set, jump to middle set
    else if (el.scrollLeft > maxScroll - singleSetWidth * 0.5) {
      isScrollingRef.current = true;
      el.style.scrollSnapType = "none";
      el.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        el.style.scrollSnapType = "x mandatory";
        isScrollingRef.current = false;
      });
    }
  }, [shuffledCards]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 300);
    };

    if ("onscrollend" in window) {
      el.addEventListener("scrollend", handleScrollEnd, { passive: true });
    } else {
      el.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(scrollTimeout);
      if ("onscrollend" in window) {
        el.removeEventListener("scrollend", handleScrollEnd);
      } else {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScrollEnd]);

  const scrollByItem = useCallback((direction: 1 | -1) => {
    scrollRef.current?.scrollBy({
      behavior: "smooth",
      left: direction * (ITEM_WIDTH + ITEM_GAP),
    });
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!shuffledCards || shuffledCards.length === 0) return;

    const interval = setInterval(() => {
      scrollByItem(1);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [shuffledCards, scrollByItem]);

  return (
    <>
      <Grid
        css={(theme) => [
          {
            background:
              theme.colors[deckId === "crypto" ? "darkBlack" : "soft_gray"],
          },
        ]}
      >
        <Intro
          css={[
            {
              gridColumn: "1/-1",
            },
          ]}
          arrowedText={moreFromTitle ?? "More cards"}
          paragraphText="Other cards from this deck you may like."
          titleAsText
          palette={deckId === "crypto" ? "dark" : "light"}
          bottom={
            <div css={(theme) => [{ display: "flex", gap: 5, marginTop: theme.spacing(12) }]}>
              <NavButton
                css={[
                  deckId !== "crypto" && {
                    background: "white",
                  },
                  {
                    rotate: "180deg",
                  },
                ]}
                onClick={() => scrollByItem(-1)}
              />
              <NavButton
                css={
                  deckId !== "crypto" && [
                    {
                      background: "white",
                    },
                  ]
                }
                onClick={() => scrollByItem(1)}
              />
            </div>
          }
        />
      </Grid>
      <div
        ref={scrollRef}
        css={(theme) => [
          {
            background:
              theme.colors[deckId === "crypto" ? "darkBlack" : "soft_gray"],
            paddingBottom: theme.spacing(12),
            paddingTop: theme.spacing(6),
            paddingLeft: 95,
            paddingRight: 75,
            display: "flex",
            gap: ITEM_GAP,
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: 20,
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            [theme.maxMQ.sm]: {
              paddingLeft: 20,
              paddingRight: 20,
            },
          },
        ]}
      >
        {infiniteCards.length === 0
          ? // Show skeleton cards while loading
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <CardSkeleton key={`skeleton-${i}`} dark={deckId === "crypto"} />
            ))
          : infiniteCards.map((card, i) => (
              <Card
                onClick={() => setPopupCard(card)}
                key={`${card._id}-${i}`}
                css={[
                  {
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  },
                ]}
                card={card}
                size="preview"
                palette={deckId === "crypto" ? "dark" : "light"}
                artistHref={deckId ? `/${deckId}/${card.artist.slug}` : undefined}
              />
            ))}
      </div>
      <MenuPortal show={!!popupCard}>
        {popupCard && deck && deckId ? (
          <Pop
            cardSlug={popupCard.artist.slug}
            close={() => setPopupCard(undefined)}
            deckId={deckId}
            initialCardId={popupCard._id}
            initialImg={popupCard.img}
            initialVideo={popupCard.video}
            initialArtistName={popupCard.artist.name}
            initialArtistCountry={popupCard.artist.country}
            navigationCards={cards}
          />
        ) : null}
      </MenuPortal>
    </>
  );
};

export default More;
