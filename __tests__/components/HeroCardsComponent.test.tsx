import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
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

// Mock the contexts
jest.mock("../../components/Pages/Deck/DeckPaletteContext", () => ({
  usePalette: () => ({ palette: "light" }),
}));

// Mock the Card component
jest.mock("../../components/Card", () => ({
  __esModule: true,
  default: ({ card }: { card: { _id: string } }) => (
    <div data-testid={`card-${card._id}`}>Card {card._id}</div>
  ),
}));

// Mock Apollo useLazyQuery
const mockQueryFn = jest.fn();
jest.mock("@apollo/client/react", () => ({
  useLazyQuery: () => [mockQueryFn],
}));

// Import after mocks
import HeroCards from "../../components/Pages/Deck/Hero/HeroCards";
import { HeroCardsProvider } from "../../components/Pages/Deck/HeroCardsContext";
import { HeroCardProps } from "../../pages/[deckId]";

// Helper to create mock router
const createMockRouter = (deckId: string): Partial<NextRouter> => ({
  query: { deckId },
  pathname: "/[deckId]",
  asPath: `/${deckId}`,
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
});

// Helper to create mock hero cards for a deck
const createMockHeroCards = (deckSlug: string, idPrefix: string): HeroCardProps[] => [
  {
    _id: `${idPrefix}-1`,
    img: `https://example.com/${idPrefix}-1.jpg`,
    video: undefined,
    artist: { name: `Artist ${idPrefix}-1`, slug: `artist-${idPrefix}-1` },
    deckSlug,
  },
  {
    _id: `${idPrefix}-2`,
    img: `https://example.com/${idPrefix}-2.jpg`,
    video: undefined,
    artist: { name: `Artist ${idPrefix}-2`, slug: `artist-${idPrefix}-2` },
    deckSlug,
  },
];

// Wrapper component with all providers
const TestWrapper: FC<{ children: ReactNode; router: Partial<NextRouter> }> = ({
  children,
  router,
}) => (
  <RouterContext.Provider value={router as NextRouter}>
    <HeroCardsProvider>{children}</HeroCardsProvider>
  </RouterContext.Provider>
);

