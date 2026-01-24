/**
 * Card Service
 *
 * Business logic for card-related operations.
 * Extracted from GraphQL resolvers for better separation of concerns.
 */

import { Types } from "mongoose";
import { Artist, Card, Loser, Deck, type MongoCard } from "../models";

/**
 * Convert wei to ether (replaces Web3.utils.fromWei)
 * 1 ether = 10^18 wei
 */
function fromWei(wei: string): string {
  const weiValue = BigInt(wei);
  const etherValue = Number(weiValue) / 1e18;
  return etherValue.toString();
}


interface GetCardsOptions {
  deck?: string;
  shuffle?: boolean | null;
  limit?: number | null;
  losers?: boolean | null;
  edition?: string | null;
  withoutDeck?: string[] | null;
  withInfo?: boolean | null;
  withMainPhoto?: boolean | null;
}

interface GetCardOptions {
  id?: string | null;
  slug?: string | null;
  deckSlug?: string | null;
}

export class CardService {
  /**
   * Get deck by slug or ID
   */
  private async resolveDeckId(deckIdOrSlug: string): Promise<string | undefined> {
    if (Types.ObjectId.isValid(deckIdOrSlug)) {
      return deckIdOrSlug;
    }
    const deck = await Deck.findOne({ slug: deckIdOrSlug });
    return deck?._id?.toString();
  }

  /**
   * Get all decks
   */
  private async getAllDecks(): Promise<GQL.Deck[]> {
    return Deck.find().populate("previewCards") as unknown as Promise<GQL.Deck[]>;
  }

  /**
   * Get cards with optional filtering, shuffling, and limiting
   */
  async getCards({
    deck,
    shuffle,
    limit,
    losers,
    edition,
    withoutDeck,
    withInfo,
    withMainPhoto,
  }: GetCardsOptions): Promise<GQL.Card[]> {
    let resolvedDeckId = deck;

    // Resolve deck slug to ID if needed
    if (deck && !Types.ObjectId.isValid(deck)) {
      resolvedDeckId = await this.resolveDeckId(deck);
    }

    // Handle withoutDeck filter
    let excludedDeckIds: string[] | undefined;
    if (withoutDeck) {
      const decks = await this.getAllDecks();
      excludedDeckIds = decks
        .filter(
          (d) =>
            (withoutDeck as string[]).findIndex((item) => item !== d.slug) === -1
        )
        .map((d) => d._id);
    }

    // Build query
    const baseQuery = resolvedDeckId
      ? edition
        ? { deck: resolvedDeckId, edition }
        : { deck: resolvedDeckId }
      : excludedDeckIds
      ? { deck: { $nin: excludedDeckIds } }
      : {};

    // Add info filter if requested (only cards with non-empty descriptions)
    let query: Record<string, unknown> = withInfo
      ? { ...baseQuery, info: { $exists: true, $nin: [null, ""] } }
      : baseQuery;

    // Add mainPhoto filter if requested (only cards with mainPhoto)
    if (withMainPhoto) {
      query = { ...query, mainPhoto: { $exists: true, $nin: [null, ""] } };
    }

    // Execute query
    const Model = losers ? Loser : Card;
    let cards = (await Model.find(query).populate([
      "artist",
      "deck",
      "animator",
    ])) as unknown as GQL.Card[];

    // Shuffle if requested
    if (shuffle) {
      cards = cards.sort(() => Math.random() - Math.random());
    }

    // Limit if requested
    if (limit) {
      cards = cards.slice(0, limit);
    }

    return cards;
  }

  /**
   * Get a single card by ID or artist slug
   */
  async getCard({ id, slug, deckSlug }: GetCardOptions): Promise<GQL.Card | undefined> {
    if (id) {
      const card = await Card.findById(id).populate(["artist", "deck", "animator"]);
      return card as unknown as GQL.Card | undefined;
    }

    if (slug && deckSlug) {
      // Look up artist by slug first
      const artist = await Artist.findOne({ slug });
      if (!artist) {
        return undefined;
      }

      // Look up deck by slug
      const deck = await Deck.findOne({ slug: deckSlug });
      if (!deck) {
        return undefined;
      }

      const card = await Card.findOne({ artist: artist._id, deck: deck._id }).populate([
        "artist",
        "deck",
        "animator",
      ]);
      return card as unknown as GQL.Card | undefined;
    }

    const card = await Card.findOne().populate(["artist", "deck", "animator"]);
    return card as unknown as GQL.Card | undefined;
  }

  /**
   * Get a card by its image path
   */
  async getCardByImg({ img }: { img: string }): Promise<GQL.Card | undefined> {
    const card = await Card.findOne({ img }).populate([
      "artist",
      "deck",
      "animator",
    ]);
    return card as unknown as GQL.Card | undefined;
  }

  /**
   * Get a card by its suit, value, and deck
   */
  async getCardByTraits({
    suit,
    value,
    deck,
  }: Pick<MongoCard, "value" | "suit" | "deck">): Promise<GQL.Card | undefined> {
    const card = await Card.findOne({
      suit,
      value,
      deck,
    });
    return card as unknown as GQL.Card | undefined;
  }

