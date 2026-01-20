import { FC, HTMLAttributes, useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useCardPop, useCardsForDeck, useCards } from "../../../../hooks/card";
import { useDecks } from "../../../../hooks/deck";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import FlippableCard from "../../../Card/FlippableCard";
import { useFavorites } from "../../../Contexts/favorites";
import Plus from "../../../Icons/Plus";
import Star from "../../../Icons/Star";
import Link from "../../../Link";
import Text from "../../../Text";
import { usePalette } from "../../Deck/DeckPaletteContext";
import { sortCards } from "../../../../source/utils/sortCards";
import { setNavigationCard } from "../navigationCardStore";
import { setNavigationDeck } from "../../Deck/navigationDeckStore";
import { startPerfNavTiming } from "../../../../source/utils/perfNavTracer";

const FavButton: FC<
  HTMLAttributes<HTMLElement> & { deckSlug: string; id: string; loading?: boolean }
> = ({ deckSlug, id, loading }) => {
  const { isFavorite, addItem, removeItem } = useFavorites();

  const [favState, setFavState] = useState(false);
  const [showNotification, setShowNotification] = useState<"added" | "removed" | null>(null);

  useEffect(() => {
    if (id) {
      setFavState(isFavorite(deckSlug, id));
    }
  }, [isFavorite, deckSlug, id]);

  // Auto-hide notification after 1.5s
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Show disabled placeholder while loading
  if (loading || !id) {
    return (
      <Button
        color="accent"
        css={{
          padding: 0,
          width: 45,
          height: 45,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          opacity: 0.5,
          cursor: "default",
          pointerEvents: "none",
        }}
      >
        {/* Empty - no star icon while loading */}
      </Button>
    );
  }

  return (
    <div css={{ position: "relative" }}>
      {showNotification && (
        <div
          css={(theme) => ({
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: 8,
            // Label styling from components/Label
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "18px",
            padding: "6px 10px 4px",
            background: "white",
            borderRadius: 50,
            color: theme.colors.black,
            whiteSpace: "nowrap",
            animation: "fadeInOut 1.5s ease-in-out",
            "@keyframes fadeInOut": {
              "0%": { opacity: 0, transform: "translateX(-50%) translateY(5px)" },
              "15%": { opacity: 1, transform: "translateX(-50%) translateY(0)" },
              "85%": { opacity: 1, transform: "translateX(-50%) translateY(0)" },
              "100%": { opacity: 0, transform: "translateX(-50%) translateY(-5px)" },
            },
          })}
        >
          {showNotification === "added" ? "Added to favourites" : "Removed from favourites"}
        </div>
      )}
      <Button
        color={favState ? "white" : "accent"}
        css={(theme) => [
          {
            padding: 0,
            width: 45,
            height: 45,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          },
          favState && {
            color: theme.colors.accent,
            "&:hover": {
              color: theme.colors.accent,
            },
          },
        ]}
        onClick={() => {
          if (favState) {
            removeItem(deckSlug, id);
            setFavState(false);
            setShowNotification("removed");
          } else {
            addItem(deckSlug, id);
            setFavState(true);
            setShowNotification("added");
          }
        }}
      >
        <Star />
      </Button>
    </div>
  );
};

const CustomMiddle: FC<{
  cardState: string | undefined;
  setCardState: (arg0: string | undefined) => void;
  deck: GQL.Deck | undefined;
  edition?: string;
  showNavigation?: boolean;
  /** Custom cards for navigation (e.g., favorites page with cards from multiple decks) */
  navigationCards?: GQL.Card[];
}> = ({ cardState, deck, setCardState, edition, showNavigation = true, navigationCards }) => {
  // Use custom cards if provided, otherwise fetch from deck
  const { cards: rawCards } = useCardsForDeck(deck && showNavigation && !navigationCards ? { variables: { deck: deck._id, edition } } : { skip: true });
  const [counter, setCounter] = useState(0);

  // Use custom navigation cards if provided, otherwise sort fetched cards
  const cards = useMemo(() => {
    if (navigationCards) return navigationCards;
    return rawCards ? sortCards(rawCards) : undefined;
  }, [rawCards, navigationCards]);

  useEffect(() => {
    if (!cards) {
      return;
    }
    setCounter(cards.findIndex((card) => card.artist.slug === cardState));
  }, [cardState, cards]);

  // Don't show navigation controls when disabled
  if (!showNavigation) {
    return null;
  }

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
        <NavButton
          onClick={() =>
            cards &&
            setCardState(
              counter > 0
                ? cards[counter - 1].artist.slug
                : cards[cards.length - 1].artist.slug
            )
          }
          css={[{ transform: "rotate(180deg)" }]}
        />
      </span>
      <span css={[{ marginRight: 5 }]}>
        <NavButton
          onClick={() =>
            cards &&
            setCardState(
              counter < cards.length - 1
                ? cards[counter + 1].artist.slug
                : cards[0].artist.slug
            )
          }
        />
      </span>
      <span css={[{ marginLeft: 30 }]}>
        Card {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + (cards ? cards.length.toString().padStart(2, "0") : "")}
      </span>
    </Text>
  );
};

