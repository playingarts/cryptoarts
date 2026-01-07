import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { DealQuery, useLoadDeal } from "../../hooks/deal";
import { renderApolloHook, waitFor } from "../../jest/apolloTestUtils";

const mockDeal = {
  _id: "deal-123",
  code: "DISCOUNT10",
  hash: "0x1234567890abcdef",
  decks: 2,
};

describe("hooks/deal", () => {
  describe("useLoadDeal", () => {
    it("returns loadDeal function and initially undefined deal", () => {
      const mocks = [
        {
          request: {
            query: DealQuery,
            variables: {
              hash: "0x1234",
              deckId: "deck-1",
              signature: "sig123",
            },
          },
          result: { data: { deal: mockDeal } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeal(), { mocks });

      expect(result.current.deal).toBeUndefined();
      expect(typeof result.current.loadDeal).toBe("function");
    });

    it("loads deal when loadDeal is called", async () => {
      const variables = {
        hash: "0x1234567890abcdef",
        deckId: "deck-1",
        signature: "valid-signature",
      };

      const mocks = [
        {
          request: { query: DealQuery, variables },
          result: { data: { deal: mockDeal } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeal(), { mocks });

      // Initially no deal
      expect(result.current.deal).toBeUndefined();

      // Call loadDeal
      act(() => {
        result.current.loadDeal({ variables });
      });

      // Wait for resolution
      await waitFor(() => {
        expect(result.current.deal).toBeDefined();
      });

      expect(result.current.deal?._id).toBe("deal-123");
      expect(result.current.deal?.code).toBe("DISCOUNT10");
    });

    it("handles error when deal not found", async () => {
      const variables = {
        hash: "0xinvalid",
        deckId: "deck-1",
        signature: "sig",
      };

      const mocks = [
        {
          request: { query: DealQuery, variables },
          result: { errors: [new GraphQLError("Deal not found")] },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeal(), { mocks });

      act(() => {
        result.current.loadDeal({ variables });
      });

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });

      expect(result.current.error?.message).toContain("Deal not found");
      expect(result.current.deal).toBeUndefined();
    });

    it("handles signature validation error", async () => {
      const variables = {
        hash: "0x1234",
        deckId: "deck-1",
        signature: "invalid-signature",
      };

      const mocks = [
        {
          request: { query: DealQuery, variables },
          result: {
            errors: [new GraphQLError("Failed to verify the account.")],
          },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeal(), { mocks });

      act(() => {
        result.current.loadDeal({ variables });
      });

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });

      expect(result.current.error?.message).toContain(
        "Failed to verify the account"
      );
    });

    it("returns null when no deal exists", async () => {
      const variables = {
        hash: "0xnodeal",
        deckId: "deck-1",
        signature: "sig",
      };

      const mocks = [
        {
          request: { query: DealQuery, variables },
          result: { data: { deal: null } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeal(), { mocks });

      act(() => {
        result.current.loadDeal({ variables });
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.deal).toBeNull();
      expect(result.current.error).toBeUndefined();
    });

    it("exposes loading state", async () => {
      const variables = {
        hash: "0x1234",
        deckId: "deck-1",
        signature: "sig",
      };

      const mocks = [
        {
          request: { query: DealQuery, variables },
          result: { data: { deal: mockDeal } },
        },
      ];

      const { result } = renderApolloHook(() => useLoadDeal(), { mocks });

      // Initially not loading (lazy query)
      expect(result.current.loading).toBe(false);

      act(() => {
        result.current.loadDeal({ variables });
      });

      // Should be loading after calling loadDeal
      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    // Note: onCompleted callback testing omitted - tests Apollo internals
  });
});
