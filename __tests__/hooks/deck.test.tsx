import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { DecksQuery, DeckQuery, useDecks, useDeck, useLoadDeck } from "../../hooks/deck";
import { renderApolloHook, waitFor } from "../../jest/apolloTestUtils";

const mockDeck = {
  _id: "deck-1",
  slug: "crypto",
  info: "Test info",
  intro: "Test intro",
  title: "Crypto Edition",
  cardBackground: "#000",
  short: "Test short",
  image: "test.jpg",
  description: "Test description",
  backgroundImage: "bg.jpg",
  properties: null,
  labels: ["label1"],
  openseaCollection: {
    name: "Crypto",
    address: "0x123",
  },
  editions: [{ img: "ed.jpg", name: "Edition 1", url: "/ed1" }],
  product: {
    _id: "prod-1",
    image: "prod.jpg",
    status: "active",
    price: { eur: 100, usd: 110 },
  },
};

describe("hooks/deck", () => {
  describe("useDecks", () => {
    it("returns loading state initially and data after query resolves", async () => {
      const mocks = [
        {
          request: { query: DecksQuery },
          result: { data: { decks: [mockDeck] } },
        },
      ];

      const { result } = renderApolloHook(() => useDecks(), { mocks });

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.decks).toBeUndefined();

      // Wait for query to resolve
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeUndefined();
      expect(result.current.decks).toBeDefined();
      expect(Array.isArray(result.current.decks)).toBe(true);
      expect(result.current.decks?.length).toBeGreaterThan(0);
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: DecksQuery },
          result: { errors: [new GraphQLError("Failed to fetch decks")] },
        },
      ];

      const { result } = renderApolloHook(() => useDecks(), { mocks });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toContain("Failed to fetch decks");
    });
  });

  describe("useDeck", () => {
    it("returns deck data when slug is provided", async () => {
      const mocks = [
        {
          request: { query: DeckQuery, variables: { slug: "crypto" } },
          result: { data: { deck: mockDeck } },
        },
      ];

      const { result } = renderApolloHook(
        () => useDeck({ variables: { slug: "crypto" } }),
        { mocks }
      );

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeUndefined();
      expect(result.current.deck).toBeDefined();
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: DeckQuery, variables: { slug: "invalid" } },
          result: { errors: [new GraphQLError("Deck not found")] },
        },
      ];

      const { result } = renderApolloHook(
        () => useDeck({ variables: { slug: "invalid" } }),
        { mocks }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error?.message).toContain("Deck not found");
    });
  });

  describe("useLoadDeck", () => {
    it("returns loadDeck function and initially undefined deck", async () => {
      const mocks = [
        {
          request: { query: DeckQuery, variables: { slug: "crypto" } },
          result: { data: { deck: mockDeck } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeck(), { mocks });

      // Initially deck is undefined
      expect(result.current.deck).toBeUndefined();
      expect(typeof result.current.loadDeck).toBe("function");

      // Call loadDeck
      act(() => {
        result.current.loadDeck({ variables: { slug: "crypto" } });
      });

      // Wait for resolution
      await waitFor(() => {
        expect(result.current.deck).toBeDefined();
      });
    });
  });
});
