import { FC, HTMLAttributes, useMemo, useState, useEffect } from "react";
import { keyframes } from "@emotion/react";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import Card from "../../../Card";
import { cardSizes } from "../../../Card/sizes";
import { useCardPageContext } from "../CardPageContext";

/** Placeholder for empty photo slots */
const PLACEHOLDER_COLOR = "#E5E5E5";

/** Fade in animation */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/** Flip duration */
const FLIP_DURATION = 800;
/** Delay before first auto-flip */
const FLIP_DELAY = 2000;
/** Interval between auto-flips */
const FLIP_INTERVAL = 5000;

interface FlipCardProps {
  card: GQL.Card;
  backsideCard?: GQL.Card | null;
}

/** Card that auto-flips and also flips on click, pauses on hover */
const FlipCard: FC<FlipCardProps> = ({ card, backsideCard }) => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const dimensions = cardSizes.nano;

  // Reset rotation when card changes
  useEffect(() => {
    setRotation(0);
  }, [card._id]);

  // Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Auto-flip periodically (pauses on hover or tab hidden)
  useEffect(() => {
    if (!backsideCard || isHovered || !isTabVisible) return;

    let intervalId: NodeJS.Timeout | null = null;

    const startTimeout = setTimeout(() => {
      setRotation((prev) => prev + 360);

      intervalId = setInterval(() => {
        setRotation((prev) => prev + 360);
      }, FLIP_INTERVAL);
    }, FLIP_DELAY);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [backsideCard, card._id, isHovered, isTabVisible]);

  const handleClick = () => {
    if (!backsideCard) return;
    setRotation((prev) => prev + 360);
  };

  return (
    <div
      css={{
        perspective: "1000px",
        width: dimensions.width,
        height: dimensions.height,
        cursor: backsideCard ? "pointer" : "default",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        style={{
          transition: `transform ${FLIP_DURATION}ms ease-in-out`,
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {/* Front face */}
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Card card={card} size="nano" noArtist interactive={false} />
        </div>
        {/* Back face */}
        {backsideCard && (
          <div
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Card card={backsideCard} size="nano" noArtist interactive={false} />
          </div>
        )}
      </div>
    </div>
  );
};

interface PhotoSlotProps {
  src?: string | null;
  gridColumn: string;
  gridRow?: string;
}

/** Photo slot - shows image with fade-in or gray placeholder */
const PhotoSlot: FC<PhotoSlotProps> = ({ src, gridColumn, gridRow }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Reset loaded state when src changes
  useEffect(() => {
    if (src !== currentSrc) {
      setLoaded(false);
      setCurrentSrc(src);
    }
  }, [src, currentSrc]);

  const baseStyles = {
    aspectRatio: "1/1",
    width: "100%",
    objectFit: "cover" as const,
    borderRadius: 15,
    gridColumn,
    ...(gridRow && { gridRow }),
  };

  if (src) {
    return (
      <div css={[baseStyles, { backgroundColor: PLACEHOLDER_COLOR, position: "relative" as const }]}>
        <img
          css={[
            baseStyles,
            {
              position: "absolute",
              top: 0,
              left: 0,
              opacity: loaded ? 1 : 0,
              animation: loaded ? `${fadeIn} 0.3s ease-out` : "none",
            },
          ]}
          src={src}
          alt="Card artwork detail"
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }

  return <div css={[baseStyles, { backgroundColor: PLACEHOLDER_COLOR }]} />;
};

/**
 * Card Gallery component for card page
 * Shows mainPhoto as large center image, additionalPhotos in corners
 * Empty slots show gray placeholder
 */
const CardGallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { artistSlug, sortedCards } = useCardPageContext();

  // Find current card from sorted cards (instant update on navigation)
  const card = useMemo(() => {
    if (!artistSlug || !sortedCards.length) return null;
    return sortedCards.find((c) => c.artist?.slug === artistSlug);
  }, [artistSlug, sortedCards]);

  // Find the backside card for this deck
  const backsideCard = useMemo(() => {
    if (!sortedCards || sortedCards.length === 0) return null;
    const backsides = sortedCards.filter((c) => c.value === "backside");
    return backsides.length > 0 ? backsides[0] : null;
  }, [sortedCards]);

  const mainPhoto = card?.mainPhoto;
  const additionalPhotos = card?.additionalPhotos || [];

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: 60,
          paddingBottom: 120,
          rowGap: 60,
        },
      ]}
      id="gallery"
      {...props}
    >
      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            paddingTop: 15,
            alignItems: "start",
          },
        ]}
      >
        <ArrowedButton>Gallery</ArrowedButton>
      </ScandiBlock>

      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            alignItems: "initial",
            paddingTop: 15,
            height: 241,
          },
        ]}
      >
        <Text typography="paragraphBig" css={[{ paddingBottom: 120 }]}>
          Photos of the physical card and artwork details.
        </Text>
      </ScandiBlock>

      <Grid css={{ gridColumn: "1/-1", gap: 30 }}>
        {/* Top left - additional photo 1 */}
        <PhotoSlot src={additionalPhotos[0]} gridColumn="span 3" />

        {/* Center - main photo (large, spans 2 rows) */}
        <PhotoSlot src={mainPhoto} gridColumn="span 6" gridRow="span 2" />

        {/* Top right - card preview with flip on click */}
        <div
          css={{
            aspectRatio: "1/1",
            width: "100%",
            borderRadius: 15,
            gridColumn: "span 3",
            backgroundColor: PLACEHOLDER_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {card && (
            <FlipCard
              card={card as GQL.Card}
              backsideCard={backsideCard}
            />
          )}
        </div>

        {/* Bottom left - additional photo 3 */}
        <PhotoSlot src={additionalPhotos[2]} gridColumn="span 3" />

        {/* Bottom right - additional photo 4 */}
        <PhotoSlot src={additionalPhotos[3]} gridColumn="span 3" />
      </Grid>
    </Grid>
  );
};

export default CardGallery;
