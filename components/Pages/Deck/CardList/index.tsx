import dynamic from "next/dynamic";
import { FC, Fragment, HTMLAttributes, useEffect, useState, useRef, useMemo, useCallback } from "react";
import Grid from "../../../Grid";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import { useCards } from "../../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../../Card";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";
import Dot from "../../../Icons/Dot";
import background from "../../../../mocks/images/backgroundImage.png";
import { usePalette } from "../DeckPaletteContext";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import { useDeck } from "../../../../hooks/deck";

// Lazy-load Pop modal - only shown on card click
const Pop = dynamic(() => import("../../CardPage/Pop"), { ssr: false });

// Cards per row at different breakpoints
const CARDS_PER_ROW = {
  lg: 4,  // Large screens: 4 cards per row
  md: 3,  // Medium screens: 3 cards per row
  sm: 2,  // Small screens: 2 cards per row
};

// Batch size for loading rows (load 2 rows at a time)
const BATCH_SIZE = 2;

// Card value order (2-10, jack, queen, king, ace, then special cards)
const VALUE_ORDER: Record<string, number> = {
  "2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5, "8": 6, "9": 7, "10": 8,
  "jack": 9, "queen": 10, "king": 11, "ace": 12,
  "joker": 13, "backside": 14,
};

// Suit order: spades, hearts, clubs, diamonds
const SUIT_ORDER: Record<string, number> = {
  "spades": 0, "hearts": 1, "clubs": 2, "diamonds": 3,
};

// Special card sort key: joker-black, backside*, joker-red, joker-blue
const getSpecialCardOrder = (card: GQL.Card): number => {
  if (card.value === "joker" && card.suit === "black") return 0;
  if (card.value === "backside") return 1;
  if (card.value === "joker" && card.suit === "red") return 2;
  if (card.value === "joker" && card.suit === "blue") return 3;
  return 99;
};

/** Sort cards by value then suit (2's first with spades/hearts/clubs/diamonds, then 3's, etc.) */
const sortCards = (cards: GQL.Card[]): GQL.Card[] => {
  return [...cards].sort((a, b) => {
    const valueA = VALUE_ORDER[a.value] ?? 99;
    const valueB = VALUE_ORDER[b.value] ?? 99;
    if (valueA !== valueB) return valueA - valueB;

    // Special handling for jokers and backsides
    if (a.value === "joker" || a.value === "backside") {
      return getSpecialCardOrder(a) - getSpecialCardOrder(b);
    }

    const suitA = SUIT_ORDER[a.suit] ?? 99;
    const suitB = SUIT_ORDER[b.suit] ?? 99;
    return suitA - suitB;
  });
};

/** Single card item with optional artist quote block */
const ListItem: FC<{
  card: GQL.Card;
  showQuote?: boolean;
  quoteCard?: GQL.Card;
}> = ({ card, showQuote, quoteCard }) => {
  const { palette } = usePalette();
  const {
    query: { deckId },
  } = useRouter();

  const [show, setShow] = useState(false);
  const [quoteImagesLoaded, setQuoteImagesLoaded] = useState(false);

  // Preload quote images when quoteCard is available
  useEffect(() => {
    if (!showQuote || !quoteCard) return;

    setQuoteImagesLoaded(false);
    let loaded = 0;
    const totalImages = 2; // background + userpic

    const onLoad = () => {
      loaded++;
      if (loaded >= totalImages) {
        setQuoteImagesLoaded(true);
      }
    };

    // Preload background image
    const bgImg = new Image();
    bgImg.onload = onLoad;
    bgImg.onerror = onLoad;
    bgImg.src = background.src;

    // Preload artist userpic
    const userpicImg = new Image();
    userpicImg.onload = onLoad;
    userpicImg.onerror = onLoad;
    userpicImg.src = quoteCard.artist.userpic;

    // If already cached, mark as loaded
    if (bgImg.complete) onLoad();
    if (userpicImg.complete) onLoad();
  }, [showQuote, quoteCard]);

  return (
    <Fragment>
      <Card
        onClick={() => setShow(true)}
        size="preview"
        card={{ ...card, deck: { slug: deckId } as unknown as GQL.Deck }}
        css={[{ width: 300 }]}
      />
      <MenuPortal show={show}>
        {typeof deckId === "string" ? (
          <Pop
            close={() => setShow(false)}
            cardSlug={card.artist.slug}
            deckId={deckId}
          />
        ) : null}
      </MenuPortal>
      {showQuote && quoteCard && (
        quoteImagesLoaded ? (
          <Grid css={[{ width: "100%", marginTop: 60, marginBottom: 60 }]}>
            <img
              src={background.src}
              alt=""
              css={{
                width: 300,
                height: 300,
                gridColumn: "2/6",
                borderRadius: 15,
              }}
            />
            <div
              css={(theme) => [
                {
                  gridColumn: "span 6",
                },
              ]}
            >
              <div css={[{ display: "flex", gap: 30 }]}>
                <img
                  src={quoteCard.artist.userpic}
                  alt=""
                  css={{ width: 80, height: 80, borderRadius: 10 }}
                />
                <div css={(theme) => [{ display: "inline-block" }]}>
                  <Text
                    typography="paragraphBig"
                    css={(theme) => [
                      {
                        color:
                          theme.colors[palette === "dark" ? "white75" : "black"],
                      },
                    ]}
                  >
                    {quoteCard.artist.name}
                  </Text>
                  <Text
                    typography="paragraphSmall"
                    css={(theme) => [
                      {
                        color:
                          theme.colors[palette === "dark" ? "white75" : "black"],
                      },
                    ]}
                  >
                    {quoteCard.artist.country}
                  </Text>
                </div>
              </div>
              <Text
                typography="newParagraph"
                css={(theme) => [
                  {
                    marginTop: 60,
                    color: theme.colors[palette === "dark" ? "white75" : "black"],
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  },
                ]}
              >
                {quoteCard.artist.info}
              </Text>

              <Text
                typography="linkNewTypography"
                css={(theme) => [
                  {
                    marginTop: 30,
                    color: theme.colors[palette === "dark" ? "white75" : "black"],
                  },
                ]}
              >
                Discover the artwork <Dot />
              </Text>
            </div>
          </Grid>
        ) : (
          <QuotePlaceholder />
        )
      )}
    </Fragment>
  );
};

