/**
 * @jest-environment node
 */

import { ArtistService } from "../../source/services/ArtistService";

// Mock the models
jest.mock("../../source/models", () => ({
  Artist: {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
  },
}));

import { Artist } from "../../source/models";

describe("ArtistService", () => {
  let artistService: ArtistService;

  beforeEach(() => {
    artistService = new ArtistService();
    jest.clearAllMocks();
  });

  describe("getArtists", () => {
    it("should return all artists", async () => {
      const mockArtists = [
        { _id: "1", name: "Artist One", slug: "artist-one" },
        { _id: "2", name: "Artist Two", slug: "artist-two" },
      ];

      (Artist.find as jest.Mock).mockResolvedValue(mockArtists);

      const result = await artistService.getArtists();

      expect(Artist.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockArtists);
    });

    it("should filter artists with podcast when hasPodcast is true", async () => {
      const mockArtists = [
        { _id: "1", name: "Artist One", slug: "artist-one", podcast: { id: "pod-1" } },
      ];

      (Artist.find as jest.Mock).mockResolvedValue(mockArtists);

      const result = await artistService.getArtists({ hasPodcast: true });

      expect(Artist.find).toHaveBeenCalledWith({ podcast: { $ne: undefined } });
      expect(result).toEqual(mockArtists);
    });

    it("should shuffle artists when shuffle is true", async () => {
      const mockArtists = [
        { _id: "1", name: "Artist One" },
        { _id: "2", name: "Artist Two" },
        { _id: "3", name: "Artist Three" },
      ];

      (Artist.find as jest.Mock).mockResolvedValue([...mockArtists]);

      const result = await artistService.getArtists({ shuffle: true });

      expect(result).toHaveLength(3);
      // Can't test randomness, just ensure all artists are returned
      expect(result.map((a) => a._id).sort()).toEqual(["1", "2", "3"]);
    });

    it("should limit artists when limit is provided", async () => {
      const mockArtists = [
        { _id: "1", name: "Artist One" },
        { _id: "2", name: "Artist Two" },
        { _id: "3", name: "Artist Three" },
      ];

      (Artist.find as jest.Mock).mockResolvedValue(mockArtists);

      const result = await artistService.getArtists({ limit: 2 });

      expect(result).toHaveLength(2);
    });

    it("should apply both shuffle and limit", async () => {
      const mockArtists = [
        { _id: "1", name: "Artist One" },
        { _id: "2", name: "Artist Two" },
        { _id: "3", name: "Artist Three" },
        { _id: "4", name: "Artist Four" },
      ];

      (Artist.find as jest.Mock).mockResolvedValue([...mockArtists]);

      const result = await artistService.getArtists({ shuffle: true, limit: 2 });

      expect(result).toHaveLength(2);
    });
  });

  describe("getArtistById", () => {
    it("should return artist by id", async () => {
      const mockArtist = { _id: "artist-1", name: "Artist One", slug: "artist-one" };

      (Artist.findById as jest.Mock).mockResolvedValue(mockArtist);

      const result = await artistService.getArtistById("artist-1");

      expect(Artist.findById).toHaveBeenCalledWith("artist-1");
      expect(result).toEqual(mockArtist);
    });

    it("should return undefined when artist not found", async () => {
      (Artist.findById as jest.Mock).mockResolvedValue(null);

      const result = await artistService.getArtistById("nonexistent");

      expect(result).toBeUndefined();
    });
  });

  describe("getArtistBySlug", () => {
    it("should return artist by slug", async () => {
      const mockArtist = { _id: "artist-1", name: "Artist One", slug: "artist-one" };

      (Artist.findOne as jest.Mock).mockResolvedValue(mockArtist);

      const result = await artistService.getArtistBySlug("artist-one");

      expect(Artist.findOne).toHaveBeenCalledWith({ slug: "artist-one" });
      expect(result).toEqual(mockArtist);
    });

    it("should return undefined when artist not found by slug", async () => {
      (Artist.findOne as jest.Mock).mockResolvedValue(null);

      const result = await artistService.getArtistBySlug("nonexistent");

      expect(result).toBeUndefined();
    });
  });

  describe("getSocials", () => {
    it("should combine website and social into single object", () => {
      const social = {
        instagram: "artist_insta",
        twitter: "artist_twitter",
        behance: "artist_behance",
      } as GQL.Socials;

      const result = artistService.getSocials("https://artist.com", social);

      expect(result).toEqual({
        website: "https://artist.com",
        instagram: "artist_insta",
        twitter: "artist_twitter",
        behance: "artist_behance",
      });
    });

    it("should handle undefined website", () => {
      const social = {
        instagram: "artist_insta",
      } as GQL.Socials;

      const result = artistService.getSocials(undefined, social);

      expect(result).toEqual({
        website: undefined,
        instagram: "artist_insta",
      });
    });

    it("should handle undefined social", () => {
      const result = artistService.getSocials("https://artist.com", undefined);

      expect(result).toEqual({
        website: "https://artist.com",
      });
    });

    it("should handle both undefined", () => {
      const result = artistService.getSocials(undefined, undefined);

      expect(result).toEqual({
        website: undefined,
      });
    });
  });
});
