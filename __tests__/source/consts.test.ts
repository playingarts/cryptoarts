import { socialLinks } from "../../source/consts";

describe("source/consts", () => {
  describe("socialLinks", () => {
    it("should have app store links", () => {
      expect(socialLinks.appStore).toContain("apps.apple.com");
      expect(socialLinks.playStore).toContain("play.google.com");
    });

    it("should have podcast links", () => {
      expect(socialLinks.podcastYoutube).toContain("youtube.com");
      expect(socialLinks.podcastSpotify).toContain("spotify.com");
      expect(socialLinks.podcastAppleMusic).toContain("podcasts.apple.com");
    });

    it("should have social media links", () => {
      expect(socialLinks.twitter).toContain("twitter.com");
      expect(socialLinks.discord).toContain("discord");
      expect(socialLinks.instagram).toContain("instagram.com");
      expect(socialLinks.youtube).toContain("youtube.com");
      expect(socialLinks.pinterest).toContain("pinterest.com");
      expect(socialLinks.behance).toContain("behance.net");
      expect(socialLinks.facebook).toContain("facebook.com");
    });

    it("should have OpenSea links", () => {
      expect(socialLinks.allTokens).toContain("opensea.io");
      expect(socialLinks.onSale).toContain("opensea.io");
    });

    it("should have stats links", () => {
      expect(socialLinks.leaderboard).toContain("nftnerds.ai");
      expect(socialLinks.allStats).toContain("getpaced.xyz");
    });

    it("should have all expected keys", () => {
      const expectedKeys = [
        "appStore",
        "playStore",
        "podcastYoutube",
        "podcastSpotify",
        "podcastAppleMusic",
        "twitter",
        "discord",
        "instagram",
        "youtube",
        "pinterest",
        "behance",
        "facebook",
        "allTokens",
        "onSale",
        "leaderboard",
        "allStats",
      ];

      expectedKeys.forEach((key) => {
        expect(socialLinks).toHaveProperty(key);
      });
    });

    it("should have valid URL format for all links", () => {
      Object.entries(socialLinks).forEach(([key, value]) => {
        expect(value).toMatch(/^https?:\/\//);
      });
    });
  });
});