/** Shimmer animation style */
const shimmerStyle = {
  background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
  backgroundSize: "200% 100%",
  animation: "cardShimmer 1.5s infinite linear",
  "@keyframes cardShimmer": {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" },
  },
} as const;

/** Placeholder for cards not yet loaded */
const CardPlaceholder: FC = () => (
  <div
    css={{
      width: 300,
      height: 450,
      borderRadius: 15,
      ...shimmerStyle,
    }}
  />
);

/** Placeholder for quote section */
const QuotePlaceholder: FC = () => (
  <Grid css={[{ width: "100%", marginTop: 60, marginBottom: 60 }]}>
    {/* Background image placeholder */}
    <div
      css={{
        width: 300,
        height: 300,
        gridColumn: "2/6",
        borderRadius: 15,
        ...shimmerStyle,
      }}
    />
    <div
      css={{
        gridColumn: "span 6",
      }}
    >
      {/* Artist avatar and info */}
      <div css={{ display: "flex", gap: 30 }}>
        <div css={{ width: 80, height: 80, borderRadius: 10, ...shimmerStyle }} />
        <div css={{ display: "inline-block" }}>
          <div css={{ width: 120, height: 20, borderRadius: 4, marginBottom: 8, ...shimmerStyle }} />
          <div css={{ width: 80, height: 16, borderRadius: 4, ...shimmerStyle }} />
        </div>
      </div>
      {/* Quote text */}
      <div css={{ marginTop: 60 }}>
        <div css={{ width: "100%", height: 16, borderRadius: 4, marginBottom: 8, ...shimmerStyle }} />
        <div css={{ width: "90%", height: 16, borderRadius: 4, marginBottom: 8, ...shimmerStyle }} />
        <div css={{ width: "70%", height: 16, borderRadius: 4, ...shimmerStyle }} />
      </div>
      {/* Link placeholder */}
      <div css={{ marginTop: 30, width: 150, height: 20, borderRadius: 4, ...shimmerStyle }} />
    </div>
  </Grid>
);