describe("HeroCards Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("SSR cards", () => {
    it("shows SSR cards immediately when they match current deck", async () => {
      const ssrCards = createMockHeroCards("deck-a", "ssr");
      const router = createMockRouter("deck-a");

      render(
        <TestWrapper router={router}>
          <HeroCards heroCards={ssrCards} />
        </TestWrapper>
      );

      // SSR cards should be shown immediately without loading
      expect(screen.getByTestId("card-ssr-1")).toBeInTheDocument();
      expect(screen.getByTestId("card-ssr-2")).toBeInTheDocument();

      // No fetch should have been triggered
      expect(mockQueryFn).not.toHaveBeenCalled();
    });

    it("shows skeleton when SSR cards do not match current deck", async () => {
      const ssrCards = createMockHeroCards("deck-a", "ssr");
      const router = createMockRouter("deck-b"); // Different deck!

      // Setup mock for fetch
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "b-1", img: "b1.jpg", video: null, artist: { name: "B1", slug: "b1" } },
            { _id: "b-2", img: "b2.jpg", video: null, artist: { name: "B2", slug: "b2" } },
          ],
        },
      });

      render(
        <TestWrapper router={router}>
          <HeroCards heroCards={ssrCards} />
        </TestWrapper>
      );

      // Should NOT show SSR cards since they're for a different deck
      expect(screen.queryByTestId("card-ssr-1")).not.toBeInTheDocument();

      // Should trigger fetch for correct deck
      expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-b" } });
    });
  });

  describe("deck navigation", () => {
    it("fetches new cards when deckId changes", async () => {
      const ssrCards = createMockHeroCards("deck-a", "ssr");
      const router = createMockRouter("deck-a");

      // Initial render with deck-a
      const { rerender } = render(
        <TestWrapper router={router}>
          <HeroCards heroCards={ssrCards} />
        </TestWrapper>
      );

      // SSR cards should be shown
      expect(screen.getByTestId("card-ssr-1")).toBeInTheDocument();

      // Setup mock for deck-b fetch
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "b-1", img: "b1.jpg", video: null, artist: { name: "B1", slug: "b1" } },
            { _id: "b-2", img: "b2.jpg", video: null, artist: { name: "B2", slug: "b2" } },
          ],
        },
      });

      // Simulate navigation to deck-b (router change)
      const newRouter = createMockRouter("deck-b");
      rerender(
        <TestWrapper router={newRouter}>
          <HeroCards heroCards={ssrCards} />
        </TestWrapper>
      );

      // Should fetch cards for new deck
      await waitFor(() => {
        expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-b" } });
      });

      // Advance timers to complete image loading
      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      // New cards should be shown
      await waitFor(() => {
        expect(screen.getByTestId("card-b-1")).toBeInTheDocument();
        expect(screen.getByTestId("card-b-2")).toBeInTheDocument();
      });

      // Old cards should not be shown
      expect(screen.queryByTestId("card-ssr-1")).not.toBeInTheDocument();
    });

    it("cancels in-flight request when deck changes quickly", async () => {
      const router = createMockRouter("deck-a");

      // First fetch (slow)
      let resolveFirst: (value: unknown) => void;
      const firstPromise = new Promise((resolve) => {
        resolveFirst = resolve;
      });

      // Second fetch (fast)
      mockQueryFn
        .mockReturnValueOnce(firstPromise)
        .mockResolvedValueOnce({
          data: {
            heroCards: [
              { _id: "b-1", img: "b1.jpg", video: null, artist: { name: "B1", slug: "b1" } },
              { _id: "b-2", img: "b2.jpg", video: null, artist: { name: "B2", slug: "b2" } },
            ],
          },
        });

      const { rerender } = render(
        <TestWrapper router={router}>
          <HeroCards />
        </TestWrapper>
      );

      // First fetch should start
      await waitFor(() => {
        expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-a" } });
      });

      // Navigate to deck-b before first fetch completes
      const newRouter = createMockRouter("deck-b");
      rerender(
        <TestWrapper router={newRouter}>
          <HeroCards />
        </TestWrapper>
      );

      // Second fetch should start
      await waitFor(() => {
        expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-b" } });
      });

      // Advance timers to complete image loading
      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      // Now resolve the slow first fetch
      resolveFirst!({
        data: {
          heroCards: [
            { _id: "a-1", img: "a1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
            { _id: "a-2", img: "a2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
          ],
        },
      });

      // Advance timers again
      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      // Should show deck-b cards (the current deck), not deck-a
      await waitFor(() => {
        expect(screen.getByTestId("card-b-1")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("card-a-1")).not.toBeInTheDocument();
    });
  });

  describe("no wrong deck flash", () => {
    it("never shows cards from wrong deck during navigation", async () => {
      const ssrCards = createMockHeroCards("deck-a", "ssr");
      const router = createMockRouter("deck-a");

      const { rerender } = render(
        <TestWrapper router={router}>
          <HeroCards heroCards={ssrCards} />
        </TestWrapper>
      );

      // deck-a cards should be shown
      expect(screen.getByTestId("card-ssr-1")).toBeInTheDocument();

      // Setup mock for deck-b fetch
      mockQueryFn.mockResolvedValueOnce({
        data: {
          heroCards: [
            { _id: "b-1", img: "b1.jpg", video: null, artist: { name: "B1", slug: "b1" } },
            { _id: "b-2", img: "b2.jpg", video: null, artist: { name: "B2", slug: "b2" } },
          ],
        },
      });

      // Navigate to deck-b
      const newRouter = createMockRouter("deck-b");
      rerender(
        <TestWrapper router={newRouter}>
          <HeroCards heroCards={ssrCards} />
        </TestWrapper>
      );

      // At this point, either:
      // 1. Skeleton is shown (loading new cards)
      // 2. Deck-b cards are shown (if fetch completed)
      // But NEVER deck-a cards since we're on deck-b

      // Get current state - deck-a cards should not be visible
      expect(screen.queryByTestId("card-ssr-1")).not.toBeInTheDocument();

      // Advance timers to complete
      await act(async () => {
        jest.advanceTimersByTime(600);
      });

      // After loading, deck-b cards should be shown
      await waitFor(() => {
        expect(screen.getByTestId("card-b-1")).toBeInTheDocument();
      });
    });
  });
});

