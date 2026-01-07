import { createLogEntry } from "../../lib/apiLogger";
import { NextApiRequest, NextApiResponse } from "next";

describe("lib/apiLogger", () => {
  const mockRequest = (overrides: Partial<NextApiRequest> = {}) =>
    ({
      method: "GET",
      url: "/api/test",
      headers: {
        "x-forwarded-for": "192.168.1.1",
        "user-agent": "test-agent",
      },
      socket: { remoteAddress: "127.0.0.1" },
      ...overrides,
    }) as NextApiRequest;

  const mockResponse = (overrides: Partial<NextApiResponse> = {}) =>
    ({
      statusCode: 200,
      ...overrides,
    }) as NextApiResponse;

  describe("createLogEntry", () => {
    it("should create a log entry with all fields", () => {
      const req = mockRequest();
      const res = mockResponse();
      const startTime = Date.now() - 100;

      const entry = createLogEntry(req, res, startTime);

      expect(entry).toHaveProperty("timestamp");
      expect(entry.method).toBe("GET");
      expect(entry.path).toBe("/api/test");
      expect(entry.status).toBe(200);
      expect(entry.duration).toBeGreaterThanOrEqual(100);
      expect(entry.ip).toBe("192.168.1.1");
      expect(entry.userAgent).toBe("test-agent");
    });

    it("should handle POST method", () => {
      const req = mockRequest({ method: "POST" });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.method).toBe("POST");
    });

    it("should handle different status codes", () => {
      const req = mockRequest();
      const res = mockResponse({ statusCode: 404 });
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.status).toBe(404);
    });

    it("should use x-real-ip when x-forwarded-for is not available", () => {
      const req = mockRequest({
        headers: {
          "x-real-ip": "10.0.0.1",
          "user-agent": "test-agent",
        },
      });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.ip).toBe("10.0.0.1");
    });

    it("should use first IP from x-forwarded-for header", () => {
      const req = mockRequest({
        headers: {
          "x-forwarded-for": "192.168.1.1, 10.0.0.1, 172.16.0.1",
          "user-agent": "test-agent",
        },
      });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.ip).toBe("192.168.1.1");
    });

    it("should handle missing user-agent", () => {
      const req = mockRequest({
        headers: {
          "x-forwarded-for": "192.168.1.1",
        },
      });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.userAgent).toBeUndefined();
    });

    it("should calculate duration correctly", () => {
      const req = mockRequest();
      const res = mockResponse();
      const startTime = Date.now() - 500;

      const entry = createLogEntry(req, res, startTime);

      expect(entry.duration).toBeGreaterThanOrEqual(500);
      expect(entry.duration).toBeLessThan(600);
    });

    it("should handle missing method", () => {
      const req = mockRequest({ method: undefined });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.method).toBe("UNKNOWN");
    });

    it("should handle missing url", () => {
      const req = mockRequest({ url: undefined });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.path).toBe("/");
    });
  });
});
