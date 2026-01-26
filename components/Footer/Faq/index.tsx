import { FC, HTMLAttributes, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Intro from "../../Intro";
import ButtonTemplate from "../../Buttons/Button";
import Grid from "../../Grid";
import Item from "./Item";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useRouter } from "next/router";
import { useCardsForDeck } from "../../../hooks/card";
import { useDecks } from "../../../hooks/deck";
import Card from "../../Card";
import MenuPortal from "../../Header/MainMenu/MenuPortal";
import FlippingCard from "./FlippingCard";
import CardsSkeleton from "./CardsSkeleton";
import { useCardPageContextOptional } from "../../Pages/CardPage/CardPageContext";
import {
  FAQ_DATA,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_BORDER_RADIUS,
  CARD_CONTAINER_HEIGHT,
  CARD_POSITION_TOP,
  CARD_POSITION_LEFT,
  BACKSIDE_ROTATION,
  FRONT_ROTATION,
} from "./constants";

// Lazy-load Pop modal - only shown on card click
const Pop = dynamic(() => import("../../Pages/CardPage/Pop"), { ssr: false });

// Type for the selected card when popup is open
type SelectedCard = {
  deckSlug: string;
  artistSlug: string;
  cardImg: string;
  cardId: string;
} | null;

const FooterCards: FC<{ overrideDeckSlug?: string }> = ({ overrideDeckSlug }) => {
  const {
    query: { deckId: deckSlug, artistSlug },
  } = useRouter();

  // Use override deck slug if provided (e.g., from product page)
  const effectiveDeckSlug = overrideDeckSlug || deckSlug;

  // Check if we're on a card page (has artistSlug)
  const isCardPage = typeof artistSlug === "string";

  // Get current card from CardPageContext (updates instantly on navigation)
  // Use optional version since FAQ can be rendered outside CardPageProvider
  const cardPageContext = useCardPageContextOptional();
  const contextArtistSlug = cardPageContext?.artistSlug;
  const sortedCards = cardPageContext?.sortedCards || [];

  // Find current card from sorted cards (instant update on navigation)
  const currentPageCard = useMemo(() => {
    if (!isCardPage || !contextArtistSlug || !sortedCards.length) return null;
    return sortedCards.find((c) => c.artist?.slug === contextArtistSlug) || null;
  }, [isCardPage, contextArtistSlug, sortedCards]);

  // Get all decks to pick a random one
  const { decks } = useDecks();

  // Pick a random deck on mount (or use current deck if on deck/card page)
  // Exclude crypto edition deck
  const selectedDeck = useMemo(() => {
    // On deck or card pages, use the deck from the URL (effectiveDeckSlug is the deck slug)
    if (effectiveDeckSlug && decks) {
      const deckFromUrl = decks.find((d) => d.slug === effectiveDeckSlug);
      if (deckFromUrl) return deckFromUrl;
    }
    // On other pages, pick a random deck (excluding crypto)
    if (!decks || decks.length === 0) return null;
    const filteredDecks = decks.filter((deck) => deck.slug !== "crypto");
    if (filteredDecks.length === 0) return null;
    return filteredDecks[Math.floor(Math.random() * filteredDecks.length)];
  }, [effectiveDeckSlug, decks]);

  const selectedDeckSlug = selectedDeck?.slug;

  // Fetch cards from the selected deck using deckSlug (shares cache with deck/card pages)
  const { cards, loading } = useCardsForDeck({
    variables: { deckSlug: selectedDeckSlug },
    skip: !selectedDeckSlug,
  });

  // Popup state for card click
  const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);
  const isPopupOpen = selectedCard !== null;

  // Filter cards for display
  const { backsideCard, frontCards } = useMemo(() => {
    if (!cards || cards.length === 0) {
      return { backsideCard: null, frontCards: [] };
    }

    // Find a backside card
    const backsides = cards.filter((card) => card.value === "backside");
    const backside = backsides.length > 0
      ? backsides[Math.floor(Math.random() * backsides.length)]
      : null;

    // Find all non-backside cards
    const fronts = cards.filter(
      (card) => card.value !== "backside" && card.value !== "joker"
    );

    return { backsideCard: backside, frontCards: fronts };
  }, [cards]);

  const handleCardClick = useCallback((card: GQL.Card) => {
    if (selectedDeck?.slug && card?.artist?.slug && card?.img) {
      setSelectedCard({
        deckSlug: selectedDeck.slug,
        artistSlug: card.artist.slug,
        cardImg: card.img,
        cardId: card._id,
      });
    }
  }, [selectedDeck]);

  const handleClosePopup = useCallback(() => {
    setSelectedCard(null);
  }, []);

  // Show skeleton while loading
  if (loading || !backsideCard || frontCards.length === 0) {
    return <CardsSkeleton />;
  }

  // On card pages, show the current card as static (no flipping)
  if (isCardPage && currentPageCard) {
    return (
      <>
        {/* Backside card behind - static */}
        <Card
          noArtist
          noFavorite
          interactive={false}
          card={backsideCard}
          css={[{ rotate: BACKSIDE_ROTATION, transformOrigin: "bottom left", zIndex: 1 }]}
        />

        {/* Current page card - static, no flipping */}
        <Card
          noArtist
          noFavorite
          interactive={false}
          card={currentPageCard}
          css={[{
            rotate: FRONT_ROTATION,
            transformOrigin: "left",
            zIndex: 2,
          }]}
        />
      </>
    );
  }

  return (
    <>
      {/* Backside card behind - static */}
      <Card
        noArtist
        noFavorite
        interactive={false}
        card={backsideCard}
        css={[{ rotate: BACKSIDE_ROTATION, transformOrigin: "bottom left", zIndex: 1 }]}
      />

      {/* Front card - flipping */}
      <FlippingCard
        cards={frontCards}
        isPaused={isPopupOpen}
        onCardClick={handleCardClick}
      />

      {/* Popup for card details */}
      <MenuPortal show={isPopupOpen}>
        {selectedCard && (
          <Pop
            close={handleClosePopup}
            cardSlug={selectedCard.artistSlug}
            deckId={selectedCard.deckSlug}
            initialCardId={selectedCard.cardId}
            initialImg={selectedCard.cardImg}
            showNavigation={false}
          />
        )}
      </MenuPortal>
    </>
  );
};

