import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import { RatingsQuery, useRatings } from "../../hooks/ratings";
import { renderApolloHook, waitForQuery } from "../../jest/apolloTestUtils";

const mockRating = {
  _id: "rating-1",
  title: "Crypto Edition",
  who: "John Doe",
  review: "Amazing quality and design!",
};

describe("hooks/ratings", () => {
  describe("useRatings", () => {
    it("returns ratings data on success", async () => {
      const mocks = [
        {
          request: { query: RatingsQuery, variables: {} },
          result: { data: { ratings: [mockRating] } },
        },
      ];

      const { result } = renderApolloHook(() => useRatings(), { mocks });

      expect(result.current.loading).toBe(true);
      expect(result.current.ratings).toBeUndefined();

      await act(waitForQuery);

      expect(result.current.loading).toBe(false);
      expect(result.current.ratings).toEqual([mockRating]);
    });

    it("returns ratings filtered by title", async () => {
      const mocks = [
        {
          request: { query: RatingsQuery, variables: { title: "Crypto" } },
          result: { data: { ratings: [mockRating] } },
        },
      ];

      const { result } = renderApolloHook(
        () => useRatings({ variables: { title: "Crypto" } }),
        { mocks }
      );

      await act(waitForQuery);

      expect(result.current.ratings).toEqual([mockRating]);
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: RatingsQuery, variables: {} },
          result: { errors: [new GraphQLError("Failed to fetch ratings")] },
        },
      ];

      const { result } = renderApolloHook(() => useRatings(), { mocks });

      await act(waitForQuery);

      expect(result.current.error?.message).toContain("Failed to fetch ratings");
    });

    it("returns empty array when no ratings exist", async () => {
      const mocks = [
        {
          request: { query: RatingsQuery, variables: {} },
          result: { data: { ratings: [] } },
        },
      ];

      const { result } = renderApolloHook(() => useRatings(), { mocks });

      await act(waitForQuery);

      expect(result.current.ratings).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });
});