/** Row of cards - loads when batch is loaded and scrolled into view */
const CardRow: FC<{
  cards: GQL.Card[];
  rowIndex: number;
  cardsPerRow: number;
  allCards: GQL.Card[];
  isBatchLoaded: boolean;
  onVisible?: () => void;
}> = ({ cards, rowIndex, allCards, isBatchLoaded, onVisible }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  // First batch (rows 0-1) starts visible immediately - no need for IntersectionObserver
  const isFirstBatch = rowIndex < BATCH_SIZE;
  const [isInViewport, setIsInViewport] = useState(isFirstBatch);

  useEffect(() => {
    // First batch is always visible, skip IntersectionObserver
    if (isFirstBatch || isInViewport) return;

    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px", // Load 300px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isFirstBatch, isInViewport, onVisible]);

  // Trigger onVisible for first batch immediately on mount
  useEffect(() => {
    if (isFirstBatch && isBatchLoaded) {
      onVisible?.();
    }
  }, [isFirstBatch, isBatchLoaded, onVisible]);

  // Row is visible when both its batch is loaded AND it's in/near viewport
  const isVisible = isBatchLoaded && isInViewport;

  // Calculate if this row should show a quote (every 3rd row after the first)
  const showQuoteAfterRow = rowIndex > 0 && (rowIndex + 1) % 3 === 0;

  // Stable quote card selection - memoized to prevent changing on re-renders
  const quoteCard = useMemo(() => {
    if (!showQuoteAfterRow || allCards.length === 0) return undefined;
    // Use a deterministic "random" based on rowIndex to keep it stable
    const seed = rowIndex * 7 + 3; // Simple deterministic seed
    const quoteCardIndex = (seed % allCards.length);
    return allCards[quoteCardIndex];
  }, [showQuoteAfterRow, rowIndex, allCards]);

  if (isVisible) {
    return (
      <>
        {cards.map((card, i) => (
          <ListItem
            key={card._id}
            card={card}
            showQuote={showQuoteAfterRow && i === cards.length - 1}
            quoteCard={quoteCard}
          />
        ))}
      </>
    );
  }

  // Show placeholders with a sentinel element for IntersectionObserver
  return (
    <>
      {cards.map((card, i) => (
        <Fragment key={card._id}>
          <div ref={i === 0 ? sentinelRef : undefined}>
            <CardPlaceholder />
          </div>
          {/* Show quote placeholder for rows that will have quotes */}
          {showQuoteAfterRow && i === cards.length - 1 && <QuotePlaceholder />}
        </Fragment>
      ))}
    </>
  );
};

/** Split cards into rows based on cards per row (sorted by value then suit) */
const useCardRows = (cards: GQL.Card[] | undefined, cardsPerRow: number) => {
  return useMemo(() => {
    if (!cards) return [];
    const sortedCards = sortCards(cards);
    const rows: GQL.Card[][] = [];
    for (let i = 0; i < sortedCards.length; i += cardsPerRow) {
      rows.push(sortedCards.slice(i, i + cardsPerRow));
    }
    return rows;
  }, [cards, cardsPerRow]);
};

const List = () => {
  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({ variables: { slug: deckId } });
  const { width } = useSize();

  // Start loading cards when user scrolls 10px
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setShouldLoad(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Check immediately in case already scrolled
    if (window.scrollY >= 10) {
      setShouldLoad(true);
      return;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldLoad]);

  // Only fetch cards after scroll trigger
  const { cards } = useCards(shouldLoad && deck ? { variables: { deck: deck._id } } : undefined);

  // Determine cards per row based on screen width
  const cardsPerRow = width >= breakpoints.md
    ? CARDS_PER_ROW.lg
    : width >= breakpoints.sm
    ? CARDS_PER_ROW.md
    : CARDS_PER_ROW.sm;

  // Split cards into rows
  const rows = useCardRows(cards, cardsPerRow);

  // Track which batches are loaded (batch 0 = rows 0-1, batch 1 = rows 2-3, etc.)
  // First batch (rows 0-1) loads immediately when cards arrive
  const [loadedBatches, setLoadedBatches] = useState<Set<number>>(new Set([0]));

  // Handler for when a row becomes visible - load next batch
  const handleRowVisible = useCallback((rowIndex: number) => {
    const currentBatch = Math.floor(rowIndex / BATCH_SIZE);
    const nextBatch = currentBatch + 1;
    setLoadedBatches((prev) => {
      if (prev.has(nextBatch)) return prev;
      const next = new Set(prev);
      next.add(nextBatch);
      return next;
    });
  }, []);

  // Check if a row's batch is loaded
  const isBatchLoaded = useCallback(
    (rowIndex: number) => loadedBatches.has(Math.floor(rowIndex / BATCH_SIZE)),
    [loadedBatches]
  );

  if (!cards) return null;

  return (
    <div
      css={[
        {
          display: "flex",
          gridColumn: "1/-1",
          columnGap: 30,
          flexWrap: "wrap",
          rowGap: 60,
          marginTop: 90,
          justifyContent: "center",
        },
      ]}
    >
      {rows.map((rowCards, rowIndex) => (
        <CardRow
          key={`row-${rowIndex}`}
          cards={rowCards}
          rowIndex={rowIndex}
          cardsPerRow={cardsPerRow}
          allCards={cards}
          isBatchLoaded={isBatchLoaded(rowIndex)}
          onVisible={() => handleRowVisible(rowIndex)}
        />
      ))}
    </div>
  );
};

const CardList: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { palette } = usePalette();
  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 60,
          background:
            palette === "dark"
              ? theme.colors.darkBlack
              : theme.colors["pale_gray"],
        },
      ]}
      id="cards"
      {...props}
    >
      <div css={[{ gridColumn: "span 6" }]}>
        <ArrowedButton
          css={(theme) => [
            {
              color: theme.colors[palette === "dark" ? "white75" : "black"],
            },
          ]}
        >
          Explore the cards
        </ArrowedButton>
        <Text
          css={(theme) => [
            {
              marginTop: 60,
              color: theme.colors[palette === "dark" ? "white75" : "black"],
            },
          ]}
          typography="paragraphBig"
        >
          A curated showcase of 55 unique artworks, created by 55 international
          artists.
        </Text>
      </div>
      <List />
    </Grid>
  );
};

export default CardList;
