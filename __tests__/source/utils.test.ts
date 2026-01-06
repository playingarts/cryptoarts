import { isValidElement, mapSeries } from "../../source/utils";
import { createElement } from "react";

describe("source/utils", () => {
  describe("isValidElement", () => {
    it("returns true for valid React elements", () => {
      const element = createElement("div", null, "Hello");
      expect(isValidElement(element)).toBe(true);
    });

    it("returns false for non-React elements", () => {
      expect(isValidElement(null)).toBe(false);
      expect(isValidElement(undefined)).toBe(false);
      expect(isValidElement("string")).toBe(false);
      expect(isValidElement(123)).toBe(false);
      expect(isValidElement({ type: "div" })).toBe(false);
      expect(isValidElement([])).toBe(false);
    });

    it("returns false for plain objects", () => {
      expect(isValidElement({})).toBe(false);
      expect(isValidElement({ children: "test" })).toBe(false);
    });
  });

  describe("mapSeries", () => {
    it("executes async actions in series", async () => {
      const results: number[] = [];
      const items = [1, 2, 3];

      await mapSeries(items, async (x) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        results.push(x);
      });

      expect(results).toEqual([1, 2, 3]);
    });

    it("handles empty arrays", async () => {
      const results: number[] = [];
      await mapSeries([], async (x) => {
        results.push(x);
      });
      expect(results).toEqual([]);
    });

    it("handles synchronous actions", async () => {
      const results: string[] = [];
      await mapSeries(["a", "b", "c"], async (x) => {
        results.push(x.toUpperCase());
      });
      expect(results).toEqual(["A", "B", "C"]);
    });

    it("preserves order even with variable execution times", async () => {
      const results: number[] = [];
      const items = [3, 1, 2];

      await mapSeries(items, async (x) => {
        await new Promise((resolve) => setTimeout(resolve, x * 5));
        results.push(x);
      });

      expect(results).toEqual([3, 1, 2]);
    });
  });
});
