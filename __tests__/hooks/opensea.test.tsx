import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import {
  OpenseaQuery,
  HoldersQuery,
  useOpensea,
  useHolders,
  useLoadOwnedAssets,
  OwnedAssetsQuery,
} from "../../hooks/opensea";
import { renderApolloHook, waitFor } from "../../jest/apolloTestUtils";

const mockOpensea = {
  id: "opensea-1",
  volume: 1500.5,
  floor_price: 0.05,
  num_owners: 500,
  total_supply: 1000,
  on_sale: 50,
};

const mockHolders = {
  fullDecks: 10,
  fullDecksWithJokers: 5,
  spades: 100,
  clubs: 98,
  hearts: 95,
  diamonds: 97,
  jokers: 20,
};

const mockOwnedAssets = [
  {
    traits: [
      { trait_type: "Suit", value: "Spades" },
      { trait_type: "Value", value: "Ace" },
    ],
    identifier: "1",
  },
];

describe("hooks/opensea", () => {
  describe("useOpensea", () => {
    it("returns opensea stats on success", async () => {
      const mocks = [
        {
          request: { query: OpenseaQuery, variables: { slug: "crypto" } },
          result: { data: { opensea: mockOpensea } },
        },
      ];

      const { result } = renderApolloHook(
        () => useOpensea({ variables: { slug: "crypto" } }),
        { mocks }
      );

      expect(result.current.loading).toBe(true);
      expect(result.current.opensea).toBeUndefined();

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.opensea).toBeDefined();
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: OpenseaQuery, variables: { slug: "invalid" } },
          result: { errors: [new GraphQLError("Collection not found")] },
        },
      ];

      const { result } = renderApolloHook(
        () => useOpensea({ variables: { slug: "invalid" } }),
        { mocks }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error?.message).toContain("Collection not found");
    });
  });

  describe("useHolders", () => {
    it("returns holders stats on success", async () => {
      const mocks = [
        {
          request: { query: HoldersQuery, variables: { slug: "crypto" } },
          result: { data: { holders: mockHolders } },
        },
      ];

      const { result } = renderApolloHook(
        () => useHolders({ variables: { slug: "crypto" } }),
        { mocks }
      );

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.holders).toBeDefined();
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: HoldersQuery, variables: { slug: "invalid" } },
          result: { errors: [new GraphQLError("Failed to fetch holders")] },
        },
      ];

      const { result } = renderApolloHook(
        () => useHolders({ variables: { slug: "invalid" } }),
        { mocks }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error?.message).toContain("Failed to fetch holders");
    });
  });

  describe("useLoadOwnedAssets", () => {
    it("returns loadOwnedAssets function for lazy loading", async () => {
      const mocks = [
        {
          request: {
            query: OwnedAssetsQuery,
            variables: {
              deck: "deck-1",
              address: "0xabc",
              signature: "sig123",
            },
          },
          result: { data: { ownedAssets: mockOwnedAssets } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadOwnedAssets(), { mocks });

      expect(result.current.ownedAssets).toBeUndefined();
      expect(typeof result.current.loadOwnedAssets).toBe("function");

      act(() => {
        result.current.loadOwnedAssets({
          variables: {
            deck: "deck-1",
            address: "0xabc",
            signature: "sig123",
          },
        });
      });

      await waitFor(() => {
        expect(result.current.ownedAssets).toBeDefined();
      });
    });
  });
});
