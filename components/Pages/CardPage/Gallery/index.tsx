import { FC, HTMLAttributes, useMemo, useState, useEffect, useRef, useCallback } from "react";
import { keyframes } from "@emotion/react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import Card from "../../../Card";
import { cardSizes } from "../../../Card/sizes";
import { useCardPageContext } from "../CardPageContext";
import { useAuth } from "../../../Contexts/auth";
import Plus from "../../../Icons/Plus";

/** GraphQL mutation to update card photos */
const UPDATE_CARD_PHOTOS = gql`
  mutation UpdateCardPhotos($cardId: ID!, $mainPhoto: String, $additionalPhotos: [String!]) {
    updateCardPhotos(cardId: $cardId, mainPhoto: $mainPhoto, additionalPhotos: $additionalPhotos) {
      _id
      mainPhoto
      additionalPhotos
    }
  }
`;

/** Placeholder for empty photo slots */
const PLACEHOLDER_COLOR = "#E5E5E5";
const PLACEHOLDER_COLOR_DARK = "#212121";

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
  dark?: boolean;
  isAdmin?: boolean;
  uploading?: boolean;
  onUpload?: (file: File) => void;
}

/** Photo slot - shows image with fade-in or gray placeholder, with upload button for admins */
const PhotoSlot: FC<PhotoSlotProps> = ({ src, gridColumn, gridRow, dark, isAdmin, uploading, onUpload }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset loaded state when src changes
  useEffect(() => {
    if (src !== currentSrc) {
      setLoaded(false);
      setCurrentSrc(src);
    }
  }, [src, currentSrc]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onUpload]);

  const baseStyles = {
    aspectRatio: "1/1",
    width: "100%",
    objectFit: "cover" as const,
    borderRadius: 15,
    gridColumn,
    ...(gridRow && { gridRow }),
  };

  const placeholderColor = dark ? PLACEHOLDER_COLOR_DARK : PLACEHOLDER_COLOR;

  const uploadButton = isAdmin && onUpload && (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        css={{ display: "none" }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        css={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: uploading ? theme.colors.accent : "rgba(255,255,255,0.9)",
          color: uploading ? "white" : theme.colors.black,
          cursor: uploading ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: src ? 0 : 0.8,
          transition: "opacity 0.2s ease, transform 0.2s ease",
          "&:hover": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1.1)",
          },
        })}
        aria-label={src ? "Replace photo" : "Add photo"}
      >
        {uploading ? (
          <span css={{
            width: 20,
            height: 20,
            border: "2px solid white",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }} />
        ) : (
          <Plus css={{ width: 24, height: 24 }} />
        )}
      </button>
    </>
  );

  if (src) {
    return (
      <div css={[baseStyles, { backgroundColor: placeholderColor, position: "relative" as const }]}>
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
        {uploadButton}
      </div>
    );
  }

  return (
    <div css={[baseStyles, { backgroundColor: placeholderColor, position: "relative" as const }]}>
      {uploadButton}
    </div>
  );
};

/**
 * Card Gallery component for card page
 * Shows mainPhoto as large center image, additionalPhotos in corners
 * Empty slots show gray placeholder
 * Admins see upload buttons on each photo slot
 */
const CardGallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { artistSlug, sortedCards, deckId } = useCardPageContext();
  const { isAdmin } = useAuth();
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  // GraphQL mutation
  const [updateCardPhotos] = useMutation(UPDATE_CARD_PHOTOS);

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

  // Local state for photos (allows immediate update after upload)
  const [localMainPhoto, setLocalMainPhoto] = useState<string | null | undefined>(undefined);
  const [localAdditionalPhotos, setLocalAdditionalPhotos] = useState<string[] | undefined>(undefined);

  // Reset local state when card changes
  useEffect(() => {
    setLocalMainPhoto(undefined);
    setLocalAdditionalPhotos(undefined);
  }, [card?._id]);

  // Use local state if set, otherwise use card data
  const mainPhoto = localMainPhoto !== undefined ? localMainPhoto : card?.mainPhoto;
  const additionalPhotos = localAdditionalPhotos !== undefined ? localAdditionalPhotos : (card?.additionalPhotos || []);

  // Upload handler for a specific slot
  const handleUpload = useCallback(async (file: File, slotType: "main" | number) => {
    if (!card?._id) return;

    const slotKey = slotType === "main" ? "main" : `additional-${slotType}`;
    setUploadingSlot(slotKey);

    try {
      // Upload file to API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("cardId", card._id);
      formData.append("photoType", slotType === "main" ? "main" : "additional");

      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const { imageUrl } = await response.json();

      // Update card in database via GraphQL
      if (slotType === "main") {
        await updateCardPhotos({
          variables: {
            cardId: card._id,
            mainPhoto: imageUrl,
            additionalPhotos: additionalPhotos.length > 0 ? additionalPhotos : null,
          },
        });
        // Update local state immediately
        setLocalMainPhoto(imageUrl);
      } else {
        // Update specific additional photo slot
        const newAdditionalPhotos = [...additionalPhotos];
        // Ensure array has enough slots
        while (newAdditionalPhotos.length <= slotType) {
          newAdditionalPhotos.push("");
        }
        newAdditionalPhotos[slotType] = imageUrl;
        await updateCardPhotos({
          variables: {
            cardId: card._id,
            mainPhoto: mainPhoto || null,
            additionalPhotos: newAdditionalPhotos,
          },
        });
        // Update local state immediately
        setLocalAdditionalPhotos(newAdditionalPhotos);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingSlot(null);
    }
  }, [card?._id, additionalPhotos, mainPhoto, updateCardPhotos]);

  return (
    <Grid
      css={(theme) => [
        {
          background: deckId === "crypto" ? "#292929" : theme.colors.soft_gray,
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
        <ArrowedButton
          css={(theme) => ({
            color: theme.colors[deckId === "crypto" ? "white75" : "black"],
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
            color: theme.colors[deckId === "crypto" ? "white75" : "black"],
          })}
        >
          Photos of the physical card and artwork details.
        </Text>
      </ScandiBlock>

      <Grid css={{ gridColumn: "1/-1", gap: 30 }}>
        {/* Top left - additional photo 1 */}
        <PhotoSlot
          src={additionalPhotos[0]}
          gridColumn="span 3"
          dark={deckId === "crypto"}
          isAdmin={isAdmin}
          uploading={uploadingSlot === "additional-0"}
          onUpload={(file) => handleUpload(file, 0)}
        />

        {/* Center - main photo (large, spans 2 rows) */}
        <PhotoSlot
          src={mainPhoto}
          gridColumn="span 6"
          gridRow="span 2"
          dark={deckId === "crypto"}
          isAdmin={isAdmin}
          uploading={uploadingSlot === "main"}
          onUpload={(file) => handleUpload(file, "main")}
        />

        {/* Top right - card preview with flip on click */}
        <div
          css={{
            aspectRatio: "1/1",
            width: "100%",
            borderRadius: 15,
            gridColumn: "span 3",
            backgroundColor: deckId === "crypto" ? PLACEHOLDER_COLOR_DARK : PLACEHOLDER_COLOR,
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
        <PhotoSlot
          src={additionalPhotos[2]}
          gridColumn="span 3"
          dark={deckId === "crypto"}
          isAdmin={isAdmin}
          uploading={uploadingSlot === "additional-2"}
          onUpload={(file) => handleUpload(file, 2)}
        />

        {/* Bottom right - additional photo 4 */}
        <PhotoSlot
          src={additionalPhotos[3]}
          gridColumn="span 3"
          dark={deckId === "crypto"}
          isAdmin={isAdmin}
          uploading={uploadingSlot === "additional-3"}
          onUpload={(file) => handleUpload(file, 3)}
        />
      </Grid>
    </Grid>
  );
};

export default CardGallery;
