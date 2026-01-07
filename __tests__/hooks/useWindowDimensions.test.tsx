import { renderHook, act } from "@testing-library/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { breakpoints } from "../../source/enums";

describe("hooks/useWindowDimensions", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    // Restore original window width
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
  };

  describe("Initial breakpoint detection", () => {
    it("should return mobile breakpoint for small screens", () => {
      setWindowWidth(500);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.mobile);
    });

    it("should return xsm breakpoint for screens >= 660px", () => {
      setWindowWidth(700);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.xsm);
    });

    it("should return sm breakpoint for screens >= 1000px", () => {
      setWindowWidth(1100);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.sm);
    });

    it("should return md breakpoint for screens >= 1340px", () => {
      setWindowWidth(1400);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.md);
    });

    it("should return laptop breakpoint for screens >= 1440px", () => {
      setWindowWidth(1500);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.laptop);
    });

    it("should return background breakpoint for screens >= 1600px", () => {
      setWindowWidth(1650);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.background);
    });

    it("should return lg breakpoint for screens >= 1755px", () => {
      setWindowWidth(1800);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.lg);
    });

    it("should return xl breakpoint for screens >= 2070px", () => {
      setWindowWidth(2100);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.xl);
    });
  });

  describe("Resize handling", () => {
    it("should update width on window resize", () => {
      setWindowWidth(500);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.mobile);

      act(() => {
        setWindowWidth(1500);
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.width).toBe(breakpoints.laptop);
    });

    it("should update from large to small screen", () => {
      setWindowWidth(2100);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.xl);

      act(() => {
        setWindowWidth(500);
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.width).toBe(breakpoints.mobile);
    });

    it("should stay within same breakpoint for small changes", () => {
      setWindowWidth(1100);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.sm);

      act(() => {
        setWindowWidth(1150);
        window.dispatchEvent(new Event("resize"));
      });

      // Should still be in sm breakpoint
      expect(result.current.width).toBe(breakpoints.sm);
    });
  });

  describe("Cleanup", () => {
    it("should remove resize listener on unmount", () => {
      const addEventListenerSpy = jest.spyOn(window, "addEventListener");
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useWindowDimensions());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Edge cases", () => {
    it("should handle exact breakpoint values", () => {
      // Exactly at xsm breakpoint
      setWindowWidth(660);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.xsm);
    });

    it("should handle zero width", () => {
      setWindowWidth(0);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.mobile);
    });

    it("should handle very large widths", () => {
      setWindowWidth(5000);
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current.width).toBe(breakpoints.xl);
    });
  });
});
