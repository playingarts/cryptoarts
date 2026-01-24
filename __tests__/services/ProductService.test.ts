/**
 * @jest-environment node
 */

import { ProductService } from "../../source/services/ProductService";

// Mock the models
jest.mock("../../source/models", () => ({
  Product: {
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

// Mock fetch
jest.mock("../../source/fetch", () => jest.fn());

import { Product } from "../../source/models";
import fetch from "../../source/fetch";

describe("ProductService", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    jest.clearAllMocks();
  });

  describe("getProduct", () => {
    it("should find product by id", async () => {
      const mockProduct = { _id: "prod-1", title: "Crypto Deck", type: "deck" };

      (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productService.getProduct({ id: "prod-1" });

      expect(Product.findOne).toHaveBeenCalledWith({ _id: "prod-1" });
      expect(result).toEqual(mockProduct);
    });

    it("should find deck-type product by deck reference", async () => {
      const mockProduct = { _id: "prod-1", title: "Crypto Deck", type: "deck", deck: "deck-1" };

      (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productService.getProduct({ deck: "deck-1" });

      expect(Product.findOne).toHaveBeenCalledWith({ deck: "deck-1", type: "deck" });
      expect(result).toEqual(mockProduct);
    });

    it("should return undefined when product not found", async () => {
      (Product.findOne as jest.Mock).mockResolvedValue(null);

      const result = await productService.getProduct({ id: "nonexistent" });

      expect(result).toBeUndefined();
    });
  });

  describe("getProducts", () => {
    it("should return all non-hidden products sorted by order", async () => {
      const mockProducts = [
        { _id: "1", title: "Product 1", order: 1 },
        { _id: "2", title: "Product 2", order: 2 },
      ];

      const mockPopulate = jest.fn().mockReturnThis();
      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: mockPopulate.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockProducts),
          }),
        }),
      });

      const result = await productService.getProducts();

      expect(Product.find).toHaveBeenCalledWith({ hidden: { $ne: true } });
      expect(result).toEqual(mockProducts);
    });

    it("should filter by ids when provided", async () => {
      const mockProducts = [{ _id: "1", title: "Product 1" }];

      const mockPopulate = jest.fn().mockReturnThis();
      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: mockPopulate.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockProducts),
          }),
        }),
      });

      const result = await productService.getProducts(["1", "2"]);

      expect(Product.find).toHaveBeenCalledWith({
        _id: { $in: ["1", "2"] },
        hidden: { $ne: true },
      });
      expect(result).toEqual(mockProducts);
    });
  });

  describe("getProductsByDeck", () => {
    it("should return products for a specific deck", async () => {
      const mockProducts = [
        { _id: "1", title: "Deck Product", deck: "deck-1" },
      ];

      (Product.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockProducts),
      });

      const result = await productService.getProductsByDeck("deck-1");

      expect(Product.find).toHaveBeenCalledWith({
        deck: "deck-1",
        hidden: { $ne: true },
      });
      expect(result).toEqual(mockProducts);
    });
  });

  describe("convertEurToUsd", () => {
    it("should convert EUR to USD using Coinbase API", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          data: { amount: "0.91" }, // 1 USD = 0.91 EUR
        }),
      });

      const result = await productService.convertEurToUsd(100);

      expect(fetch).toHaveBeenCalledWith(
        "https://api.coinbase.com/v2/prices/USDC-EUR/sell"
      );
      // 100 EUR / 0.91 = ~109.89 USD
      expect(result).toBeCloseTo(109.89, 1);
    });

    it("should fall back to env rate when API fails", async () => {
      const originalEnv = process.env.NEXT_PUBLIC_EUR_TO_USD_RATE;
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "1.1";

      (fetch as jest.Mock).mockRejectedValue(new Error("API error"));

      const result = await productService.convertEurToUsd(100);

      expect(result).toBeCloseTo(110, 5); // 100 EUR * 1.1 = 110 USD

      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = originalEnv;
    });

    it("should throw error when API fails and no fallback rate", async () => {
      const originalEnv = process.env.NEXT_PUBLIC_EUR_TO_USD_RATE;
      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = "";

      (fetch as jest.Mock).mockRejectedValue(new Error("API error"));

      await expect(productService.convertEurToUsd(100)).rejects.toThrow(
        "Failed to get an exchange rate for 100 euros."
      );

      process.env.NEXT_PUBLIC_EUR_TO_USD_RATE = originalEnv;
    });
  });

  describe("updateProductPhotos", () => {
    it("should update product photos and return updated product", async () => {
      const mockProduct = {
        _id: "prod-1",
        photos: ["photo1.jpg", "photo2.jpg"],
      };

      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productService.updateProductPhotos("prod-1", [
        "photo1.jpg",
        "photo2.jpg",
      ]);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        "prod-1",
        { photos: ["photo1.jpg", "photo2.jpg"] },
        { new: true }
      );
      expect(result).toEqual(mockProduct);
    });

    it("should return undefined when product not found", async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await productService.updateProductPhotos("nonexistent", []);

      expect(result).toBeUndefined();
    });
  });

  describe("updateProductCardGalleryPhotos", () => {
    it("should update card gallery photos and return updated product", async () => {
      const mockProduct = {
        _id: "prod-1",
        cardGalleryPhotos: ["gallery1.jpg", "gallery2.jpg"],
      };

      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productService.updateProductCardGalleryPhotos(
        "prod-1",
        ["gallery1.jpg", "gallery2.jpg"]
      );

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        "prod-1",
        { cardGalleryPhotos: ["gallery1.jpg", "gallery2.jpg"] },
        { new: true }
      );
      expect(result).toEqual(mockProduct);
    });
  });
});
