import { FC, HTMLAttributes, useMemo, useState, useEffect, useRef, useCallback } from "react";
import { keyframes } from "@emotion/react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Grid from "../../../Grid";
import Intro from "../../../Intro";
import Card from "../../../Card";
import { cardSizes } from "../../../Card/sizes";
import { useCardPageContext } from "../CardPageContext";
import { useAuth } from "../../../Contexts/auth";
import { useProducts, ProductsQuery } from "../../../../hooks/product";
import Plus from "../../../Icons/Plus";
import Delete from "../../../Icons/Delete";

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

/** GraphQL mutation to update product card gallery photos (deck-level) */
const UPDATE_PRODUCT_CARD_GALLERY_PHOTOS = gql`
  mutation UpdateProductCardGalleryPhotos($productId: ID!, $cardGalleryPhotos: [String!]!) {
    updateProductCardGalleryPhotos(productId: $productId, cardGalleryPhotos: $cardGalleryPhotos) {
      _id
      cardGalleryPhotos
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

/** Min interval for photo rotation (ms) */
const MIN_ROTATION_INTERVAL = 6000;
/** Max interval for photo rotation (ms) */
const MAX_ROTATION_INTERVAL = 12000;

/** Get random interval between min and max */
const getRandomInterval = () => MIN_ROTATION_INTERVAL + Math.random() * (MAX_ROTATION_INTERVAL - MIN_ROTATION_INTERVAL);

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
  photos?: string[];
  enableRotation?: boolean;
  gridColumn: string;
  gridRow?: string;
  dark?: boolean;
  isAdmin?: boolean;
  uploading?: boolean;
  deleting?: boolean;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
}

/** Photo slot - shows image with fade-in or gray placeholder, with upload/delete buttons for admins */
const PhotoSlot: FC<PhotoSlotProps> = ({ src, photos, enableRotation, gridColumn, gridRow, dark, isAdmin, uploading, deleting, onUpload, onDelete }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedPhoto, setDisplayedPhoto] = useState<string | null>(src || null);
  const [previousPhoto, setPreviousPhoto] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Independent rotation with random interval
  useEffect(() => {
    if (!enableRotation || !photos || photos.length <= 1) return;

    const scheduleNext = () => {
      const interval = getRandomInterval();
      return setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        timerRef.current = scheduleNext();
      }, interval);
    };

    const timerRef = { current: scheduleNext() };

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enableRotation, photos]);

  // Get current photo based on rotation or direct prop
  const currentPhoto = useMemo(() => {
    if (enableRotation && photos && photos.length > 0) {
      return photos[currentIndex % photos.length] || null;
    }
    return src || null;
  }, [enableRotation, photos, currentIndex, src]);

  // Handle photo change with crossfade
  useEffect(() => {
    if (currentPhoto !== displayedPhoto && currentPhoto !== previousPhoto) {
      setPreviousPhoto(displayedPhoto);
      setDisplayedPhoto(currentPhoto);
      setIsTransitioning(true);
      setLoaded(false);

      const timer = setTimeout(() => {
        setPreviousPhoto(null);
        setIsTransitioning(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPhoto, displayedPhoto, previousPhoto]);

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
    borderRadius: 15, // TODO: convert to theme.spacing(1.5) when component uses theme callback
    gridColumn,
    ...(gridRow && { gridRow }),
  };

  const placeholderColor = dark ? PLACEHOLDER_COLOR_DARK : PLACEHOLDER_COLOR;

  // For rotation slots, check if there are photos; for regular slots, check src
  const hasPhoto = enableRotation ? (photos && photos.length > 0) : !!src;

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
        disabled={uploading || deleting}
        css={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: uploading ? theme.colors.accent : "rgba(255,255,255,0.9)",
          color: uploading ? "white" : theme.colors.black,
          cursor: uploading || deleting ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hasPhoto ? 0 : 0.8,
          transition: "opacity 0.2s ease, transform 0.2s ease",
          "&:hover": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1.1)",
          },
        })}
        aria-label={hasPhoto ? "Replace photo" : "Add photo"}
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

  const deleteButton = isAdmin && onDelete && hasPhoto && (
    <button
      onClick={onDelete}
      disabled={deleting || uploading}
      css={(theme) => ({
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "none",
        background: deleting ? theme.colors.accent : "rgba(0,0,0,0.7)",
        color: "white",
        cursor: deleting || uploading ? "wait" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.2s ease, transform 0.2s ease",
        "&:hover": {
          background: theme.colors.errorDark,
          transform: "scale(1.1)",
        },
      })}
      aria-label="Delete photo"
    >
      {deleting ? (
        <span css={{
          width: 16,
          height: 16,
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
        <Delete css={{ width: 18, height: 18 }} />
      )}
    </button>
  );

  // Use displayedPhoto for rendering when rotation is enabled
  const renderSrc = enableRotation ? displayedPhoto : src;

  if (renderSrc || enableRotation) {
    return (
      <div css={[baseStyles, {
        backgroundColor: placeholderColor,
        position: "relative" as const,
        overflow: "hidden",
        "&:hover button": {
          opacity: "1 !important",
        },
      }]}>
        {/* Previous photo (stays visible underneath during crossfade) */}
        {previousPhoto && isTransitioning && (
          <img
            css={[
              baseStyles,
              {
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              },
            ]}
            src={previousPhoto}
            alt="Card artwork detail"
          />
        )}
        {/* Current photo (fades in on top) */}
        {renderSrc && (
          <img
            key={renderSrc}
            css={[
              baseStyles,
              {
                position: "absolute",
                top: 0,
                left: 0,
                opacity: loaded ? 1 : 0,
                zIndex: 2,
                animation: isTransitioning ? `${fadeIn} 0.8s ease-out` : (loaded ? `${fadeIn} 0.3s ease-out` : "none"),
              },
            ]}
            src={renderSrc}
            alt="Card artwork detail"
            onLoad={() => setLoaded(true)}
          />
        )}
        {uploadButton}
        {deleteButton}
      </div>
    );
  }

  return (
    <div css={[baseStyles, {
      backgroundColor: placeholderColor,
      position: "relative" as const,
      "&:hover button": {
        opacity: "1 !important",
      },
    }]}>
      {uploadButton}
    </div>
  );
};

/**
 * Card Gallery component for card page
 * Shows mainPhoto as large center image, additionalPhotos in corners
 * Empty slots show gray placeholder
 * Admins see upload buttons on each photo slot
 * Non-admins: if some slots empty, show only filled slots in one equal-width row
 */
const CardGallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { artistSlug, sortedCards, deckId, deck } = useCardPageContext();
  const { isAdmin } = useAuth();
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [deletingSlot, setDeletingSlot] = useState<string | null>(null);

  // GraphQL mutations
  const [updateCardPhotos] = useMutation(UPDATE_CARD_PHOTOS);
  const [updateProductCardGalleryPhotos] = useMutation(UPDATE_PRODUCT_CARD_GALLERY_PHOTOS, {
    // Refetch products to update Apollo cache after mutation
    refetchQueries: [{ query: ProductsQuery }],
  });

  // Get products to find the deck's product image
  const { products } = useProducts();

  // Find product for current deck
  const deckProduct = useMemo(() => {
    if (!products || !deck?._id) return null;
    return products.find((p) => p.deck?._id === deck._id && p.type === "deck");
  }, [products, deck?._id]);

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

  // Local state for card photos (allows immediate update after upload)
  const [localMainPhoto, setLocalMainPhoto] = useState<string | null | undefined>(undefined);
  const [localAdditionalPhotos, setLocalAdditionalPhotos] = useState<string[] | undefined>(undefined);

  // Local state for deck gallery photo (persists across navigation within same deck)
  const [localDeckGalleryPhoto, setLocalDeckGalleryPhoto] = useState<string | null>(null);
  const [lastDeckProductId, setLastDeckProductId] = useState<string | null>(null);

  // Reset local state when card changes
  useEffect(() => {
    setLocalMainPhoto(undefined);
    setLocalAdditionalPhotos(undefined);
  }, [card?._id]);

  // Sync deck gallery photo from product data when deck product changes
  useEffect(() => {
    if (deckProduct?._id && deckProduct._id !== lastDeckProductId) {
      setLastDeckProductId(deckProduct._id);
      setLocalDeckGalleryPhoto(deckProduct.cardGalleryPhotos?.[0] || null);
    }
  }, [deckProduct?._id, deckProduct?.cardGalleryPhotos, lastDeckProductId]);

  // Use local state if set, otherwise use card data
  const mainPhoto = localMainPhoto !== undefined ? localMainPhoto : card?.mainPhoto;
  const additionalPhotos = localAdditionalPhotos !== undefined ? localAdditionalPhotos : (card?.additionalPhotos || []);

  // Deck gallery photo uses local state (synced from product on deck change)
  const deckGalleryPhoto = localDeckGalleryPhoto;

  // Calculate which photo slots have content (for non-admin dynamic layout)
  // Slots: additionalPhotos[0], mainPhoto, FlipCard (always visible), deckProduct?.image, deckGalleryPhoto
  const filledPhotoSlots = useMemo(() => {
    const slots: { type: "additional-0" | "main" | "flip-card" | "deck-image" | "deck-gallery"; src?: string | null }[] = [];

    if (additionalPhotos[0]) {
      slots.push({ type: "additional-0", src: additionalPhotos[0] });
    }
    if (mainPhoto) {
      slots.push({ type: "main", src: mainPhoto });
    }
    // FlipCard always counts as filled (shows the card)
    slots.push({ type: "flip-card" });
    if (deckProduct?.image) {
      slots.push({ type: "deck-image", src: deckProduct.image });
    }
    if (deckGalleryPhoto) {
      slots.push({ type: "deck-gallery", src: deckGalleryPhoto });
    }

    return slots;
  }, [additionalPhotos, mainPhoto, deckProduct?.image, deckGalleryPhoto]);

  // For non-admins: show all 5 slots only if BOTH mainPhoto AND additionalPhotos[0] exist
  // Otherwise show compact 3-slot layout
  const bothPhotosExist = !!(mainPhoto && additionalPhotos[0]);
  const useCompactLayout = !isAdmin && !bothPhotosExist;

  // For compact layout: always show first 3 filled slots
  const displayedSlots = useMemo(() => {
    return filledPhotoSlots.slice(0, 3);
  }, [filledPhotoSlots]);

  // Compact layout always shows 3 slots = span 4 each
  const compactColumnSpan = 4;

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

  // Delete handler for a specific slot
  const handleDelete = useCallback(async (slotType: "main" | number) => {
    if (!card?._id) return;

    const slotKey = slotType === "main" ? "main" : `additional-${slotType}`;
    setDeletingSlot(slotKey);

    try {
      if (slotType === "main") {
        await updateCardPhotos({
          variables: {
            cardId: card._id,
            mainPhoto: null,
            additionalPhotos: additionalPhotos.length > 0 ? additionalPhotos : null,
          },
        });
        setLocalMainPhoto(null);
      } else {
        const newAdditionalPhotos = [...additionalPhotos];
        newAdditionalPhotos[slotType] = "";
        await updateCardPhotos({
          variables: {
            cardId: card._id,
            mainPhoto: mainPhoto || null,
            additionalPhotos: newAdditionalPhotos,
          },
        });
        setLocalAdditionalPhotos(newAdditionalPhotos);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingSlot(null);
    }
  }, [card?._id, additionalPhotos, mainPhoto, updateCardPhotos]);

  // Upload handler for deck gallery photo (deck-level, applies to all cards)
  const handleDeckGalleryUpload = useCallback(async (file: File) => {
    if (!deckProduct?._id) return;

    setUploadingSlot("deck-gallery");

    try {
      // Upload file to API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", deckProduct._id);
      formData.append("photoType", "gallery");

      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const { imageUrl } = await response.json();

      // Optimistic update for immediate feedback
      setLocalDeckGalleryPhoto(imageUrl);

      // Set as the deck gallery photo (replaces existing)
      await updateProductCardGalleryPhotos({
        variables: {
          productId: deckProduct._id,
          cardGalleryPhotos: [imageUrl],
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingSlot(null);
    }
  }, [deckProduct?._id, updateProductCardGalleryPhotos]);

  // Delete handler for deck gallery photo
  const handleDeckGalleryDelete = useCallback(async () => {
    if (!deckProduct?._id) return;

    setDeletingSlot("deck-gallery");

    // Store current value for rollback on error
    const previousPhoto = localDeckGalleryPhoto;

    try {
      // Optimistic update for immediate feedback
      setLocalDeckGalleryPhoto(null);

      await updateProductCardGalleryPhotos({
        variables: {
          productId: deckProduct._id,
          cardGalleryPhotos: [],
        },
      });
    } catch (error) {
      console.error("Delete error:", error);
      alert(error instanceof Error ? error.message : "Delete failed");
      // Revert optimistic update on error
      setLocalDeckGalleryPhoto(previousPhoto);
    } finally {
      setDeletingSlot(null);
    }
  }, [deckProduct?._id, localDeckGalleryPhoto, updateProductCardGalleryPhotos]);

  // Pre-built stable handlers to avoid inline lambdas in render
  const uploadHandlerSlot0 = useMemo(
    () => (file: File) => handleUpload(file, 0),
    [handleUpload]
  );
  const deleteHandlerSlot0 = useMemo(() => () => handleDelete(0), [handleDelete]);
  const uploadHandlerMain = useMemo(
    () => (file: File) => handleUpload(file, "main"),
    [handleUpload]
  );
  const deleteHandlerMain = useMemo(() => () => handleDelete("main"), [handleDelete]);

  return (
    <Grid
      css={(theme) => [
        {
          background: deckId === "crypto" ? "#292929" : theme.colors.soft_gray,
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(12),
          rowGap: theme.spacing(6),
        },
      ]}
      id="gallery"
      {...props}
    >
      <Intro
        arrowedText="Gallery"
        paragraphText="Photos of the physical card and artwork details."
        palette={deckId === "crypto" ? "dark" : "light"}
        bottom={<div css={(theme) => [{ height: 120, [theme.maxMQ.xsm]: { display: "none" } }]} />}
      />

      {useCompactLayout ? (
        /* Compact single-row layout for non-admins when not all slots filled */
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
          {displayedSlots.map((slot) => {
            if (slot.type === "additional-0") {
              return (
                <PhotoSlot
                  key="additional-0"
                  src={slot.src}
                  gridColumn={`span ${compactColumnSpan}`}
                  dark={deckId === "crypto"}
                />
              );
            }
            if (slot.type === "main") {
              return (
                <PhotoSlot
                  key="main"
                  src={slot.src}
                  gridColumn={`span ${compactColumnSpan}`}
                  dark={deckId === "crypto"}
                />
              );
            }
            if (slot.type === "flip-card") {
              return (
                <div
                  key="flip-card"
                  css={(theme) => ({
                    aspectRatio: "1/1",
                    width: "100%",
                    borderRadius: theme.spacing(1.5),
                    gridColumn: `span ${compactColumnSpan}`,
                    backgroundColor: deckId === "crypto" ? PLACEHOLDER_COLOR_DARK : PLACEHOLDER_COLOR,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  })}
                >
                  {card && (
                    <FlipCard
                      card={card as GQL.Card}
                      backsideCard={backsideCard}
                    />
                  )}
                </div>
              );
            }
            if (slot.type === "deck-image") {
              return (
                <PhotoSlot
                  key="deck-image"
                  src={slot.src}
                  gridColumn={`span ${compactColumnSpan}`}
                  dark={deckId === "crypto"}
                />
              );
            }
            if (slot.type === "deck-gallery") {
              return (
                <PhotoSlot
                  key="deck-gallery"
                  src={slot.src}
                  gridColumn={`span ${compactColumnSpan}`}
                  dark={deckId === "crypto"}
                />
              );
            }
            return null;
          })}
        </Grid>
      ) : (
        /* Full layout for admins or when all slots filled */
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
          {/* Top left - additional photo 1 */}
          <PhotoSlot
            src={additionalPhotos[0]}
            gridColumn="span 3"
            dark={deckId === "crypto"}
            isAdmin={isAdmin}
            uploading={uploadingSlot === "additional-0"}
            deleting={deletingSlot === "additional-0"}
            onUpload={uploadHandlerSlot0}
            onDelete={deleteHandlerSlot0}
          />

          {/* Center - main photo (large, spans 2 rows) */}
          <PhotoSlot
            src={mainPhoto}
            gridColumn="span 6"
            gridRow="span 2"
            dark={deckId === "crypto"}
            isAdmin={isAdmin}
            uploading={uploadingSlot === "main"}
            deleting={deletingSlot === "main"}
            onUpload={uploadHandlerMain}
            onDelete={deleteHandlerMain}
          />

          {/* Top right - card preview with flip on click */}
          <div
            css={(theme) => ({
              aspectRatio: "1/1",
              width: "100%",
              borderRadius: theme.spacing(1.5),
              gridColumn: "span 3",
              backgroundColor: deckId === "crypto" ? PLACEHOLDER_COLOR_DARK : PLACEHOLDER_COLOR,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            {card && (
              <FlipCard
                card={card as GQL.Card}
                backsideCard={backsideCard}
              />
            )}
          </div>

          {/* Bottom left - deck product photo */}
          <PhotoSlot
            src={deckProduct?.image}
            gridColumn="span 3"
            dark={deckId === "crypto"}
          />

          {/* Bottom right - deck gallery photo (shared across all cards in deck) */}
          <PhotoSlot
            src={deckGalleryPhoto}
            gridColumn="span 3"
            dark={deckId === "crypto"}
            isAdmin={isAdmin}
            uploading={uploadingSlot === "deck-gallery"}
            deleting={deletingSlot === "deck-gallery"}
            onUpload={handleDeckGalleryUpload}
            onDelete={deckGalleryPhoto ? handleDeckGalleryDelete : undefined}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CardGallery;
