"use client";

import { FC, HTMLAttributes, useMemo, useState, useCallback } from "react";
import Grid from "../../../Grid";
import { useRouter } from "next/router";
import { useCard, useCards } from "../../../../hooks/card";
import { useDeck } from "../../../../hooks/deck";
import { useProducts } from "../../../../hooks/product";
import { usePalette } from "../../Deck/DeckPaletteContext";
import { theme } from "../../../../styles/theme";
import { SSRCardProps } from "../../../../pages/[deckId]/[artistSlug]";

// Sub-components with progressive loading
import HeroCard from "./HeroCard";
import HeroHeader from "./HeroHeader";
import HeroArtist from "./HeroArtist";
import HeroCardInfo from "./HeroCardInfo";
import HeroDeck from "./HeroDeck";

/** Helper to build URLs with base link */
const buildUrl = (path: string): string => {
  const baseLink = process.env.NEXT_PUBLIC_BASELINK || "";
  return `${baseLink}${path}`;
};

interface HeroProps extends HTMLAttributes<HTMLElement> {
  ssrCard?: SSRCardProps;
}

/**
 * Card page Hero with progressive loading:
 * P0: Card image + artist name/country (instant from ssrCard)
 * P1: Artist bio, userpic, socials (lazy)
 * P2: Card description/info (lazy)
 * P3: Deck info (lazy)
 */
const Hero: FC<HeroProps> = ({ ssrCard }) => {
  const {
    query: { artistSlug, deckId },
  } = useRouter();

  const { palette } = usePalette();
  const isDark = deckId === "crypto" || palette === "dark";

  // Loading states for progressive sections
  const [loadArtist, setLoadArtist] = useState(false);
  const [loadCardInfo, setLoadCardInfo] = useState(false);
  const [loadDeck, setLoadDeck] = useState(false);

  // P0: Card data - use SSR card immediately, Apollo data when ready
  const { card: apolloCard } = useCard({
    variables: { slug: artistSlug, deckSlug: deckId },
    skip: !artistSlug || !deckId,
  });
  const card = apolloCard || ssrCard;

  // P1: Artist data - triggered when approaching "The Artist" section
  // Artist data is already in card, just controls skeleton display
  const artistLoading = loadArtist && !apolloCard;

  // Fetch deck data - needed for backside card (fetch immediately, not lazily)
  const { deck, loading: deckQueryLoading } = useDeck({
    variables: { slug: deckId },
    skip: !deckId,
  });

  // Fetch cards for the deck to find the backside card (fetch immediately)
  const { cards } = useCards(
    deck && {
      variables: { deck: deck._id },
    }
  );

  // Track if deck section should show (for skeleton display)
  const deckLoading = loadDeck && deckQueryLoading;

  // Find the backside card for this deck
  const backsideCard = useMemo(() => {
    if (!cards) return null;
    const backsides = cards.filter((c) => c.value === "backside");
    return backsides.length > 0 ? backsides[0] : null;
  }, [cards]);

  // Products for deck image (only after deck loads)
  const { products } = useProducts();

  // Card edition info
  const cardEdition = card?.edition;
  const editionInfo = cardEdition
    ? deck?.editions?.find((e) => e.name === cardEdition)
    : undefined;

  // URLs
  const editionSlug = editionInfo?.url || deckId;
  const shopUrl = buildUrl(`/shop/${editionSlug}`);
  const deckUrl = buildUrl(`/${editionSlug}`);

  // Product deck slug mapping for Future editions
  const productDeckSlug =
    cardEdition === "chapter ii" ? "future-ii" : editionSlug;

  // Deck image from product
  const product = products?.find(
    (p) => p.type === "deck" && p.deck?.slug === productDeckSlug
  );
  const deckImage = product?.image2 || editionInfo?.img || deck?.image;

  // Format edition name
  const editionDisplayName = cardEdition
    ? cardEdition.replace(/\b\w/g, (c: string) => c.toUpperCase())
    : null;

  // Progressive loading triggers
  const handleArtistVisible = useCallback(() => {
    setLoadArtist(true);
    // Pre-trigger card info loading
    setTimeout(() => setLoadCardInfo(true), 100);
  }, []);

  const handleCardInfoVisible = useCallback(() => {
    setLoadCardInfo(true);
    // Pre-trigger deck loading
    setTimeout(() => setLoadDeck(true), 100);
  }, []);

  const handleDeckVisible = useCallback(() => {
    setLoadDeck(true);
  }, []);

  return (
    <Grid
      css={{ paddingTop: 145, paddingBottom: 150 }}
      style={
        deckId === "crypto"
          ? { backgroundColor: theme.colors.darkBlack }
          : card?.cardBackground
          ? { backgroundColor: card.cardBackground }
          : {}
      }
    >
      {/* Left column: Card */}
      <div
        css={{
          gridColumn: "span 6",
          position: "sticky",
          top: 100,
          alignSelf: "start",
          paddingTop: 30,
        }}
      >
        {/* Key forces animation to replay on page navigation */}
        <HeroCard key={`card-${artistSlug}`} card={card} backsideCard={backsideCard} dark={isDark} />
      </div>

      {/* Right column: Info sections */}
      <div css={{ gridColumn: "span 6" }}>
        {/* P0: Artist name + country + CTAs (instant) */}
        {/* Key forces animation to replay on page navigation */}
        <HeroHeader
          key={`header-${artistSlug}`}
          artistName={card?.artist?.name}
          country={card?.artist?.country ?? undefined}
          shopUrl={shopUrl}
          deckUrl={deckUrl}
          dark={isDark}
        />

        {/* P1: The Artist section (lazy) */}
        <HeroArtist
          artist={
            apolloCard?.artist
              ? {
                  name: apolloCard.artist.name,
                  userpic: apolloCard.artist.userpic,
                  info: apolloCard.artist.info,
                  social: apolloCard.artist.social,
                }
              : loadArtist
              ? ssrCard?.artist
              : undefined
          }
          dark={isDark}
          onVisible={handleArtistVisible}
          loading={artistLoading}
        />

        {/* P2: Card info/description (lazy) */}
        <HeroCardInfo
          info={loadCardInfo ? card?.info : undefined}
          dark={isDark}
          onVisible={handleCardInfoVisible}
          loading={loadCardInfo && !card?.info && !!ssrCard}
        />

        {/* P3: The Deck section (lazy) */}
        <HeroDeck
          deck={deck}
          deckImage={deckImage}
          editionDisplayName={editionDisplayName}
          shopUrl={shopUrl}
          deckUrl={deckUrl}
          dark={isDark}
          onVisible={handleDeckVisible}
          loading={deckLoading}
        />
      </div>
    </Grid>
  );
};

export default Hero;
