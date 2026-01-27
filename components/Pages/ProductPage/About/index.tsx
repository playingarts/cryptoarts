import { FC, HTMLAttributes, useEffect, useState, useMemo, useCallback, useRef } from "react";
import { keyframes } from "@emotion/react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Grid from "../../../Grid";

import Item from "../../Home/Testimonials/Item";
import Button from "../../../Buttons/Button";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import { useProducts, ProductsQuery } from "../../../../hooks/product";
import { useRatings } from "../../../../hooks/ratings";
import { useLoadCollectionCards } from "../../../../hooks/card";
import { useRouter } from "next/router";
import Label from "../../../Label";
import Text from "../../../Text";
import { useBag } from "../../../Contexts/bag";
import SoldOut from "../../../Buttons/SoldOut";
import ContinueShopping from "../../../Buttons/ContinueShopping";
import Lock from "../../../Icons/Lock";
import Visa from "../../../Icons/Visa";
import Mastercard from "../../../Icons/Mastercard";
import PayPal from "../../../Icons/PayPal";
import ApplePay from "../../../Icons/ApplePay";
import GooglePay from "../../../Icons/GooglePay";
import AddToBag from "../../../Buttons/AddToBag";
import ScandiBlock from "../../../ScandiBlock";
import Point from "../../../Icons/Point";
import { default as FaqItem } from "../../../Footer/Faq/Item";
import Card from "../../../Card";
import NavButton from "../../../Buttons/NavButton";
import ArrowButton from "../../../Buttons/ArrowButton";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../../CardPage/Pop";
import Link from "../../../Link";
import { useAuth } from "../../../Contexts/auth";
import Plus from "../../../Icons/Plus";
import Delete from "../../../Icons/Delete";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";

const CAROUSEL_INTERVAL = 4000; // 4 seconds
const SWIPE_THRESHOLD = 50;

/** GraphQL mutation to update product photos */
const UPDATE_PRODUCT_PHOTOS = gql`
  mutation UpdateProductPhotos($productId: ID!, $photos: [String!]!) {
    updateProductPhotos(productId: $productId, photos: $photos) {
      _id
      photos
    }
  }
`;

/** Fade animation for photo transitions */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/** Max photos per product */
const MAX_PHOTOS = 10;
/** Photos to show at a time */
const VISIBLE_SLOTS = 3;
/** Min interval between photo changes (ms) */
const MIN_INTERVAL = 6000;
/** Max interval between photo changes (ms) */
const MAX_INTERVAL = 12000;

/** Get random interval between min and max */
const getRandomInterval = () => MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);

interface PhotoSlotProps {
  photo: string | null;
  photos?: string[];
  initialIndex?: number;
  enableRotation?: boolean;
  isAdmin: boolean;
  uploading: boolean;
  deleting: boolean;
  canAdd: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
  small?: boolean;
}

