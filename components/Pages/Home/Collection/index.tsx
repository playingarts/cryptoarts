import { FC, HTMLAttributes, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../Grid";
import Text from "../../../Text";
import Dot from "../../../Icons/Dot";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import CollectionItem from "./CollectionItem";
import {
  ITEM_HEIGHT,
  ITEM_GAP,
  ITEM_FLEX_BASIS,
  ITEM_BORDER_RADIUS,
  MAX_DECK_ITEMS,
  INFO_BLOCK_PADDING,
} from "./constants";

// Lazy-load Pop modal
const Pop = dynamic(() => import("../../CardPage/Pop"), { ssr: false });

// Skeleton placeholder for loading state
const SkeletonItem: FC = () => (
  <div
    css={(theme) => ({
      background: `linear-gradient(90deg, ${theme.colors.soft_gray} 25%, ${theme.colors.pale_gray} 50%, ${theme.colors.soft_gray} 75%)`,
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "200% 0" },
        "100%": { backgroundPosition: "-200% 0" },
      },
    })}
  />
);

// Type for the selected card when popup is open
type SelectedCard = {
  deckSlug: string;
  artistSlug: string;
  cardImg: string;
  artistName?: string;
  artistCountry?: string | null;
  cardBackground?: string | null;
  cardId?: string;
} | null;

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();
  const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);

  // Filter deck products and limit to MAX_DECK_ITEMS
  const deckProducts = useMemo(
    () =>
      products
        ?.filter((product) => product.type === "deck" && product.deck)
        .slice(0, MAX_DECK_ITEMS) ?? [],
    [products]
  );

  // Lifted popup handlers
  const handleCardClick = useCallback(
    (deckSlug: string, artistSlug: string, cardImg: string, artistName?: string, artistCountry?: string | null, cardBackground?: string | null, cardId?: string) => {
      setSelectedCard({ deckSlug, artistSlug, cardImg, artistName, artistCountry, cardBackground, cardId });
    },
    []
  );

  const handleClosePopup = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const isPopupOpen = selectedCard !== null;

  return (
    <>
      <Grid
        css={(theme) => [
          {
            background: theme.colors.pale_gray,
                      },
        ]}
        {...props}
      >
        <div
          css={(theme) => [
            {
              gridColumn: "1/-1",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: ITEM_GAP,
              "> *": {
                flex: `1 0 ${ITEM_FLEX_BASIS}`,
                height: ITEM_HEIGHT,
                background: theme.colors.soft_gray,
                borderRadius: ITEM_BORDER_RADIUS,
              },
              [theme.maxMQ.sm]: {
                "> *": {
                  flex: "1 0 48%", // 2 per row on tablet
                  height: 350,
                },
              },
              [theme.maxMQ.xsm]: {
                display: "flex",
                flexWrap: "wrap",
                gap: theme.spacing(1),
                "> *": {
                  flex: "1 1 45%",
                  height: 200,
                  minWidth: 0,
                },
              },
            },
          ]}
        >
          {deckProducts.length === 0
            ? // Show skeletons while loading
              Array.from({ length: MAX_DECK_ITEMS }, (_, i) => (
                <SkeletonItem key={`skeleton-${i}`} />
              ))
            : // Show actual items - first 3 get priority loading
              deckProducts.map((product, index) => (
                <CollectionItem
                  key={product._id || `collection-item-${index}`}
                  product={product}
                  paletteOnHover={product.deck?.slug === "crypto" ? "dark" : "light"}
                  onCardClick={handleCardClick}
                  priority={index < 3}
                />
              ))}
          <div css={(theme) => ({ padding: INFO_BLOCK_PADDING, [theme.maxMQ.xsm]: { padding: theme.spacing(2) } })} key="endless-inspiration">
            <Text typography="paragraphBig" css={(theme) => ({ [theme.maxMQ.xsm]: theme.typography.newh3 })}>
              Eight editions.
              <br />
              Endless inspiration.
            </Text>
            <Text typography="linkNewTypography" css={(theme) => ({ paddingTop: 15, [theme.maxMQ.xsm]: { paddingTop: theme.spacing(1.5) } })}>
              Discover the journey <Dot />
            </Text>
          </div>
        </div>
      </Grid>

      {/* Single popup instance for all items */}
      <MenuPortal show={isPopupOpen}>
        {selectedCard && (
          <Pop
            close={handleClosePopup}
            cardSlug={selectedCard.artistSlug}
            deckId={selectedCard.deckSlug}
            initialCardId={selectedCard.cardId}
            initialImg={selectedCard.cardImg}
            initialArtistName={selectedCard.artistName}
            initialArtistCountry={selectedCard.artistCountry ?? undefined}
            initialBackground={selectedCard.cardBackground ?? undefined}
          />
        )}
      </MenuPortal>
    </>
  );
};

export default Collection;
