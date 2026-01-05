/**
 * @jest-environment node
 */

import { OpenSeaService } from "../../source/services/OpenSeaService";

// Mock the models
jest.mock("../../source/models", () => ({
  Content: {
    find: jest.fn(),
    findOne: jest.fn(),
    deleteMany: jest.fn(),
    insertMany: jest.fn(),
  },
  Listing: {
    deleteMany: jest.fn(),
    insertMany: jest.fn(),
  },
  Nft: {
    find: jest.fn(),
    deleteMany: jest.fn(),
    insertMany: jest.fn(),
  },
}));

// Mock the OpenSeaClient
jest.mock("../../source/lib/OpenSeaClient", () => ({
  openSeaClient: {
    getAllCollectionListings: jest.fn(),
    getCollectionNfts: jest.fn(),
    getNft: jest.fn(),
  },
}));

// Mock signature validation - we need to mock the actual import
jest.mock("@metamask/eth-sig-util", () => ({
  recoverPersonalSignature: jest.fn(),
}));

import { recoverPersonalSignature } from "@metamask/eth-sig-util";

describe("OpenSeaService", () => {
  let openSeaService: OpenSeaService;

  beforeEach(() => {
    openSeaService = new OpenSeaService();
    jest.clearAllMocks();
  });

  describe("signatureValid", () => {
    it("should return true when signature matches address", () => {
      (recoverPersonalSignature as jest.Mock).mockReturnValue(
        "0x1234567890abcdef"
      );

      const result = openSeaService.signatureValid(
        "0x1234567890ABCDEF",
        "mock-signature"
      );

      expect(result).toBe(true);
    });

    it("should return false when signature does not match", () => {
      (recoverPersonalSignature as jest.Mock).mockReturnValue(
        "0xdifferentaddress"
      );

      const result = openSeaService.signatureValid(
        "0x1234567890abcdef",
        "mock-signature"
      );

      expect(result).toBe(false);
    });

    it("should handle case-insensitive address comparison", () => {
      (recoverPersonalSignature as jest.Mock).mockReturnValue(
        "0xABCDEF1234567890"
      );

      const result = openSeaService.signatureValid(
        "0xabcdef1234567890",
        "mock-signature"
      );

      expect(result).toBe(true);
    });
  });

  describe("calculateHolders", () => {
    const mockGetContract = jest.fn();

    it("should return undefined when contract not found", async () => {
      mockGetContract.mockResolvedValue(null);

      const result = await openSeaService.calculateHolders(
        mockGetContract,
        "deck-123"
      );

      expect(result).toBeUndefined();
    });

    it("should calculate holder statistics correctly", async () => {
      mockGetContract.mockResolvedValue({
        address: "0xcontract",
        name: "test-collection",
      });

      // Mock getAssets to return test data
      const mockAssets: GQL.Nft[] = [
        {
          identifier: "1",
          contract: "0xcontract",
          token_standard: "ERC721",
          name: "Card 1",
          description: "",
          owners: [{ address: "0xowner1", quantity: "1" }],
          traits: [
            { trait_type: "Suit", value: "Hearts" },
            { trait_type: "Value", value: "Ace" },
          ],
        },
        {
          identifier: "2",
          contract: "0xcontract",
          token_standard: "ERC721",
          name: "Card 2",
          description: "",
          owners: [{ address: "0xowner1", quantity: "1" }],
          traits: [
            { trait_type: "Suit", value: "Hearts" },
            { trait_type: "Value", value: "King" },
          ],
        },
      ];

      // We need to mock getAssets on the service instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (openSeaService as any).getAssets = jest.fn().mockResolvedValue(mockAssets);

      const result = await openSeaService.calculateHolders(
        mockGetContract,
        "deck-123"
      );

      expect(result).toBeDefined();
      expect(result).toHaveProperty("fullDecks");
      expect(result).toHaveProperty("fullDecksWithJokers");
      expect(result).toHaveProperty("spades");
      expect(result).toHaveProperty("diamonds");
      expect(result).toHaveProperty("hearts");
      expect(result).toHaveProperty("clubs");
      expect(result).toHaveProperty("jokers");
    });
  });

  describe("setCardOnAsset", () => {
    const mockGetContract = jest.fn();
    const mockGetCardByTraits = jest.fn();

    it("should return asset unchanged if no traits", async () => {
      const asset = {
        identifier: "1",
        contract: "0x123",
        on_sale: true,
        traits: undefined,
      } as GQL.Nft & { on_sale: boolean };

      const result = await openSeaService.setCardOnAsset(
        asset,
        mockGetContract,
        mockGetCardByTraits
      );

      expect(result).toEqual(asset);
      expect(mockGetContract).not.toHaveBeenCalled();
    });

    it("should return asset unchanged if missing suit or value traits", async () => {
      const asset = {
        identifier: "1",
        contract: "0x123",
        on_sale: true,
        traits: [{ trait_type: "Other", value: "something" }],
      } as GQL.Nft & { on_sale: boolean };

      const result = await openSeaService.setCardOnAsset(
        asset,
        mockGetContract,
        mockGetCardByTraits
      );

      expect(result).toEqual(asset);
    });

    it("should associate card with asset when traits match", async () => {
      const asset = {
        identifier: "1",
        contract: "0x123",
        on_sale: true,
        traits: [
          { trait_type: "Suit", value: "Hearts" },
          { trait_type: "Value", value: "Ace" },
        ],
      } as GQL.Nft & { on_sale: boolean };

      const mockCard = {
        _id: "card-123",
        suit: "hearts",
        value: "ace",
      };

      mockGetContract.mockResolvedValue({
        deck: { _id: "deck-123" },
      });

      mockGetCardByTraits.mockResolvedValue(mockCard);

      const result = await openSeaService.setCardOnAsset(
        asset,
        mockGetContract,
        mockGetCardByTraits
      );

      expect(result).toHaveProperty("card", mockCard);
      expect(mockGetContract).toHaveBeenCalledWith({ address: "0x123" });
      expect(mockGetCardByTraits).toHaveBeenCalledWith({
        deck: "deck-123",
        suit: "hearts",
        value: "ace",
      });
    });

    it("should handle Color trait type as suit", async () => {
      const asset = {
        identifier: "1",
        contract: "0x123",
        on_sale: true,
        traits: [
          { trait_type: "Color", value: "Red" },
          { trait_type: "Value", value: "Joker" },
        ],
      } as GQL.Nft & { on_sale: boolean };

      mockGetContract.mockResolvedValue({
        deck: { _id: "deck-123" },
      });

      mockGetCardByTraits.mockResolvedValue({ _id: "joker-card" });

      await openSeaService.setCardOnAsset(
        asset,
        mockGetContract,
        mockGetCardByTraits
      );

      expect(mockGetCardByTraits).toHaveBeenCalledWith({
        deck: "deck-123",
        suit: "red",
        value: "joker",
      });
    });

    it("should return asset without card if contract not found", async () => {
      const asset = {
        identifier: "1",
        contract: "0x123",
        on_sale: true,
        traits: [
          { trait_type: "Suit", value: "Hearts" },
          { trait_type: "Value", value: "Ace" },
        ],
      } as GQL.Nft & { on_sale: boolean };

      mockGetContract.mockResolvedValue(null);

      const result = await openSeaService.setCardOnAsset(
        asset,
        mockGetContract,
        mockGetCardByTraits
      );

      expect(result).toEqual(asset);
      expect(mockGetCardByTraits).not.toHaveBeenCalled();
    });
  });
});