const PhotoSlot: FC<PhotoSlotProps> = ({
  photo,
  photos,
  initialIndex = 0,
  enableRotation = false,
  isAdmin,
  uploading,
  deleting,
  canAdd,
  onUpload,
  onDelete,
  small
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rotationStep, setRotationStep] = useState(0);
  const [displayedPhoto, setDisplayedPhoto] = useState<string | null>(photo);
  const [previousPhoto, setPreviousPhoto] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get photos assigned to this slot (every VISIBLE_SLOTS-th photo starting at initialIndex)
  // This ensures no two slots show the same photo at the same time
  const slotPhotos = useMemo(() => {
    if (!photos || photos.length === 0) return [];
    const assigned: string[] = [];
    for (let i = initialIndex; i < photos.length; i += VISIBLE_SLOTS) {
      assigned.push(photos[i]);
    }
    return assigned;
  }, [photos, initialIndex]);

  // Independent rotation for this slot with random interval
  useEffect(() => {
    if (!enableRotation || slotPhotos.length <= 1) return;

    const scheduleNext = () => {
      const interval = getRandomInterval();
      return setTimeout(() => {
        setRotationStep((prev) => (prev + 1) % slotPhotos.length);
        timerRef.current = scheduleNext();
      }, interval);
    };

    const timerRef = { current: scheduleNext() };

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enableRotation, slotPhotos.length]);

  // Get current photo based on rotation or direct prop
  const currentPhoto = useMemo(() => {
    if (enableRotation && slotPhotos.length > 0) {
      return slotPhotos[rotationStep % slotPhotos.length] || null;
    }
    return photo;
  }, [enableRotation, slotPhotos, rotationStep, photo]);

  // Handle photo change with crossfade
  useEffect(() => {
    if (currentPhoto !== displayedPhoto) {
      // Start crossfade transition (only if we have a photo to transition from)
      if (displayedPhoto && currentPhoto) {
        setPreviousPhoto(displayedPhoto);
        setIsTransitioning(true);

        // End transition after animation completes
        const timer = setTimeout(() => {
          setPreviousPhoto(null);
          setIsTransitioning(false);
        }, 800);

        setDisplayedPhoto(currentPhoto);
        return () => clearTimeout(timer);
      } else {
        // Direct update without transition (for add/delete)
        setDisplayedPhoto(currentPhoto);
        setPreviousPhoto(null);
        setIsTransitioning(false);
      }
    }
  }, [currentPhoto, displayedPhoto]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onUpload]);

  return (
    <div
      css={(theme) => ({
        background: theme.colors.white50,
        borderRadius: small ? 10 : 15,
        aspectRatio: "1",
        position: "relative",
        overflow: "hidden",
        maxWidth: "100%",
        "&:hover button": {
          opacity: 1,
        },
      })}
    >
      {/* Previous photo (stays visible underneath during crossfade) */}
      {previousPhoto && isTransitioning && (
        <img
          src={previousPhoto}
          alt="Product photo"
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: small ? 10 : 15,
            zIndex: 1,
          }}
        />
      )}
      {/* Current photo (fades in on top) */}
      {displayedPhoto && (
        <img
          key={displayedPhoto}
          src={displayedPhoto}
          alt="Product photo"
          css={{
            position: isTransitioning ? "absolute" : "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: small ? 10 : 15,
            zIndex: 2,
            animation: isTransitioning ? `${fadeIn} 0.8s ease-out` : undefined,
          }}
        />
      )}

      {/* Admin upload button */}
      {isAdmin && canAdd && (
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
              width: small ? 36 : 60,
              height: small ? 36 : 60,
              borderRadius: "50%",
              border: "none",
              background: uploading ? theme.colors.accent : "rgba(255,255,255,0.9)",
              color: uploading ? "white" : theme.colors.black,
              cursor: uploading || deleting ? "wait" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: photo ? 0 : 0.8,
              transition: "opacity 0.2s ease, transform 0.2s ease",
              "&:hover": {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1.1)",
              },
            })}
            aria-label={photo ? "Replace photo" : "Add photo"}
          >
            {uploading ? (
              <span css={{
                width: small ? 14 : 20,
                height: small ? 14 : 20,
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
              <Plus css={{ width: small ? 16 : 24, height: small ? 16 : 24 }} />
            )}
          </button>
        </>
      )}

      {/* Admin delete button */}
      {isAdmin && displayedPhoto && (
        <button
          onClick={onDelete}
          disabled={deleting || uploading}
          css={(theme) => ({
            position: "absolute",
            top: small ? 5 : 10,
            right: small ? 5 : 10,
            zIndex: 10,
            width: small ? 24 : 36,
            height: small ? 24 : 36,
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
              background: "#e53935",
              transform: "scale(1.1)",
            },
          })}
          aria-label="Delete photo"
        >
          {deleting ? (
            <span css={{
              width: small ? 12 : 16,
              height: small ? 12 : 16,
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
            <Delete css={{ width: small ? 12 : 18, height: small ? 12 : 18 }} />
          )}
        </button>
      )}
    </div>
  );
};

/** Total admin slots (3 big + 6 small) */
const TOTAL_ADMIN_SLOTS = 9;

/** Max file size for upload (3MB to stay under Vercel's 4.5MB limit) */
const MAX_UPLOAD_SIZE = 3 * 1024 * 1024;

/** Compress image client-side using canvas */
const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      // Resize to max 1800px for good quality product photos
      const maxSize = 1800;
      let { width, height } = img;

      if (width > height && width > maxSize) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width * maxSize) / height;
        height = maxSize;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Compress with decreasing quality until under limit (min 70% for good quality)
      const tryCompress = (quality: number) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"));
              return;
            }

            if (blob.size <= MAX_UPLOAD_SIZE || quality <= 0.7) {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            } else {
              // Try lower quality
              tryCompress(quality - 0.05);
            }
          },
          "image/jpeg",
          quality
        );
      };

      // Start at high quality
      tryCompress(0.92);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
};

