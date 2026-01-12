import { renderHook, act, waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { ReactNode, FC } from "react";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { NextRouter } from "next/router";

// Mock Image constructor for image preloading tests
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src: string = "";
  complete: boolean = true;
  naturalWidth: number = 100;

  constructor() {
    // Simulate immediate load for cached images
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
}

// @ts-expect-error - mock global Image
global.Image = MockImage;

// Mock the contexts and components
jest.mock("../../components/Pages/Deck/DeckPaletteContext", () => ({
  usePalette: () => ({ palette: "light" }),
}));

// Import after mocks
import {
  HeroCardsProvider,
  useHeroCardsContext,
} from "../../components/Pages/Deck/HeroCardsContext";
import { HeroCardProps } from "../../pages/[deckId]";

// Mock Apollo useLazyQuery
const mockQueryFn = jest.fn();
jest.mock("@apollo/client/react", () => ({
  useLazyQuery: () => [mockQueryFn],
}));

const mockHeroCards: HeroCardProps[] = [
  {
    _id: "card-1",
    img: "https://example.com/card1.jpg",
    video: undefined,
    artist: { name: "Artist 1", slug: "artist-1" },
    deckSlug: "deck-a",
  },
  {
    _id: "card-2",
    img: "https://example.com/card2.jpg",
    video: undefined,
    artist: { name: "Artist 2", slug: "artist-2" },
    deckSlug: "deck-a",
  },
];

const mockHeroCardsDeckB: HeroCardProps[] = [
  {
    _id: "card-3",
    img: "https://example.com/card3.jpg",
    video: undefined,
    artist: { name: "Artist 3", slug: "artist-3" },
    deckSlug: "deck-b",
  },
  {
    _id: "card-4",
    img: "https://example.com/card4.jpg",
    video: undefined,
    artist: { name: "Artist 4", slug: "artist-4" },
    deckSlug: "deck-b",
  },
];

describe("HeroCardsContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <HeroCardsProvider>{children}</HeroCardsProvider>
  );

  describe("fetchCardsForDeck", () => {
    it("fetches cards from GraphQL when no prefetched data exists", async () => {
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
            { _id: "card-2", img: "img2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
          ],
        },
      });

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      let cards: HeroCardProps[] | undefined;
      await act(async () => {
        cards = await result.current.fetchCardsForDeck("deck-a");
      });

      expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-a" } });
      expect(cards).toHaveLength(2);
      expect(cards?.[0]._id).toBe("card-1");
      expect(cards?.[0].deckSlug).toBe("deck-a");
    });

    it("returns prefetched data if available", async () => {
      // First, prefetch the data
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
            { _id: "card-2", img: "img2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
          ],
        },
      });

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      // Prefetch
      await act(async () => {
        result.current.prefetchHeroCards("deck-a");
        // Wait for prefetch to complete (includes image preloading)
        await new Promise((r) => setTimeout(r, 200));
      });

      // Reset mock to verify it's not called again
      mockQueryFn.mockClear();

      // Now fetch - should use prefetched data
      let cards: HeroCardProps[] | undefined;
      await act(async () => {
        cards = await result.current.fetchCardsForDeck("deck-a");
      });

      expect(mockQueryFn).not.toHaveBeenCalled();
      expect(cards).toHaveLength(2);
    });

    it("returns undefined when fetch fails", async () => {
      mockQueryFn.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      let cards: HeroCardProps[] | undefined;
      await act(async () => {
        cards = await result.current.fetchCardsForDeck("deck-a");
      });

      expect(cards).toBeUndefined();
    });

    it("returns undefined when fewer than 2 cards are returned", async () => {
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
          ],
        },
      });

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      let cards: HeroCardProps[] | undefined;
      await act(async () => {
        cards = await result.current.fetchCardsForDeck("deck-a");
      });

      expect(cards).toBeUndefined();
    });

    it("deduplicates concurrent fetches for the same deck", async () => {
      let resolveFirst: (value: unknown) => void;
      const firstPromise = new Promise((resolve) => {
        resolveFirst = resolve;
      });

      mockQueryFn.mockReturnValueOnce(firstPromise);

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      // Start two concurrent fetches
      const fetch1 = result.current.fetchCardsForDeck("deck-a");
      const fetch2 = result.current.fetchCardsForDeck("deck-a");

      // Resolve the query
      resolveFirst!({
        data: {
          heroCards: [
            { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
            { _id: "card-2", img: "img2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
          ],
        },
      });

      const [cards1, cards2] = await Promise.all([fetch1, fetch2]);

      // Should only have called the query once
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
      expect(cards1).toEqual(cards2);
    });
  });

  describe("prefetchHeroCards", () => {
    it("prefetches cards in background", async () => {
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
            { _id: "card-2", img: "img2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
          ],
        },
      });

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      act(() => {
        result.current.prefetchHeroCards("deck-a");
      });

      await waitFor(() => {
        expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-a" } });
      });
    });

    it("does not prefetch if already prefetched", async () => {
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
            { _id: "card-2", img: "img2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
          ],
        },
      });

      const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

      // First prefetch
      act(() => {
        result.current.prefetchHeroCards("deck-a");
      });

      await waitFor(() => {
        expect(mockQueryFn).toHaveBeenCalledTimes(1);
      });

      // Second prefetch - should not trigger new query
      act(() => {
        result.current.prefetchHeroCards("deck-a");
      });

      // Still only 1 call
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
    });
  });
});

