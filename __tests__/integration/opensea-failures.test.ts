/**
 * @jest-environment node
 */

import { http, HttpResponse, delay } from "msw";
import { server } from "../../jest/node";
import { OpenSeaClient } from "../../source/lib/OpenSeaClient";

/**
 * Integration tests for OpenSea API failure scenarios
 * Tests how the application handles various failure modes:
 * - Network errors
 * - Rate limiting (429)
 * - Server errors (500, 502, 503)
 * - Timeouts
 * - Malformed responses
 */

const OPENSEA_BASE_URL = "https://api.opensea.io/api/v2";

describe("OpenSea API Failure Handling", () => {
  describe("Network Errors", () => {
    it("should handle network failure gracefully", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test/stats`, () => {
          return HttpResponse.error();
        })
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("test")).rejects.toThrow();
    });

    it("should handle connection refused", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test/stats`, () => {
          return HttpResponse.error();
        })
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("test")).rejects.toThrow();
    });
  });

  describe("Rate Limiting (429)", () => {
    it("should handle rate limit response", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/rate-limited/stats`, () =>
          HttpResponse.json(
            { detail: "Request was throttled" },
            { status: 429 }
          )
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(
        client.getCollectionStats("rate-limited")
      ).rejects.toThrow();
    });

    it("should retry on rate limit with retryAttempts > 0", async () => {
      let callCount = 0;

      // Note: getCollectionNfts uses fetchWithRetry, not getCollectionStats
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collection/retry-test/nfts`, () => {
          callCount++;
          if (callCount < 3) {
            return HttpResponse.json(
              { detail: "Request was throttled" },
              { status: 429 }
            );
          }
          return HttpResponse.json({
            nfts: [{ identifier: "1", name: "Test NFT" }],
            next: null,
          });
        })
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
        retryAttempts: 5,
        retryDelay: 10, // Fast retry for tests
      });

      const result = await client.getCollectionNfts("retry-test");
      expect(result.nfts).toHaveLength(1);
      expect(callCount).toBe(3);
    });
  });

  describe("Server Errors", () => {
    it("should handle 500 Internal Server Error", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/error500/stats`, () =>
          HttpResponse.json({ error: "Internal Server Error" }, { status: 500 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("error500")).rejects.toThrow(
        "500"
      );
    });

    it("should handle 502 Bad Gateway", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/error502/stats`, () =>
          HttpResponse.json({ error: "Bad Gateway" }, { status: 502 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("error502")).rejects.toThrow(
        "502"
      );
    });

    it("should handle 503 Service Unavailable", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/error503/stats`, () =>
          HttpResponse.json({ error: "Service Unavailable" }, { status: 503 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("error503")).rejects.toThrow(
        "503"
      );
    });
  });

  describe("Client Errors", () => {
    it("should handle 400 Bad Request", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/invalid/stats`, () =>
          HttpResponse.json({ error: "Bad Request" }, { status: 400 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("invalid")).rejects.toThrow("400");
    });

    it("should handle 401 Unauthorized (invalid API key)", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test/stats`, () =>
          HttpResponse.json({ error: "Invalid API key" }, { status: 401 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "invalid-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("test")).rejects.toThrow("401");
    });

    it("should handle 403 Forbidden", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/test/stats`, () =>
          HttpResponse.json({ error: "Forbidden" }, { status: 403 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("test")).rejects.toThrow("403");
    });

    it("should handle 404 Not Found", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/nonexistent/stats`, () =>
          HttpResponse.json({ error: "Collection not found" }, { status: 404 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("nonexistent")).rejects.toThrow(
        "404"
      );
    });
  });

  describe("Malformed Responses", () => {
    it("should handle empty response body", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/empty/stats`, () =>
          new HttpResponse(null, { status: 200 })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      // Should throw when trying to parse null as JSON
      await expect(client.getCollectionStats("empty")).rejects.toThrow();
    });

    it("should handle non-JSON response", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/html/stats`, () =>
          new HttpResponse("<html>Error page</html>", {
            status: 200,
            headers: { "Content-Type": "text/html" },
          })
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      await expect(client.getCollectionStats("html")).rejects.toThrow();
    });
  });

  describe("Pagination Failure Handling", () => {
    it("should handle failure during paginated request", async () => {
      let callCount = 0;

      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/listings/collection/test/best`,
          () => {
            callCount++;
            if (callCount === 1) {
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
                next: "page2",
              });
            }
            // Second page fails
            return HttpResponse.json(
              { error: "Server Error" },
              { status: 500 }
            );
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
        retryAttempts: 0,
      });

      await expect(client.getAllCollectionListings("test")).rejects.toThrow();
    });
  });

  describe("Timeout Simulation", () => {
    it("should handle slow responses", async () => {
      server.use(
        http.get(`${OPENSEA_BASE_URL}/collections/slow/stats`, async () => {
          await delay(100); // Simulate slow response
          return HttpResponse.json({
            total: { volume: 100, num_owners: 50, floor_price: 1.0 },
          });
        })
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        retryAttempts: 0,
      });

      // Should still succeed with slow but eventual response
      const stats = await client.getCollectionStats("slow");
      expect(stats.total.volume).toBe(100);
    });
  });

  describe("Recovery Scenarios", () => {
    it("should recover after intermittent failures", async () => {
      let callCount = 0;

      // Note: getCollectionNfts uses fetchWithRetry which has retry logic
      server.use(
        http.get(
          `${OPENSEA_BASE_URL}/collection/intermittent/nfts`,
          () => {
            callCount++;
            // Fail first 2 attempts, succeed on 3rd
            if (callCount <= 2) {
              return HttpResponse.json(
                { error: "Temporary failure" },
                { status: 503 }
              );
            }
            return HttpResponse.json({
              nfts: [{ identifier: "1", name: "Recovered NFT" }],
              next: null,
            });
          }
        )
      );

      const client = new OpenSeaClient({
        apiKey: "test-key",
        assetsApiKey: "test-assets-key",
        retryAttempts: 5,
        retryDelay: 10,
      });

      const result = await client.getCollectionNfts("intermittent");
      expect(result.nfts).toHaveLength(1);
      expect(callCount).toBe(3);
    });
  });
});
