import { FC, HTMLAttributes, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import Grid from "../../../Grid";
import Intro from "../../../Intro";
import { useFutureChapter } from "../FutureChapterContext";
import { useDecks, useDeck } from "../../../../hooks/deck";
import { useCardsForDeck } from "../../../../hooks/card";
import { useProducts } from "../../../../hooks/product";
import { usePalette } from "../DeckPaletteContext";

/** Fade in animation */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** Placeholder color for empty slots */
const PLACEHOLDER_COLOR = "#E5E5E5";
const PLACEHOLDER_COLOR_DARK = "#212121";

/** Static photo slot (no rotation) */
const PhotoSlot: FC<{
  src?: string | null;
  gridColumn: string;
  dark?: boolean;
}> = ({ src, gridColumn, dark }) => {
  const baseStyles = {
    aspectRatio: "1/1",
    width: "100%",
    borderRadius: 15,
    gridColumn,
    backgroundColor: dark ? PLACEHOLDER_COLOR_DARK : PLACEHOLDER_COLOR,
  };

  if (!src) {
    return <div css={baseStyles} />;
  }

  return (
    <img
      css={[baseStyles, { objectFit: "cover" as const }]}
      src={src}
      alt="Gallery photo"
    />
  );
};

/** Get random interval between min and max */
const getRandomInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Photo item with optional link */
interface PhotoItem {
  src: string;
  href?: string;
}

/** Rotating photo slot with crossfade transition and optional links */
const RotatingPhotoSlot: FC<{
  photos: PhotoItem[];
  gridColumn: string;
  gridRow?: string;
  minInterval?: number;
  maxInterval?: number;
  offset?: number;
}> = ({ photos, gridColumn, gridRow, minInterval = 10000, maxInterval = 15000, offset = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [showNext, setShowNext] = useState(false);

  // Rotate through photos with random interval
  useEffect(() => {
    if (photos.length <= 1) return;

    let timeoutId: NodeJS.Timeout;
    let fadeInTimeout: NodeJS.Timeout;
    let completeTimeout: NodeJS.Timeout;

    const scheduleNext = () => {
      const randomDelay = getRandomInterval(minInterval, maxInterval);
      timeoutId = setTimeout(() => {
        // Start transition: set next image (opacity 0)
        const next = (currentIndex + 1) % photos.length;
        setNextIndex(next);
        setShowNext(false);

        // Small delay to let browser render the image at opacity 0
        fadeInTimeout = setTimeout(() => {
          setShowNext(true);
        }, 50);

        // After transition completes, update current and reset
        completeTimeout = setTimeout(() => {
          setCurrentIndex(next);
          setNextIndex(null);
          setShowNext(false);
          scheduleNext();
        }, 1100); // Slightly longer than transition
      }, randomDelay);
    };

    // Add initial offset delay for staggered start
    const initialTimeout = setTimeout(() => {
      scheduleNext();
    }, offset);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
      clearTimeout(fadeInTimeout);
      clearTimeout(completeTimeout);
    };
  }, [photos.length, minInterval, maxInterval, offset, currentIndex]);

  const baseStyles = {
    aspectRatio: "1/1",
    width: "100%",
    objectFit: "cover" as const,
    borderRadius: 15,
    gridColumn,
    ...(gridRow && { gridRow }),
  };

  const currentPhoto = photos[currentIndex];
  const nextPhoto = nextIndex !== null ? photos[nextIndex] : null;

  if (!currentPhoto && !nextPhoto) {
    return <div css={[baseStyles, { backgroundColor: PLACEHOLDER_COLOR }]} />;
  }

  const content = (
    <>
      {/* Current image (bottom layer) */}
      {currentPhoto && (
        <img
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 15,
          }}
          src={currentPhoto.src}
          alt="Gallery photo"
        />
      )}
      {/* Next image (top layer, fades in) */}
      {nextPhoto && (
        <img
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 15,
            opacity: showNext ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
          src={nextPhoto.src}
          alt="Gallery photo"
        />
      )}
    </>
  );

  const currentHref = currentPhoto?.href;

  return (
    <div css={[baseStyles, { backgroundColor: PLACEHOLDER_COLOR, position: "relative" as const, overflow: "hidden" }]}>
      {currentHref ? (
        <Link href={currentHref} css={{ display: "block", width: "100%", height: "100%" }}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { query } = useRouter();
  const deckId = query.deckId;
  const { activeTab, activeEdition, isFutureDeck } = useFutureChapter();
  const { palette } = usePalette();

  // Get deck ID for Future chapters
  const { decks } = useDecks();
  const targetDeckSlug = isFutureDeck
    ? activeTab === "future-ii"
      ? "future-ii"
      : "future"
    : typeof deckId === "string"
    ? deckId
    : undefined;
  const deck = useMemo(
    () => decks?.find((d) => d.slug === targetDeckSlug),
    [decks, targetDeckSlug]
  );

  // Fetch cards for the deck - use deckSlug to share Apollo cache with card page
  const { cards } = useCardsForDeck(
    targetDeckSlug
      ? { variables: { deckSlug: targetDeckSlug, edition: isFutureDeck ? activeEdition : undefined } }
      : { skip: true }
  );

  // Fetch deck for gallery photo
  const { deck: deckData } = useDeck({
    variables: { slug: targetDeckSlug },
    skip: !targetDeckSlug,
  });

  // Fetch products to get deck product image
  const { products } = useProducts();
  const deckProduct = useMemo(
    () => products?.find((p) => p.deck?._id === deckData?._id && p.type === "deck"),
    [products, deckData?._id]
  );

  // Get deck gallery photo (shared across all cards in deck)
  const deckGalleryPhoto = deckProduct?.cardGalleryPhotos?.[0];

  // Collect mainPhotos and additionalPhotos with card links
  const { mainPhotos, additionalPhotos } = useMemo(() => {
    if (!cards || cards.length === 0) return { mainPhotos: [] as PhotoItem[], additionalPhotos: [] as PhotoItem[] };
    const mains: PhotoItem[] = [];
    const additionals: PhotoItem[] = [];
    cards.forEach((card) => {
      const href = `/${targetDeckSlug}/${card.artist.slug}`;
      if (card.mainPhoto) mains.push({ src: card.mainPhoto, href });
      if (card.additionalPhotos) {
        card.additionalPhotos.forEach((p) => {
          if (p) additionals.push({ src: p, href });
        });
      }
    });
    // Shuffle both arrays
    return {
      mainPhotos: mains.sort(() => Math.random() - 0.5),
      additionalPhotos: additionals.sort(() => Math.random() - 0.5),
    };
  }, [cards, targetDeckSlug]);

  // Split photos into 3 rotating slots for the gallery grid:
  // - Center slot (index 1): only mainPhotos
  // - Top corner slots (indices 0, 2): only additionalPhotos
  // - Bottom slots use static deck product/gallery photos
  const slotPhotos = useMemo(() => {
    // Distribute additional photos across 2 top corner slots
    const cornerSlots: PhotoItem[][] = [[], []];
    additionalPhotos.forEach((photo, i) => {
      cornerSlots[i % 2].push(photo);
    });
    // Return: [topLeft, mainPhotos, topRight]
    return [cornerSlots[0], mainPhotos, cornerSlots[1]];
  }, [mainPhotos, additionalPhotos]);

  return (
    <Grid
      css={(theme) => [
        {
          background: palette === "dark" ? "#212121" : theme.colors.soft_gray,
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(12),
          rowGap: theme.spacing(6),
          img: {
            borderRadius: theme.spacing(1.5),
          },
          [theme.maxMQ.xsm]: {
            paddingTop: 30,
            paddingBottom: 60,
            rowGap: 0,
          },
        },
      ]}
      {...props}
    >
      <Intro
        arrowedText="Gallery"
        paragraphText="Loved this deck? Continue the story with these collector's favourites."
        palette={palette}
        bottom={<div css={(theme) => [{ height: 120, [theme.maxMQ.xsm]: { display: "none" } }]} />}
      />
      <Grid css={(theme) => ({
        gridColumn: "1/-1",
        gap: theme.spacing(3),
        [theme.maxMQ.xsm]: {
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing(1),
          paddingLeft: 0,
          paddingRight: 0,
          "> *": {
            flex: "1 1 45%",
            minWidth: 0,
            aspectRatio: "1/1",
          },
        },
      })}>
        {/* Top left */}
        <RotatingPhotoSlot
          photos={slotPhotos[0]}
          gridColumn="span 3"
          offset={0}
        />
        {/* Center (large, spans 2 rows) */}
        <RotatingPhotoSlot
          photos={slotPhotos[1]}
          gridColumn="span 6"
          gridRow="span 2"
          offset={2000}
        />
        {/* Top right */}
        <RotatingPhotoSlot
          photos={slotPhotos[2]}
          gridColumn="span 3"
          offset={4000}
        />
        {/* Bottom left - deck product photo */}
        <PhotoSlot
          src={deckProduct?.image}
          gridColumn="span 3"
          dark={palette === "dark"}
        />
        {/* Bottom right - deck gallery photo */}
        <PhotoSlot
          src={deckGalleryPhoto}
          gridColumn="span 3"
          dark={palette === "dark"}
        />
      </Grid>
    </Grid>
  );
};

export default Gallery;
