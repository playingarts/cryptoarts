import { act } from "@testing-library/react";
import { GraphQLError } from "graphql";
import {
  ProductsQuery,
  ConvertEurToUsdQuery,
  useProducts,
  useConvertEurToUsd,
} from "../../hooks/product";
import { renderApolloHook, waitForQuery } from "../../jest/apolloTestUtils";

const mockProduct = {
  _id: "product-1",
  title: "Crypto Edition Deck",
  short: "Limited edition",
  info: "Product info",
  status: "active",
  type: "deck",
  labels: ["new", "limited"],
  description: "Full description",
  fullPrice: { usd: 150, eur: 140 },
  price: { eur: 100, usd: 110 },
  image: "product.jpg",
  image2: "product2.jpg",
  decks: [{ _id: "deck-1" }],
  deck: {
    _id: "deck-1",
    slug: "crypto",
    labels: ["nft"],
    short: "Crypto deck",
    previewCards: [
      {
        _id: "card-1",
        img: "card.jpg",
        artist: { _id: "artist-1", name: "Test", slug: "test" },
      },
    ],
    openseaCollection: { name: "Crypto", address: "0x123" },
  },
};

describe("hooks/product", () => {
  describe("useProducts", () => {
    it("returns products data on success", async () => {
      const mocks = [
        {
          request: { query: ProductsQuery, variables: {} },
          result: { data: { products: [mockProduct] } },
        },
      ];

      const { result } = renderApolloHook(() => useProducts(), { mocks });

      expect(result.current.loading).toBe(true);
      expect(result.current.products).toBeUndefined();

      await act(waitForQuery);

      expect(result.current.loading).toBe(false);
      expect(result.current.products).toEqual([mockProduct]);
    });

    it("returns products filtered by ids", async () => {
      const mocks = [
        {
          request: {
            query: ProductsQuery,
            variables: { ids: ["product-1", "product-2"] },
          },
          result: { data: { products: [mockProduct] } },
        },
      ];

      const { result } = renderApolloHook(
        () => useProducts({ variables: { ids: ["product-1", "product-2"] } }),
        { mocks }
      );

      await act(waitForQuery);

      expect(result.current.products).toEqual([mockProduct]);
    });

    it("returns error on failure", async () => {
      const mocks = [
        {
          request: { query: ProductsQuery, variables: {} },
          result: { errors: [new GraphQLError("Failed to fetch products")] },
        },
      ];

      const { result } = renderApolloHook(() => useProducts(), { mocks });

      await act(waitForQuery);

      expect(result.current.error?.message).toContain("Failed to fetch products");
    });
  });

  describe("useConvertEurToUsd", () => {
    it("returns converted USD value", async () => {
      const mocks = [
        {
          request: { query: ConvertEurToUsdQuery, variables: { eur: 100 } },
          result: { data: { convertEurToUsd: 110.5 } },
        },
      ];

      const { result } = renderApolloHook(
        () => useConvertEurToUsd({ variables: { eur: 100 } }),
        { mocks }
      );

      expect(result.current.loading).toBe(true);

      await act(waitForQuery);

      expect(result.current.usd).toBe(110.5);
      expect(result.current.loading).toBe(false);
    });

    it("returns error on conversion failure", async () => {
      const mocks = [
        {
          request: { query: ConvertEurToUsdQuery, variables: { eur: -1 } },
          result: { errors: [new GraphQLError("Invalid amount")] },
        },
      ];

      const { result } = renderApolloHook(
        () => useConvertEurToUsd({ variables: { eur: -1 } }),
        { mocks }
      );

      await act(waitForQuery);

      expect(result.current.error?.message).toContain("Invalid amount");
    });
  });
});
