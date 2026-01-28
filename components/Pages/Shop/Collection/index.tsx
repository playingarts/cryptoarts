import { FC, Fragment, HTMLAttributes, useState, useEffect, useMemo, useCallback } from "react";
import Grid from "../../../Grid";
import { useProducts } from "../../../../hooks/product";
import { useRatings } from "../../../../hooks/ratings";
import { usePageVisibility } from "../../../../hooks/usePageVisibility";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import NavButton from "../../../Buttons/NavButton";
import Rating from "../../../Icons/Rating";
import Text from "../../../Text";
import CollectionItem from "./CollectionItem";

const REVIEW_ROTATION_INTERVAL = 10000; // 10 seconds

// Skeleton for a single collection item
const CollectionItemSkeleton: FC = () => (
  <div
    css={(theme) => ({
      background: theme.colors.soft_gray,
      borderRadius: 16,
      padding: theme.spacing(3),
      minHeight: 400,
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1.5),
    })}
  >
    {/* Card image skeleton */}
    <div
      css={{
        width: 184,
        height: 260,
        margin: "0 auto",
        borderRadius: 10,
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      }}
    />
    {/* Title skeleton */}
    <div
      css={{
        height: 25,
        width: "60%",
        borderRadius: 4,
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
    {/* Description skeleton */}
    <div
      css={{
        height: 18,
        width: "80%",
        borderRadius: 4,
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
    {/* Button skeleton */}
    <div
      css={{
        height: 40,
        width: 120,
        borderRadius: 5,
        marginTop: "auto",
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
  </div>
);

// Skeleton grid for loading state (8 deck products + 1 reviews block)
const CollectionSkeleton: FC = () => (
  <>
    <CollectionItemSkeleton />
    <CollectionItemSkeleton />
    {/* Reviews placeholder */}
    <div
      css={(theme) => ({
        background: theme.colors.soft_gray,
        borderRadius: 16,
        padding: theme.spacing(3),
        display: "grid",
        alignContent: "space-between",
      })}
    >
      <div
        css={{
          height: 25,
          width: 120,
          borderRadius: 4,
          background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite linear",
        }}
      />
      <div css={(theme) => ({ display: "flex", flexDirection: "column", gap: theme.spacing(1.5) })}>
        <div css={{ display: "flex", gap: 5 }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              css={{
                width: 20,
                height: 20,
                borderRadius: 2,
                background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite linear",
              }}
            />
          ))}
        </div>
        <div
          css={{
            height: 60,
            width: "100%",
            borderRadius: 4,
            background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite linear",
          }}
        />
        <div
          css={{
            height: 18,
            width: "50%",
            borderRadius: 4,
            background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite linear",
          }}
        />
      </div>
    </div>
    <CollectionItemSkeleton />
    <CollectionItemSkeleton />
    <CollectionItemSkeleton />
    <CollectionItemSkeleton />
    <CollectionItemSkeleton />
    <CollectionItemSkeleton />
  </>
);

// Rotating review component
const RotatingReview: FC = () => {
  const { ratings } = useRatings({ variables: { shuffle: true, limit: 20 } });
  const isPageVisible = usePageVisibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Get a random starting index on mount
  const shuffledRatings = useMemo(() => {
    if (!ratings || ratings.length === 0) return [];
    // Start from a random position
    const startIndex = Math.floor(Math.random() * ratings.length);
    return [...ratings.slice(startIndex), ...ratings.slice(0, startIndex)];
  }, [ratings]);

  // Navigate with fade transition
  const navigateTo = useCallback((direction: 1 | -1) => {
    if (shuffledRatings.length === 0) return;

    // Fade out
    setIsVisible(false);

    // After fade out, change content and fade in
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return shuffledRatings.length - 1;
        if (next >= shuffledRatings.length) return 0;
        return next;
      });
      setIsVisible(true);
    }, 300);
  }, [shuffledRatings.length]);

  // Auto-rotate every 10 seconds with fade transition (pause when tab not visible)
  useEffect(() => {
    if (shuffledRatings.length === 0 || !isPageVisible) return;

    const interval = setInterval(() => {
      navigateTo(1);
    }, REVIEW_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [shuffledRatings.length, navigateTo, isPageVisible]);

  const currentReview = shuffledRatings[currentIndex];

  if (!currentReview) {
    return (
      <>
        <Text css={(theme) => [{ marginTop: theme.spacing(3) }]}>
          "Not only are they little gems by their own right,
          they are also a perfect way to discover new talented
          artists."
        </Text>
        <Text typography="p-s" css={[{ marginTop: 15 }]}>
          Matthew V. from Florida, USA
        </Text>
      </>
    );
  }

  return (
    <>
      <div
        css={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Text css={(theme) => [{ marginTop: theme.spacing(3), [theme.maxMQ.xsm]: { display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" } }]}>
          "{currentReview.review}"
        </Text>
        <Text typography="p-s" css={[{ marginTop: 15 }]}>
          {currentReview.who}
        </Text>
        {currentReview.title && (
          <ArrowButton css={[{ marginTop: 15 }]} noColor size="small" base>
            {currentReview.title}
          </ArrowButton>
        )}
      </div>
      <div css={(theme) => ({ display: "flex", alignItems: "center", gap: 5, marginTop: theme.spacing(2) })}>
        <NavButton
          css={{ transform: "rotate(180deg)" }}
          onClick={() => navigateTo(-1)}
        />
        <NavButton onClick={() => navigateTo(1)} />
        <ArrowButton
          href="#reviews"
          noColor
          size="small"
          base
          css={{ marginLeft: 25 }}
        >
          All reviews
        </ArrowButton>
      </div>
    </>
  );
};

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products, loading } = useProducts();

  return (
    <Grid
      id="playing-cards"
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingBottom: theme.spacing(6),
          paddingTop: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            paddingBottom: theme.spacing(4),
            paddingTop: theme.spacing(4),
          },
        },
      ]}
    >
      <ArrowedButton css={[{ gridColumn: "1/-1", justifySelf: "start" }]}>
        Discover your next deck
      </ArrowedButton>
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 3,
            marginTop: theme.spacing(6),
            " > *": {
              background: theme.colors.soft_gray,
              borderRadius: 16,
              overflow: "hidden",
            },
            [theme.maxMQ.sm]: {
              gridTemplateColumns: "1fr 1fr",
            },
            [theme.maxMQ.xsm]: {
              gridTemplateColumns: "1fr 1fr",
              marginTop: theme.spacing(3),
              gap: 10,
            },
          },
        ]}
      >
        {!products && loading ? (
          <CollectionSkeleton />
        ) : products &&
          (() => {
            let deckIndex = 0;
            return products.map((product) => {
              if (product.type !== "deck") return null;
              const currentDeckIndex = deckIndex;
              deckIndex++;
              const reviewsBlock = (
                <div
                  css={(theme) => [{ display: "grid", alignContent: "space-between", height: "100%", [theme.maxMQ.xsm]: { gridColumn: "1 / -1", height: 450 } }]}
                >
                  <Text css={(theme) => [{ margin: 30, [theme.maxMQ.xsm]: { margin: theme.spacing(2) } }]}>1,000+ reviews</Text>
                  <div css={(theme) => [{ margin: 30, marginTop: 0, [theme.maxMQ.xsm]: { margin: theme.spacing(2), marginTop: 0 } }]}>
                    <Rating />
                    <Rating />
                    <Rating />
                    <Rating />
                    <Rating />
                    <RotatingReview />
                  </div>
                </div>
              );
              return (
                <Fragment key={"product" + product._id}>
                  {/* Desktop: reviews before 3rd deck */}
                  {currentDeckIndex === 2 && (
                    <div css={(theme) => [{ [theme.maxMQ.xsm]: { display: "none" } }]}>
                      {reviewsBlock}
                    </div>
                  )}
                  <CollectionItem
                    palette={product.deck && product.deck.slug === "crypto" ? "dark" : undefined}
                    product={product}
                    fullWidthMobile={product.deck && (product.deck.slug === "zero" || product.deck.slug === "future")}
                  />
                  {/* Mobile: reviews after Edition Two */}
                  {product.deck && product.deck.slug === "two" && (
                    <div css={(theme) => [{ display: "none", [theme.maxMQ.xsm]: { display: "grid", gridColumn: "1 / -1" } }]}>
                      {reviewsBlock}
                    </div>
                  )}
                </Fragment>
              );
            });
          })()
        }
      </div>
    </Grid>
  );
};

export default Collection;
