import {
  createLogEntry,
  generateRequestId,
  getRequestId,
  REQUEST_ID_HEADER,
} from "../../lib/apiLogger";
import { NextApiRequest, NextApiResponse } from "next";

describe("lib/apiLogger", () => {
  describe("generateRequestId", () => {
    it("should generate a valid UUID", () => {
      const id = generateRequestId();
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });

    it("should generate unique IDs", () => {
      const id1 = generateRequestId();
      const id2 = generateRequestId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("getRequestId", () => {
    it("should return existing request ID from plain object headers", () => {
      const headers = { [REQUEST_ID_HEADER]: "test-request-id-123" };
      expect(getRequestId(headers)).toBe("test-request-id-123");
    });

    it("should return existing request ID from Headers object", () => {
      const headers = new Headers();
      headers.set(REQUEST_ID_HEADER, "test-request-id-456");
      expect(getRequestId(headers)).toBe("test-request-id-456");
    });

    it("should generate new ID when header is missing from plain object", () => {
      const headers = {};
      const id = getRequestId(headers);
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });

    it("should generate new ID when header is missing from Headers object", () => {
      const headers = new Headers();
      const id = getRequestId(headers);
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });
  });

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
      expect(entry).toHaveProperty("requestId");
      expect(entry.method).toBe("GET");
      expect(entry.path).toBe("/api/test");
      expect(entry.status).toBe(200);
      expect(entry.duration).toBeGreaterThanOrEqual(100);
      expect(entry.ip).toBe("192.168.1.1");
      expect(entry.userAgent).toBe("test-agent");
    });

    it("should use provided requestId", () => {
      const req = mockRequest();
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime, "custom-request-id");

      expect(entry.requestId).toBe("custom-request-id");
    });

    it("should use requestId from headers when not provided", () => {
      const req = mockRequest({
        headers: {
          [REQUEST_ID_HEADER]: "header-request-id",
          "x-forwarded-for": "192.168.1.1",
          "user-agent": "test-agent",
        },
      });
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.requestId).toBe("header-request-id");
    });

    it("should generate requestId when not in headers", () => {
      const req = mockRequest();
      const res = mockResponse();
      const startTime = Date.now();

      const entry = createLogEntry(req, res, startTime);

      expect(entry.requestId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
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
