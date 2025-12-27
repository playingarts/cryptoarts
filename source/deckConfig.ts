export interface DeckConfig {
  palette: "dark" | "light";
  showTestimonials: boolean;
  showGallery: boolean;
  sections: string[];
}

const defaultConfig: DeckConfig = {
  palette: "light",
  showTestimonials: true,
  showGallery: true,
  sections: ["Gallery", "Reviews"],
};

const deckConfigs: Record<string, Partial<DeckConfig>> = {
  crypto: {
    palette: "dark",
    showTestimonials: false,
    showGallery: false,
    sections: ["PACE", "AR"],
  },
};

export const getDeckConfig = (deckSlug: string | undefined): DeckConfig => {
  if (!deckSlug) return defaultConfig;
  return { ...defaultConfig, ...deckConfigs[deckSlug] };
};