/** Hook to manage product photo gallery state and handlers */
const useProductPhotoGallery = (product: GQL.Product, onPhotosChange: (photos: string[]) => void) => {
  const { isAdmin } = useAuth();
  const photos = useMemo(() => product.photos || [], [product.photos]);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [deletingSlot, setDeletingSlot] = useState<number | null>(null);

  // Get photo for a specific slot (fixed mapping for admin)
  const getPhotoForSlot = useCallback((slotIndex: number): string | null => {
    return photos[slotIndex] || null;
  }, [photos]);

  // Get photo by direct index (for admin small slots)
  const getPhotoByIndex = useCallback((index: number): string | null => {
    return photos[index] || null;
  }, [photos]);

  const handleUpload = useCallback(async (file: File, slotIndex: number) => {
    setUploadingSlot(slotIndex);

    try {
      // Compress image client-side to avoid Vercel's 4.5MB limit
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("cardId", `product-${product._id}`);
      formData.append("photoType", "product");

      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      // Handle non-JSON responses (like "Request Entity Too Large")
      if (text.toLowerCase().includes("request entity too large") || text.toLowerCase().includes("too large")) {
        throw new Error("File too large. Please try a smaller image.");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server error: ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Add new photo to array
      const newPhotos = [...photos, data.imageUrl];
      onPhotosChange(newPhotos);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingSlot(null);
    }
  }, [product._id, photos, onPhotosChange]);

  const handleDelete = useCallback(async (slotIndex: number) => {
    // Delete by direct index
    if (slotIndex >= photos.length) return;

    setDeletingSlot(slotIndex);

    try {
      const newPhotos = photos.filter((_, i) => i !== slotIndex);
      onPhotosChange(newPhotos);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingSlot(null);
    }
  }, [photos, onPhotosChange]);

  // Delete by direct index (for admin small slots)
  const handleDeleteByIndex = useCallback(async (photoIndex: number) => {
    if (photoIndex >= photos.length) return;

    setDeletingSlot(photoIndex);

    try {
      const newPhotos = photos.filter((_, i) => i !== photoIndex);
      onPhotosChange(newPhotos);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingSlot(null);
    }
  }, [photos, onPhotosChange]);

  const canAdd = photos.length < MAX_PHOTOS;

  // Pre-built upload handlers indexed by slot (avoids inline lambdas in render)
  const uploadHandlers = useMemo(
    () => Array.from({ length: MAX_PHOTOS }, (_, i) => (file: File) => handleUpload(file, i)),
    [handleUpload]
  );

  // Pre-built delete handlers indexed by slot
  const deleteHandlers = useMemo(
    () => Array.from({ length: MAX_PHOTOS }, (_, i) => () => handleDelete(i)),
    [handleDelete]
  );

  // Pre-built delete-by-index handlers (for admin small slots)
  const deleteByIndexHandlers = useMemo(
    () => Array.from({ length: MAX_PHOTOS }, (_, i) => () => handleDeleteByIndex(i)),
    [handleDeleteByIndex]
  );

  return {
    isAdmin,
    photos,
    uploadingSlot,
    deletingSlot,
    getPhotoForSlot,
    getPhotoByIndex,
    handleUpload,
    handleDelete,
    handleDeleteByIndex,
    uploadHandlers,
    deleteHandlers,
    deleteByIndexHandlers,
    canAdd,
  };
};

const points = [
  "55 hand-picked winning designs meticulously selected from an exciting global design contest.",
  "Funded in under an hour on Kickstarter, proudly showcasing its undeniable artistic appeal.",
  "A perfect and timeless gift choice for art lovers, card players, and dedicated collectors.",
  "Carefully crafted in the USA with precision and utmost care, ensuring exceptional top-notch quality.",
  "Sustainably produced with care, actively minimizing its environmental and ecological impact.",
];

const FLIP_TRANSITION_DURATION = 600;

export const CardPreview: FC<{ deckId: string; deckObjectId: string }> = ({
  deckId,
  deckObjectId,
}) => {
  const [show, setShow] = useState(false);
  const [allCards, setAllCards] = useState<GQL.Card[]>([]);
  const [frontCard, setFrontCard] = useState<GQL.Card | null>(null);
  const [backCard, setBackCard] = useState<GQL.Card | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const rotationRef = useRef(0);
  const shownIndicesRef = useRef<Set<number>>(new Set());

  const { loadCollectionCards } = useLoadCollectionCards();

  // Load all cards from deck on mount
  useEffect(() => {
    if (deckObjectId) {
      loadCollectionCards({
        variables: {
          deck: deckObjectId,
          shuffle: true,
        },
      }).then((result) => {
        if (result.data?.cards) {
          const cards = result.data.cards as GQL.Card[];
          setAllCards(cards);
          if (cards.length > 0) {
            const initialIndex = Math.floor(Math.random() * cards.length);
            setFrontCard(cards[initialIndex]);
            setBackCard(cards[initialIndex]);
            shownIndicesRef.current = new Set([initialIndex]);
          }
        }
      });
    }
  }, [deckObjectId, loadCollectionCards]);

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

  // Auto flip
  useEffect(() => {
    if (allCards.length <= 1 || isHovered || !isTabVisible) return;

    const getNextIndex = () => {
      if (shownIndicesRef.current.size >= allCards.length) {
        const isShowingFront = (rotationRef.current / 180) % 2 === 0;
        const currentCard = isShowingFront ? frontCard : backCard;
        const currentIdx = currentCard ? allCards.indexOf(currentCard) : 0;
        shownIndicesRef.current = new Set([currentIdx >= 0 ? currentIdx : 0]);
      }

      const availableIndices: number[] = [];
      for (let i = 0; i < allCards.length; i++) {
        if (!shownIndicesRef.current.has(i)) {
          availableIndices.push(i);
        }
      }

      if (availableIndices.length === 0) return 0;
      const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      shownIndicesRef.current.add(newIndex);
      return newIndex;
    };

    const flip = () => {
      const newIndex = getNextIndex();
      const isShowingFront = (rotationRef.current / 180) % 2 === 0;

      if (isShowingFront) {
        setBackCard(allCards[newIndex]);
      } else {
        setFrontCard(allCards[newIndex]);
      }

      requestAnimationFrame(() => {
        rotationRef.current += 180;
        setRotation(rotationRef.current);
      });
    };

    const interval = setInterval(() => {
      flip();
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [allCards, isHovered, isTabVisible, frontCard, backCard]);

  const handleClick = () => {
    // Flip on click
    if (allCards.length > 1) {
      const getNextIndex = () => {
        if (shownIndicesRef.current.size >= allCards.length) {
          shownIndicesRef.current = new Set();
        }
        const availableIndices: number[] = [];
        for (let i = 0; i < allCards.length; i++) {
          if (!shownIndicesRef.current.has(i)) {
            availableIndices.push(i);
          }
        }
        if (availableIndices.length === 0) return 0;
        const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        shownIndicesRef.current.add(newIndex);
        return newIndex;
      };

      const newIndex = getNextIndex();
      const isShowingFront = (rotationRef.current / 180) % 2 === 0;

      if (isShowingFront) {
        setBackCard(allCards[newIndex]);
      } else {
        setFrontCard(allCards[newIndex]);
      }

      requestAnimationFrame(() => {
        rotationRef.current += 180;
        setRotation(rotationRef.current);
      });
    }
  };

  const handlePopupOpen = () => {
    setShow(true);
  };

  const currentCard = (rotationRef.current / 180) % 2 === 0 ? frontCard : backCard;

  if (!frontCard || !backCard) return null;

  return (
    <div css={(theme) => [{ position: "relative", margin: `${theme.spacing(3)}px 0`, display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing(3) }]}>
      <NavButton
        css={[{ rotate: "180deg" }]}
        onClick={handleClick}
      />
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handlePopupOpen}
        css={{
          perspective: "1000px",
          cursor: "pointer",
        }}
      >
        <div
          css={{
            transformStyle: "preserve-3d",
            transition: `transform ${FLIP_TRANSITION_DURATION}ms ease-in-out`,
          }}
          style={{
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {/* Front face */}
          <div
            css={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Card
              noArtist
              noFavorite
              interactive={false}
              card={frontCard}
              size="preview"
              onClick={handleClick}
            />
          </div>
          {/* Back face */}
          <div
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Card
              noArtist
              noFavorite
              interactive={false}
              card={backCard}
              size="preview"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <NavButton onClick={handleClick} />
      <MenuPortal show={show}>
        <Pop
          cardSlug={currentCard?.artist.slug || ""}
          deckId={deckId}
          close={() => setShow(false)}
          initialCardId={currentCard?._id}
          initialImg={currentCard?.img}
          initialVideo={currentCard?.video}
          showNavigation={false}
        />
      </MenuPortal>
    </div>
  );
};

/** Photo carousel component */
const PhotoCarousel: FC<{ photos: string[]; ratings?: GQL.Rating[] }> = ({ photos, ratings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviewOffset, setReviewOffset] = useState(0);
  const touchStartX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Build items array: insert a review after every 2 photos
  // reviewSlotIndex tracks which review slot this is (0, 1, 2, ...)
  const items = useMemo(() => {
    const result: { type: "photo" | "testimonial"; content: string; reviewSlotIndex?: number }[] = [];
    let reviewSlotIndex = 0;

    for (let i = 0; i < photos.length; i++) {
      result.push({ type: "photo", content: photos[i] });

      // After every 2 photos, insert a review (if we have ratings available)
      if ((i + 1) % 2 === 0 && ratings && ratings.length > 0) {
        result.push({
          type: "testimonial",
          content: "",
          reviewSlotIndex: reviewSlotIndex
        });
        reviewSlotIndex++;
      }
    }
    return result;
  }, [photos, ratings]);

  // Count how many review slots we have
  const reviewSlotCount = useMemo(() => {
    return items.filter(item => item.type === "testimonial").length;
  }, [items]);

  const extendedItems = items.length > 0 ? [...items, items[0]] : [];
  const resetIndex = items.length;

  const advanceCarousel = useCallback(() => {
    if (items.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= resetIndex ? prev : prev + 1));
  }, [resetIndex, items.length]);

  const retreatCarousel = useCallback(() => {
    if (items.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  // Reset to first slide seamlessly after reaching the duplicate
  useEffect(() => {
    if (currentIndex === resetIndex && items.length > 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        // Increment cycle count so reviews change on next loop
        setCycleCount(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, resetIndex, items.length]);

  // Auto-advance (pauses on hover for desktop)
  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    intervalRef.current = setInterval(advanceCarousel, CAROUSEL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advanceCarousel, items.length, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (currentIndex >= resetIndex) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) {
      advanceCarousel();
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(advanceCarousel, CAROUSEL_INTERVAL);
    } else if (diff < -SWIPE_THRESHOLD) {
      retreatCarousel();
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(advanceCarousel, CAROUSEL_INTERVAL);
    }
  };

  const handleClick = () => {
    if (currentIndex >= resetIndex) return;
    advanceCarousel();
    // Only restart interval if not paused (mobile tap)
    if (!isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(advanceCarousel, CAROUSEL_INTERVAL);
    }
  };

  if (items.length === 0) return null;

  const itemWidth = "100%";

  return (
    <>
    <div
      css={(theme) => ({
        overflow: "hidden",
        borderRadius: theme.spacing(1.5),
        position: "relative",
        "&:hover .carousel-nav": {
          opacity: 1,
        },
      })}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        css={{
          display: "flex",
          transition: isTransitioning ? "transform 0.5s ease" : "none",
          cursor: "pointer",
        }}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {extendedItems.map((item, i) => (
          <div
            key={`item-${i}`}
            css={(theme) => ({
              flexShrink: 0,
              width: itemWidth,
              aspectRatio: "1",
              background: theme.colors.white50,
              borderRadius: theme.spacing(1.5),
            })}
          >
            {item.type === "photo" ? (
              <img
                src={item.content}
                alt={`Product photo ${i + 1}`}
                css={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            ) : ratings && item.reviewSlotIndex !== undefined ? (
              <div css={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
                <Text css={(theme) => ({ padding: theme.spacing(3), paddingBottom: 0 })}>1,000+ Five-Star reviews</Text>
                <Item
                  rating={ratings[(item.reviewSlotIndex + cycleCount * reviewSlotCount + reviewOffset + ratings.length) % ratings.length]}
                  hideBought
                  customButton={
                    <div css={(theme) => ({ display: "flex", alignItems: "center", gap: 5, marginTop: theme.spacing(2), [theme.maxMQ.xsm]: { display: "none" } })}>
                      <NavButton
                        css={{ transform: "rotate(180deg)" }}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setReviewOffset(prev => prev - 1);
                        }}
                      />
                      <NavButton
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setReviewOffset(prev => prev + 1);
                        }}
                      />
                      <ArrowButton
                        href="#reviews"
                        noColor
                        size="small"
                        base
                        css={{ marginLeft: 25 }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        All reviews
                      </ArrowButton>
                    </div>
                  }
                  css={{
                    width: "100% !important" as any,
                    maxWidth: "100% !important" as any,
                    minWidth: "100% !important" as any,
                    flex: 1,
                    minHeight: 0,
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    paddingRight: "24px !important" as any,
                    paddingTop: "0 !important" as any,
                    overflow: "hidden",
                  }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {/* Navigation arrows - desktop only */}
      {items.length > 1 && (
        <>
          <NavButton
            className="carousel-nav"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              retreatCarousel();
            }}
            css={(theme) => ({
              position: "absolute",
              right: 65,
              top: 20,
              transform: "rotate(180deg)",
              opacity: 0,
              transition: "opacity 0.2s ease",
              zIndex: 2,
              [theme.maxMQ.xsm]: {
                display: "none",
              },
            })}
          />
          <NavButton
            className="carousel-nav"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              advanceCarousel();
            }}
            css={(theme) => ({
              position: "absolute",
              right: 20,
              top: 20,
              opacity: 0,
              transition: "opacity 0.2s ease",
              zIndex: 2,
              [theme.maxMQ.xsm]: {
                display: "none",
              },
            })}
          />
        </>
      )}
    </div>
      {/* Dots indicator - outside carousel */}
      {items.length > 1 && (
        <div
          css={(theme) => ({
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: theme.spacing(2),
          })}
        >
          {items.map((_, i) => (
            <div
              key={`dot-${i}`}
              css={(theme) => ({
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i === (currentIndex % items.length) ? theme.colors.accent : "rgba(0,0,0,0.1)",
                transition: "background 0.3s ease",
              })}
            />
          ))}
        </div>
      )}
    </>
  );
};

const About: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { pId },
  } = useRouter();

  const { products, refetch } = useProducts();
  const { ratings } = useRatings({ variables: { shuffle: true, limit: 20 } });
  const [updateProductPhotos] = useMutation(UPDATE_PRODUCT_PHOTOS, {
    refetchQueries: [{ query: ProductsQuery }],
  });

  const { getPrice } = useBag();
  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;

  const [product, setProduct] = useState<GQL.Product>();
  const [localPhotos, setLocalPhotos] = useState<string[] | undefined>(undefined);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Create display product with local photos override
  const displayProduct = useMemo(() => {
    if (!product) return undefined;
    if (localPhotos === undefined) return product;
    return { ...product, photos: localPhotos };
  }, [product, localPhotos]);

  // Handle photo changes
  const handlePhotosChange = useCallback(async (newPhotos: string[]) => {
    if (!product?._id) return;

    // Update local state immediately for instant feedback
    setLocalPhotos(newPhotos);

    try {
      await updateProductPhotos({
        variables: {
          productId: product._id,
          photos: newPhotos,
        },
      });
      // Refetch to sync with server
      refetch();
    } catch (error) {
      console.error("Failed to update photos:", error);
      // Revert local state on error
      setLocalPhotos(undefined);
      alert("Failed to update photos");
    }
  }, [product?._id, updateProductPhotos, refetch]);

  // Photo gallery hook (must be called unconditionally)
  const photoGallery = useProductPhotoGallery(
    displayProduct || { _id: "", photos: [] } as unknown as GQL.Product,
    handlePhotosChange
  );

  // Shuffle ratings on mount
  const shuffledRatings = useMemo(() => {
    if (!ratings || ratings.length === 0) return [];
    const startIndex = Math.floor(Math.random() * ratings.length);
    return [...ratings.slice(startIndex), ...ratings.slice(0, startIndex)];
  }, [ratings]);

  const currentRating = shuffledRatings[reviewIndex];

  const navigateReview = useCallback((direction: 1 | -1) => {
    if (shuffledRatings.length === 0) return;
    setReviewIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return shuffledRatings.length - 1;
      if (next >= shuffledRatings.length) return 0;
      return next;
    });
  }, [shuffledRatings.length]);

  useEffect(() => {
    if (!products || !pId || typeof pId !== "string") {
      return;
    }
    const product = products.find(
      (product) => product.short.toLowerCase().split(" ").join("") === pId
    );
    if (product) {
      setProduct(product);
      setLocalPhotos(undefined); // Reset local photos when product changes
    }
  }, [products, pId]);

  return (
    <Grid
      id="product"
      css={(theme) => [
        {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          backgroundColor: theme.colors.soft_gray,
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(3),
          },
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            gridColumn: "span 6",
            paddingRight: theme.spacing(3),
            display: "grid",
            gap: theme.spacing(3),
            position: "sticky",
            top: 90,
            height: "fit-content",
            alignSelf: "start",
            img: {
              width: "100%",
              borderRadius: theme.spacing(1.5),
              aspectRatio: "1",
            },
            [theme.maxMQ.md]: {
              gridColumn: "span 4",
            },
            [theme.maxMQ.sm]: {
              gridColumn: "1 / -1",
              paddingRight: 0,
              position: "relative",
              top: "auto",
            },
            [theme.maxMQ.xsm]: {
              gridColumn: "1 / -1",
              paddingRight: 0,
              maxWidth: "100%",
              position: "relative",
              top: "auto",
            },
          },
        ]}
      >
        {/* Photo carousel with reviews (both mobile and desktop for non-admin) */}
        {!photoGallery.isAdmin && photoGallery.photos.length > 0 && (
          <div css={(theme) => ({ marginBottom: theme.spacing(6) })}>
            <PhotoCarousel
              photos={photoGallery.photos}
              ratings={shuffledRatings}
            />
          </div>
        )}

        {/* Admin: First photo slot */}
        {photoGallery.isAdmin && displayProduct && (
          <PhotoSlot
            key={`${displayProduct._id}-0`}
            photo={photoGallery.getPhotoForSlot(0)}
            photos={photoGallery.photos}
            initialIndex={0}
            enableRotation={!photoGallery.isAdmin && photoGallery.photos.length > VISIBLE_SLOTS}
            isAdmin={photoGallery.isAdmin}
            uploading={photoGallery.uploadingSlot === 0}
            deleting={photoGallery.deletingSlot === 0}
            canAdd={photoGallery.canAdd}
            onUpload={photoGallery.uploadHandlers[0]}
            onDelete={photoGallery.deleteHandlers[0]}
          />
        )}

        {/* Testimonial between first and second photo (admin only) */}
        {photoGallery.isAdmin && currentRating && (
          <div
            css={(theme) => [
              {
                background: theme.colors.white50,
                width: "100%",
                maxWidth: "100%",
                aspectRatio: "1",
                borderRadius: theme.spacing(2),
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text css={(theme) => ({ padding: theme.spacing(3) })}>1,000+ reviews</Text>
            <Item
              rating={currentRating}
              customButton={
                <div css={(theme) => ({ marginTop: theme.spacing(3), display: "flex", alignItems: "center", gap: 5 })}>
                  <NavButton
                    css={{ transform: "rotate(180deg)" }}
                    onClick={() => navigateReview(-1)}
                  />
                  <NavButton onClick={() => navigateReview(1)} />
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
              }
              css={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
                background: "transparent",
              }}
            />
          </div>
        )}

        {/* Second photo slot (admin only) */}
        {photoGallery.isAdmin && displayProduct && (
          <PhotoSlot
            key={`${displayProduct._id}-1`}
            photo={photoGallery.getPhotoForSlot(1)}
            photos={photoGallery.photos}
            initialIndex={1}
            enableRotation={!photoGallery.isAdmin && photoGallery.photos.length > VISIBLE_SLOTS}
            isAdmin={photoGallery.isAdmin}
            uploading={photoGallery.uploadingSlot === 1}
            deleting={photoGallery.deletingSlot === 1}
            canAdd={photoGallery.canAdd}
            onUpload={photoGallery.uploadHandlers[1]}
            onDelete={photoGallery.deleteHandlers[1]}
          />
        )}

        {/* Third photo slot (admin only) */}
        {photoGallery.isAdmin && displayProduct && (
          <PhotoSlot
            key={`${displayProduct._id}-2`}
            photo={photoGallery.getPhotoForSlot(2)}
            photos={photoGallery.photos}
            initialIndex={2}
            enableRotation={!photoGallery.isAdmin && photoGallery.photos.length > VISIBLE_SLOTS}
            isAdmin={photoGallery.isAdmin}
            uploading={photoGallery.uploadingSlot === 2}
            deleting={photoGallery.deletingSlot === 2}
            canAdd={photoGallery.canAdd}
            onUpload={photoGallery.uploadHandlers[2]}
            onDelete={photoGallery.deleteHandlers[2]}
          />
        )}

        {/* Admin-only: 6 small photo slots (3 + 4-6 and 7-9) */}
        {photoGallery.isAdmin && displayProduct && (
          <>
            {/* Row 1: slots 4, 5, 6 (indices 3, 4, 5) */}
            <div css={(theme) => ({ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: theme.spacing(1.5) })}>
              {[3, 4, 5].map((index) => (
                <PhotoSlot
                  key={`${displayProduct._id}-${index}`}
                  small
                  photo={photoGallery.getPhotoByIndex(index)}
                  isAdmin={photoGallery.isAdmin}
                  uploading={photoGallery.uploadingSlot === index}
                  deleting={photoGallery.deletingSlot === index}
                  canAdd={photoGallery.canAdd}
                  onUpload={photoGallery.uploadHandlers[index]}
                  onDelete={photoGallery.deleteByIndexHandlers[index]}
                />
              ))}
            </div>
            {/* Row 2: slots 7, 8, 9 (indices 6, 7, 8) */}
            <div css={(theme) => ({ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: theme.spacing(1.5) })}>
              {[6, 7, 8].map((index) => (
                <PhotoSlot
                  key={`${displayProduct._id}-${index}`}
                  small
                  photo={photoGallery.getPhotoByIndex(index)}
                  isAdmin={photoGallery.isAdmin}
                  uploading={photoGallery.uploadingSlot === index}
                  deleting={photoGallery.deletingSlot === index}
                  canAdd={photoGallery.canAdd}
                  onUpload={photoGallery.uploadHandlers[index]}
                  onDelete={photoGallery.deleteByIndexHandlers[index]}
                />
              ))}
            </div>
          </>
        )}

              </div>
      <div
        css={(theme) => [
          {
            gridColumn: "span 6",
            display: "grid",
            gap: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            borderTop: `1px solid ${theme.colors.black}`,
            paddingTop: theme.spacing(1.5),
            [theme.maxMQ.md]: {
              gridColumn: "span 5",
            },
            [theme.maxMQ.sm]: {
              gridColumn: "1 / -1",
            },
            [theme.maxMQ.xsm]: {
              gridColumn: "1 / -1",
              maxWidth: "100%",
              wordBreak: "break-word",
              paddingBottom: 0,
            },
          },
        ]}
      >
        <Link href="#product">
          <ArrowedButton css={[{ justifyContent: "flex-start" }]}>
            The product
          </ArrowedButton>
        </Link>
        {product && product.deck && product.deck.labels && (
          <div css={[{ display: "flex", gap: 3 }]}>
            {product.deck.labels.map((label, index) => (
              <Label key={label + index}>{label}</Label>
            ))}
          </div>
        )}
        <Text css={(theme) => ({ marginTop: theme.spacing(9), [theme.maxMQ.xsm]: { marginTop: theme.spacing(3) } })}>
          {product?.deck?.info || "Created from a global design contest, this deck features 55 hand-picked artworks, voted on by enthusiasts worldwide. Whether for display or play, each card in this deck is a conversation starter, bringing joy and creativity to any gathering."}
        </Text>
        <div
          css={(theme) => [
            {
              borderRadius: theme.spacing(2),
              background: theme.colors.white75,
              padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
              marginTop: theme.spacing(3),
              [theme.maxMQ.xsm]: {
                padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
                marginTop: theme.spacing(1),
              },
            },
          ]}
          style={product ? {} : { height: 232 }}
        >
          {product && (
            <>
              <Text typography="h3">{product.deck?.slug === "crypto" ? "Exclusive" : `$${product.price.usd}`}</Text>
              <div css={(theme) => [{ marginTop: 15, display: "flex", alignItems: "center", gap: theme.spacing(3) }]}>
                {product.deck?.slug === "crypto" ? (
                  <Button size="medium" bordered>
                    Info
                  </Button>
                ) : product.status === "soldout" || product.status === "soon" ? (
                  <SoldOut size="medium" status={product.status} />
                ) : (
                  <AddToBag productId={product._id} size="medium" />
                )}
                <ContinueShopping css={{ fontSize: 18 }} />
              </div>
              <div
                css={(theme) => [
                  {
                    marginTop: theme.spacing(3),
                    paddingTop: theme.spacing(2),
                    borderTop: `1px solid ${theme.colors.black10}`,
                    gap: theme.spacing(3),
                    display: "flex",
                    alignItems: "center",
                    color: "rgba(0,0,0,20%)",
                    flexWrap: "wrap",
                    [theme.maxMQ.xsm]: {
                      marginTop: theme.spacing(2),
                      paddingTop: theme.spacing(2),
                      gap: theme.spacing(1.5),
                    },
                  },
                ]}
              >
                <Visa css={(theme) => [{ width: 62.67 * 0.9, [theme.maxMQ.xsm]: { width: 62.67 * 0.7 } }]} />
                <Mastercard css={(theme) => [{ width: 53.71 * 0.9, [theme.maxMQ.xsm]: { width: 53.71 * 0.7 } }]} />
                <PayPal css={(theme) => [{ width: 76.09 * 0.9, [theme.maxMQ.xsm]: { width: 76.09 * 0.7 } }]} />
                <ApplePay css={(theme) => [{ width: 67.14 * 0.9, [theme.maxMQ.xsm]: { width: 67.14 * 0.7 } }]} />
                <GooglePay css={(theme) => [{ width: 69.89 * 0.9, [theme.maxMQ.xsm]: { width: 69.89 * 0.7 } }]} />
              </div>
              <Text
                typography="p-xs"
                css={(theme) => [
                  {
                    color: theme.colors.black30,
                    marginTop: theme.spacing(2),
                    display: "flex",
                    alignItems: "center",
                    [theme.maxMQ.xsm]: {
                      marginTop: theme.spacing(1),
                    },
                  },
                ]}
              >
                <Lock css={[{ marginRight: 10 }]} />
                Secure check-out powered by Shopify
              </Text>
            </>
          )}
        </div>
        <FaqItem
          question="Why this deck"
          defaultOpen={!isMobile}
          css={(theme) => ({ marginTop: theme.spacing(3), ">:first-of-type": theme.typography.p })}
          answer={
            <div css={(theme) => [{ display: "grid", gap: theme.spacing(2) }]}>
              {points.map((point, index) => (
                <div key={point + index} css={(theme) => [{ display: "flex", gap: theme.spacing(1.5) }]}>
                  <Point css={[{ padding: 4, boxSizing: "content-box" }]} />
                  <Text
                    typography="p-s"
                    css={[{ flexBasis: 0, flexGrow: 1 }]}
                  >
                    {point}
                  </Text>
                </div>
              ))}
            </div>
          }
        />
        <FaqItem
          question="What's in the box"
          css={(theme) => ({ ">:first-of-type": theme.typography.p })}
          answer={
            <div css={(theme) => [{ display: "grid", gap: theme.spacing(2) }]}>
              {[
                "55 cards (52 playing cards plus two jokers, and one info card with the list of the artists).",
                "Premium Bicycle® paper stock for unparalleled artistry, tactile quality and durability.",
                "Poker-sized (9 x 6.5 x 2 cm). Weight ~110g.",
              ].map((point, index) => (
                <div key={point + index} css={(theme) => [{ display: "flex", gap: theme.spacing(1.5) }]}>
                  <Point css={[{ padding: 4, boxSizing: "content-box" }]} />
                  <Text
                    typography="p-s"
                    css={[{ flexBasis: 0, flexGrow: 1 }]}
                  >
                    {point}
                  </Text>
                </div>
              ))}
            </div>
          }
        />
        <FaqItem
          question="Shipping & returns"
          css={(theme) => ({ ">:first-of-type": theme.typography.p })}
          answer="Please allow 2—5 business days for orders to be processed after your purchase is complete. The estimated shipping time is 5—10 business days for Europe and USA, and up to 20 business days for the rest of the world."
        />
      </div>
    </Grid>
  );
};

export default About;
