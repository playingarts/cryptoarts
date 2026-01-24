/**
 * @jest-environment node
 */

import { DeckService } from "../../source/services/DeckService";

// Mock the models
jest.mock("../../source/models", () => ({
  Deck: {
    find: jest.fn(),
    findOne: jest.fn(),
  },
}));

import { Deck } from "../../source/models";

describe("DeckService", () => {
  let deckService: DeckService;

  beforeEach(() => {
    deckService = new DeckService();
    jest.clearAllMocks();
  });

  describe("getDecks", () => {
    it("should return all decks with previewCards populated", async () => {
      const mockDecks = [
        { _id: "1", slug: "crypto", title: "Crypto Edition" },
        { _id: "2", slug: "future", title: "Future Edition" },
      ];

      (Deck.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDecks),
      });

      const result = await deckService.getDecks();

      expect(Deck.find).toHaveBeenCalled();
      expect(result).toEqual(mockDecks);
      expect(result).toHaveLength(2);
    });

    it("should return empty array when no decks exist", async () => {
      (Deck.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });

      const result = await deckService.getDecks();

      expect(result).toEqual([]);
    });
  });

  describe("getDeck", () => {
    it("should find deck by slug", async () => {
      const mockDeck = { _id: "1", slug: "crypto", title: "Crypto Edition" };

      (Deck.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDeck),
      });

      const result = await deckService.getDeck({ slug: "crypto" });

      expect(Deck.findOne).toHaveBeenCalledWith({ slug: "crypto" });
      expect(result).toEqual(mockDeck);
    });

    it("should find deck by id", async () => {
      const mockDeck = { _id: "deck-123", slug: "crypto", title: "Crypto Edition" };

      (Deck.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDeck),
      });

      const result = await deckService.getDeck({ id: "deck-123" });

      expect(Deck.findOne).toHaveBeenCalledWith({ _id: "deck-123" });
      expect(result).toEqual(mockDeck);
    });

    it("should return undefined when deck not found", async () => {
      (Deck.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      const result = await deckService.getDeck({ slug: "nonexistent" });

      expect(result).toBeUndefined();
    });
  });

  describe("getDeckBySlug", () => {
    it("should call getDeck with slug option", async () => {
      const mockDeck = { _id: "1", slug: "crypto", title: "Crypto Edition" };

      (Deck.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDeck),
      });

      const result = await deckService.getDeckBySlug("crypto");

      expect(Deck.findOne).toHaveBeenCalledWith({ slug: "crypto" });
      expect(result).toEqual(mockDeck);
    });
  });

  describe("getDeckById", () => {
    it("should call getDeck with id option", async () => {
      const mockDeck = { _id: "deck-123", slug: "crypto", title: "Crypto Edition" };

      (Deck.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDeck),
      });

      const result = await deckService.getDeckById("deck-123");

      expect(Deck.findOne).toHaveBeenCalledWith({ _id: "deck-123" });
      expect(result).toEqual(mockDeck);
    });
  });

  describe("getDecksBySlugs", () => {
    it("should return decks matching the provided slugs", async () => {
      const mockDecks = [
        { _id: "1", slug: "crypto", title: "Crypto Edition" },
        { _id: "2", slug: "future", title: "Future Edition" },
      ];

      (Deck.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDecks),
      });

      const result = await deckService.getDecksBySlugs(["crypto", "future"]);

      expect(Deck.find).toHaveBeenCalledWith({ slug: { $in: ["crypto", "future"] } });
      expect(result).toEqual(mockDecks);
    });

    it("should return empty array for empty slugs input", async () => {
      const result = await deckService.getDecksBySlugs([]);

      expect(Deck.find).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe("getDeckProperties", () => {
    it("should return properties when provided", () => {
      const properties = { isNft: true, edition: "crypto" };
      const result = deckService.getDeckProperties(properties);

      expect(result).toEqual(properties);
    });

    it("should return empty object when properties is null", () => {
      const result = deckService.getDeckProperties(null);

      expect(result).toEqual({});
    });

    it("should return empty object when properties is undefined", () => {
      const result = deckService.getDeckProperties(undefined);

      expect(result).toEqual({});
    });
  });
});
