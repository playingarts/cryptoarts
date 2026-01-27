"use client";

import { FC, useState, useRef, useCallback } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Text from "../../Text";
import Plus from "../../Icons/Plus";

const UPDATE_CARD_PHOTOS = gql`
  mutation UpdateCardPhotos(
    $cardId: ID!
    $mainPhoto: String
    $additionalPhotos: [String!]
  ) {
    updateCardPhotos(
      cardId: $cardId
      mainPhoto: $mainPhoto
      additionalPhotos: $additionalPhotos
    ) {
      _id
      mainPhoto
      additionalPhotos
    }
  }
`;

interface PhotoUploadModalProps {
  cardId: string;
  artistName: string;
  mainPhoto?: string | null;
  additionalPhotos?: string[];
  onClose: () => void;
  onSuccess?: () => void;
}

type UploadState = "idle" | "uploading" | "success" | "error";

interface PhotoSlot {
  url: string | null;
  file: File | null;
  uploading: boolean;
  error: string | null;
}

const PhotoUploadModal: FC<PhotoUploadModalProps> = ({
  cardId,
  artistName,
  mainPhoto,
  additionalPhotos = [],
  onClose,
  onSuccess,
}) => {
  // Main photo state
  const [mainPhotoSlot, setMainPhotoSlot] = useState<PhotoSlot>({
    url: mainPhoto || null,
    file: null,
    uploading: false,
    error: null,
  });

  // Additional photos state (max 4)
  const [additionalSlots, setAdditionalSlots] = useState<PhotoSlot[]>(() => {
    const slots: PhotoSlot[] = [];
    for (let i = 0; i < 4; i++) {
      slots.push({
        url: additionalPhotos[i] || null,
        file: null,
        uploading: false,
        error: null,
      });
    }
    return slots;
  });

  const [saveState, setSaveState] = useState<UploadState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [updateCardPhotos] = useMutation(UPDATE_CARD_PHOTOS);

  // Upload a single file to the server
  const uploadFile = useCallback(
    async (file: File, photoType: "main" | "additional"): Promise<string> => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("cardId", cardId);
      formData.append("photoType", photoType);

      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      return data.imageUrl;
    },
    [cardId]
  );

  // Handle main photo selection
  const handleMainPhotoSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setMainPhotoSlot((prev) => ({
        ...prev,
        file,
        uploading: true,
        error: null,
      }));

      try {
        const url = await uploadFile(file, "main");
        setMainPhotoSlot({
          url,
          file: null,
          uploading: false,
          error: null,
        });
      } catch (err) {
        setMainPhotoSlot((prev) => ({
          ...prev,
          uploading: false,
          error: err instanceof Error ? err.message : "Upload failed",
        }));
      }
    },
    [uploadFile]
  );

  // Handle additional photo selection
  const handleAdditionalPhotoSelect = useCallback(
    async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setAdditionalSlots((prev) => {
        const newSlots = [...prev];
        newSlots[index] = {
          ...newSlots[index],
          file,
          uploading: true,
          error: null,
        };
        return newSlots;
      });

      try {
        const url = await uploadFile(file, "additional");
        setAdditionalSlots((prev) => {
          const newSlots = [...prev];
          newSlots[index] = {
            url,
            file: null,
            uploading: false,
            error: null,
          };
          return newSlots;
        });
      } catch (err) {
        setAdditionalSlots((prev) => {
          const newSlots = [...prev];
          newSlots[index] = {
            ...newSlots[index],
            uploading: false,
            error: err instanceof Error ? err.message : "Upload failed",
          };
          return newSlots;
        });
      }
    },
    [uploadFile]
  );

  // Remove a photo
  const handleRemoveMain = useCallback(() => {
    setMainPhotoSlot({
      url: null,
      file: null,
      uploading: false,
      error: null,
    });
  }, []);

  const handleRemoveAdditional = useCallback((index: number) => {
    setAdditionalSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = {
        url: null,
        file: null,
        uploading: false,
        error: null,
      };
      return newSlots;
    });
  }, []);

  // Save all changes to the database
  const handleSave = useCallback(async () => {
    setSaveState("uploading");
    setSaveError(null);

    try {
      const additionalUrls = additionalSlots
        .map((slot) => slot.url)
        .filter((url): url is string => url !== null);

      await updateCardPhotos({
        variables: {
          cardId,
          mainPhoto: mainPhotoSlot.url,
          additionalPhotos: additionalUrls.length > 0 ? additionalUrls : null,
        },
      });

      setSaveState("success");
      onSuccess?.();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setSaveState("error");
      setSaveError(err instanceof Error ? err.message : "Failed to save");
    }
  }, [
    cardId,
    mainPhotoSlot.url,
    additionalSlots,
    updateCardPhotos,
    onSuccess,
    onClose,
  ]);

  // Check if any uploads are in progress
  const isUploading =
    mainPhotoSlot.uploading || additionalSlots.some((slot) => slot.uploading);

  // Check if there are any changes
  const hasChanges =
    mainPhotoSlot.url !== mainPhoto ||
    additionalSlots.some(
      (slot, i) => slot.url !== (additionalPhotos[i] || null)
    );

  return (
    <div
      css={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        css={(theme) => ({
          background: theme.colors.white,
          borderRadius: theme.spacing(1.5),
          padding: theme.spacing(3),
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text typography="h3" css={(theme) => ({ color: theme.colors.black })}>
            Edit Photos
          </Text>
          <button
            onClick={onClose}
            css={(theme) => ({
              width: 36,
              height: 36,
              padding: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: theme.colors.pale_gray,
              color: theme.colors.black,
              border: "none",
              cursor: "pointer",
              "&:hover": {
                background: theme.colors.soft_gray,
              },
            })}
          >
            <Plus css={{ transform: "rotate(45deg)" }} />
          </button>
        </div>

        <Text
          typography="p-s"
          css={(theme) => ({ color: theme.colors.black50, marginBottom: 24 })}
        >
          Upload photos for <strong>{artistName}</strong>&apos;s card. Images
          will be automatically cropped to 800x800.
        </Text>

        {/* Main Photo */}
        <div css={{ marginBottom: 24 }}>
          <Text
            typography="h4"
            css={(theme) => ({ color: theme.colors.black, marginBottom: 12, fontSize: 18 })}
          >
            Main Photo
          </Text>
          <input
            ref={mainInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleMainPhotoSelect}
            css={{ display: "none" }}
          />
          <PhotoSlotUI
            slot={mainPhotoSlot}
            onBrowse={() => mainInputRef.current?.click()}
            onRemove={handleRemoveMain}
          />
        </div>

        {/* Additional Photos */}
        <div>
          <Text
            typography="h4"
            css={(theme) => ({ color: theme.colors.black, marginBottom: 12, fontSize: 18 })}
          >
            Additional Photos (up to 4)
          </Text>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {additionalSlots.map((slot, index) => (
              <div key={index}>
                <input
                  ref={(el) => {
                    additionalInputRefs.current[index] = el;
                  }}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => handleAdditionalPhotoSelect(index, e)}
                  css={{ display: "none" }}
                />
                <PhotoSlotUI
                  slot={slot}
                  onBrowse={() => additionalInputRefs.current[index]?.click()}
                  onRemove={() => handleRemoveAdditional(index)}
                  small
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Error */}
        {saveError && (
          <Text
            typography="p-s"
            css={(theme) => ({
              color: theme.colors.accent,
              marginTop: 16,
              textAlign: "center",
            })}
          >
            {saveError}
          </Text>
        )}

        {/* Actions */}
        <div
          css={{
            display: "flex",
            gap: 12,
            marginTop: 24,
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            disabled={isUploading}
            css={(theme) => ({
              padding: "10px 20px",
              fontSize: 16,
              fontFamily: "inherit",
              fontWeight: 500,
              border: `1px solid ${theme.colors.black10}`,
              borderRadius: 8,
              background: "transparent",
              color: theme.colors.black,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                background: theme.colors.pale_gray,
              },
              "&:disabled": {
                opacity: 0.5,
                cursor: "not-allowed",
              },
            })}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUploading || !hasChanges || saveState === "uploading"}
            css={(theme) => ({
              padding: "10px 20px",
              fontSize: 16,
              fontFamily: "inherit",
              fontWeight: 500,
              border: "none",
              borderRadius: 8,
              background: theme.colors.accent,
              color: theme.colors.white,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                opacity: 0.9,
              },
              "&:disabled": {
                opacity: 0.5,
                cursor: "not-allowed",
              },
            })}
          >
            {saveState === "uploading"
              ? "Saving..."
              : saveState === "success"
              ? "Saved!"
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Individual photo slot component
const PhotoSlotUI: FC<{
  slot: PhotoSlot;
  onBrowse: () => void;
  onRemove: () => void;
  small?: boolean;
}> = ({ slot, onBrowse, onRemove, small }) => {
  const size = small ? 120 : 200;

  if (slot.uploading) {
    return (
      <div
        css={(theme) => ({
          width: size,
          height: size,
          borderRadius: 8,
          background: theme.colors.pale_gray,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 8,
        })}
      >
        <div
          css={(theme) => ({
            width: 24,
            height: 24,
            border: `2px solid ${theme.colors.black30}`,
            borderTopColor: theme.colors.accent,
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            "@keyframes spin": {
              to: { transform: "rotate(360deg)" },
            },
          })}
        />
        <Text typography="p-s" css={(theme) => ({ color: theme.colors.black50 })}>
          Uploading...
        </Text>
      </div>
    );
  }

  if (slot.url) {
    return (
      <div css={{ position: "relative", width: size, height: size }}>
        <img
          src={slot.url}
          alt="Photo"
          css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <button
          onClick={onRemove}
          css={(theme) => ({
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.6)",
            color: theme.colors.white,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            "&:hover": {
              background: "rgba(0, 0, 0, 0.8)",
            },
          })}
        >
          <Plus css={{ transform: "rotate(45deg)", width: 12, height: 12 }} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onBrowse}
      css={(theme) => ({
        width: size,
        height: size,
        borderRadius: 8,
        border: `2px dashed ${slot.error ? theme.colors.accent : theme.colors.black30}`,
        background: theme.colors.pale_gray,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 8,
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: theme.colors.black50,
          background: theme.colors.soft_gray,
        },
      })}
    >
      <Plus css={(theme) => ({ color: theme.colors.black50 })} />
      <Text
        typography="p-s"
        css={(theme) => ({ color: slot.error ? theme.colors.accent : theme.colors.black50 })}
      >
        {slot.error || "Browse"}
      </Text>
    </button>
  );
};

export default PhotoUploadModal;
