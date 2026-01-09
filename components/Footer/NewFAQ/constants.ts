// Card dimensions
export const CARD_WIDTH = 250;
export const CARD_HEIGHT = 350;
export const CARD_BORDER_RADIUS = 15;

// Card positioning
export const CARD_CONTAINER_HEIGHT = 525;
export const CARD_POSITION_TOP = "60%";
export const CARD_POSITION_LEFT = "50%";

// Flip animation timing (ms)
export const MIN_FLIP_INTERVAL = 4000;
export const MAX_FLIP_INTERVAL = 8000;
export const FLIP_TRANSITION_DURATION = 600;

// Card rotations
export const BACKSIDE_ROTATION = "-8deg";
export const FRONT_ROTATION = "8deg";

// FAQ content
export const FAQ_DATA = {
  "Are these physical decks?":
    "Yes! All Playing Arts editions are premium physical playing card decks printed on high-quality casino-grade card stock with a smooth finish. Each deck contains 54 unique cards designed by artists from around the world.",
  "How do I use the AR feature?":
    "Download the Playing Arts app (iOS/Android), point your camera at any card, and watch the artwork come to life with animations and interactive elements created by each artist.",
  "How much does it cost to ship a package?":
    "Shipping costs vary by location. We offer worldwide shipping with tracking. Standard shipping is $5-15 depending on your region, with free shipping available on orders over $50.",
  "Can I track my order?":
    "Yes, you'll receive a tracking number via email once your order ships. You can track your package through our website or directly through the carrier's tracking page.",
  "How to participate as an artist?":
    "We're always looking for talented artists to join future editions. Send your portfolio and a brief introduction to artists@playingarts.com. We review submissions quarterly and reach out to selected artists.",
} as const;

export type FAQQuestion = keyof typeof FAQ_DATA;
