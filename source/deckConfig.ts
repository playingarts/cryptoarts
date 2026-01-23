export interface DeckConfig {
  palette: "dark" | "light";
  showTestimonials: boolean;
  showGallery: boolean;
  /** Whether this deck has AR feature enabled */
  hasAR: boolean;
  /** Whether to show PACE/NFT stats section */
  showPACE: boolean;
  sections: string[];
}

const defaultConfig: DeckConfig = {
  palette: "light",
  showTestimonials: true,
  showGallery: true,
  hasAR: false,
  showPACE: false,
  sections: ["About", "Gallery", "Reviews", "FAQ"],
};

const deckConfigs: Record<string, Partial<DeckConfig>> = {
  crypto: {
    palette: "dark",
    showTestimonials: false,
    showGallery: false,
    hasAR: true,
    showPACE: true,
    sections: ["About", "PACE", "AR", "FAQ"],
  },
  zero: {
    hasAR: true,
    showPACE: false,
    sections: ["About", "Gallery", "Reviews", "AR", "FAQ"],
  },
};

export const getDeckConfig = (deckSlug: string | undefined): DeckConfig => {
  if (!deckSlug) return defaultConfig;
  return { ...defaultConfig, ...deckConfigs[deckSlug] };
};
