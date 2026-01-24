import type { HomeCard } from "../../../Contexts/heroCarousel";

// Card dimensions
export const CARD_WIDTH = 240;
export const CARD_HEIGHT = 336;
export const CARD_VERTICAL_OFFSET = 112; // 1/3 of card height for staggered layout

// Layout
export const CARD_GAP = 20;
export const CARD_GRID_LEFT_OFFSET = -210;
export const STICKY_TOP = 100;
export const MARGIN_TOP = 40;
export const MARGIN_BOTTOM = 70;
export const ROTATION_DEGREES = -15;

// Animation timing (ms)
export const MIN_FLIP_INTERVAL = 4000;
export const MAX_FLIP_INTERVAL = 10000;
export const FLIP_TRANSITION_DURATION = 600;

// Number of cards in the grid
export const CARD_COUNT = 4;

// Fallback cards if no cards are available from context
export const FALLBACK_CARDS: HomeCard[] = [
  {
    _id: "fallback-1",
    img: "https://s3.amazonaws.com/img.playingarts.com/three-small-hd/3-of-dimonds-burnt-toast-creative.jpg",
    cardBackground: "#000",
  },
  {
    _id: "fallback-2",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/232.jpg",
    cardBackground: "#000",
  },
  {
    _id: "fallback-3",
    img: "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/8-of-clubs-zutto.jpg",
    cardBackground: "#000",
  },
  {
    _id: "fallback-4",
    img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/104.jpg",
    cardBackground: "#000",
  },
];

// Stats data for the Story section
export const STORY_STATS = [
  { value: "14", label: "Years" },
  { value: "08", label: "Editions" },
  { value: "1100+", label: "Artists" },
] as const;
