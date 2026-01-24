import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import {
  FavoritesProvider,
  useFavorites,
} from "../../components/Contexts/favorites";

// Mock useLocalStorage hook with proper state management
const mockState = { current: {} as Record<string, string[]> };
jest.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(() => {
    return [
      mockState.current,
      (updater: ((prev: Record<string, string[]>) => Record<string, string[]>) | Record<string, string[]>) => {
        if (typeof updater === "function") {
          mockState.current = updater(mockState.current);
        } else {
          mockState.current = updater;
        }
      },
    ];
  }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe("contexts/favorites", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockState.current = {};
  });

  describe("useFavorites", () => {
    it("returns empty favorites initially", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.favorites).toEqual({});
    });

    it("provides isFavorite function", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(typeof result.current.isFavorite).toBe("function");
    });

    it("provides addItem function", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(typeof result.current.addItem).toBe("function");
    });

    it("provides removeItem function", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(typeof result.current.removeItem).toBe("function");
    });
  });

  describe("isFavorite", () => {
    it("returns false for non-favorited card", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isFavorite("crypto", "card-1")).toBe(false);
    });

    it("returns true for favorited card", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isFavorite("crypto", "card-1")).toBe(true);
    });

    it("returns false for card in different deck", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isFavorite("zero", "card-1")).toBe(false);
    });
  });

  describe("addItem", () => {
    it("adds a card to favorites", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addItem("crypto", "card-1");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1"] });
    });

    it("adds multiple cards to same deck", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addItem("crypto", "card-1");
      });

      act(() => {
        result.current.addItem("crypto", "card-2");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1", "card-2"] });
    });

    it("adds cards to different decks", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addItem("crypto", "card-1");
      });

      act(() => {
        result.current.addItem("zero", "card-2");
      });

      expect(mockState.current).toEqual({
        crypto: ["card-1"],
        zero: ["card-2"],
      });
    });

    it("does not add duplicate cards", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addItem("crypto", "card-1");
      });

      act(() => {
        result.current.addItem("crypto", "card-1");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1"] });
    });

    it("ignores empty deckSlug", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addItem("", "card-1");
      });

      expect(mockState.current).toEqual({});
    });

    it("ignores empty card ID", () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.addItem("crypto", "");
      });

      expect(mockState.current).toEqual({});
    });
  });

  describe("removeItem", () => {
    it("removes a card from favorites", () => {
      mockState.current = { crypto: ["card-1", "card-2"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeItem("crypto", "card-1");
      });

      expect(mockState.current).toEqual({ crypto: ["card-2"] });
    });

    it("removes deck when last card is removed", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeItem("crypto", "card-1");
      });

      expect(mockState.current.crypto).toBeUndefined();
    });

    it("does nothing for non-existent card", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeItem("crypto", "card-999");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1"] });
    });

    it("does nothing for non-existent deck", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeItem("zero", "card-1");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1"] });
    });

    it("ignores empty deckSlug", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeItem("", "card-1");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1"] });
    });

    it("ignores empty card ID", () => {
      mockState.current = { crypto: ["card-1"] };
      const { result } = renderHook(() => useFavorites(), { wrapper });

      act(() => {
        result.current.removeItem("crypto", "");
      });

      expect(mockState.current).toEqual({ crypto: ["card-1"] });
    });
  });
});
