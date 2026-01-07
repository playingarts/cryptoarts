/**
 * @jest-environment node
 */
// @ts-nocheck - Complex GraphQL resolver types require extensive type assertions

import { GraphQLError } from "graphql";

// Mock the models before importing the resolver
jest.mock("../../../source/models", () => ({
  Deal: {
    findOne: jest.fn(),
  },
  Deck: {
    findOne: jest.fn(),
  },
  Contract: {
    findOne: jest.fn(),
  },
}));

// Mock OpenSea service functions
jest.mock("../../../source/services", () => ({
  openSeaService: {
    signatureValid: jest.fn(),
    getAssets: jest.fn(),
  },
}));

// Mock deck and contract resolvers
jest.mock("../../../source/graphql/schemas/deck", () => ({
  getDeck: jest.fn(),
}));

jest.mock("../../../source/graphql/schemas/contract", () => ({
  getContract: jest.fn(),
}));

jest.mock("../../../source/graphql/schemas/opensea", () => ({
  signatureValid: jest.fn(),
  getAssets: jest.fn(),
}));

import { resolvers } from "../../../source/graphql/schemas/deal";
import { Deal } from "../../../source/models";
import { signatureValid } from "../../../source/graphql/schemas/opensea";

describe("Deal Resolver", () => {
  const mockDealQuery = resolvers.Query?.deal;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Query.deal", () => {
    const validArgs = {
      hash: "0x1234567890ABCDEF",
      deckId: "deck-123",
      signature: "valid-signature",
    };

    it("should throw GraphQLError when signature is invalid", async () => {
      (signatureValid as jest.Mock).mockReturnValue(false);

      await expect(
        mockDealQuery!({}, validArgs, {} as never, {} as never)
      ).rejects.toThrow(GraphQLError);

      await expect(
        mockDealQuery!({}, validArgs, {} as never, {} as never)
      ).rejects.toThrow("Failed to verify the account.");
    });

    it("should return existing deal when found in database", async () => {
      (signatureValid as jest.Mock).mockReturnValue(true);

      const mockDeal = {
        _id: "deal-123",
        code: "DISCOUNT10",
        hash: "0x1234567890abcdef",
        decks: 1,
        deck: { _id: "deck-123", title: "Test Deck" },
      };

      const mockPopulate = jest.fn().mockResolvedValue(mockDeal);
      (Deal.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      process.env.NODE_ENV = "production";

      const result = await mockDealQuery!({}, validArgs, {} as never, {} as never);

      expect(signatureValid).toHaveBeenCalledWith(validArgs.hash, validArgs.signature);
      expect(Deal.findOne).toHaveBeenCalledWith({
        hash: validArgs.hash.toLowerCase(),
        deck: validArgs.deckId,
      });
      expect(result).toEqual(mockDeal);
    });

    it("should lowercase hash when querying database", async () => {
      (signatureValid as jest.Mock).mockReturnValue(true);

      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deal.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      process.env.NODE_ENV = "production";

      await mockDealQuery!(
        {},
        { ...validArgs, hash: "0xABCDEF" },
        {} as never,
        {} as never
      );

      expect(Deal.findOne).toHaveBeenCalledWith({
        hash: "0xabcdef",
        deck: validArgs.deckId,
      });
    });

    it("should return null when deal not found", async () => {
      (signatureValid as jest.Mock).mockReturnValue(true);

      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deal.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      process.env.NODE_ENV = "production";

      const result = await mockDealQuery!({}, validArgs, {} as never, {} as never);

      // Returns null when no deal found and DISCOUNT_CODE not set at module load
      expect(result).toBeNull();
    });

    it("should call signatureValid with correct arguments", async () => {
      (signatureValid as jest.Mock).mockReturnValue(true);

      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deal.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      await mockDealQuery!(
        {},
        { hash: "0xTestHash", deckId: "deck-456", signature: "test-sig" },
        {} as never,
        {} as never
      );

      expect(signatureValid).toHaveBeenCalledWith("0xTestHash", "test-sig");
    });

    it("should handle database query with correct deck filter", async () => {
      (signatureValid as jest.Mock).mockReturnValue(true);

      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deal.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      process.env.NODE_ENV = "production";

      await mockDealQuery!(
        {},
        { hash: "0xABC", deckId: "special-deck-id", signature: "sig" },
        {} as never,
        {} as never
      );

      expect(Deal.findOne).toHaveBeenCalledWith({
        hash: "0xabc",
        deck: "special-deck-id",
      });
    });

    it("should populate deck relationship when querying", async () => {
      (signatureValid as jest.Mock).mockReturnValue(true);

      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Deal.findOne as jest.Mock).mockReturnValue({ populate: mockPopulate });

      process.env.NODE_ENV = "production";

      await mockDealQuery!({}, validArgs, {} as never, {} as never);

      expect(mockPopulate).toHaveBeenCalledWith(["deck"]);
    });

    it("should validate signature before database query", async () => {
      (signatureValid as jest.Mock).mockReturnValue(false);

      await expect(
        mockDealQuery!({}, validArgs, {} as never, {} as never)
      ).rejects.toThrow();

      // Database should not be queried if signature is invalid
      expect(Deal.findOne).not.toHaveBeenCalled();
    });
  });
});

/**
 * Note: Tests for DISCOUNT_CODE behavior are not included because the
 * DISCOUNT_CODE environment variable is captured at module load time in deal.ts:
 *
 *   const { DISCOUNT_CODE: discountCode } = process.env;
 *
 * This means setting process.env.DISCOUNT_CODE in tests after the module
 * is imported has no effect. To properly test discount code behavior,
 * the code would need to be refactored to read the env var at runtime,
 * or tests would need to use jest.resetModules() with careful re-importing.
 *
 * The discount code functionality is covered by integration/e2e tests instead.
 */
