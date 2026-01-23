import {
  FC,
  HTMLAttributes,
  useMemo,
  useState,
} from "react";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import { useDecks } from "../../../../hooks/deck";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import AddToBag from "../../../Buttons/AddToBag";
import Button from "../../../Buttons/Button";
import SoldOut from "../../../Buttons/SoldOut";
import { useFavorites } from "../../../Contexts/favorites";
import { useCardsByIds } from "../../../../hooks/card";
import Card from "../../../Card";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../../CardPage/Pop";

// Deck slug sort order: Zero, One, Two, Three, Special, Future I, Future II, Crypto (same as menu)
const deckSortOrder: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  special: 4,
  "future:chapter i": 5,
  "future:chapter ii": 6,
  future: 7, // fallback for mixed/unknown editions
  crypto: 8,
};

/** Get display title for deck section key */
const getSectionTitle = (sectionKey: string, deckTitle: string): string => {
  if (sectionKey === "future:chapter i") return "Future Chapter I";
  if (sectionKey === "future:chapter ii") return "Future Chapter II";
  return deckTitle;
};

/** Shimmer animation for skeleton loading */
const shimmerStyle = {
  background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite linear",
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" },
  },
} as const;

/** Skeleton for a single card */
const CardSkeleton: FC = () => (
  <div css={{ width: 300 }}>
    <div css={{ position: "relative", height: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        css={{
          width: 270,
          height: 380,
          borderRadius: 15,
          ...shimmerStyle,
        }}
      />
    </div>
    <div css={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
      <div css={{ width: 120, height: 18, borderRadius: 4, ...shimmerStyle }} />
    </div>
  </div>
);

/** Skeleton for deck section header */
const DeckHeaderSkeleton: FC = () => (
  <Grid>
    <ScandiBlock css={[{ gridColumn: "span 6" }]}>
      <div css={{ width: 150, height: 32, borderRadius: 8, ...shimmerStyle }} />
    </ScandiBlock>
    <ScandiBlock css={[{ gridColumn: "span 6", gap: 30 }]}>
      <div css={{ width: 100, height: 40, borderRadius: 20, ...shimmerStyle }} />
      <div css={{ width: 60, height: 40, borderRadius: 20, ...shimmerStyle }} />
    </ScandiBlock>
  </Grid>
);

/** Skeleton for entire favorites section */
const FavoritesSkeleton: FC = () => (
  <div>
    <DeckHeaderSkeleton />
    <Grid>
      <div
        css={{
          gridColumn: "1/-1",
          marginTop: 60,
          display: "flex",
          flexWrap: "wrap",
          columnGap: 30,
          rowGap: 60,
          justifyContent: "flex-start",
        }}
      >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </Grid>
  </div>
);

interface DeckSectionProps {
  deck: GQL.Deck;
  cards: GQL.Card[];
  setCardsState: (state: {
    slug: string;
    deckSlug: string;
    cardImg: string;
    artistName: string;
    artistCountry?: string;
    cardId: string;
    deckCards: GQL.Card[];
    deckTitle: string;
  }) => void;
  sectionTitle: string;
}

/** Single deck section with its favorited cards */
const DeckSection: FC<DeckSectionProps> = ({ deck, cards, setCardsState, sectionTitle }) => {

  return (
    <div>
      <Grid>
        <ScandiBlock css={[{ gridColumn: "span 6" }]}>
          <ArrowedButton>{sectionTitle}</ArrowedButton>
        </ScandiBlock>
        <ScandiBlock css={[{ gridColumn: "span 6", gap: 30 }]}>
          {deck.product && (
            deck.slug === "crypto" ? (
              <Button size="small" bordered>
                Exclusive
              </Button>
            ) : deck.product.status === "soldout" ? (
              <SoldOut />
            ) : (
              <>
                <AddToBag productId={deck.product._id} />
                <Button noColor size="small" base>
                  ${deck.product.price.usd}
                </Button>
              </>
            )
          )}
        </ScandiBlock>
      </Grid>
      <Grid>
        <div
          css={{
            gridColumn: "1/-1",
            marginTop: 60,
            display: "flex",
            flexWrap: "wrap",
            columnGap: 30,
            rowGap: 60,
            justifyContent: "flex-start",
          }}
        >
          {cards.map((card) => (
            <Card
              key={card._id}
              noFavorite={true}
              onClick={() =>
                setCardsState({
                  slug: card.artist.slug,
                  deckSlug: deck.slug,
                  cardImg: card.img,
                  artistName: card.artist.name,
                  artistCountry: card.artist.country,
                  cardId: card._id,
                  deckCards: cards,
                  deckTitle: sectionTitle,
                })
              }
              size="preview"
              css={{ width: 300 }}
              card={{
                ...card,
                deck: { slug: deck.slug } as unknown as GQL.Deck,
              }}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
};

const Cards: FC<HTMLAttributes<HTMLElement>> = () => {
  const { decks } = useDecks();
  const { favorites } = useFavorites();
  const [cardState, setCardState] = useState<{
    slug: string;
    deckSlug: string;
    cardImg: string;
    artistName: string;
    artistCountry?: string;
    cardId: string;
    /** Cards for navigation within this deck section */
    deckCards: GQL.Card[];
    /** Title of the deck for popup display */
    deckTitle: string;
  }>();

  // Collect ALL favorite card IDs across all decks into a single array
  // Filter out any empty/invalid IDs that may have been stored by bugs
  const allFavoriteIds = useMemo(() => {
    if (!favorites) return [];
    return Object.values(favorites).flat().filter((id) => id && id.length > 0);
  }, [favorites]);

  // Single query to fetch all favorite cards at once
  const { cards: allCards, loading, error } = useCardsByIds({
    variables: { ids: allFavoriteIds },
    skip: allFavoriteIds.length === 0,
  });

  // Debug logging (early - before derived values)
  if (process.env.NODE_ENV === "development") {
    console.log("Favorites debug:", {
      favorites,
      allFavoriteIds,
      allCards,
      loading,
      error: error?.message,
    });
  }

  // Group cards by deck slug for display, splitting Future by edition
  const cardsBySection = useMemo(() => {
    if (!allCards || !favorites) return {};
    const grouped: Record<string, GQL.Card[]> = {};

    for (const deckSlug of Object.keys(favorites)) {
      const deckFavIds = favorites[deckSlug];
      // Filter cards for this deck and maintain order from favorites
      const deckCards = deckFavIds
        .map((id) => allCards.find((c) => c._id === id))
        .filter((c): c is GQL.Card => c !== undefined);

      if (deckCards.length === 0) continue;

      // Split Future deck by edition
      if (deckSlug === "future") {
        const chapterI = deckCards.filter((c) => c.edition === "chapter i");
        const chapterII = deckCards.filter((c) => c.edition === "chapter ii");

        if (chapterI.length > 0) {
          grouped["future:chapter i"] = chapterI;
        }
        if (chapterII.length > 0) {
          grouped["future:chapter ii"] = chapterII;
        }
      } else {
        grouped[deckSlug] = deckCards;
      }
    }
    return grouped;
  }, [allCards, favorites]);

  // Get sorted section keys that have favorites
  const sortedSectionKeys = useMemo(() => {
    if (!decks) return [];
    return Object.keys(cardsBySection)
      .sort((a, b) => (deckSortOrder[a] ?? 99) - (deckSortOrder[b] ?? 99));
  }, [decks, cardsBySection]);

  return (
    <>
      <MenuPortal show={!!cardState}>
        {cardState && (
          <Pop
            close={() => setCardState(undefined)}
            cardSlug={cardState.slug}
            deckId={cardState.deckSlug}
            initialCardId={cardState.cardId}
            initialImg={cardState.cardImg}
            initialArtistName={cardState.artistName}
            initialArtistCountry={cardState.artistCountry}
            showNavigation={true}
            navigationCards={cardState.deckCards}
          />
        )}
      </MenuPortal>
      <div
        css={(theme) => ({
          background: theme.colors.pale_gray,
          paddingTop: 60,
          paddingBottom: 60,
          ">:not(:last-child)": { marginBottom: 120 },
        })}
      >
        {/* Show skeleton while favorites/decks are loading or cards are fetching */}
        {favorites === undefined || !decks || loading ? (
          <FavoritesSkeleton />
        ) : allFavoriteIds.length === 0 ? null : !allCards || allCards.length === 0 ? (
          <FavoritesSkeleton />
        ) : (
          sortedSectionKeys.map((sectionKey) => {
            // Map section key to actual deck slug
            // "future:chapter i" -> "future", "future:chapter ii" -> "future-ii"
            let deckSlug: string;
            if (sectionKey === "future:chapter i") {
              deckSlug = "future";
            } else if (sectionKey === "future:chapter ii") {
              deckSlug = "future-ii";
            } else {
              deckSlug = sectionKey;
            }
            const deck = decks?.find((d) => d.slug === deckSlug);
            const cards = cardsBySection[sectionKey];
            if (!deck || !cards || cards.length === 0) return null;
            return (
              <DeckSection
                key={sectionKey}
                deck={deck}
                cards={cards}
                setCardsState={setCardState}
                sectionTitle={getSectionTitle(sectionKey, deck.title)}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Cards;
