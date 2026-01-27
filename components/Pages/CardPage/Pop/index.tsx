import { FC, HTMLAttributes, useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useCardPop, useCardsForDeck } from "../../../../hooks/card";
import { useDecks } from "../../../../hooks/deck";
import ArrowButton from "../../../Buttons/ArrowButton";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import FlippableCard from "../../../Card/FlippableCard";
import { useFavorites } from "../../../Contexts/favorites";
import { useFlyingFav } from "../../../Contexts/flyingFav";
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
  const { triggerFly } = useFlyingFav();
  const buttonRef = useRef<HTMLDivElement>(null);

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
          borderRadius: "50%",
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
    <div css={{ position: "relative" }} ref={buttonRef}>
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
            borderRadius: "50%",
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
            // Trigger flying star animation
            if (buttonRef.current) {
              const rect = buttonRef.current.getBoundingClientRect();
              triggerFly(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
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
  /** Pre-fetched cards from parent (to avoid duplicate queries) */
  prefetchedCards?: GQL.Card[];
  palette?: "dark" | "light";
}> = ({ cardState, deck, setCardState, edition, showNavigation = true, navigationCards, prefetchedCards, palette }) => {
  // Use custom cards if provided, otherwise use prefetched cards from parent
  // This eliminates duplicate fetches - parent already fetches with deckSlug for cache alignment
  const rawCards = navigationCards || prefetchedCards;
  const [counter, setCounter] = useState(0);

  // Sort cards for consistent navigation order (by value then suit)
  const cards = useMemo(() => {
    if (navigationCards) return sortCards(navigationCards);
    return rawCards ? sortCards(rawCards) : undefined;
  }, [rawCards, navigationCards]);

  const hasCards = cards && cards.length > 0;

  useEffect(() => {
    if (!cards) {
      return;
    }
    setCounter(cards.findIndex((card) => card.artist.slug === cardState));
  }, [cardState, cards]);

  // Animated counter for loading state
  const [animatedIndex, setAnimatedIndex] = useState(1);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hasCards) {
      // Clear animation when cards load
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    } else if (showNavigation) {
      // Loading state - animate the counter
      let count = 1;
      animationRef.current = setInterval(() => {
        count = (count % 55) + 1;
        setAnimatedIndex(count);
      }, 50);
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [hasCards, showNavigation]);

  // Don't show navigation controls when disabled
  if (!showNavigation) {
    return null;
  }

  const displayIndex = hasCards ? counter + 1 : animatedIndex;
  const displayMax = hasCards ? cards.length : 55;

  return (
    <Text
      typography="p-s"
      palette={palette}
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
          palette={palette}
          onClick={
            hasCards
              ? () =>
                  setCardState(
                    counter > 0
                      ? cards[counter - 1].artist.slug
                      : cards[cards.length - 1].artist.slug
                  )
              : undefined
          }
          css={[
            { transform: "rotate(180deg)" },
            !hasCards && { cursor: "default" },
          ]}
        />
      </span>
      <span css={[{ marginRight: 5 }]}>
        <NavButton
          palette={palette}
          onClick={
            hasCards
              ? () =>
                  setCardState(
                    counter < cards.length - 1
                      ? cards[counter + 1].artist.slug
                      : cards[0].artist.slug
                  )
              : undefined
          }
          css={[!hasCards && { cursor: "default" }]}
        />
      </span>
      <span css={[{ marginLeft: 30 }]}>
        Card {displayIndex.toString().padStart(2, "0") + " "}/
        {" " + displayMax.toString().padStart(2, "0")}
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
    initialCardId?: string;
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
    /** Override deck slug for favorites storage (e.g., "future" for both Future chapters) */
    favoritesKey?: string;
  }
> = ({ close, cardSlug, deckId, edition, initialCardId, initialImg, initialVideo, initialArtistName, initialArtistCountry, initialBackground, showNavigation = true, onNavigate, navigationCards, onCardChange, favoritesKey, ...props }) => {
  const [cardState, setCardState] = useState<string | undefined>(cardSlug);
  const [currentDeckId, setCurrentDeckId] = useState(deckId);
  const [currentCardId, setCurrentCardId] = useState<string | undefined>(initialCardId);
  const router = useRouter();
  const { setPopupOpen } = useFlyingFav();

  // Lock body scroll and notify floating button when popup is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setPopupOpen(true);
    return () => {
      document.body.style.overflow = originalOverflow;
      setPopupOpen(false);
    };
  }, [setPopupOpen]);

  // Prefetch card page bundle when popup opens - makes navigation instant
  useEffect(() => {
    if (currentDeckId && cardState) {
      router.prefetch(`/${currentDeckId}/${cardState}`);
    }
  }, [router, currentDeckId, cardState]);

  // Get deck from cached decks array instead of separate query
  const { decks } = useDecks();
  const deck = useMemo(() => decks?.find((d) => d.slug === currentDeckId), [decks, currentDeckId]);

  // Track current edition (may change when navigating between cards with different editions)
  const [currentEdition, setCurrentEdition] = useState(edition);

  // Fetch cards using deckSlug to align with card page's Apollo cache
  // This enables instant navigation: popup loads data, card page reads from cache
  // For decks with multiple editions (Future I/II), filter by edition
  const { cards } = useCardsForDeck(
    currentDeckId ? { variables: { deckSlug: currentDeckId, edition: currentEdition || undefined } } : { skip: true }
  );

  // All available cards for lookup: custom navigationCards (favorites) OR prefetched cards
  const allAvailableCards = navigationCards || cards;

  // Find current card from available cards - instant lookup, no query needed
  const cardFromNavigation = useMemo(() => {
    if (!allAvailableCards || !cardState) return null;
    return allAvailableCards.find((c) => c.artist.slug === cardState) || null;
  }, [allAvailableCards, cardState]);

  // Find the backside card for this deck
  const backsideCard = useMemo(() => {
    if (!cards) return null;
    const backsides = cards.filter((c) => c.value === "backside");
    return backsides.length > 0 ? backsides[0] : null;
  }, [cards]);

  // Only query if card not found in available cards (fallback for deep links, etc.)
  const shouldFetchCard = !cardFromNavigation && cardState;
  const { card: cardFromQuery, loading: cardLoading } = useCardPop({
    variables: { deckSlug: currentDeckId, slug: cardState },
    fetchPolicy: "cache-and-network",
    skip: !shouldFetchCard,
  });

  // Use card from navigation (instant) or fall back to query result
  const card = cardFromNavigation || cardFromQuery;

  const { palette: contextPalette } = usePalette();
  // Use dark palette for crypto deck, regardless of context
  const palette = currentDeckId === "crypto" ? "dark" : contextPalette;

  // Update currentCardId and edition when card data loads
  useEffect(() => {
    if (card?._id) {
      setCurrentCardId(card._id);
    }
    // Update edition when card data loads (important for Future I/II navigation)
    if (card?.edition) {
      setCurrentEdition(card.edition);
    }
  }, [card?._id, card?.edition]);

  // Wrapper for setCardState that also updates deck when using custom navigation cards
  const handleSetCardState = useCallback((artistSlug: string | undefined) => {
    setCardState(artistSlug);
    // Look up card in available cards for instant data (no query needed)
    const availableCards = navigationCards || cards;
    if (availableCards && artistSlug) {
      const navCard = availableCards.find((c) => c.artist.slug === artistSlug);
      if (navCard) {
        // Set cardId immediately - no need to wait for query
        if (navCard._id) {
          setCurrentCardId(navCard._id);
        }
        // Update deck if navigating between decks (favorites page)
        if (navCard.deck?.slug) {
          setCurrentDeckId(navCard.deck.slug);
        }
        // Update edition for Future I/II navigation
        if (navCard.edition) {
          setCurrentEdition(navCard.edition);
        }
        onCardChange?.(navCard);
        return;
      }
    }
    // Fallback: reset cardId when card not found (will be set when query loads)
    setCurrentCardId(undefined);
  }, [navigationCards, cards, onCardChange]);

  // Navigate to card page with instant display
  const handleCardDetailsClick = useCallback(() => {
    // Store card data for instant display on card page
    const artistSlug = card?.artist.slug || cardState;
    if (artistSlug) {
      // Try to get full card data from cards array if available (more complete)
      const fullCard = cards?.find(c => c.artist.slug === artistSlug);
      const cardToStore = fullCard || card;

      setNavigationCard({
        _id: cardToStore?._id || "nav",
        img: cardToStore?.img || initialImg || "",
        video: cardToStore?.video || initialVideo || null,
        info: cardToStore?.info || null,
        background: cardToStore?.background || null,
        cardBackground: cardToStore?.cardBackground || initialBackground || null,
        edition: cardToStore?.edition || currentEdition || null,
        deck: { slug: currentDeckId, title: deck?.title },
        artist: {
          name: cardToStore?.artist.name || initialArtistName || "",
          slug: artistSlug,
          country: cardToStore?.artist.country || initialArtistCountry || null,
          userpic: cardToStore?.artist.userpic || null,
          info: cardToStore?.artist.info || null,
          social: (cardToStore?.artist.social as Record<string, string | null>) || null,
        },
        // Include backside card for instant flip animation on card page
        backsideCard: backsideCard ? { img: backsideCard.img, video: backsideCard.video } : undefined,
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
  }, [card, cards, cardState, initialImg, initialVideo, initialArtistName, initialArtistCountry, initialBackground, currentEdition, deckId, currentDeckId, backsideCard, close, onNavigate, router]);

  // Get the correct deck URL for Future editions (with hash for tab)
  const getDeckUrl = useCallback((deckSlug: string, cardEdition?: string | null) => {
    const editionValue = cardEdition || edition || card?.edition;
    // Check edition value first
    if (editionValue === "chapter i") return "/future#chapter-i";
    if (editionValue === "chapter ii") return "/future#chapter-ii";
    // Fallback: check deck slug for Future decks (in case edition not loaded yet)
    if (deckSlug === "future") return "/future#chapter-i";
    if (deckSlug === "future-ii") return "/future#chapter-ii";
    return `/${deckSlug}`;
  }, [edition, card?.edition]);

  // Navigate to deck page
  const handleViewDeckClick = useCallback(() => {
    const deckUrl = getDeckUrl(currentDeckId, card?.edition);
    // Check if we're already on this deck page - if so, just close and scroll to top
    const currentPath = router.asPath.split("#")[0]; // Remove hash for comparison
    const targetPath = deckUrl.split("#")[0];
    if (currentPath === targetPath) {
      close();
      onNavigate?.();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Store deck data for instant display on deck page
    setNavigationDeck({
      slug: currentDeckId,
      title: (edition || card?.edition) === "chapter i" || currentDeckId === "future"
        ? "Future Chapter I"
        : (edition || card?.edition) === "chapter ii" || currentDeckId === "future-ii"
        ? "Future Chapter II"
        : deck?.title || "",
      description: deck?.info || "",
    });
    close();
    onNavigate?.();
    // Track navigation timing
    startPerfNavTiming("click", "CardPop-Deck", deckUrl, false);
    router.push(deckUrl);
  }, [currentDeckId, edition, card?.edition, deck?.title, deck?.info, close, onNavigate, router, getDeckUrl]);

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
            padding: theme.spacing(3),
            paddingBottom: 90,
            backgroundColor:
              card?.background || card?.cardBackground || initialBackground || (palette === "dark" ? "#212121" : theme.colors.pale_gray),
            display: "flex",
            gap: theme.spacing(3),
            borderRadius: theme.spacing(1.5),
            margin: "0 auto",
            marginTop: theme.spacing(6),
            minHeight: 715,
            transition: "background-color 0.3s ease",
            [theme.maxMQ.sm]: {
              flexDirection: "column",
              minHeight: "auto",
              marginTop: theme.spacing(3),
              paddingBottom: theme.spacing(6),
            },
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div css={[{ flex: 1 }]}>
          {deck ? (
            <Text
              typography="h4"
              palette={palette}
              css={{ "&:hover": { opacity: 0.7, cursor: "pointer" }, transition: "opacity 0.2s" }}
              onClick={() => {
                const deckUrl = getDeckUrl(deckId, card?.edition);
                // Check if we're already on this deck page - if so, just close and scroll to top
                const currentPath = router.asPath.split("#")[0];
                const targetPath = deckUrl.split("#")[0];
                if (currentPath === targetPath) {
                  close();
                  onNavigate?.();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
                // Store deck data for instant display on deck page
                setNavigationDeck({
                  slug: deckId,
                  title: (edition || card?.edition) === "chapter i" || deckId === "future"
                    ? "Future Chapter I"
                    : (edition || card?.edition) === "chapter ii" || deckId === "future-ii"
                    ? "Future Chapter II"
                    : deck.title,
                  description: deck.info,
                });
                close();
                onNavigate?.();
                // Track navigation timing
                startPerfNavTiming("click", "CardPop-Deck", deckUrl, false);
                router.push(deckUrl);
              }}
            >
              {(edition || card?.edition) === "chapter i" || deckId === "future"
                ? "Future Chapter I"
                : (edition || card?.edition) === "chapter ii" || deckId === "future-ii"
                ? "Future Chapter II"
                : deck.title}{" "}
            </Text>
          ) : (
            <div
              css={{
                height: 45,
                width: 180,
                borderRadius: 6,
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
          )}
          <div
            css={(theme) => ({
              marginTop: theme.spacing(3),
              animation: "slideDown 0.4s ease-out",
              "@keyframes slideDown": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            })}
          >
            {/* Use same key to prevent flash when card data loads */}
            {(card && card.artist?.slug === cardState) || (initialImg && cardState === cardSlug) ? (
              <FlippableCard
                key={"PopCard" + cardState}
                css={[{ margin: "0 auto" }]}
                card={{
                  _id: card?._id || "initial",
                  img: card?.img || initialImg || "",
                  video: card?.video || initialVideo,
                  deck: { slug: currentDeckId } as unknown as GQL.Deck,
                  ...(card && { ...card }),
                } as GQL.Card}
                backsideCard={backsideCard}
                noArtist
                size="big"
                palette={palette}
                animated={!!(card?.video || initialVideo)}
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
              prefetchedCards={cards}
              palette={palette}
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
            css={(theme) => [
              {
                marginTop: theme.spacing(3),
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
                <Text typography="h2" palette={palette}> {card?.artist.name || initialArtistName} </Text>
                <Text typography="h4" palette={palette}> {card?.artist.country || initialArtistCountry} </Text>
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
              css={(theme) => [
                {
                  marginTop: theme.spacing(3),
                  display: "flex",
                  gap: theme.spacing(1.5),
                  alignItems: "center",
                },
              ]}
            >
              <FavButton deckSlug={favoritesKey || currentDeckId} id={currentCardId || ""} />

              <Button color="accent" size="medium" onClick={handleCardDetailsClick}>
                Card details
              </Button>

              <ArrowButton
                noColor
                base
                size="small"
                palette={palette}
                css={(theme) => [
                  { marginLeft: 15 },
                  palette === "dark" && {
                    color: theme.colors.white75,
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: theme.colors.white,
                    },
                  },
                ]}
                onClick={handleViewDeckClick}
              >
                View the deck
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pop;
