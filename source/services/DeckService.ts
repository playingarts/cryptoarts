/**
 * Deck Service
 *
 * Business logic for deck-related operations.
 * Extracted from GraphQL resolvers for better separation of concerns.
 */

import { Deck, type MongoDeck } from "../models";

export { type MongoDeck };

interface GetDeckOptions {
  slug?: string;
  id?: string;
}

export class DeckService {
  /**
   * Get all decks with previewCards populated
   */
  async getDecks(): Promise<GQL.Deck[]> {
    return Deck.find().populate("previewCards") as unknown as Promise<GQL.Deck[]>;
  }

  /**
   * Get a single deck by slug or ID
   */
  async getDeck(options: GetDeckOptions): Promise<GQL.Deck | undefined> {
    const query = options.id ? { _id: options.id } : { slug: options.slug };
    const deck = await Deck.findOne(query).populate("previewCards");
    return (deck as unknown as GQL.Deck) || undefined;
  }

  /**
   * Get a deck by its slug
   */
  async getDeckBySlug(slug: string): Promise<GQL.Deck | undefined> {
    return this.getDeck({ slug });
  }

  /**
   * Get a deck by its ID
   */
  async getDeckById(id: string): Promise<GQL.Deck | undefined> {
    return this.getDeck({ id });
  }

  /**
   * Get multiple decks by their slugs
   */
  async getDecksBySlugs(slugs: string[]): Promise<GQL.Deck[]> {
    if (!slugs || slugs.length === 0) {
      return [];
    }

    const decks = await Deck.find({ slug: { $in: slugs } }).populate("previewCards");
    return decks as unknown as GQL.Deck[];
  }

  /**
   * Get deck properties with default empty object fallback
   */
  getDeckProperties(properties: Record<string, unknown> | null | undefined): Record<string, unknown> {
    return properties || {};
  }
}

// Export singleton instance
export const deckService = new DeckService();
