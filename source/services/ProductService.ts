/**
 * Product Service
 *
 * Business logic for product-related operations.
 * Extracted from GraphQL resolvers for better separation of concerns.
 */

import fetch from "../fetch";
import { Product, type MongoProduct } from "../models";

export { type MongoProduct };

interface GetProductOptions {
  id?: string;
  deck?: string;
}

export class ProductService {
  /**
   * Get a single product by ID or deck reference
   * When looking up by deck, only returns deck-type products (not sheets)
   */
  async getProduct(options: GetProductOptions): Promise<GQL.Product | undefined> {
    const query = options.deck
      ? { deck: options.deck, type: "deck" }
      : { _id: options.id };

    const product = await Product.findOne(query);
    return (product as GQL.Product) || undefined;
  }

  /**
   * Get all products (optionally filtered by IDs)
   * Excludes hidden products and sorts by order field
   */
  async getProducts(ids?: string[]): Promise<GQL.Product[]> {
    const query = ids
      ? { _id: { $in: ids }, hidden: { $ne: true } }
      : { hidden: { $ne: true } };

    const products = await Product.find(query)
      .sort({ order: 1 })
      .populate([
        {
          path: "deck",
          populate: { path: "previewCards", populate: { path: "artist" } },
        },
      ])
      .populate("decks");

    return products as unknown as GQL.Product[];
  }

  /**
   * Get products for a specific deck
   */
  async getProductsByDeck(deckId: string): Promise<GQL.Product[]> {
    const products = await Product.find({ deck: deckId, hidden: { $ne: true } })
      .sort({ order: 1 });

    return products as unknown as GQL.Product[];
  }

  /**
   * Convert EUR to USD using Coinbase API with fallback to env rate
   */
  async convertEurToUsd(eur: number): Promise<number> {
    try {
      const response = await fetch("https://api.coinbase.com/v2/prices/USDC-EUR/sell");
      const { data: { amount } } = await response.json();
      return eur / amount;
    } catch {
      const rate = parseFloat(process.env.NEXT_PUBLIC_EUR_TO_USD_RATE || "0");

      if (!rate) {
        throw new Error(`Failed to get an exchange rate for ${eur} euros.`);
      }

      return rate * eur;
    }
  }

  /**
   * Update product photos
   */
  async updateProductPhotos(productId: string, photos: string[]): Promise<GQL.Product | undefined> {
    const updated = await Product.findByIdAndUpdate(
      productId,
      { photos },
      { new: true }
    );
    return (updated as GQL.Product) || undefined;
  }

  /**
   * Update product card gallery photos
   */
  async updateProductCardGalleryPhotos(
    productId: string,
    cardGalleryPhotos: string[]
  ): Promise<GQL.Product | undefined> {
    const updated = await Product.findByIdAndUpdate(
      productId,
      { cardGalleryPhotos },
      { new: true }
    );
    return (updated as GQL.Product) || undefined;
  }
}

// Export singleton instance
export const productService = new ProductService();
