/**
 * @jest-environment node
 */
// @ts-nocheck - Complex GraphQL resolver types require extensive type assertions

import { GraphQLError } from "graphql";

// Mock the services and models before importing the resolver
jest.mock("../../../source/services", () => ({
  openSeaService: {
    signatureValid: jest.fn(),
    getAssets: jest.fn(),
    calculateHolders: jest.fn(),
    setCardOnAsset: jest.fn(),
    processAssetQueue: jest.fn(),
  },
}));

jest.mock("../../../source/lib/OpenSeaClient", () => ({
  openSeaClient: {
    getCollectionStats: jest.fn(),
    getCollection: jest.fn(),
    getAllCollectionListings: jest.fn(),
    getCollectionNfts: jest.fn(),
  },
}));

jest.mock("../../../source/models", () => ({
  Contract: {
    findOne: jest.fn(),
    find: jest.fn(),
  },
  Deck: {
    findOne: jest.fn(),
  },
  Listing: {
    find: jest.fn(),
  },
  Nft: {
    find: jest.fn(),
    deleteMany: jest.fn(),
    insertMany: jest.fn(),
  },
}));

jest.mock("../../../source/graphql/schemas/contract", () => ({
  getContract: jest.fn(),
  getContracts: jest.fn(),
}));

jest.mock("../../../source/graphql/schemas/deck", () => ({
  getDeck: jest.fn(),
}));

jest.mock("../../../source/graphql/schemas/listing", () => ({
  getListings: jest.fn(),
}));

jest.mock("../../../source/graphql/schemas/card", () => ({
  getCardByTraits: jest.fn(),
}));

import { resolvers, signatureValid, getAssets } from "../../../source/graphql/schemas/opensea";
import { openSeaService } from "../../../source/services";
import { openSeaClient } from "../../../source/lib/OpenSeaClient";
import { getContract, getContracts } from "../../../source/graphql/schemas/contract";
import { getDeck } from "../../../source/graphql/schemas/deck";
import { getListings } from "../../../source/graphql/schemas/listing";