  /**
   * Get cards by their IDs (optimized for favorites page)
   * Fetches only the requested cards instead of all cards in a deck
   */
  async getCardsByIds(ids: string[]): Promise<GQL.Card[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    const cards = await Card.find({ _id: { $in: ids } }).populate([
      "artist",
      "deck",
    ]);

    return cards as unknown as GQL.Card[];
  }

  /**
   * Get hero cards for a specific deck
   * Returns 2 random cards from the deck for the hero section
   */
  async getHeroCards(slug: string): Promise<GQL.Card[]> {
    const deck = (await Deck.findOne({ slug })) as unknown as GQL.Deck;
    if (!deck) {
      return [];
    }

    // Get 2 random cards from the deck using MongoDB's $sample
    const cards = (await Card.aggregate([
      { $match: { deck: deck._id } },
      { $sample: { size: 2 } },
    ])) as MongoCard[] | undefined;

    if (!cards || cards.length === 0) {
      return [];
    }

    // Populate artist and deck for the sampled cards
    const populatedCards = await Promise.all(
      cards.map(async (card) =>
        Card.findById(card._id).populate(["artist", "deck"]) as unknown as Promise<GQL.Card>
      )
    );

    return populatedCards.filter(Boolean);
  }

  /**
   * Get random cards for the home page (cards with cardBackground)
   */
  async getHomeCards(count = 3): Promise<GQL.Card[]> {
    const cards = (await Card.find({ cardBackground: { $ne: null } }).populate([
      "artist",
      "deck",
    ])) as unknown as GQL.Card[];

    return cards.sort(() => Math.random() - Math.random()).slice(0, count);
  }

  /**
   * Get the card's background color
   * Falls back to deck's cardBackground if card doesn't have one
   */
  async getCardBackground(
    cardBackground: string | null | undefined,
    deck: GQL.Deck | string
  ): Promise<string | undefined> {
    if (cardBackground) {
      return cardBackground;
    }

    if (typeof deck === "object" && deck.cardBackground) {
      return deck.cardBackground;
    }

    if (typeof deck === "string") {
      const resolvedDeck = await Deck.findById(deck);
      return resolvedDeck?.cardBackground || undefined;
    }

    return undefined;
  }

  /**
   * Calculate the price of a card based on OpenSea listings
   * Note: This method requires external dependencies (contracts, assets, listings)
   * and should be called from the resolver with those dependencies injected
   */
  calculatePriceFromListings(
    listings: GQL.Listing[]
  ): number | undefined {
    if (listings.length === 0) {
      return undefined;
    }

    return parseFloat(fromWei(listings[0].price.current.value));
  }

  /**
   * Filter NFTs to find those matching a card's traits
   */
  filterNftsByCardTraits(
    nfts: GQL.Nft[],
    card: { suit?: string; value?: string; erc1155?: { token_id: string } | null }
  ): GQL.Nft[] {
    return nfts.filter(
      ({ identifier, traits = [], owners }) =>
        identifier &&
        owners &&
        (card.erc1155
          ? card.erc1155.token_id === identifier
          : traits &&
            traits.filter(
              ({ trait_type, value }) =>
                ((trait_type === "Suit" || trait_type === "Color") &&
                  value.toLowerCase() === card.suit) ||
                (trait_type === "Value" && value.toLowerCase() === card.value)
            ).length === 2)
    );
  }

  /**
   * Update card photos (mainPhoto and additionalPhotos)
   * @param cardId - The card's MongoDB ID
   * @param mainPhoto - URL for the main photo (optional, pass null to clear)
   * @param additionalPhotos - Array of URLs for additional photos (max 4)
   */
  async updateCardPhotos(
    cardId: string,
    mainPhoto?: string | null,
    additionalPhotos?: string[] | null
  ): Promise<GQL.Card | undefined> {
    // Validate additionalPhotos length
    if (additionalPhotos && additionalPhotos.length > 4) {
      throw new Error("Maximum 4 additional photos allowed");
    }

    // Build update object (only include fields that are provided)
    const update: Record<string, unknown> = {};
    if (mainPhoto !== undefined) {
      update.mainPhoto = mainPhoto;
    }
    if (additionalPhotos !== undefined) {
      update.additionalPhotos = additionalPhotos;
    }

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $set: update },
      { new: true }
    ).populate(["artist", "deck", "animator"]);

    return card as unknown as GQL.Card | undefined;
  }

  /**
   * Get cards by their paths (deckSlug/artistSlug format)
   * Used for fetching specific featured cards for gallery
   */
  async getCardsByPaths(paths: string[]): Promise<GQL.Card[]> {
    if (!paths || paths.length === 0) {
      return [];
    }

    // Parse paths and resolve deck/artist IDs
    const cards = await Promise.all(
      paths.map(async (path) => {
        const parts = path.replace(/^\//, "").split("/");
        if (parts.length !== 2) return null;

        const [deckSlug, artistSlug] = parts;

        // Look up deck and artist
        const [deck, artist] = await Promise.all([
          Deck.findOne({ slug: deckSlug }),
          Artist.findOne({ slug: artistSlug }),
        ]);

        if (!deck || !artist) return null;

        const card = await Card.findOne({
          deck: deck._id,
          artist: artist._id,
        }).populate(["artist", "deck"]);

        return card as unknown as GQL.Card | null;
      })
    );

    return cards.filter((card): card is GQL.Card => card !== null);
  }
}

// Export singleton instance
export const cardService = new CardService();
