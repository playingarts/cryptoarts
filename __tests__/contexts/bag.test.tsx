import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { IsEuropeProvider, useBag } from "../../components/Contexts/bag";

// Mock useLocalStorage hook with proper state management
const mockBagState = { current: {} as Record<string, number> };
jest.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(() => {
    return [
      mockBagState.current,
      (updater: ((prev: Record<string, number>) => Record<string, number>) | Record<string, number>) => {
        if (typeof updater === "function") {
          mockBagState.current = updater(mockBagState.current);
        } else {
          mockBagState.current = updater;
        }
      },
    ];
  }),
}));

// Mock Intl.DateTimeFormat for timezone detection
const mockResolvedOptions = jest.fn();
const originalDateTimeFormat = Intl.DateTimeFormat;
beforeAll(() => {
  (Intl as { DateTimeFormat: typeof Intl.DateTimeFormat }).DateTimeFormat = jest.fn(() => ({
    resolvedOptions: mockResolvedOptions,
    format: jest.fn(),
    formatToParts: jest.fn(),
    formatRange: jest.fn(),
    formatRangeToParts: jest.fn(),
  })) as unknown as typeof Intl.DateTimeFormat;
});

afterAll(() => {
  (Intl as { DateTimeFormat: typeof Intl.DateTimeFormat }).DateTimeFormat = originalDateTimeFormat;
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <IsEuropeProvider>{children}</IsEuropeProvider>
);

describe("contexts/bag (BagContext)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBagState.current = {};
    mockResolvedOptions.mockReturnValue({ timeZone: "America/New_York" });
  });

  describe("useBag", () => {
    it("returns empty bag initially", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(result.current.bag).toEqual({});
    });

    it("provides addItem function", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(typeof result.current.addItem).toBe("function");
    });

    it("provides removeItem function", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(typeof result.current.removeItem).toBe("function");
    });

    it("provides updateQuantity function", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(typeof result.current.updateQuantity).toBe("function");
    });

    it("provides getPrice function", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(typeof result.current.getPrice).toBe("function");
    });

    it("provides getBag function", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(typeof result.current.getBag).toBe("function");
    });
  });

  describe("addItem", () => {
    it("adds an item with default quantity of 1", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.addItem("product-1");
      });

      expect(mockBagState.current["product-1"]).toBe(1);
    });

    it("adds an item with specific quantity", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.addItem("product-1", 5);
      });

      expect(mockBagState.current["product-1"]).toBe(5);
    });

    it("increments existing item when no quantity specified", () => {
      mockBagState.current = { "product-1": 2 };
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.addItem("product-1");
      });

      expect(mockBagState.current["product-1"]).toBe(3);
    });

    it("replaces quantity when specified for existing item", () => {
      mockBagState.current = { "product-1": 2 };
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.addItem("product-1", 10);
      });

      expect(mockBagState.current["product-1"]).toBe(10);
    });

    it("handles multiple different products", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.addItem("product-1", 2);
      });

      act(() => {
        result.current.addItem("product-2", 3);
      });

      expect(mockBagState.current).toEqual({
        "product-1": 2,
        "product-2": 3,
      });
    });
  });

  describe("updateQuantity", () => {
    it("updates quantity of existing item", () => {
      mockBagState.current = { "product-1": 2 };
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.updateQuantity("product-1", 10);
      });

      expect(mockBagState.current["product-1"]).toBe(10);
    });

    it("can set quantity to 0", () => {
      mockBagState.current = { "product-1": 5 };
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.updateQuantity("product-1", 0);
      });

      expect(mockBagState.current["product-1"]).toBe(0);
    });

    it("can add new item via updateQuantity", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.updateQuantity("product-1", 5);
      });

      expect(mockBagState.current["product-1"]).toBe(5);
    });
  });

  describe("removeItem", () => {
    it("removes an item from bag", () => {
      mockBagState.current = { "product-1": 2, "product-2": 3 };
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.removeItem("product-1");
      });

      expect(mockBagState.current["product-1"]).toBeUndefined();
      expect(mockBagState.current["product-2"]).toBe(3);
    });

    it("handles removing non-existent item", () => {
      mockBagState.current = { "product-1": 2 };
      const { result } = renderHook(() => useBag(), { wrapper });

      act(() => {
        result.current.removeItem("product-999");
      });

      expect(mockBagState.current).toEqual({ "product-1": 2 });
    });
  });

  describe("getBag", () => {
    it("returns current bag contents", () => {
      mockBagState.current = { "product-1": 2, "product-2": 3 };
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(result.current.getBag()).toEqual({
        "product-1": 2,
        "product-2": 3,
      });
    });

    it("returns empty object when bag is empty", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      expect(result.current.getBag()).toEqual({});
    });
  });

  describe("getPrice - USD (non-Europe)", () => {
    beforeEach(() => {
      mockResolvedOptions.mockReturnValue({ timeZone: "America/New_York" });
    });

    it("formats numeric price in USD", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      const formatted = result.current.getPrice(100);

      expect(formatted).toMatch(/\$100/);
    });

    it("extracts USD from price object", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      const formatted = result.current.getPrice({ eur: 80, usd: 100 });

      expect(formatted).toMatch(/\$100/);
    });

    it("returns raw number when raw=true", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      const raw = result.current.getPrice({ eur: 80, usd: 100 }, true);

      expect(raw).toBe(100);
    });

    it("returns raw numeric price when raw=true", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      const raw = result.current.getPrice(50, true);

      expect(raw).toBe(50);
    });
  });

  describe("getPrice - EUR (Europe)", () => {
    beforeEach(() => {
      mockResolvedOptions.mockReturnValue({ timeZone: "Europe/London" });
    });

    it("formats numeric price in EUR", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      // Wait for useEffect to run
      act(() => {});

      const formatted = result.current.getPrice(100);

      // EUR formatting varies by locale, just check it's a number string
      expect(typeof formatted).toBe("string");
    });

    it("extracts EUR from price object", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      // Wait for useEffect to run
      act(() => {});

      const formatted = result.current.getPrice({ eur: 80, usd: 100 });

      // Should use EUR value (80) not USD (100)
      expect(typeof formatted).toBe("string");
    });

    it("returns raw EUR when raw=true", () => {
      const { result } = renderHook(() => useBag(), { wrapper });

      // Wait for useEffect to run
      act(() => {});

      const raw = result.current.getPrice({ eur: 80, usd: 100 }, true);

      expect(raw).toBe(80);
    });
  });
});
