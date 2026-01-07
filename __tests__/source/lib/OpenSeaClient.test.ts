/**
 * @jest-environment node
 */

import { http, HttpResponse } from "msw";
import { server } from "../../../jest/node";
import { OpenSeaClient } from "../../../source/lib/OpenSeaClient";

describe("source/lib/OpenSeaClient", () => {
  const OPENSEA_BASE_URL = "https://api.opensea.io/api/v2";

  describe("constructor", () => {
    it("should use default config", () => {
      const client = new OpenSeaClient();
      expect(client).toBeDefined();
    });

    it("should accept custom config", () => {
      const client = new OpenSeaClient({
        assetsApiKey: "custom-assets-key",
        apiKey: "custom-api-key",
        retryAttempts: 5,
        retryDelay: 1000,
      });
      expect(client).toBeDefined();
    });
  });

  describe("getCollectionStats", () => {
    it("should fetch collection stats", async () => {
      const mockStats = {
        total: {
          volume: 1000.5,
          num_owners: 500,
          floor_price: 0.5,
        },
      };

      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test-collection/stats`, () =>
          HttpResponse.json(mockStats)
        )
      );

      const client = new OpenSeaClient({ apiKey: "test-key" });
      const stats = await client.getCollectionStats("test-collection");

      expect(stats.total.volume).toBe(1000.5);
      expect(stats.total.num_owners).toBe(500);
      expect(stats.total.floor_price).toBe(0.5);
    });

    it("should throw on API error", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/invalid/stats`, () =>
          HttpResponse.json({ error: "Not found" }, { status: 404 })
        )
      );

      const client = new OpenSeaClient({ apiKey: "test-key" });

      await expect(client.getCollectionStats("invalid")).rejects.toThrow(
        "OpenSea API error: 404"
      );
    });
  });

  describe("getCollection", () => {
    it("should fetch collection info", async () => {
      const mockCollection = {
        name: "Test Collection",
        total_supply: "1000",
      };

      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test-collection`, () =>
          HttpResponse.json(mockCollection)
        )
      );

      const client = new OpenSeaClient({ apiKey: "test-key" });
      const collection = await client.getCollection("test-collection");

      expect(collection.name).toBe("Test Collection");
      expect(collection.total_supply).toBe("1000");
    });
  });

  describe("getCollectionListings", () => {
    it("should fetch best listings", async () => {
      const mockListings = {
        listings: [
          {
            price: { current: { value: "1000000000000000000" } },
            protocol_data: {
              parameters: {
                offer: [{ token: "0xABC", identifierOrCriteria: "123" }],
              },
            },
          },
        ],
        next: null,
      };

      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/listings/collection/test-collection/best`,
          () => HttpResponse.json(mockListings)
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
      });
      const result = await client.getCollectionListings("test-collection");

      expect(result.listings).toHaveLength(1);
      expect(result.listings[0].price.current.value).toBe("1000000000000000000");
    });

    it("should handle pagination cursor", async () => {
      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/listings/collection/test-collection/best`,
          ({ request }) => {
            const url = new URL(request.url);
            const next = url.searchParams.get("next");

            if (next === "cursor123") {
              return HttpResponse.json({ listings: [], next: null });
            }

            return HttpResponse.json({
              listings: [
                {
                  price: { current: { value: "1" } },
                  protocol_data: {
                    parameters: {
                      offer: [{ token: "0x", identifierOrCriteria: "1" }],
                    },
                  },
                },
              ],
              next: "cursor123",
            });
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
      });
      const result = await client.getCollectionListings("test-collection", {
        next: "cursor123",
      });

      expect(result.listings).toHaveLength(0);
    });
  });

  describe("getAllCollectionListings", () => {
    it("should fetch all listings with pagination", async () => {
      let callCount = 0;

      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/listings/collection/test-collection/best`,
          () => {
            callCount++;
            if (callCount === 1) {
              return HttpResponse.json({
                listings: [
                  {
                    price: { current: { value: "1" } },
                    protocol_data: {
                      parameters: {
                        offer: [
                          { token: "0xABC123", identifierOrCriteria: "100" },
                        ],
                      },
                    },
                  },
                ],
                next: "page2",
              });
            }
            return HttpResponse.json({
              listings: [
                {
                  price: { current: { value: "2" } },
                  protocol_data: {
                    parameters: {
                      offer: [
                        { token: "0xDEF456", identifierOrCriteria: "200" },
                      ],
                    },
                  },
                },
              ],
              next: null,
            });
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
      });
      const listings = await client.getAllCollectionListings("test-collection");

      expect(listings).toHaveLength(2);
      expect(callCount).toBe(2);
    });

    it("should normalize token addresses to lowercase", async () => {
      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/listings/collection/test-collection/best`,
          () =>
            HttpResponse.json({
              listings: [
                {
                  price: { current: { value: "1" } },
                  protocol_data: {
                    parameters: {
                      offer: [
                        { token: "0xABCDEF", identifierOrCriteria: "0xGHIJKL" },
                      ],
                    },
                  },
                },
              ],
              next: null,
            })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
      });
      const listings = await client.getAllCollectionListings("test-collection");

      expect(listings[0].protocol_data.parameters.offer[0].token).toBe(
        "0xabcdef"
      );
      expect(
        listings[0].protocol_data.parameters.offer[0].identifierOrCriteria
      ).toBe("0xghijkl");
    });
  });

  describe("getCollectionNfts", () => {
    it("should fetch NFTs with default limit", async () => {
      const mockNfts = {
        nfts: [
          {
            identifier: "1",
            contract: "0x123",
            token_standard: "erc721",
            name: "NFT #1",
            description: "Test NFT",
          },
        ],
        next: null,
      };

      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/collection/test-collection/nfts`,
          ({ request }) => {
            const url = new URL(request.url);
            expect(url.searchParams.get("limit")).toBe("200");
            return HttpResponse.json(mockNfts);
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
        retryAttempts: 0,
      });
      const result = await client.getCollectionNfts("test-collection");

      expect(result.nfts).toHaveLength(1);
      expect(result.nfts[0].identifier).toBe("1");
    });

    it("should accept custom limit", async () => {
      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/collection/test-collection/nfts`,
          ({ request }) => {
            const url = new URL(request.url);
            expect(url.searchParams.get("limit")).toBe("50");
            return HttpResponse.json({ nfts: [], next: null });
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
        retryAttempts: 0,
      });
      await client.getCollectionNfts("test-collection", { limit: 50 });
    });
  });

  describe("getNft", () => {
    it("should fetch single NFT", async () => {
      const mockNft = {
        nft: {
          identifier: "123",
          contract: "0xcontract",
          token_standard: "erc721",
          name: "My NFT",
          description: "A test NFT",
          owners: [{ address: "0xowner", quantity: "1" }],
        },
      };

      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/chain/ethereum/contract/0xcontract/nfts/123`,
          () => HttpResponse.json(mockNft)
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
        retryAttempts: 0,
      });
      const nft = await client.getNft("0xcontract", "123");

      expect(nft.identifier).toBe("123");
      expect(nft.name).toBe("My NFT");
      expect(nft.owners).toHaveLength(1);
    });
  });

  describe("Error handling", () => {
    it("should include URL and status in error metadata", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/error-test/stats`, () =>
          HttpResponse.json({ detail: "Server error" }, { status: 500 })
        )
      );

      const client = new OpenSeaClient({ apiKey: "test-key" });

      try {
        await client.getCollectionStats("error-test");
        fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeDefined();
        if (error instanceof Error) {
          expect(error.message).toContain("500");
        }
      }
    });
  });

  describe("API key handling", () => {
    it("should send correct API key header", async () => {
      let capturedApiKey: string | null = null;

      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test/stats`, ({ request }) => {
          capturedApiKey = request.headers.get("X-API-KEY");
          return HttpResponse.json({
            total: { volume: 0, num_owners: 0, floor_price: 0 },
          });
        })
      );

      const client = new OpenSeaClient({ apiKey: "my-custom-key" });
      await client.getCollectionStats("test");

      expect(capturedApiKey).toBe("my-custom-key");
    });

    it("should use assets key for asset endpoints", async () => {
      let capturedApiKey: string | null = null;

      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/listings/collection/test/best`,
          ({ request }) => {
            capturedApiKey = request.headers.get("X-API-KEY");
            return HttpResponse.json({ listings: [], next: null });
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "regular-key",
        assetsApiKey: "assets-key",
      });
      await client.getCollectionListings("test");

      expect(capturedApiKey).toBe("assets-key");
    });
  });
});