const Pop: FC<
  HTMLAttributes<HTMLElement> & {
    close: () => void;
    cardSlug: string;
    deckId: string;
    edition?: string;
    initialImg?: string;
    initialVideo?: string;
    initialArtistName?: string;
    initialArtistCountry?: string;
    initialBackground?: string;
    showNavigation?: boolean;
    /** Called when navigating away (e.g., clicking "Card details") - use to close parent menus */
    onNavigate?: () => void;
    /** Custom cards for navigation (e.g., favorites page with cards from multiple decks) */
    navigationCards?: GQL.Card[];
    /** Called when navigating to a different card via arrows - receives the new card */
    onCardChange?: (card: GQL.Card) => void;
  }
> = ({ close, cardSlug, deckId, edition, initialImg, initialVideo, initialArtistName, initialArtistCountry, initialBackground, showNavigation = true, onNavigate, navigationCards, onCardChange, ...props }) => {
  const [cardState, setCardState] = useState<string | undefined>(cardSlug);
  const [currentDeckId, setCurrentDeckId] = useState(deckId);
  const router = useRouter();

  // Lock body scroll when popup is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Get deck from cached decks array instead of separate query
  const { decks } = useDecks();
  const deck = useMemo(() => decks?.find((d) => d.slug === currentDeckId), [decks, currentDeckId]);

  // Fetch cards for the deck to find the backside card
  const { cards } = useCards(
    deck && {
      variables: { deck: deck._id },
    }
  );

  // Find the backside card for this deck
  const backsideCard = useMemo(() => {
    if (!cards) return null;
    const backsides = cards.filter((c) => c.value === "backside");
    return backsides.length > 0 ? backsides[0] : null;
  }, [cards]);

  // Use lightweight popup query (cache-and-network for fresh data on navigation)
  const { card, loading: cardLoading } = useCardPop({
    variables: { deckSlug: currentDeckId, slug: cardState },
    fetchPolicy: "cache-and-network",
  });

  const { palette } = usePalette();

  // Wrapper for setCardState that also updates deck when using custom navigation cards
  const handleSetCardState = useCallback((artistSlug: string | undefined) => {
    setCardState(artistSlug);
    // If using custom navigation cards, find the card and update deck
    if (navigationCards && artistSlug) {
      const navCard = navigationCards.find((c) => c.artist.slug === artistSlug);
      if (navCard?.deck?.slug) {
        setCurrentDeckId(navCard.deck.slug);
        onCardChange?.(navCard);
      }
    }
  }, [navigationCards, onCardChange]);

  // Navigate to card page with instant display
  const handleCardDetailsClick = useCallback(() => {
    // Store card data for instant display on card page
    const artistSlug = card?.artist.slug || cardState;
    if (artistSlug) {
      setNavigationCard({
        _id: card?._id || "nav",
        img: card?.img || initialImg || "",
        video: card?.video || initialVideo || null,
        info: card?.info || null,
        background: card?.background || null,
        cardBackground: card?.cardBackground || initialBackground || null,
        edition: card?.edition || edition || null,
        deck: { slug: currentDeckId },
        artist: {
          name: card?.artist.name || initialArtistName || "",
          slug: artistSlug,
          country: card?.artist.country || initialArtistCountry || null,
          userpic: card?.artist.userpic || null,
          info: card?.artist.info || null,
          social: (card?.artist.social as Record<string, string | null>) || null,
        },
      });
    }
    close();
    // Also close parent menu if callback provided
    onNavigate?.();

    // Track navigation timing
    const destPath = `/${deckId}/${artistSlug}`;
    startPerfNavTiming("click", "CardPop", destPath, false);

    // Use Next.js router for navigation
    // The CardPage will show navCard instantly while getStaticProps runs in background
    router.push(destPath);
  }, [card, cardState, initialImg, initialVideo, initialArtistName, initialArtistCountry, initialBackground, edition, deckId, close, onNavigate, router]);

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black50,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,

          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      ]}
      onClick={close}
      {...props}
    >
      <div
        css={(theme) => [
          {
            width: "100%",
            maxWidth: 1130,
            padding: 30,
            paddingBottom: 90,
            backgroundColor:
              card?.background || card?.cardBackground || initialBackground || (palette === "dark" ? "#181818" : theme.colors.pale_gray),
            display: "flex",
            gap: 30,
            borderRadius: 15,
            margin: "0 auto",
            marginTop: 60,
            minHeight: 715,
            transition: "background-color 0.3s ease",
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div css={[{ flex: 1 }]}>
          <Text
            typography="newh4"
            css={{ "&:hover": { opacity: 0.7, cursor: "pointer" }, transition: "opacity 0.2s" }}
            onClick={() => {
              // Store deck data for instant display on deck page
              if (deck) {
                setNavigationDeck({
                  slug: deckId,
                  title: (edition || card?.edition) === "chapter i" || deckId === "future"
                    ? "Future Chapter I"
                    : (edition || card?.edition) === "chapter ii" || deckId === "future-ii"
                    ? "Future Chapter II"
                    : deck.title,
                  description: deck.info,
                });
              }
              close();
              onNavigate?.();
              // Track navigation timing
              startPerfNavTiming("click", "CardPop-Deck", `/${deckId}`, false);
              router.push(`/${deckId}`);
            }}
          >
            {deck
              ? (edition || card?.edition) === "chapter i" || deckId === "future"
                ? "Future Chapter I"
                : (edition || card?.edition) === "chapter ii" || deckId === "future-ii"
                ? "Future Chapter II"
                : deck.title
              : null}{" "}
          </Text>
          <div
            css={{
              marginTop: 30,
              animation: "slideDown 0.4s ease-out",
              "@keyframes slideDown": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {card && card.artist?.slug === cardState ? (
              <FlippableCard
                key={"PopCard" + cardState}
                css={[{ margin: "0 auto" }]}
                card={{
                  ...card,
                  deck: { slug: deckId } as unknown as GQL.Deck,
                }}
                backsideCard={backsideCard}
                noArtist
                size="big"
                // Autoplay video if card has one
                animated={!!card.video}
              />
            ) : initialImg && cardState === cardSlug ? (
              // Show initial image instantly while card data loads
              <FlippableCard
                key="PopCard-initial"
                css={[{ margin: "0 auto" }]}
                card={{
                  _id: "initial",
                  img: initialImg,
                  video: initialVideo,
                  deck: { slug: deckId } as unknown as GQL.Deck,
                } as GQL.Card}
                backsideCard={backsideCard}
                noArtist
                size="big"
                animated={!!initialVideo}
              />
            ) : null}
          </div>
        </div>
        <div
          css={[
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
            },
          ]}
        >
          <div css={[{ display: "flex", justifyContent: "space-between" }]}>
            <CustomMiddle
              deck={deck}
              cardState={cardState}
              setCardState={handleSetCardState}
              edition={edition}
              showNavigation={showNavigation}
              navigationCards={navigationCards}
            />
            <Button
              palette={palette}
              css={(theme) => [
                {
                  borderRadius: "100%",
                  padding: 0,
                  width: 45,
                  height: 45,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto", // Always push to right
                },
                palette === "dark" && {
                  background: theme.colors.white,
                  // color: theme.colors.black,
                },
              ]}
              onClick={close}
              aria-label="Close card preview"
            >
              <Plus css={[{ rotate: "45deg" }]} />
            </Button>
          </div>
          <div
            css={[
              {
                marginTop: 30,
                display: "grid",
                alignContent: "center",
                maxWidth: 410,
                flex: 1,
              },
            ]}
          >
            {/* Artist name and country - use initial values or card data, skeleton only if neither available */}
            {(card && card.artist?.slug === cardState) || (initialArtistName && cardState === cardSlug) ? (
              <div
                css={{
                  animation: "fadeIn 0.3s ease-out",
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0, transform: "translateY(8px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Text typography="newh2"> {card?.artist.name || initialArtistName} </Text>
                <Text typography="newh4"> {card?.artist.country || initialArtistCountry} </Text>
              </div>
            ) : (
              // Skeleton loading for artist info - matches newh2 (lineHeight: 66px) and newh4 (lineHeight: 45px)
              <div>
                <div
                  css={{
                    height: 66,
                    width: 280,
                    borderRadius: 8,
                    background: palette === "dark"
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
                <div
                  css={{
                    height: 45,
                    width: 150,
                    borderRadius: 6,
                    background: palette === "dark"
                      ? "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)"
                      : "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite linear",
                  }}
                />
              </div>
            )}
            {/* Buttons - always visible, same design for all cards */}
            <div
              css={[
                {
                  marginTop: 30,
                  display: "flex",
                  gap: 15,
                  alignItems: "center",
                },
              ]}
            >
              <FavButton deckSlug={currentDeckId} id={card?._id || ""} loading={cardLoading} />

              <Button color="accent" css={{ fontSize: 20 }} onClick={handleCardDetailsClick}>
                Card details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pop;
