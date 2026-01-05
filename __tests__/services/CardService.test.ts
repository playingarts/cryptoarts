/**
 * @jest-environment node
 */

import { CardService } from "../../source/services/CardService";

// Mock the models
jest.mock("../../source/models", () => ({
  Card: {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    aggregate: jest.fn(),
  },
  Loser: {
    find: jest.fn(),
    findOne: jest.fn(),
  },
  Deck: {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
  },
}));

// Mock the deck schema
jest.mock("../../source/graphql/schemas/deck", () => ({
  getDeck: jest.fn(),
}));

import { Card, Loser, Deck } from "../../source/models";
import { getDeck } from "../../source/graphql/schemas/deck";

describe("CardService", () => {
  let cardService: CardService;

  beforeEach(() => {
    cardService = new CardService();
    jest.clearAllMocks();
  });

  describe("calculatePriceFromListings", () => {
    it("should return undefined for empty listings", () => {
      const result = cardService.calculatePriceFromListings([]);
      expect(result).toBeUndefined();
    });

    it("should return price from first listing in ether", () => {
      const listings = [
        { price: { current: { value: "2000000000000000000" } } },
        { price: { current: { value: "1000000000000000000" } } },
        { price: { current: { value: "3000000000000000000" } } },
      ] as GQL.Listing[];

      const result = cardService.calculatePriceFromListings(listings);
      expect(result).toBe(2); // First listing: 2 ETH (2e18 wei / 1e18)
    });

    it("should handle single listing", () => {
      const listings = [
        { price: { current: { value: "500000000000000000" } } },
      ] as GQL.Listing[];

      const result = cardService.calculatePriceFromListings(listings);
      expect(result).toBe(0.5); // 0.5 ETH
    });
  });

  describe("filterNftsByCardTraits", () => {
    const mockCard = {
      suit: "hearts",
      value: "ace",
      erc1155: null,
    } as unknown as GQL.Card;

    it("should filter NFTs matching card suit and value", () => {
      const nfts = [
        {
          identifier: "1",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [
            { trait_type: "Suit", value: "Hearts" },
            { trait_type: "Value", value: "Ace" },
          ],
        },
        {
          identifier: "2",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [
            { trait_type: "Suit", value: "Spades" },
            { trait_type: "Value", value: "Ace" },
          ],
        },
        {
          identifier: "3",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [
            { trait_type: "Suit", value: "Hearts" },
            { trait_type: "Value", value: "King" },
          ],
        },
      ] as GQL.Nft[];

      const result = cardService.filterNftsByCardTraits(nfts, mockCard);
      expect(result).toHaveLength(1);
      expect(result[0].identifier).toBe("1");
    });

    it("should handle Color trait type as suit", () => {
      const nfts = [
        {
          identifier: "1",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [
            { trait_type: "Color", value: "Red" },
            { trait_type: "Value", value: "Joker" },
          ],
        },
      ] as GQL.Nft[];

      const jokerCard = {
        suit: "red",
        value: "joker",
        erc1155: null,
      } as unknown as GQL.Card;

      const result = cardService.filterNftsByCardTraits(nfts, jokerCard);
      expect(result).toHaveLength(1);
    });

    it("should filter by erc1155 token_id when card has erc1155", () => {
      const nfts = [
        {
          identifier: "123",
          contract: "0xcontract",
          token_standard: "ERC1155",
          name: "Card",
          description: "",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [],
        },
        {
          identifier: "456",
          contract: "0xcontract",
          token_standard: "ERC1155",
          name: "Card 2",
          description: "",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [],
        },
      ] as GQL.Nft[];

      const erc1155Card = {
        suit: "hearts",
        value: "ace",
        erc1155: { token_id: "123", contractAddress: "0x123" },
      } as unknown as GQL.Card;

      const result = cardService.filterNftsByCardTraits(nfts, erc1155Card);
      expect(result).toHaveLength(1);
      expect(result[0].identifier).toBe("123");
    });

    it("should return empty array when no owners", () => {
      const nfts = [
        {
          identifier: "1",
          owners: undefined,
          traits: [
            { trait_type: "Suit", value: "Hearts" },
            { trait_type: "Value", value: "Ace" },
          ],
        },
      ] as unknown as GQL.Nft[];

      const result = cardService.filterNftsByCardTraits(nfts, mockCard);
      expect(result).toHaveLength(0);
    });

    it("should return empty array when no traits match", () => {
      const nfts = [
        {
          identifier: "1",
          owners: [{ address: "0x123", quantity: "1" }],
          traits: [
            { trait_type: "Suit", value: "Clubs" },
            { trait_type: "Value", value: "Two" },
          ],
        },
      ] as GQL.Nft[];

      const result = cardService.filterNftsByCardTraits(nfts, mockCard);
      expect(result).toHaveLength(0);
    });
  });

  describe("getCardBackground", () => {
    it("should return cardBackground when provided", async () => {
      const result = await cardService.getCardBackground(
        "custom-bg.jpg",
        { cardBackground: "deck-bg.jpg" } as GQL.Deck
      );
      expect(result).toBe("custom-bg.jpg");
    });

    it("should return deck cardBackground when card has none", async () => {
      const result = await cardService.getCardBackground(undefined, {
        cardBackground: "deck-bg.jpg",
      } as GQL.Deck);
      expect(result).toBe("deck-bg.jpg");
    });

    it("should fetch deck background when deck is string ID", async () => {
      (Deck.findById as jest.Mock).mockResolvedValue({
        cardBackground: "fetched-bg.jpg",
      });

      const result = await cardService.getCardBackground(undefined, "deck-id");
      expect(Deck.findById).toHaveBeenCalledWith("deck-id");
      expect(result).toBe("fetched-bg.jpg");
    });

    it("should return undefined when no backgrounds available", async () => {
      (Deck.findById as jest.Mock).mockResolvedValue({});

      const result = await cardService.getCardBackground(undefined, "deck-id");
      expect(result).toBeUndefined();
    });
  });

  describe("getHeroCards", () => {
    it("should return configured hero cards for known deck", async () => {
      const mockCards = [
        { _id: "1", value: "5", suit: "clubs" },
        { _id: "2", value: "8", suit: "diamonds" },
      ];

      // Mock Deck.findOne for the deck lookup
      (Deck.findOne as jest.Mock).mockResolvedValue({ _id: "deck-123" });

      // Mock Card.findOne for each hero card
      (Card.findOne as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValueOnce(mockCards[0]).mockResolvedValueOnce(mockCards[1]),
      });

      const result = await cardService.getHeroCards("crypto");

      expect(Deck.findOne).toHaveBeenCalledWith({ slug: "crypto" });
      expect(result).toHaveLength(2);
    });

    it("should return empty array for unknown deck", async () => {
      (Deck.findOne as jest.Mock).mockResolvedValue(null);

      const result = await cardService.getHeroCards("unknown-deck");
      expect(result).toEqual([]);
    });

    it("should return empty array when deck exists but no hero config", async () => {
      (Deck.findOne as jest.Mock).mockResolvedValue({ _id: "deck-123" });

      const result = await cardService.getHeroCards("nonexistent-config");
      expect(result).toEqual([]);
    });
  });

  describe("getHomeCards", () => {
    it("should return random cards with cardBackground", async () => {
      const mockCards = [
        { _id: "card1", value: "ace", suit: "hearts", cardBackground: "bg1.jpg" },
        { _id: "card2", value: "king", suit: "spades", cardBackground: "bg2.jpg" },
        { _id: "card3", value: "queen", suit: "diamonds", cardBackground: "bg3.jpg" },
      ];

      // Mock Card.find().populate() chain
      (Card.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCards),
      });

      const result = await cardService.getHomeCards(3);

      expect(Card.find).toHaveBeenCalledWith({ cardBackground: { $ne: null } });
      expect(result).toHaveLength(3);
    });

    it("should limit to requested count", async () => {
      const mockCards = [
        { _id: "card1", cardBackground: "bg1.jpg" },
        { _id: "card2", cardBackground: "bg2.jpg" },
        { _id: "card3", cardBackground: "bg3.jpg" },
        { _id: "card4", cardBackground: "bg4.jpg" },
        { _id: "card5", cardBackground: "bg5.jpg" },
      ];

      (Card.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCards),
      });

      const result = await cardService.getHomeCards(2);

      expect(result).toHaveLength(2);
    });
  });
});
