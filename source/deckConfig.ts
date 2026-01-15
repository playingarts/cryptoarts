export interface DeckConfig {
  palette: "dark" | "light";
  showTestimonials: boolean;
  showGallery: boolean;
  /** Whether this deck has AR feature enabled */
  hasAR: boolean;
  sections: string[];
}

const defaultConfig: DeckConfig = {
  palette: "light",
  showTestimonials: true,
  showGallery: true,
  hasAR: false,
  sections: ["Gallery", "Reviews"],
};

const deckConfigs: Record<string, Partial<DeckConfig>> = {
  crypto: {
    palette: "dark",
    showTestimonials: false,
    showGallery: false,
    hasAR: true,
    sections: ["PACE", "AR"],
  },
  zero: {
    hasAR: true,
    sections: ["Gallery", "Reviews", "AR"],
  },
};

export const getDeckConfig = (deckSlug: string | undefined): DeckConfig => {
  if (!deckSlug) return defaultConfig;
  return { ...defaultConfig, ...deckConfigs[deckSlug] };
};
