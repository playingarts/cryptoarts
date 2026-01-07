/**
 * @jest-environment node
 */
// @ts-nocheck - Complex GraphQL resolver types require extensive type assertions

// Mock fetch before importing the resolver
jest.mock("../../../source/fetch", () => jest.fn());

// Mock the models
jest.mock("../../../source/models", () => ({
  Product: {
    findOne: jest.fn(),
    find: jest.fn(),
  },
}));

import { resolvers, getProduct } from "../../../source/graphql/schemas/product";
import { Product } from "../../../source/models";
import mockFetch from "../../../source/fetch";

const mockedFetch = mockFetch as jest.MockedFunction<typeof mockFetch>;

describe("Product Resolver", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_EUR_TO_USD_RATE;
  });

  describe("getProduct", () => {
    it("should return product when found by deck", async () => {
      const mockProduct = {
        _id: "product-123",
        title: "Test Product",
        price: { eur: 30, usd: 33 },
      };

      (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

      const result = await getProduct({ deck: "deck-123" });

      expect(Product.findOne).toHaveBeenCalledWith({ deck: "deck-123" });
      expect(result).toEqual(mockProduct);
    });

    it("should return product when found by _id", async () => {
      const mockProduct = {
        _id: "product-123",
        title: "Test Product",
      };

      (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

      const result = await getProduct({ _id: "product-123" });

      expect(Product.findOne).toHaveBeenCalledWith({ _id: "product-123" });
      expect(result).toEqual(mockProduct);
    });

    it("should return undefined when product not found", async () => {
      (Product.findOne as jest.Mock).mockResolvedValue(null);

      const result = await getProduct({ deck: "nonexistent" });

      expect(result).toBeUndefined();
    });
  });

  describe("Query.products", () => {
    // Type assertion needed because GraphQL codegen creates union types for resolvers
    const mockProductsQuery = resolvers.Query?.products as (
      parent: unknown,
      args: { ids?: string[] },
      context: unknown,
      info: unknown
    ) => Promise<GQL.Product[]>;

    it("should return all products when no ids provided", async () => {
      const mockProducts = [
        { _id: "1", title: "Product 1" },
        { _id: "2", title: "Product 2" },
      ];

      // Chain: find().populate([...]).populate("decks")
      const mockSecondPopulate = jest.fn().mockResolvedValue(mockProducts);
      const mockFirstPopulate = jest.fn().mockReturnValue({
        populate: mockSecondPopulate,
      });
      (Product.find as jest.Mock).mockReturnValue({
        populate: mockFirstPopulate,
      });

      const result = await mockProductsQuery!(
        {},
        { ids: undefined },
        {} as never,
        {} as never
      );

      expect(Product.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockProducts);
    });

    it("should return filtered products when ids provided", async () => {
      const mockProducts = [{ _id: "1", title: "Product 1" }];

      // Chain: find().populate([...]).populate("decks")
      const mockSecondPopulate = jest.fn().mockResolvedValue(mockProducts);
      const mockFirstPopulate = jest.fn().mockReturnValue({
        populate: mockSecondPopulate,
      });
      (Product.find as jest.Mock).mockReturnValue({
        populate: mockFirstPopulate,
      });

      const result = await mockProductsQuery!(
        {},
        { ids: ["1", "3"] },
        {} as never,
        {} as never
      );

      expect(Product.find).toHaveBeenCalledWith({ _id: { $in: ["1", "3"] } });
      expect(result).toEqual(mockProducts);
    });
  });

  describe("Query.convertEurToUsd", () => {
    // Type assertion needed because GraphQL codegen creates union types for resolvers
    const mockConvertQuery = resolvers.Query?.convertEurToUsd as (
      parent: unknown,
      args: { eur: number },
      context: unknown,
      info: unknown
    ) => Promise<number | null | undefined>;

    it("should convert EUR to USD using Coinbase API", async () => {
      mockedFetch.mockResolvedValue({
        json: () => Promise.resolve({ data: { amount: "0.92" } }),
      } as Response);

      const result = await mockConvertQuery!(
        {},
        { eur: 100 },
        {} as never,
        {} as never
      );

      expect(mockedFetch).toHaveBeenCalledWith(
        "https://api.coinbase.com/v2/prices/USDC-EUR/sell"
      );
      // 100 EUR / 0.92 = ~108.70 USD
      expect(result).toBeCloseTo(108.7, 1);
    });

    it("should handle zero EUR input", async () => {
      mockedFetch.mockResolvedValue({
        json: () => Promise.resolve({ data: { amount: "0.92" } }),
      } as Response);

      const result = await mockConvertQuery!(
        {},
        { eur: 0 },
        {} as never,
        {} as never
      );

      expect(result).toBe(0);
    });

    it("should handle small EUR amounts", async () => {
      mockedFetch.mockResolvedValue({
        json: () => Promise.resolve({ data: { amount: "0.92" } }),
      } as Response);

      const result = await mockConvertQuery!(
        {},
        { eur: 0.01 },
        {} as never,
        {} as never
      );

      expect(result).toBeCloseTo(0.0109, 3);
    });

    it("should handle large EUR amounts", async () => {
      mockedFetch.mockResolvedValue({
        json: () => Promise.resolve({ data: { amount: "0.92" } }),
      } as Response);

      const result = await mockConvertQuery!(
        {},
        { eur: 1000000 },
        {} as never,
        {} as never
      );

      expect(result).toBeCloseTo(1086956.52, 0);
    });

    it("should use fallback rate when Coinbase API fails", async () => {
      mockedFetch.mockRejectedValue(new Error("Network error"));
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "1.1";

      const result = await mockConvertQuery!(
        {},
        { eur: 100 },
        {} as never,
        {} as never
      );

      expect(result).toBeCloseTo(110, 5); // 100 * 1.1
    });

    it("should throw error when API fails and no fallback rate configured", async () => {
      mockedFetch.mockRejectedValue(new Error("Network error"));
      // No NEXT_PUBLIC_EUR_TO_USD_RATE set

      await expect(
        mockConvertQuery!({}, { eur: 100 }, {} as never, {} as never)
      ).rejects.toThrow("Failed to get an exchange rate");
    });

    it("should throw error when fallback rate is invalid (zero)", async () => {
      mockedFetch.mockRejectedValue(new Error("Network error"));
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "0";

      await expect(
        mockConvertQuery!({}, { eur: 100 }, {} as never, {} as never)
      ).rejects.toThrow("Failed to get an exchange rate");
    });

    it("should throw error when fallback rate is NaN", async () => {
      mockedFetch.mockRejectedValue(new Error("Network error"));
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "invalid";

      await expect(
        mockConvertQuery!({}, { eur: 100 }, {} as never, {} as never)
      ).rejects.toThrow("Failed to get an exchange rate");
    });

    it("should handle API returning unexpected data structure", async () => {
      mockedFetch.mockResolvedValue({
        json: () => Promise.resolve({ unexpected: "data" }),
      } as Response);
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "1.1";

      // Should fall back to env rate when API data is malformed
      const result = await mockConvertQuery!(
        {},
        { eur: 100 },
        {} as never,
        {} as never
      );

      expect(result).toBeCloseTo(110, 5);
    });

    it("should handle negative EUR input with fallback", async () => {
      mockedFetch.mockRejectedValue(new Error("Network error"));
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "1.1";

      const result = await mockConvertQuery!(
        {},
        { eur: -50 },
        {} as never,
        {} as never
      );

      expect(result).toBeCloseTo(-55, 5); // -50 * 1.1
    });
  });
});
