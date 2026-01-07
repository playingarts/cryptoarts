import { Sections, CardSuits, CardValues, breakpoints } from "../../source/enums";

describe("source/enums", () => {
  describe("Sections", () => {
    it("should have all expected section values", () => {
      expect(Sections.cards).toBe("cards");
      expect(Sections.deck).toBe("deck");
      expect(Sections.gallery).toBe("gallery");
      expect(Sections.nft).toBe("nft");
      expect(Sections.roadmap).toBe("roadmap");
      expect(Sections.game).toBe("game");
      expect(Sections.contest).toBe("contest");
    });

    it("should have exactly 7 sections", () => {
      const sectionKeys = Object.keys(Sections);
      expect(sectionKeys).toHaveLength(7);
    });
  });

  describe("CardSuits", () => {
    it("should have all expected suit values", () => {
      expect(CardSuits.s).toBe("spades");
      expect(CardSuits.c).toBe("clubs");
      expect(CardSuits.h).toBe("hearts");
      expect(CardSuits.d).toBe("diamonds");
      expect(CardSuits.r).toBe("red");
      expect(CardSuits.b).toBe("black");
    });

    it("should have exactly 6 suits", () => {
      const suitKeys = Object.keys(CardSuits);
      expect(suitKeys).toHaveLength(6);
    });
  });

  describe("CardValues", () => {
    it("should have all expected card values", () => {
      expect(CardValues.j).toBe("jack");
      expect(CardValues.q).toBe("queen");
      expect(CardValues.k).toBe("king");
      expect(CardValues.a).toBe("ace");
    });

    it("should have exactly 4 values", () => {
      const valueKeys = Object.keys(CardValues);
      expect(valueKeys).toHaveLength(4);
    });
  });

  describe("breakpoints", () => {
    it("should have correct breakpoint values", () => {
      expect(breakpoints.mobile).toBe(0);
      expect(breakpoints.xsm).toBe(660);
      expect(breakpoints.sm).toBe(1000);
      expect(breakpoints.md).toBe(1340);
      expect(breakpoints.laptop).toBe(1440);
      expect(breakpoints.background).toBe(1600);
      expect(breakpoints.lg).toBe(1755);
      expect(breakpoints.xl).toBe(2070);
    });

    it("should have breakpoints in ascending order", () => {
      expect(breakpoints.mobile).toBeLessThan(breakpoints.xsm);
      expect(breakpoints.xsm).toBeLessThan(breakpoints.sm);
      expect(breakpoints.sm).toBeLessThan(breakpoints.md);
      expect(breakpoints.md).toBeLessThan(breakpoints.laptop);
      expect(breakpoints.laptop).toBeLessThan(breakpoints.background);
      expect(breakpoints.background).toBeLessThan(breakpoints.lg);
      expect(breakpoints.lg).toBeLessThan(breakpoints.xl);
    });

    it("should have exactly 8 breakpoints", () => {
      const breakpointKeys = Object.keys(breakpoints).filter(
        (key) => isNaN(Number(key))
      );
      expect(breakpointKeys).toHaveLength(8);
    });
  });
});
