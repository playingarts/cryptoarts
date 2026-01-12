import dynamic from "next/dynamic";
import { FC, Fragment, HTMLAttributes, useEffect, useState, useRef, useCallback, useMemo } from "react";
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
        <Grid css={[{ width: "100%" }]}>
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
                marginTop: 30,
              },
            ]}
          >
            <div css={[{ display: "flex", gap: 30 }]}>
              <img
                src={quoteCard.artist.userpic}
                alt=""
                css={{ width: 80, height: 80 }}
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
      )}
    </Fragment>
  );
};

/** Placeholder for cards not yet loaded */
const CardPlaceholder: FC = () => (
  <div
    css={{
      width: 300,
      height: 450,
      borderRadius: 15,
      background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
      backgroundSize: "200% 100%",
      animation: "cardShimmer 1.5s infinite linear",
      "@keyframes cardShimmer": {
        "0%": { backgroundPosition: "200% 0" },
        "100%": { backgroundPosition: "-200% 0" },
      },
    }}
  />
);

/** Row of cards - loads when scrolled into view */
const CardRow: FC<{
  cards: GQL.Card[];
  rowIndex: number;
  cardsPerRow: number;
  allCards: GQL.Card[];
  onVisible: () => void;
  /** For first 2 rows: load immediately when user starts scrolling anywhere */
  loadEarly?: boolean;
}> = ({ cards, rowIndex, cardsPerRow, allCards, onVisible, loadEarly }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(rowIndex === 0); // First row visible immediately

  // Load early when scroll starts (for first 2 rows)
  useEffect(() => {
    if (isVisible) return;
    if (loadEarly && rowIndex <= 1) {
      setIsVisible(true);
      onVisible();
    }
  }, [loadEarly, rowIndex, isVisible, onVisible]);

  useEffect(() => {
    if (isVisible || rowIndex === 0) return;

    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible();
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
  }, [isVisible, rowIndex, onVisible]);

  // Calculate if this row should show a quote (every 3rd row after the first)
  const showQuoteAfterRow = rowIndex > 0 && (rowIndex + 1) % 3 === 0;
  const quoteCardIndex = showQuoteAfterRow
    ? Math.floor(Math.random() * cards.length) + rowIndex * cardsPerRow
    : -1;
  const quoteCard = showQuoteAfterRow && quoteCardIndex < allCards.length
    ? allCards[quoteCardIndex % allCards.length]
    : undefined;

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
        <div key={card._id} ref={i === 0 ? sentinelRef : undefined}>
          <CardPlaceholder />
        </div>
      ))}
    </>
  );
};

/** Split cards into rows based on cards per row */
const useCardRows = (cards: GQL.Card[] | undefined, cardsPerRow: number) => {
  return useMemo(() => {
    if (!cards) return [];
    const rows: GQL.Card[][] = [];
    for (let i = 0; i < cards.length; i += cardsPerRow) {
      rows.push(cards.slice(i, i + cardsPerRow));
    }
    return rows;
  }, [cards, cardsPerRow]);
};

const List = () => {
  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({ variables: { slug: deckId } });
  const { cards } = useCards(deck && { variables: { deck: deck._id } });
  const { width } = useSize();

  // Determine cards per row based on screen width
  const cardsPerRow = width >= breakpoints.md
    ? CARDS_PER_ROW.lg
    : width >= breakpoints.sm
    ? CARDS_PER_ROW.md
    : CARDS_PER_ROW.sm;

  // Split cards into rows
  const rows = useCardRows(cards, cardsPerRow);

  // Track how many rows are rendered (start with first 2 rows)
  const [renderedRows, setRenderedRows] = useState(2);

  // Track if first two rows should start loading (triggered by any scroll)
  const [shouldLoadInitial, setShouldLoadInitial] = useState(false);

  // Listen for any scroll to trigger loading of first two rows early
  useEffect(() => {
    if (shouldLoadInitial) return; // Already triggered

    const handleScroll = () => {
      setShouldLoadInitial(true);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldLoadInitial]);

  // Callback when a row becomes visible - render the next row
  const handleRowVisible = useCallback(() => {
    setRenderedRows((prev) => Math.min(prev + 1, rows.length));
  }, [rows.length]);

  // Reset rendered rows when deck changes
  useEffect(() => {
    setRenderedRows(2);
    setShouldLoadInitial(false);
  }, [deckId]);

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
      {rows.slice(0, renderedRows).map((rowCards, rowIndex) => (
        <CardRow
          key={`row-${rowIndex}`}
          cards={rowCards}
          rowIndex={rowIndex}
          cardsPerRow={cardsPerRow}
          allCards={cards}
          onVisible={handleRowVisible}
          loadEarly={shouldLoadInitial}
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
