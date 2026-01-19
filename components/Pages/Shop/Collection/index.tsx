import { FC, Fragment, HTMLAttributes, useState, useEffect, useMemo, useRef, useCallback } from "react";
import Grid from "../../../Grid";
import { useProducts } from "../../../../hooks/product";
import { useRatings } from "../../../../hooks/ratings";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import NavButton from "../../../Buttons/NavButton";
import Rating from "../../../Icons/Rating";
import Text from "../../../Text";
import CollectionItem from "./CollectionItem";

const REVIEW_ROTATION_INTERVAL = 10000; // 10 seconds

// Rotating review component
const RotatingReview: FC = () => {
  const { ratings } = useRatings({ variables: { shuffle: true, limit: 20 } });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Pause auto-rotation for 15 seconds after manual navigation
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 15000);
  }, [shuffledRatings.length]);

  // Auto-rotate every 10 seconds with fade transition
  useEffect(() => {
    if (shuffledRatings.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      navigateTo(1);
    }, REVIEW_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [shuffledRatings.length, isPaused, navigateTo]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentReview = shuffledRatings[currentIndex];

  if (!currentReview) {
    return (
      <>
        <Text css={[{ marginTop: 30 }]}>
          "Not only are they little gems by their own right,
          they are also a perfect way to discover new talented
          artists."
        </Text>
        <Text typography="paragraphSmall" css={[{ marginTop: 15 }]}>
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
        <Text css={[{ marginTop: 30 }]}>
          "{currentReview.review}"
        </Text>
        <Text typography="paragraphSmall" css={[{ marginTop: 15 }]}>
          {currentReview.who}
        </Text>
        {currentReview.title && (
          <ArrowButton css={[{ marginTop: 15 }]} noColor size="small" base>
            {currentReview.title}
          </ArrowButton>
        )}
      </div>
      <div css={{ marginTop: 20, display: "flex", gap: 5 }}>
        <NavButton
          css={{ transform: "rotate(180deg)" }}
          onClick={() => navigateTo(-1)}
        />
        <NavButton onClick={() => navigateTo(1)} />
      </div>
    </>
  );
};

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  return (
    <Grid
      id="playing-cards"
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingBottom: 60,
          paddingTop: 60,
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
            // flexWrap: "wrap",
            gap: 3,
            marginTop: 60,
            " > *": {
              background: theme.colors.soft_gray,
              borderRadius: 16,
              overflow: "hidden",
              "&:hover": {
                background: theme.colors.white75,
              },
            },
          },
        ]}
      >
        {products &&
          products.map(
            (product, index) =>
              product.type === "deck" && (
                <Fragment key={"product" + product._id}>
                  {index === 2 && (
                    <div
                      css={[{ display: "grid", alignContent: "space-between" }]}
                    >
                      <Text css={[{ margin: 30 }]}>1,000+ reviews</Text>
                      <div css={[{ margin: 30 }]}>
                        <Rating />
                        <Rating />
                        <Rating />
                        <Rating />
                        <Rating />
                        <RotatingReview />
                      </div>
                    </div>
                  )}

                  <CollectionItem
                    palette={
                      product.deck && product.deck.slug === "crypto"
                        ? "dark"
                        : undefined
                    }
                    product={product}
                  />
                </Fragment>
              )
          )}
      </div>
    </Grid>
  );
};

export default Collection;
