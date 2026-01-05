import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import {
  CardQuery,
  CardsQuery,
  DailyCardQuery,
  HomeCards,
  useCard,
  useCards,
  useDailyCard,
  useHomeCards,
  useLoadCard,
  useLoadCards,
} from "../../hooks/card";
import { renderApolloHook, waitForQuery } from "../../jest/apolloTestUtils";

const mockCard = {
  _id: "card-1",
  img: "card.jpg",
  video: null,
  background: "#fff",
  info: "Test card info",
  value: "A",
  suit: "spades",
  edition: "crypto",
  deck: { slug: "crypto", title: "Crypto Edition", cardBackground: "#000" },
  artist: {
    _id: "artist-1",
    name: "Test Artist",
    slug: "test-artist",
    country: "US",
    userpic: "userpic.jpg",
    info: "Artist info",
    social: null,
  },
};

const mockDailyCard = {
  _id: "daily-1",
  img: "daily.jpg",
  video: null,
  info: "Daily card info",
  background: "#000",
  artist: {
    name: "Daily Artist",
    slug: "daily-artist",
    country: "UK",
    userpic: "daily-userpic.jpg",
    info: "Daily artist info",
    social: null,
  },
  deck: {
    slug: "crypto",
    title: "Crypto Edition",
    cardBackground: "#111",
  },
};

const mockHomeCard = {
  _id: "home-1",
  img: "home.jpg",
  cardBackground: "#222",
};

describe("hooks/card", () => {
  describe("useCards", () => {
    it("returns loading state initially and cards data after query resolves", async () => {
      const mocks = [
        {
          request: { query: CardsQuery, variables: { deck: "deck-1" } },
          result: { data: { cards: [mockCard] } },
        },
      ];

      const { result } = renderApolloHook(
        () => useCards({ variables: { deck: "deck-1" } }),
        { mocks }
      );

      expect(result.current.loading).toBe(true);

      await act(waitForQuery);

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
      expect(result.current.cards).toBeDefined();
      expect(Array.isArray(result.current.cards)).toBe(true);
      expect(result.current.cards?.length).toBeGreaterThan(0);
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: CardsQuery, variables: {} },
          result: { errors: [new GraphQLError("Failed to fetch cards")] },
        },
      ];

      const { result } = renderApolloHook(() => useCards(), { mocks });

      await act(waitForQuery);

      expect(result.current.error?.message).toContain("Failed to fetch cards");
    });
  });

  describe("useCard", () => {
    it("returns single card data", async () => {
      const mocks = [
        {
          request: { query: CardQuery, variables: { slug: "test-card" } },
          result: { data: { card: mockCard } },
        },
      ];

      const { result } = renderApolloHook(
        () => useCard({ variables: { slug: "test-card" } }),
        { mocks }
      );

      await act(waitForQuery);

      expect(result.current.loading).toBe(false);
      expect(result.current.card).toBeDefined();
    });
  });

  describe("useDailyCard", () => {
    it("returns daily card data", async () => {
      const mocks = [
        {
          request: { query: DailyCardQuery },
          result: { data: { dailyCard: mockDailyCard } },
        },
      ];

      const { result } = renderApolloHook(() => useDailyCard(), { mocks });

      expect(result.current.loading).toBe(true);

      await act(waitForQuery);

      // DailyCardQuery doesn't use fragments, so exact match works
      expect(result.current.dailyCard).toEqual(mockDailyCard);
      expect(result.current.loading).toBe(false);
    });
  });

  describe("useHomeCards", () => {
    it("returns home cards as cards property", async () => {
      const mocks = [
        {
          request: { query: HomeCards },
          result: { data: { homeCards: [mockHomeCard] } },
        },
      ];

      const { result } = renderApolloHook(() => useHomeCards(), { mocks });

      await act(waitForQuery);

      // HomeCards query doesn't use fragments, so exact match works
      expect(result.current.cards).toEqual([mockHomeCard]);
    });
  });

  describe("useLoadCard", () => {
    it("returns loadCard function for lazy loading", async () => {
      const mocks = [
        {
          request: { query: CardQuery, variables: { slug: "lazy-card" } },
          result: { data: { card: mockCard } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadCard(), { mocks });

      expect(result.current.card).toBeUndefined();
      expect(typeof result.current.loadCard).toBe("function");

      await act(async () => {
        result.current.loadCard({ variables: { slug: "lazy-card" } });
        await waitForQuery();
      });

      expect(result.current.card).toBeDefined();
    });
  });

  describe("useLoadCards", () => {
    it("returns loadCards function for lazy loading", async () => {
      const mocks = [
        {
          request: { query: CardsQuery, variables: { deck: "deck-1" } },
          result: { data: { cards: [mockCard] } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadCards(), { mocks });

      expect(result.current.cards).toBeUndefined();

      await act(async () => {
        result.current.loadCards({ variables: { deck: "deck-1" } });
        await waitForQuery();
      });

      expect(result.current.cards).toBeDefined();
      expect(Array.isArray(result.current.cards)).toBe(true);
    });
  });
});