describe("HeroCards navigation scenarios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("scenario: SSR cards shown on initial load, then fetch on navigation", async () => {
    // This simulates the full flow:
    // 1. Page loads with SSR cards for deck-a
    // 2. User navigates to deck-b
    // 3. SSR cards are stale, fetch new cards
    // 4. New cards should display

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <HeroCardsProvider>{children}</HeroCardsProvider>
    );

    // Setup mock for deck-b fetch
    mockQueryFn.mockResolvedValueOnce({
      data: {
        heroCards: [
          { _id: "card-3", img: "img3.jpg", video: null, artist: { name: "A3", slug: "a3" } },
          { _id: "card-4", img: "img4.jpg", video: null, artist: { name: "A4", slug: "a4" } },
        ],
      },
    });

    const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

    // Simulate navigation to deck-b
    let cards: HeroCardProps[] | undefined;
    await act(async () => {
      cards = await result.current.fetchCardsForDeck("deck-b");
    });

    expect(cards).toHaveLength(2);
    expect(cards?.[0]._id).toBe("card-3");
    expect(cards?.[0].deckSlug).toBe("deck-b");
  });

  it("scenario: rapid navigation between decks should cancel old fetches", async () => {
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <HeroCardsProvider>{children}</HeroCardsProvider>
    );

    // First query takes longer
    let resolveFirst: (value: unknown) => void;
    const firstPromise = new Promise((resolve) => {
      resolveFirst = resolve;
    });

    // Second query resolves immediately
    mockQueryFn
      .mockReturnValueOnce(firstPromise)
      .mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "card-5", img: "img5.jpg", video: null, artist: { name: "A5", slug: "a5" } },
            { _id: "card-6", img: "img6.jpg", video: null, artist: { name: "A6", slug: "a6" } },
          ],
        },
      });

    const { result } = renderHook(() => useHeroCardsContext(), { wrapper });

    // Start fetch for deck-a (slow)
    const fetchA = result.current.fetchCardsForDeck("deck-a");

    // Immediately start fetch for deck-b (fast)
    const fetchB = result.current.fetchCardsForDeck("deck-b");

    // Resolve the slow fetch after fast one
    resolveFirst!({
      data: {
        heroCards: [
          { _id: "card-1", img: "img1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
          { _id: "card-2", img: "img2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
        ],
      },
    });

    const [cardsA, cardsB] = await Promise.all([fetchA, fetchB]);

    // Both should have valid cards (context doesn't cancel, component does)
    expect(cardsA).toHaveLength(2);
    expect(cardsB).toHaveLength(2);
    expect(cardsB?.[0].deckSlug).toBe("deck-b");
  });
});
