/**
 * @jest-environment node
 */
// @ts-nocheck - Complex GraphQL resolver types require extensive type assertions

// Mock services before importing the resolver
jest.mock("../../../source/services", () => ({
  deckService: {
    getDecks: jest.fn(),
    getDeck: jest.fn(),
    getDeckBySlug: jest.fn(),
    getDeckById: jest.fn(),
    getDecksBySlugs: jest.fn(),
    getDeckProperties: jest.fn((props) => props || {}),
  },
  productService: {
    getProduct: jest.fn(),
  },
}));

import { resolvers } from "../../../source/graphql/schemas/deck";
import { deckService, productService } from "../../../source/services";

describe("Deck Resolver", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

      (productService.getProduct as jest.Mock).mockResolvedValue(mockProduct);

      const deck = { _id: "deck-123" } as GQL.Deck;
      const result = await productResolver!(deck, {}, {} as never, {} as never);

      expect(productService.getProduct).toHaveBeenCalledWith({ deck: "deck-123" });
      expect(result).toEqual(mockProduct);
    });

    it("should return undefined when no product exists for deck", async () => {
      (productService.getProduct as jest.Mock).mockResolvedValue(undefined);

      const deck = { _id: "deck-456" } as GQL.Deck;
      const result = await productResolver!(deck, {}, {} as never, {} as never);

      expect(result).toBeUndefined();
    });
  });

  describe("Query.decks", () => {
    const decksQuery = resolvers.Query?.decks;

    it("should return all decks from service", async () => {
      const mockDecks = [
        { _id: "1", title: "Deck 1" },
        { _id: "2", title: "Deck 2" },
      ];

      (deckService.getDecks as jest.Mock).mockResolvedValue(mockDecks);

      const result = await decksQuery!({}, {}, {} as never, {} as never);

      expect(deckService.getDecks).toHaveBeenCalled();
      expect(result).toEqual(mockDecks);
    });

    it("should return empty array when no decks exist", async () => {
      (deckService.getDecks as jest.Mock).mockResolvedValue([]);

      const result = await decksQuery!({}, {}, {} as never, {} as never);

      expect(result).toEqual([]);
    });
  });

  describe("Query.deck", () => {
    const deckQuery = resolvers.Query?.deck;

    it("should return deck by slug from service", async () => {
      const mockDeck = {
        _id: "deck-123",
        title: "Test Deck",
        slug: "test-deck",
      };

      (deckService.getDeckBySlug as jest.Mock).mockResolvedValue(mockDeck);

      const result = await deckQuery!(
        {},
        { slug: "test-deck" },
        {} as never,
        {} as never
      );

      expect(deckService.getDeckBySlug).toHaveBeenCalledWith("test-deck");
      expect(result).toEqual(mockDeck);
    });

    it("should return undefined for nonexistent slug", async () => {
      (deckService.getDeckBySlug as jest.Mock).mockResolvedValue(undefined);

      const result = await deckQuery!(
        {},
        { slug: "nonexistent" },
        {} as never,
        {} as never
      );

      expect(result).toBeUndefined();
    });
  });

  describe("JSON scalar", () => {
    it("should have JSON scalar resolver", () => {
      expect(resolvers.JSON).toBeDefined();
    });
  });
});