describe("HeroCards edge cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("handles empty heroCards prop gracefully", async () => {
    const router = createMockRouter("deck-a");

    mockQueryFn.mockResolvedValueOnce({
      data: {
        heroCards: [
          { _id: "a-1", img: "a1.jpg", video: null, artist: { name: "A1", slug: "a1" } },
          { _id: "a-2", img: "a2.jpg", video: null, artist: { name: "A2", slug: "a2" } },
        ],
      },
    });

    render(
      <TestWrapper router={router}>
        <HeroCards heroCards={[]} />
      </TestWrapper>
    );

    // Should fetch since empty SSR cards
    expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-a" } });

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    // Should show fetched cards
    await waitFor(() => {
      expect(screen.getByTestId("card-a-1")).toBeInTheDocument();
    });
  });

  it("handles fetch failure gracefully", async () => {
    const router = createMockRouter("deck-a");

    mockQueryFn.mockRejectedValueOnce(new Error("Network error"));

    render(
      <TestWrapper router={router}>
        <HeroCards />
      </TestWrapper>
    );

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    // Should not crash - skeleton should be shown
    // (Cards not rendered since fetch failed)
    expect(screen.queryByTestId(/^card-/)).not.toBeInTheDocument();
  });

  it("handles missing deckId gracefully", () => {
    const router = createMockRouter("");
    (router as { query: Record<string, unknown> }).query = {};

    render(
      <TestWrapper router={router}>
        <HeroCards />
      </TestWrapper>
    );

    // Should not crash, should not fetch
    expect(mockQueryFn).not.toHaveBeenCalled();
  });

  it("shows retry button when fetch returns undefined (no infinite skeleton)", async () => {
    const router = createMockRouter("deck-a");

    // Simulate fetch returning undefined (empty result or AbortError)
    mockQueryFn.mockResolvedValueOnce({
      data: { heroCards: [] },
    });

    render(
      <TestWrapper router={router}>
        <HeroCards />
      </TestWrapper>
    );

    // Should trigger fetch
    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledWith({ variables: { slug: "deck-a" } });
    });

    // Advance timers past fetch timeout
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    // Should show retry button (fallback UI), not infinite skeleton
    await waitFor(() => {
      const retryButton = screen.queryByRole("button", { name: /retry/i });
      expect(retryButton).toBeInTheDocument();
    });
  });

  it("shows retry button instead of infinite skeleton after timeout", async () => {
    const router = createMockRouter("deck-a");

    // Create a promise that never resolves to simulate slow/stuck fetch
    let resolveSlowFetch: (value: unknown) => void;
    const slowFetchPromise = new Promise((resolve) => {
      resolveSlowFetch = resolve;
    });

    mockQueryFn.mockReturnValue(slowFetchPromise);

    render(
      <TestWrapper router={router}>
        <HeroCards />
      </TestWrapper>
    );

    // Initially should show skeleton
    expect(screen.queryByRole("button", { name: /retry/i })).not.toBeInTheDocument();

    // Advance timers past the FETCH_TIMEOUT_MS (15000ms)
    await act(async () => {
      jest.advanceTimersByTime(16000);
    });

    // Should show retry button after timeout, not infinite skeleton
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    // Cleanup: resolve the promise to avoid warnings
    resolveSlowFetch!({ data: { heroCards: [] } });
  });

  it("does NOT show retry for AbortError during navigation (expected behavior)", async () => {
    const router = createMockRouter("deck-a");

    // Simulate AbortError - this happens during rapid navigation and is expected
    const abortError = new Error("aborted");
    abortError.name = "AbortError";
    mockQueryFn.mockRejectedValueOnce(abortError);

    render(
      <TestWrapper router={router}>
        <HeroCards />
      </TestWrapper>
    );

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Should NOT show retry button for AbortError - skeleton should remain
    // AbortErrors are expected during navigation and shouldn't trigger Retry UI
    expect(screen.queryByRole("button", { name: /retry/i })).not.toBeInTheDocument();
  });

  it("does NOT show retry for ECONNRESET during navigation", async () => {
    const router = createMockRouter("deck-a");

    // Simulate ECONNRESET - happens when connection is reset during navigation
    const econnresetError = new Error("Connection reset");
    (econnresetError as Error & { code: string }).code = "ECONNRESET";
    mockQueryFn.mockRejectedValueOnce(econnresetError);

    render(
      <TestWrapper router={router}>
        <HeroCards />
      </TestWrapper>
    );

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    // Should NOT show retry button for ECONNRESET
    expect(screen.queryByRole("button", { name: /retry/i })).not.toBeInTheDocument();
  });
});
