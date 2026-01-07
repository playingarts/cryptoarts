/**
 * @jest-environment node
 */

// Mock mongoose before importing the route
jest.mock("mongoose", () => ({
  connection: {
    readyState: 1,
  },
}));

jest.mock("../../source/mongoose", () => ({
  connect: jest.fn().mockResolvedValue(undefined),
}));

import mongoose from "mongoose";
import { GET } from "../../app/api/health/route";
import { connect } from "../../source/mongoose";

describe("Health API Route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("Basic health check", () => {
    it("should return 200 when all checks pass", async () => {
      const response = await GET();

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.status).toBe("ok");
    });

    it("should include version from package.json", async () => {
      const response = await GET();
      const body = await response.json();

      expect(body.version).toBeDefined();
      expect(typeof body.version).toBe("string");
    });

    it("should include timestamp", async () => {
      const response = await GET();
      const body = await response.json();

      expect(body.timestamp).toBeDefined();
      // Verify it's a valid ISO date string
      expect(() => new Date(body.timestamp)).not.toThrow();
    });

    it("should include uptime", async () => {
      const response = await GET();
      const body = await response.json();

      expect(body.uptime).toBeDefined();
      expect(typeof body.uptime).toBe("number");
      expect(body.uptime).toBeGreaterThan(0);
    });

    it("should set Cache-Control header to prevent caching", async () => {
      const response = await GET();

      expect(response.headers.get("Cache-Control")).toBe(
        "no-store, no-cache, must-revalidate"
      );
    });

    it("should include X-Response-Time header", async () => {
      const response = await GET();

      expect(response.headers.get("X-Response-Time")).toMatch(/^\d+ms$/);
    });
  });

  describe("Memory check", () => {
    it("should include memory status in checks", async () => {
      const response = await GET();
      const body = await response.json();

      expect(body.checks).toBeDefined();
      expect(body.checks.memory).toBeDefined();
      expect(body.checks.memory.status).toBe("ok");
      expect(body.checks.memory.message).toContain("heap:");
    });

    it("should include detailed memory information", async () => {
      const response = await GET();
      const body = await response.json();

      const memMessage = body.checks.memory.message;
      expect(memMessage).toContain("heap:");
      expect(memMessage).toContain("rss:");
      expect(memMessage).toContain("external:");
      expect(memMessage).toContain("buffers:");
    });
  });

  describe("Rate limit check", () => {
    it("should show in-memory rate limiting when Redis is not configured", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL;
      delete process.env.UPSTASH_REDIS_REST_TOKEN;

      const response = await GET();
      const body = await response.json();

      expect(body.checks.rateLimit.status).toBe("ok");
      expect(body.checks.rateLimit.message).toBe("In-memory (per-instance)");
    });

    it("should show Upstash Redis when configured", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.com";
      process.env.UPSTASH_REDIS_REST_TOKEN = "token123";

      const response = await GET();
      const body = await response.json();

      expect(body.checks.rateLimit.status).toBe("ok");
      expect(body.checks.rateLimit.message).toBe("Upstash Redis (distributed)");
    });
  });

  describe("Database check", () => {
    it("should show database connected when mongoose is connected", async () => {
      (mongoose.connection as { readyState: number }).readyState = 1;

      const response = await GET();
      const body = await response.json();

      expect(body.checks.database.status).toBe("ok");
      expect(body.checks.database.message).toBe("MongoDB connected");
      expect(body.checks.database.latency).toBeDefined();
    });

    it("should show error when mongoose is disconnected", async () => {
      (mongoose.connection as { readyState: number }).readyState = 0;

      const response = await GET();
      const body = await response.json();

      expect(body.checks.database.status).toBe("error");
      expect(body.checks.database.message).toBe("MongoDB state: 0");
    });

    it("should show error when mongoose is connecting", async () => {
      (mongoose.connection as { readyState: number }).readyState = 2;

      const response = await GET();
      const body = await response.json();

      expect(body.checks.database.status).toBe("error");
      expect(body.checks.database.message).toBe("MongoDB state: 2");
    });

    it("should handle database connection errors", async () => {
      (connect as jest.Mock).mockRejectedValueOnce(new Error("Connection refused"));

      const response = await GET();
      const body = await response.json();

      expect(body.checks.database.status).toBe("error");
      expect(body.checks.database.message).toBe("Connection refused");
    });

    it("should call connect function", async () => {
      await GET();

      expect(connect).toHaveBeenCalled();
    });
  });

  describe("Overall status determination", () => {
    it("should return 503 and status 'down' when database check fails", async () => {
      (connect as jest.Mock).mockRejectedValueOnce(new Error("Connection failed"));

      const response = await GET();

      expect(response.status).toBe(503);
      const body = await response.json();
      expect(body.status).toBe("down");
    });

    it("should return 'down' status when database is disconnected", async () => {
      (mongoose.connection as { readyState: number }).readyState = 0;

      const response = await GET();
      const body = await response.json();

      expect(body.status).toBe("down");
      expect(response.status).toBe(503);
    });

    it("should mark database check as critical", async () => {
      (mongoose.connection as { readyState: number }).readyState = 1;

      const response = await GET();
      const body = await response.json();

      expect(body.checks.database.critical).toBe(true);
    });
  });
});
