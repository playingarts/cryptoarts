/**
 * Card Service
 *
 * Business logic for card-related operations.
 * Extracted from GraphQL resolvers for better separation of concerns.
 */

import { Types } from "mongoose";
import Web3 from "web3";
import { Card, Loser, Deck, type MongoCard } from "../models";

// Hero cards configuration per deck
const heroCardConfig = {
  zero: [
    { suit: "spades", value: "queen" },
    { suit: "diamonds", value: "5" },
  ],
  one: [
    { suit: "clubs", value: "6" },
    { suit: "diamonds", value: "ace" },
  ],
  two: [
    { value: "5", suit: "spades" },
    { value: "8", suit: "clubs" },
  ],
  three: [
    { suit: "spades", value: "ace" },
    { suit: "clubs", value: "3" },
  ],
  special: [
    { value: "9", suit: "clubs" },
    { value: "4", suit: "hearts" },
  ],
  future: [
    { value: "queen", suit: "hearts" },
    { value: "ace", suit: "hearts" },
  ],
  "future-ii": [
    { value: "queen", suit: "clubs" },
    { value: "ace", suit: "spades" },
  ],
  crypto: [
    { suit: "clubs", value: "5" },
    { suit: "diamonds", value: "8" },
  ],
} as const;

export type DeckSlug = keyof typeof heroCardConfig;

interface GetCardsOptions {
  deck?: string;
  shuffle?: boolean | null;
  limit?: number | null;
  losers?: boolean | null;
  edition?: string | null;
  withoutDeck?: string[] | null;
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
    const query = resolvedDeckId
      ? edition
        ? { deck: resolvedDeckId, edition }
        : { deck: resolvedDeckId }
      : excludedDeckIds
      ? { deck: { $nin: excludedDeckIds } }
      : {};

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
   * Get a single card by ID or slug
   */
  async getCard({ id, slug, deckSlug }: GetCardOptions): Promise<GQL.Card | undefined> {
    const query = id
      ? Card.findById(id)
      : slug
      ? Card.find({ artist: slug, desk: deckSlug })
      : Card.findOne();

    const card = await query.populate(["artist", "deck", "animator"]);
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
   * Get hero cards for a specific deck
   */
  async getHeroCards(slug: string): Promise<GQL.Card[]> {
    const deck = (await Deck.findOne({ slug })) as unknown as GQL.Deck;
    if (!deck) {
      return [];
    }

    const cardConfigs = heroCardConfig[slug as DeckSlug];
    if (!cardConfigs) {
      return [];
    }

    const cards = await Promise.all(
      cardConfigs.map(async (cardConfig) =>
        Card.findOne({
          ...cardConfig,
          deck: deck._id,
        }).populate(["artist", "deck"]) as unknown as Promise<GQL.Card>
      )
    );

    return cards.filter(Boolean);
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

    return parseFloat(
      Web3.utils.fromWei(listings[0].price.current.value, "ether")
    );
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
}

// Export singleton instance
export const cardService = new CardService();
