import { getDeckConfig, DeckConfig } from "../../source/deckConfig";

describe("source/deckConfig", () => {
  describe("getDeckConfig", () => {
    it("returns default config when deckSlug is undefined", () => {
      const config = getDeckConfig(undefined);

      expect(config).toEqual({
        palette: "light",
        showTestimonials: true,
        showGallery: true,
        hasAR: false,
        showPACE: false,
        sections: ["About", "Gallery", "Reviews", "FAQ"],
      });
    });

    it("returns default config for unknown deck slugs", () => {
      const config = getDeckConfig("unknown-deck");

      expect(config).toEqual({
        palette: "light",
        showTestimonials: true,
        showGallery: true,
        hasAR: false,
        showPACE: false,
        sections: ["About", "Gallery", "Reviews", "FAQ"],
      });
    });

    it("returns crypto deck config with overrides", () => {
      const config = getDeckConfig("crypto");

      expect(config).toEqual({
        palette: "dark",
        showTestimonials: false,
        showGallery: false,
        hasAR: true,
        showPACE: true,
        sections: ["About", "PACE", "AR", "FAQ"],
      });
    });

    it("merges deck-specific config with defaults", () => {
      const config = getDeckConfig("crypto");

      // Should have crypto-specific values
      expect(config.palette).toBe("dark");
      expect(config.showTestimonials).toBe(false);
      expect(config.showGallery).toBe(false);
      expect(config.showPACE).toBe(true);
      expect(config.sections).toEqual(["About", "PACE", "AR", "FAQ"]);
    });

    it("returns consistent config structure", () => {
      const defaultConfig = getDeckConfig(undefined);
      const cryptoConfig = getDeckConfig("crypto");
      const unknownConfig = getDeckConfig("some-other-deck");

      // All configs should have the same keys
      const expectedKeys: (keyof DeckConfig)[] = [
        "palette",
        "showTestimonials",
        "showGallery",
        "hasAR",
        "showPACE",
        "sections",
      ];

      expectedKeys.forEach((key) => {
        expect(defaultConfig).toHaveProperty(key);
        expect(cryptoConfig).toHaveProperty(key);
        expect(unknownConfig).toHaveProperty(key);
      });
    });

    it("returns default config for empty string", () => {
      const config = getDeckConfig("");

      expect(config.palette).toBe("light");
      expect(config.showTestimonials).toBe(true);
    });
  });
});
