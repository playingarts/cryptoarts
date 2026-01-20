import { FC, HTMLAttributes, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Grid from "../../../../Grid";
import FlippingCard from "./FlippingCard";
import MenuPortal from "../../../../Header/MainMenu/MenuPortal";
import { useStableCards, HomeCard } from "../../../../../contexts/heroCarouselContext";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_VERTICAL_OFFSET,
  CARD_GAP,
  CARD_GRID_LEFT_OFFSET,
  STICKY_TOP,
  MARGIN_TOP,
  MARGIN_BOTTOM,
  ROTATION_DEGREES,
  MIN_FLIP_INTERVAL,
  MAX_FLIP_INTERVAL,
  CARD_COUNT,
  FALLBACK_CARDS,
} from "../constants";

// Lazy-load Pop modal - only shown on card click
const Pop = dynamic(() => import("../../../CardPage/Pop"), { ssr: false });

// Type for the selected card when popup is open
type SelectedCard = {
  deckSlug: string;
  artistSlug: string;
  cardImg: string;
  cardBackground: string;
  cardId: string;
  artistName?: string;
  artistCountry?: string;
} | null;

// Scroll threshold to start rendering cards (px)
const SCROLL_THRESHOLD = 50;

const CardSmall: FC<HTMLAttributes<HTMLElement>> = () => {
  const { allCards } = useStableCards();
  const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Defer rendering until user scrolls past threshold
  useEffect(() => {
    // Check if already scrolled past threshold on mount
    if (window.scrollY > SCROLL_THRESHOLD) {
      setShouldRender(true);
      // Trigger fade-in after render
      requestAnimationFrame(() => setIsVisible(true));
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setShouldRender(true);
        // Trigger fade-in after render
        requestAnimationFrame(() => setIsVisible(true));
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use cards from context or fallbacks
  const cards = allCards.length >= CARD_COUNT ? allCards : FALLBACK_CARDS;

  // Lifted popup handlers - single popup instance for all cards
  const handleCardClick = useCallback((card: HomeCard) => {
    if (card.deck?.slug && card.artist?.slug && card.img) {
      setSelectedCard({
        deckSlug: card.deck.slug,
        artistSlug: card.artist.slug,
        cardImg: card.img,
        cardBackground: card.cardBackground,
        cardId: card._id,
        artistName: card.artist.name,
        artistCountry: card.artist.country,
      });
    }
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const isPopupOpen = selectedCard !== null;

  // Don't render cards until user scrolls past threshold
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Grid
        css={(theme) => [
          {
            position: "absolute",
            height: "100%",
            top: 0,
            left: 0,
            width: "100%",
            pointerEvents: "none",
            zIndex: 10,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease-out",
            [theme.maxMQ.sm]: {
              // Mobile styles - to be implemented
            },
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              position: "absolute",
              left: CARD_GRID_LEFT_OFFSET,
              height: "100%",
              [theme.maxMQ.sm]: {
                // Mobile styles - to be implemented
              },
              gridColumn: "1/-1",
              pointerEvents: "auto",
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                position: "sticky",
                display: "grid",
                gridTemplateColumns: `repeat(3, ${CARD_WIDTH}px)`,
                columnGap: CARD_GAP,
                rowGap: CARD_GAP,
                "> *": {
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                },
                // Position cards: 1st in col 1, 2nd & 3rd in col 2, 4th in col 3
                // Offset col 1 up by 1/3 card height, col 3 down by 1/3
                ">:nth-of-type(1)": {
                  gridColumn: 1,
                  gridRow: 2,
                  position: "relative",
                  top: -CARD_VERTICAL_OFFSET,
                },
                ">:nth-of-type(2)": { gridColumn: 2, gridRow: 1 },
                ">:nth-of-type(3)": { gridColumn: 2, gridRow: 2 },
                ">:nth-of-type(4)": {
                  gridColumn: 3,
                  gridRow: 1,
                  position: "relative",
                  top: CARD_VERTICAL_OFFSET,
                },
                marginTop: MARGIN_TOP,
                marginBottom: MARGIN_BOTTOM,
                top: STICKY_TOP,
                [theme.maxMQ.sm]: {
                  // Mobile styles - to be implemented
                },
                // GPU acceleration for smooth scrolling
                willChange: "transform",
                transform: `rotate(${ROTATION_DEGREES}deg) translateZ(0)`,
              },
            ]}
          >
            {Array.from({ length: CARD_COUNT }, (_, index) => (
              <FlippingCard
                key={`flipping-card-${index}`}
                cards={cards}
                initialIndex={index}
                minInterval={MIN_FLIP_INTERVAL}
                maxInterval={MAX_FLIP_INTERVAL}
                globalPaused={isPopupOpen}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </Grid>

      {/* Single popup instance for all cards */}
      <MenuPortal show={isPopupOpen}>
        {selectedCard && (
          <Pop
            close={handleClosePopup}
            cardSlug={selectedCard.artistSlug}
            deckId={selectedCard.deckSlug}
            initialCardId={selectedCard.cardId}
            initialImg={selectedCard.cardImg}
            initialBackground={selectedCard.cardBackground}
            initialArtistName={selectedCard.artistName}
            initialArtistCountry={selectedCard.artistCountry}
            showNavigation={false}
          />
        )}
      </MenuPortal>
    </>
  );
};

export default CardSmall;
