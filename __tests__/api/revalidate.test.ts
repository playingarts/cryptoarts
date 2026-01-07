/**
 * @jest-environment node
 */

// Mock revalidatePath before importing the route
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

import { NextRequest } from "next/server";
import { GET } from "../../app/api/revalidate/route";
import { revalidatePath } from "next/cache";

describe("Revalidate API Route", () => {
  const originalEnv = process.env;
  const VALID_SECRET = "test-revalidate-secret";

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      REVALIDATE_SECRET: VALID_SECRET,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const createRequest = (params: Record<string, string>) => {
    const url = new URL("http://localhost/api/revalidate");
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return new NextRequest(url);
  };

  describe("Authentication", () => {
    it("should return 401 when secret is missing", async () => {
      const request = createRequest({ pages: '["page1"]' });
      const response = await GET(request);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body.message).toBe("Invalid token");
    });

    it("should return 401 when secret is invalid", async () => {
      const request = createRequest({
        secret: "wrong-secret",
        pages: '["page1"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body.message).toBe("Invalid token");
    });

    it("should proceed when secret is valid", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(200);
    });
  });

  describe("Pages parameter validation", () => {
    it("should return 400 when pages parameter is missing", async () => {
      const request = createRequest({ secret: VALID_SECRET });
      const response = await GET(request);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.message).toBe("Missing pages parameter");
    });

    it("should return 500 when pages is not valid JSON", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: "not-json",
      });
      const response = await GET(request);

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.message).toBe("Error revalidating");
    });

    it("should accept empty pages array", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: "[]",
      });
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });

  describe("Revalidation behavior", () => {
    it("should revalidate single page", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/home"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.revalidated).toBe(true);
      expect(revalidatePath).toHaveBeenCalledWith("/home");
      expect(revalidatePath).toHaveBeenCalledTimes(1);
    });

    it("should revalidate multiple pages", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/page1", "/page2", "/page3"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(revalidatePath).toHaveBeenCalledWith("/page1");
      expect(revalidatePath).toHaveBeenCalledWith("/page2");
      expect(revalidatePath).toHaveBeenCalledWith("/page3");
      expect(revalidatePath).toHaveBeenCalledTimes(3);
    });

    it("should handle special characters in paths", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/deck/test-deck", "/cards/123"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(revalidatePath).toHaveBeenCalledWith("/deck/test-deck");
      expect(revalidatePath).toHaveBeenCalledWith("/cards/123");
    });

    it("should handle root path", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("Error handling", () => {
    it("should return 500 when revalidatePath throws", async () => {
      (revalidatePath as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Revalidation failed");
      });

      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/page"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.message).toBe("Error revalidating");
    });
  });

  describe("Security", () => {
    it("should not expose secret in response", async () => {
      const request = createRequest({
        secret: VALID_SECRET,
        pages: '["/"]',
      });
      const response = await GET(request);
      const body = await response.json();

      expect(JSON.stringify(body)).not.toContain(VALID_SECRET);
    });

    it("should not process request when REVALIDATE_SECRET is not set", async () => {
      delete process.env.REVALIDATE_SECRET;

      const request = createRequest({
        secret: "any-secret",
        pages: '["/"]',
      });
      const response = await GET(request);

      expect(response.status).toBe(401);
    });
  });
});
