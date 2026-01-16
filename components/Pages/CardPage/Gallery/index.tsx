import { FC, HTMLAttributes, useMemo, useState, useEffect } from "react";
import { keyframes } from "@emotion/react";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
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
          alt=""
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

        {/* Top right - additional photo 2 */}
        <PhotoSlot src={additionalPhotos[1]} gridColumn="span 3" />

        {/* Bottom left - additional photo 3 */}
        <PhotoSlot src={additionalPhotos[2]} gridColumn="span 3" />

        {/* Bottom right - additional photo 4 */}
        <PhotoSlot src={additionalPhotos[3]} gridColumn="span 3" />
      </Grid>
    </Grid>
  );
};

export default CardGallery;
