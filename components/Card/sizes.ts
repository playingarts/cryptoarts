/**
 * Size dimensions for a card
 */
interface CardSizeDimensions {
  width: number;
  height: number;
}

/**
 * Card size presets for different display contexts
 */
export const cardSizes: Record<string, CardSizeDimensions> = {
  big: { width: 360, height: 506 },
  hero: { width: 330, height: 464 },
  small: { width: 240, height: 336 },
  nano: { width: 184, height: 260 },
  preview: { width: 270, height: 380 },
};

/**
 * Card sizes for hover state (slightly larger)
 */
export const cardSizesHover: Record<string, CardSizeDimensions> = {
  big: { width: 370, height: 520 },
  hero: { width: 340, height: 478 },
  small: { width: 250, height: 350 },
  nano: { width: 190, height: 270 },
  preview: { width: 285, height: 400 },
};

export type CardSize = "big" | "hero" | "small" | "nano" | "preview";
