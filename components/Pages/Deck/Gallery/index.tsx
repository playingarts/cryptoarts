import { FC, HTMLAttributes, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import { useFutureChapter } from "../FutureChapterContext";
import { useDecks } from "../../../../hooks/deck";
import { useCardsForDeck } from "../../../../hooks/card";
import { usePalette } from "../DeckPaletteContext";

/** Fade in animation */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** Placeholder color for empty slots */
const PLACEHOLDER_COLOR = "#E5E5E5";

/** Get random interval between min and max */
const getRandomInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Rotating photo slot with crossfade transition */
const RotatingPhotoSlot: FC<{
  photos: string[];
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

  const currentSrc = photos[currentIndex];
  const nextSrc = nextIndex !== null ? photos[nextIndex] : null;

  if (!currentSrc && !nextSrc) {
    return <div css={[baseStyles, { backgroundColor: PLACEHOLDER_COLOR }]} />;
  }

  return (
    <div css={[baseStyles, { backgroundColor: PLACEHOLDER_COLOR, position: "relative" as const, overflow: "hidden" }]}>
      {/* Current image (bottom layer) */}
      {currentSrc && (
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
          src={currentSrc}
          alt="Gallery photo"
        />
      )}
      {/* Next image (top layer, fades in) */}
      {nextSrc && (
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
          src={nextSrc}
          alt="Gallery photo"
        />
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

  // Collect all photos from cards (mainPhoto + additionalPhotos)
  const allPhotos = useMemo(() => {
    if (!cards || cards.length === 0) return [];
    const photos: string[] = [];
    cards.forEach((card) => {
      if (card.mainPhoto) photos.push(card.mainPhoto);
      if (card.additionalPhotos) {
        card.additionalPhotos.forEach((p) => {
          if (p) photos.push(p);
        });
      }
    });
    // Shuffle photos
    return photos.sort(() => Math.random() - 0.5);
  }, [cards]);

  // Split photos into 5 slots for the gallery grid
  // Each slot gets a portion of photos to rotate through
  const slotPhotos = useMemo(() => {
    if (allPhotos.length === 0) {
      // Return empty arrays for each slot (will show placeholders)
      return [[], [], [], [], []];
    }
    // Distribute photos across 5 slots
    const slots: string[][] = [[], [], [], [], []];
    allPhotos.forEach((photo, i) => {
      slots[i % 5].push(photo);
    });
    return slots;
  }, [allPhotos]);

  return (
    <Grid
      css={(theme) => [
        {
          background: palette === "dark" ? "#212121" : theme.colors.soft_gray,
          paddingTop: 60,
          paddingBottom: 120,
          rowGap: 60,
          img: {
            borderRadius: 15,
          },
        },
      ]}
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
        <ArrowedButton
          css={(theme) => ({
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          Gallery
        </ArrowedButton>
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
        <Text
          typography="paragraphBig"
          css={(theme) => ({
            paddingBottom: 120,
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          Loved this deck? Continue the story with these collector's favourites.
        </Text>
      </ScandiBlock>
      <Grid css={{ gridColumn: "1/-1", gap: 30 }}>
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
        {/* Bottom left */}
        <RotatingPhotoSlot
          photos={slotPhotos[3]}
          gridColumn="span 3"
          offset={6000}
        />
        {/* Bottom right */}
        <RotatingPhotoSlot
          photos={slotPhotos[4]}
          gridColumn="span 3"
          offset={8000}
        />
      </Grid>
    </Grid>
  );
};

export default Gallery;