describe("OpenSea Resolver", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signatureValid export", () => {
    it("should delegate to openSeaService.signatureValid", () => {
      (openSeaService.signatureValid as jest.Mock).mockReturnValue(true);

      const result = signatureValid("0x123", "signature");

      expect(openSeaService.signatureValid).toHaveBeenCalledWith("0x123", "signature");
      expect(result).toBe(true);
    });
  });

  describe("getAssets export", () => {
    it("should delegate to openSeaService.getAssets", async () => {
      const mockAssets = [{ identifier: "1" }];
      (openSeaService.getAssets as jest.Mock).mockResolvedValue(mockAssets);

      const result = await getAssets("0xcontract", "collection-name");

      expect(openSeaService.getAssets).toHaveBeenCalledWith("0xcontract", "collection-name");
      expect(result).toEqual(mockAssets);
    });
  });

  describe("Opensea type resolvers", () => {
    // Type assertion helper for field resolvers
    type FieldResolver<T> = (parent: GQL.Opensea) => T;

    it("should resolve id field", () => {
      const resolver = resolvers.Opensea?.id as FieldResolver<string>;
      const result = resolver({ id: "test-id" } as GQL.Opensea);
      expect(result).toBe("test-id");
    });

    it("should resolve volume field", () => {
      const resolver = resolvers.Opensea?.volume as FieldResolver<number>;
      const result = resolver({ volume: 123.45 } as GQL.Opensea);
      expect(result).toBe(123.45);
    });

    it("should resolve num_owners field", () => {
      const resolver = resolvers.Opensea?.num_owners as FieldResolver<string>;
      const result = resolver({ num_owners: "500" } as GQL.Opensea);
      expect(result).toBe("500");
    });

    it("should resolve floor_price field", () => {
      const resolver = resolvers.Opensea?.floor_price as FieldResolver<number>;
      const result = resolver({ floor_price: 0.5 } as GQL.Opensea);
      expect(result).toBe(0.5);
    });

    it("should resolve total_supply field", () => {
      const resolver = resolvers.Opensea?.total_supply as FieldResolver<string>;
      const result = resolver({ total_supply: "10000" } as GQL.Opensea);
      expect(result).toBe("10000");
    });

    it("should resolve on_sale field", () => {
      const resolver = resolvers.Opensea?.on_sale as FieldResolver<string>;
      const result = resolver({ on_sale: "25" } as GQL.Opensea);
      expect(result).toBe("25");
    });
  });

  describe("Query.opensea", () => {
    // Type assertion needed because GraphQL codegen creates union types for resolvers
    const mockOpenseaQuery = resolvers.Query?.opensea as (
      parent: unknown,
      args: { deck?: string; slug?: string },
      context: unknown,
      info: unknown
    ) => Promise<GQL.Opensea>;

    it("should throw error when neither deck nor slug provided", async () => {
      await expect(
        mockOpenseaQuery({}, { deck: undefined, slug: undefined }, {} as never, {} as never)
      ).rejects.toThrow(GraphQLError);

      await expect(
        mockOpenseaQuery({}, { deck: undefined, slug: undefined }, {} as never, {} as never)
      ).rejects.toThrow("Either deck or slug must be provided");
    });

    it("should fetch opensea data by deck ID", async () => {
      const mockContract = { name: "test-collection", deck: "deck-123" };
      const mockStats = {
        total: {
          volume: 100.5,
          floor_price: 0.1,
          num_owners: 500,
        },
      };
      const mockCollection = { total_supply: "10000" };
      const mockListings = [{ id: "1" }, { id: "2" }];

      (getContract as jest.Mock).mockResolvedValue(mockContract);
      (openSeaClient.getCollectionStats as jest.Mock).mockResolvedValue(mockStats);
      (openSeaClient.getCollection as jest.Mock).mockResolvedValue(mockCollection);
      (getListings as jest.Mock).mockResolvedValue(mockListings);

      const result = await mockOpenseaQuery(
        {},
        { deck: "deck-123", slug: undefined },
        {} as never,
        {} as never
      );

      expect(getContract).toHaveBeenCalledWith({ deck: "deck-123" });
      expect(result).toEqual({
        id: "test-collection",
        volume: 100.5,
        floor_price: 0.1,
        num_owners: "500",
        total_supply: "10000",
        on_sale: "2",
      });
    });

    it("should fetch opensea data by slug", async () => {
      const mockDeck = { _id: "deck-456" };
      const mockContract = { name: "slug-collection", deck: "deck-456" };
      const mockStats = {
        total: { volume: 50, floor_price: 0.05, num_owners: 200 },
      };
      const mockCollection = { total_supply: "5000" };

      (getDeck as jest.Mock).mockResolvedValue(mockDeck);
      (getContract as jest.Mock).mockResolvedValue(mockContract);
      (openSeaClient.getCollectionStats as jest.Mock).mockResolvedValue(mockStats);
      (openSeaClient.getCollection as jest.Mock).mockResolvedValue(mockCollection);
      (getListings as jest.Mock).mockResolvedValue([]);

      const result = await mockOpenseaQuery(
        {},
        { deck: undefined, slug: "test-slug" },
        {} as never,
        {} as never
      );

      expect(getDeck).toHaveBeenCalledWith({ slug: "test-slug" });
      expect(getContract).toHaveBeenCalledWith({ deck: "deck-456" });
      expect(result.on_sale).toBe("0");
    });

    it("should handle zero floor price", async () => {
      const mockContract = { name: "test-collection" };
      const mockStats = {
        total: { volume: 0, floor_price: 0, num_owners: 1 },
      };
      const mockCollection = { total_supply: "100" };

      (getContract as jest.Mock).mockResolvedValue(mockContract);
      (openSeaClient.getCollectionStats as jest.Mock).mockResolvedValue(mockStats);
      (openSeaClient.getCollection as jest.Mock).mockResolvedValue(mockCollection);
      (getListings as jest.Mock).mockResolvedValue([]);

      const result = await mockOpenseaQuery(
        {},
        { deck: "deck-123" },
        {} as never,
        {} as never
      );

      expect(result.floor_price).toBe(0);
      expect(result.volume).toBe(0);
    });
  });

  describe("Query.ownedAssets", () => {
    // Type assertion needed because GraphQL codegen creates union types for resolvers
    const mockOwnedAssetsQuery = resolvers.Query?.ownedAssets as (
      parent: unknown,
      args: { deck: string; address: string; signature: string },
      context: unknown,
      info: unknown
    ) => Promise<GQL.Nft[]>;

    it("should throw error when signature is invalid", async () => {
      (openSeaService.signatureValid as jest.Mock).mockReturnValue(false);

      await expect(
        mockOwnedAssetsQuery(
          {},
          { deck: "deck-123", address: "0x123", signature: "invalid" },
          {} as never,
          {} as never
        )
      ).rejects.toThrow(GraphQLError);

      await expect(
        mockOwnedAssetsQuery(
          {},
          { deck: "deck-123", address: "0x123", signature: "invalid" },
          {} as never,
          {} as never
        )
      ).rejects.toThrow("Failed to verify the account.");
    });

    it("should return empty array when no contracts found", async () => {
      (openSeaService.signatureValid as jest.Mock).mockReturnValue(true);
      (getContracts as jest.Mock).mockResolvedValue(null);

      const result = await mockOwnedAssetsQuery(
        {},
        { deck: "deck-123", address: "0x123", signature: "valid" },
        {} as never,
        {} as never
      );

      expect(result).toEqual([]);
    });

    it("should return owned assets filtered by address", async () => {
      (openSeaService.signatureValid as jest.Mock).mockReturnValue(true);

      const mockContracts = [
        { address: "0xcontract1", name: "collection1" },
        { address: "0xcontract2", name: "collection2" },
      ];

      const mockAssets1 = [
        { identifier: "1", owners: [{ address: "0x123", quantity: "1" }] },
        { identifier: "2", owners: [{ address: "0xother", quantity: "1" }] },
      ];

      const mockAssets2 = [
        { identifier: "3", owners: [{ address: "0x123", quantity: "1" }] },
      ];

      (getContracts as jest.Mock).mockResolvedValue(mockContracts);
      (openSeaService.getAssets as unknown as jest.Mock)
        .mockResolvedValueOnce(mockAssets1)
        .mockResolvedValueOnce(mockAssets2);

      const result = await mockOwnedAssetsQuery(
        {},
        { deck: "deck-123", address: "0x123", signature: "valid" },
        {} as never,
        {} as never
      );

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { identifier: "1", owners: [{ address: "0x123", quantity: "1" }] },
        { identifier: "3", owners: [{ address: "0x123", quantity: "1" }] },
      ]);
    });

    it("should handle case-insensitive address comparison", async () => {
      (openSeaService.signatureValid as jest.Mock).mockReturnValue(true);

      const mockContracts = [{ address: "0xcontract", name: "collection" }];
      const mockAssets = [
        { identifier: "1", owners: [{ address: "0xABCDEF", quantity: "1" }] },
      ];

      (getContracts as jest.Mock).mockResolvedValue(mockContracts);
      (openSeaService.getAssets as unknown as jest.Mock).mockResolvedValue(mockAssets);

      const result = await mockOwnedAssetsQuery(
        {},
        { deck: "deck-123", address: "0xabcdef", signature: "valid" },
        {} as never,
        {} as never
      );

      expect(result).toHaveLength(1);
    });

    it("should handle assets with missing owners", async () => {
      (openSeaService.signatureValid as jest.Mock).mockReturnValue(true);

      const mockContracts = [{ address: "0xcontract", name: "collection" }];
      const mockAssets = [
        { identifier: "1", owners: null },
        { identifier: "2", owners: undefined },
        { identifier: "3", owners: [{ address: "0x123", quantity: "1" }] },
      ];

      (getContracts as jest.Mock).mockResolvedValue(mockContracts);
      (openSeaService.getAssets as unknown as jest.Mock).mockResolvedValue(mockAssets);

      const result = await mockOwnedAssetsQuery(
        {},
        { deck: "deck-123", address: "0x123", signature: "valid" },
        {} as never,
        {} as never
      );

      expect(result).toHaveLength(1);
      expect(result[0].identifier).toBe("3");
    });
  });

  describe("Query.holders", () => {
    // Type assertion needed because GraphQL codegen creates union types for resolvers
    const mockHoldersQuery = resolvers.Query?.holders as (
      parent: unknown,
      args: { deck?: string; slug?: string },
      context: unknown,
      info: unknown
    ) => Promise<GQL.Holders | undefined>;

    it("should calculate holders by deck ID", async () => {
      const mockHolders = {
        fullDecks: ["0x1"],
        fullDecksWithJokers: ["0x1"],
        spades: ["0x1", "0x2"],
        diamonds: ["0x2"],
        hearts: ["0x1"],
        clubs: ["0x3"],
        jokers: ["0x1"],
      };

      (openSeaService.calculateHolders as jest.Mock).mockResolvedValue(mockHolders);

      const result = await mockHoldersQuery!(
        {},
        { deck: "deck-123", slug: undefined },
        {} as never,
        {} as never
      );

      expect(result).toEqual(mockHolders);
    });

    it("should calculate holders by slug", async () => {
      const mockDeck = { _id: "deck-456" };
      const mockHolders = {
        fullDecks: [],
        fullDecksWithJokers: [],
        spades: ["0x1"],
        diamonds: [],
        hearts: [],
        clubs: [],
        jokers: [],
      };

      (getDeck as jest.Mock).mockResolvedValue(mockDeck);
      (openSeaService.calculateHolders as jest.Mock).mockResolvedValue(mockHolders);

      const result = await mockHoldersQuery!(
        {},
        { deck: undefined, slug: "test-slug" },
        {} as never,
        {} as never
      );

      expect(getDeck).toHaveBeenCalledWith({ slug: "test-slug" });
      expect(result).toEqual(mockHolders);
    });

    it("should return undefined when neither deck nor slug provided", async () => {
      const result = await mockHoldersQuery!(
        {},
        { deck: undefined, slug: undefined },
        {} as never,
        {} as never
      );

      expect(result).toBeUndefined();
    });
  });
});
