import dynamic from "next/dynamic";
import { FC, Fragment, HTMLAttributes, useEffect, useState, useRef, useMemo, useCallback } from "react";
import Grid from "../../../Grid";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import { useCardsForDeck } from "../../../../hooks/card";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "../../../Card";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";
import Dot from "../../../Icons/Dot";
import background from "../../../../mocks/images/backgroundImage.png";
import { usePalette } from "../DeckPaletteContext";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import { useDeck } from "../../../../hooks/deck";
import { sortCards } from "../../../../source/utils/sortCards";

// Lazy-load Pop modal - only shown on card click
const Pop = dynamic(() => import("../../CardPage/Pop"), { ssr: false });

// Cards per row at different breakpoints
const CARDS_PER_ROW = {
  lg: 4,  // Large screens: 4 cards per row
  md: 3,  // Medium screens: 3 cards per row
  sm: 2,  // Small screens: 2 cards per row
};

// How many rows ahead to preload images
const PRELOAD_ROWS_AHEAD = 2;

// Initial rows to load images for fresh fetch (rows 0-1)
const INITIAL_MAX_ROW = 1;

// Max rows to load immediately when data is cached (prevents 55 images at once)
const CACHED_INITIAL_MAX_ROW = 5;

// Number of skeleton rows to show initially
const INITIAL_SKELETON_ROWS = 6;

