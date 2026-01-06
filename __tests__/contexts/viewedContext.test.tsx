import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { ViewedProvider, useViewed } from "../../contexts/viewedContext";

// Mock useLocalStorage hook
jest.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(() => {
    const state = { current: [] as any[] };
    return [
      state.current,
      (updater: ((prev: any[]) => any[]) | any[]) => {
        if (typeof updater === "function") {
          state.current = updater(state.current);
        } else {
          state.current = updater;
        }
      },
    ];
  }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <ViewedProvider>{children}</ViewedProvider>
);

describe("contexts/viewedContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useViewed", () => {
    it("returns empty viewed array initially", () => {
      const { result } = renderHook(() => useViewed(), { wrapper });

      expect(result.current.viewed).toEqual([]);
    });

    it("provides addViewed function", () => {
      const { result } = renderHook(() => useViewed(), { wrapper });

      expect(typeof result.current.addViewed).toBe("function");
    });

    it("provides exists function", () => {
      const { result } = renderHook(() => useViewed(), { wrapper });

      expect(typeof result.current.exists).toBe("function");
    });
  });

  describe("exists", () => {
    it("returns false for non-existent cards", () => {
      const { result } = renderHook(() => useViewed(), { wrapper });

      const exists = result.current.exists({
        value: "ace",
        suit: "spades",
        deckSlug: "crypto",
      });

      expect(exists).toBe(false);
    });
  });

  describe("addViewed", () => {
    it("is callable", () => {
      const { result } = renderHook(() => useViewed(), { wrapper });

      expect(() => {
        act(() => {
          result.current.addViewed({
            value: "king",
            suit: "hearts",
            deckSlug: "zero",
          });
        });
      }).not.toThrow();
    });
  });
});