interface FAQProps extends HTMLAttributes<HTMLElement> {
  deckSlug?: string;
}

const FAQ: FC<FAQProps> = ({ deckSlug, ...props }) => {
  const { palette } = usePalette();

  return (
    <div
      css={(theme) => [
        {
          background:
            theme.colors[palette === "dark" ? "darkBlack" : "soft_gray"],
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
          },
        },
      ]}
    >
      <Intro
        arrowedText="FAQ"
        paragraphText="All your questions, dealt."
        linkNewText="Read full FAQ"
        palette={palette}
        beforeLinkNew={
          <ButtonTemplate
            bordered={true}
            size="small"
            palette={palette}
            color={palette === "dark" ? "white75" : undefined}
          >
            Ask a question
          </ButtonTemplate>
        }
      />
      <Grid>
        <div
          css={(theme) => [
            {
              gridColumn: "span 6",
              position: "relative",
              height: CARD_CONTAINER_HEIGHT,
              marginTop: 15,
              [theme.maxMQ.xsm]: {
                display: "none",
              },
            },
          ]}
        >
          <div
            css={[
              {
                position: "absolute",
                top: CARD_POSITION_TOP,
                left: CARD_POSITION_LEFT,
                "> *": {
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: CARD_BORDER_RADIUS,
                  position: "absolute",
                  transform: "translate(-50%,-70%)",
                  top: 0,
                  left: 0,
                },
              },
            ]}
          >
            <FooterCards overrideDeckSlug={deckSlug} />
          </div>
        </div>
        <div
          css={(theme) => [
            {
              gridColumn: "span 6",
              display: "grid",
              paddingTop: 90,
              paddingBottom: 90,
              marginTop: 15,
              paddingRight: 30,
              gap: 10,
              alignContent: "center",
              [theme.maxMQ.xsm]: {
                gridColumn: "1 / -1 !important",
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
                paddingRight: 0,
                marginTop: 0,
              },
            },
          ]}
        >
          {Object.keys(FAQ_DATA).map((item) => (
            <Item
              key={item}
              question={item}
              answer={FAQ_DATA[item as keyof typeof FAQ_DATA]}
              palette={palette}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default FAQ;