/** Single card item with optional artist quote block */
const ListItem: FC<{
  card: GQL.Card;
  shouldLoadImage: boolean;
  showQuote?: boolean;
  quoteCard?: GQL.Card;
}> = ({ card, shouldLoadImage, showQuote, quoteCard }) => {
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
        // Control image loading via this prop
        // When false, Card shows gradient placeholder without loading the image
        {...(!shouldLoadImage && { noImage: true })}
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
                {quoteCard.info}
              </Text>

              <Link
                href={`/${deckId}/${quoteCard.artist.slug}`}
                css={{ textDecoration: "none" }}
              >
                <Text
                  typography="linkNewTypography"
                  css={(theme) => [
                    {
                      marginTop: 30,
                      color: theme.colors[palette === "dark" ? "white75" : "black"],
                      cursor: "pointer",
                    },
                  ]}
                >
                  Discover the artwork <Dot />
                </Text>
              </Link>
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

/** Placeholder for cards not yet loaded - matches Card component "preview" size exactly */
const CardPlaceholder: FC = () => (
  <div
    css={{
      // Match Card component outer wrapper width (with CSS override from ListItem)
      width: 300,
    }}
  >
    {/* Card image area - matches cardSizesHover.preview.height */}
    <div
      css={{
        position: "relative",
        height: 400,
      }}
    >
      {/* Inner card - matches cardSizes.preview dimensions with aspectRatio */}
      <div
        css={{
          width: 270,
          height: 381, // 270 / 0.7076923 aspectRatio
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 15,
          ...shimmerStyle,
        }}
      />
    </div>
    {/* Artist name placeholder - matches Text marginTop: 10, fontSize: 18 */}
    <div
      css={{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          width: 120,
          height: 18,
          borderRadius: 4,
          ...shimmerStyle,
        }}
      />
    </div>
  </div>
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

/** Row sentinel - triggers image loading when approaching viewport */
const RowSentinel: FC<{
  rowIndex: number;
  onApproaching: (rowIndex: number) => void;
}> = ({ rowIndex, onApproaching }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onApproaching(rowIndex);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px 0px", // Trigger 600px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rowIndex, onApproaching]);

  // Invisible sentinel element
  return <div ref={sentinelRef} css={{ position: "absolute", height: 1, width: 1 }} />;
};

/** Row of cards - always renders cards, controls image loading via shouldLoadImage */
const CardRow: FC<{
  cards: GQL.Card[];
  rowIndex: number;
  allCards: GQL.Card[];
  shouldLoadImages: boolean;
  onRowApproaching: (rowIndex: number) => void;
}> = ({ cards, rowIndex, allCards, shouldLoadImages, onRowApproaching }) => {
  // Calculate if this row should show a quote (every 3rd row after the first)
  const showQuoteAfterRow = rowIndex > 0 && (rowIndex + 1) % 3 === 0;

  // Stable quote card selection - memoized to prevent changing on re-renders
  // Only select cards that have an info (card description)
  const quoteCard = useMemo(() => {
    if (!showQuoteAfterRow || allCards.length === 0) return undefined;
    // Filter cards that have info
    const cardsWithInfo = allCards.filter(card => card.info?.trim());
    if (cardsWithInfo.length === 0) return undefined;
    // Use a deterministic "random" based on rowIndex to keep it stable
    const seed = rowIndex * 7 + 3;
    const quoteCardIndex = seed % cardsWithInfo.length;
    return cardsWithInfo[quoteCardIndex];
  }, [showQuoteAfterRow, rowIndex, allCards]);

  return (
    <>
      {/* Sentinel for this row - triggers preloading when approaching */}
      {!shouldLoadImages && (
        <RowSentinel rowIndex={rowIndex} onApproaching={onRowApproaching} />
      )}
      {cards.map((card, i) => (
        <ListItem
          key={card._id}
          card={card}
          shouldLoadImage={shouldLoadImages}
          showQuote={showQuoteAfterRow && i === cards.length - 1}
          quoteCard={quoteCard}
        />
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

/** Skeleton grid shown while cards data is loading */
const SkeletonGrid: FC<{ cardsPerRow: number }> = ({ cardsPerRow }) => {
  const totalSkeletons = INITIAL_SKELETON_ROWS * cardsPerRow;
  return (
    <>
      {Array.from({ length: totalSkeletons }).map((_, i) => (
        <CardPlaceholder key={`skeleton-${i}`} />
      ))}
    </>
  );
};

const List = () => {
  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({ variables: { slug: deckId } });
  const { width } = useSize();

  // Track current deck for reset detection
  const currentDeckIdRef = useRef<string | undefined>(undefined);

  // Fetch cards using lighter query (CardsForDeckQuery)
  // Apollo cache-first policy ensures cached data is returned instantly
  // `loading` is false when data comes from cache
  const { cards, loading: cardsLoading } = useCardsForDeck(deck ? { variables: { deck: deck._id } } : undefined);

  // Track if data came from cache (detected on first render)
  // If cards available immediately (not loading), they came from cache
  const dataFromCacheRef = useRef<boolean | null>(null);
  if (dataFromCacheRef.current === null && deck) {
    // First time we check with a valid deck - record if data was instant
    dataFromCacheRef.current = !cardsLoading && !!cards;
  }

  // Determine cards per row based on screen width
  const cardsPerRow = width >= breakpoints.md
    ? CARDS_PER_ROW.lg
    : width >= breakpoints.sm
    ? CARDS_PER_ROW.md
    : CARDS_PER_ROW.sm;

  // Split cards into rows
  const rows = useCardRows(cards, cardsPerRow);

  // Maximum row index to load images for (monotonically increasing)
  // - If data came from cache, load all images immediately (browser has them cached too)
  // - If fresh fetch, start with first 2 rows and expand as user scrolls
  const [maxRowToLoadImages, setMaxRowToLoadImages] = useState(() => {
    // Will be updated by effect when rows are available
    return INITIAL_MAX_ROW;
  });

  // Reset maxRowToLoadImages when deck changes OR set to all rows if cached
  useEffect(() => {
    if (deckId !== currentDeckIdRef.current) {
      currentDeckIdRef.current = deckId as string | undefined;
      dataFromCacheRef.current = null; // Reset cache detection for new deck
      setMaxRowToLoadImages(INITIAL_MAX_ROW);
    }
  }, [deckId]);

  // When data comes from cache, load more rows immediately (but not all 55 cards)
  // The observer will quickly expand to remaining rows as user scrolls
  useEffect(() => {
    if (dataFromCacheRef.current && rows.length > 0) {
      // Data was cached - load first 6 rows immediately
      // This covers typical viewport without dumping all images at once
      setMaxRowToLoadImages(Math.min(CACHED_INITIAL_MAX_ROW, rows.length - 1));
    }
  }, [rows.length]);

  // Handler for when a row is approaching viewport - increase maxRowToLoadImages
  const handleRowApproaching = useCallback((rowIndex: number) => {
    setMaxRowToLoadImages((prev) => {
      const newMax = rowIndex + PRELOAD_ROWS_AHEAD;
      return Math.max(prev, newMax);
    });
  }, []);

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
      {/* Show skeleton grid while loading, then real cards */}
      {!cards ? (
        <SkeletonGrid cardsPerRow={cardsPerRow} />
      ) : (
        rows.map((rowCards, rowIndex) => (
          <CardRow
            key={`row-${rowIndex}`}
            cards={rowCards}
            rowIndex={rowIndex}
            allCards={cards}
            shouldLoadImages={rowIndex <= maxRowToLoadImages}
            onRowApproaching={handleRowApproaching}
          />
        ))
      )}
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
