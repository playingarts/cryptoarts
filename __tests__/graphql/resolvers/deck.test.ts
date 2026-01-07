/**
 * @jest-environment node
 */
// @ts-nocheck - Complex GraphQL resolver types require extensive type assertions

// Mock the models before importing the resolver
jest.mock("../../../source/models", () => ({
  Deck: {
    find: jest.fn(),
    findOne: jest.fn(),
  },
  Product: {
    findOne: jest.fn(),
  },
}));

jest.mock("../../../source/graphql/schemas/product", () => ({
  getProduct: jest.fn(),
}));

import { resolvers, getDecks, getDeck } from "../../../source/graphql/schemas/deck";
import { Deck } from "../../../source/models";
import { getProduct } from "../../../source/graphql/schemas/product";

describe("Deck Resolver", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getDecks", () => {
    it("should return all decks with populated previewCards", async () => {
      const mockDecks = [
        { _id: "deck-1", title: "Deck 1", previewCards: [] },
        { _id: "deck-2", title: "Deck 2", previewCards: [] },
      ];

      const mockPopulate = jest.fn().mockResolvedValue(mockDecks);
      (Deck.find as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getDecks();

      expect(Deck.find).toHaveBeenCalled();
      expect(mockPopulate).toHaveBeenCalledWith("previewCards");
      expect(result).toEqual(mockDecks);
    });

    it("should return empty array when no decks exist", async () => {
      const mockPopulate = jest.fn().mockResolvedValue([]);
      (Deck.find as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getDecks();

      expect(result).toEqual([]);
    });
  });

  describe("getDeck", () => {
    it("should return deck by slug", async () => {
      const mockDeck = {
        _id: "deck-123",
        title: "Test Deck",
        slug: "test-deck",
        previewCards: [],
      };

      const mockPopulate = jest.fn().mockResolvedValue(mockDeck);
      (Deck.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getDeck({ slug: "test-deck" });

      expect(Deck.findOne).toHaveBeenCalledWith({ slug: "test-deck" });
      expect(mockPopulate).toHaveBeenCalledWith("previewCards");
      expect(result).toEqual(mockDeck);
    });

    it("should return deck by _id", async () => {
      const mockDeck = {
        _id: "deck-123",
        title: "Test Deck",
      };

      const mockPopulate = jest.fn().mockResolvedValue(mockDeck);
      (Deck.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getDeck({ _id: "deck-123" });

      expect(Deck.findOne).toHaveBeenCalledWith({ _id: "deck-123" });
      expect(result).toEqual(mockDeck);
    });

    it("should return null when deck not found", async () => {
      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deck.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getDeck({ slug: "nonexistent" });

      expect(result).toBeNull();
    });
  });

  describe("Deck.properties resolver", () => {
    const propertiesResolver = resolvers.Deck?.properties;

    it("should return properties when they exist", () => {
      const deck = {
        properties: { color: "red", theme: "dark" },
      } as GQL.Deck;

      const result = propertiesResolver!(deck, {}, {} as never, {} as never);

      expect(result).toEqual({ color: "red", theme: "dark" });
    });

    it("should return empty object when properties are null", () => {
      const deck = { properties: null } as unknown as GQL.Deck;

      const result = propertiesResolver!(deck, {}, {} as never, {} as never);

      expect(result).toEqual({});
    });

    it("should return empty object when properties are undefined", () => {
      const deck = { properties: undefined } as unknown as GQL.Deck;

      const result = propertiesResolver!(deck, {}, {} as never, {} as never);

      expect(result).toEqual({});
    });
  });

  describe("Deck.product resolver", () => {
    const productResolver = resolvers.Deck?.product;

    it("should return product for deck", async () => {
      const mockProduct = {
        _id: "product-123",
        title: "Test Product",
        price: { eur: 30, usd: 33 },
      };

      (getProduct as jest.Mock).mockResolvedValue(mockProduct);

      const deck = { _id: "deck-123" } as GQL.Deck;
      const result = await productResolver!(deck, {}, {} as never, {} as never);

      expect(getProduct).toHaveBeenCalledWith({ deck: "deck-123" });
      expect(result).toEqual(mockProduct);
    });

    it("should return undefined when no product exists for deck", async () => {
      (getProduct as jest.Mock).mockResolvedValue(undefined);

      const deck = { _id: "deck-456" } as GQL.Deck;
      const result = await productResolver!(deck, {}, {} as never, {} as never);

      expect(result).toBeUndefined();
    });
  });

  describe("Query.decks", () => {
    const decksQuery = resolvers.Query?.decks;

    it("should return all decks", async () => {
      const mockDecks = [
        { _id: "1", title: "Deck 1" },
        { _id: "2", title: "Deck 2" },
      ];

      const mockPopulate = jest.fn().mockResolvedValue(mockDecks);
      (Deck.find as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await decksQuery!({}, {}, {} as never, {} as never);

      expect(result).toEqual(mockDecks);
    });
  });

  describe("Query.deck", () => {
    const deckQuery = resolvers.Query?.deck;

    it("should return deck by slug", async () => {
      const mockDeck = {
        _id: "deck-123",
        title: "Test Deck",
        slug: "test-deck",
      };

      const mockPopulate = jest.fn().mockResolvedValue(mockDeck);
      (Deck.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await deckQuery!(
        {},
        { slug: "test-deck" },
        {} as never,
        {} as never
      );

      expect(result).toEqual(mockDeck);
    });

    it("should return null for nonexistent slug", async () => {
      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deck.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await deckQuery!(
        {},
        { slug: "nonexistent" },
        {} as never,
        {} as never
      );

      expect(result).toBeNull();
    });
  });

  describe("JSON scalar", () => {
    it("should have JSON scalar resolver", () => {
      expect(resolvers.JSON).toBeDefined();
    });
  });
});
