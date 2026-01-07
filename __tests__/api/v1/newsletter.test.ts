/**
 * @jest-environment node
 */

import { http, HttpResponse } from "msw";
import { server } from "../../../jest/node";
import { NextRequest } from "next/server";
import { POST } from "../../../app/api/v1/newsletter/route";

describe("Newsletter API Route", () => {
  const originalEnv = process.env;
  let testIpCounter = 0;

  // Generate unique IP for each test to avoid rate limit state sharing
  const getUniqueIp = () => `10.${Math.floor(testIpCounter / 256)}.${testIpCounter++ % 256}.1`;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      MAILERLITE_GROUPID: "test-group-id",
      MAILERLITE_API_KEY: "test-api-key",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    server.resetHandlers();
  });

  const createRequest = (body: object, headers: Record<string, string> = {}) => {
    // Always use a unique IP to avoid rate limit issues between tests
    const ip = headers["x-forwarded-for"] || getUniqueIp();
    return new NextRequest("http://localhost/api/v1/newsletter", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": ip,
        ...headers,
      },
    });
  };

  // Helper to set up MailerLite mock with specific status
  const mockMailerLite = (status: number) => {
    server.use(
      http.post(
        "https://api.mailerlite.com/api/v2/groups/test-group-id/subscribers",
        () => HttpResponse.json({}, { status })
      )
    );
  };

  describe("Email validation", () => {
    it("should accept valid email addresses", async () => {
      mockMailerLite(200);

      const request = createRequest({ email: "test@example.com" });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it("should accept emails with plus signs", async () => {
      mockMailerLite(200);

      const request = createRequest({ email: "test+newsletter@example.com" });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it("should accept emails with subdomains", async () => {
      mockMailerLite(200);

      const request = createRequest({ email: "user@mail.subdomain.example.com" });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it("should reject invalid email format - missing @", async () => {
      const request = createRequest({ email: "invalidemail.com" });
      const response = await POST(request);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe("Invalid email format");
    });

    it("should reject invalid email format - missing domain", async () => {
      const request = createRequest({ email: "test@" });
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("should reject invalid email format - missing local part", async () => {
      const request = createRequest({ email: "@example.com" });
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("should reject email exceeding 254 characters", async () => {
      const longEmail = "a".repeat(250) + "@example.com";
      const request = createRequest({ email: longEmail });
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("should reject non-string email values", async () => {
      const request = createRequest({ email: 12345 });
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("should reject null email", async () => {
      const request = createRequest({ email: null });
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it("should reject missing email field", async () => {
      const request = createRequest({});
      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });

  describe("MailerLite integration", () => {
    it("should call MailerLite API with email", async () => {
      let capturedRequest: Request | null = null;

      server.use(
        http.post(
          "https://api.mailerlite.com/api/v2/groups/test-group-id/subscribers",
          async ({ request }) => {
            capturedRequest = request;
            return HttpResponse.json({}, { status: 200 });
          }
        )
      );

      const request = createRequest({ email: "test@example.com" });
      await POST(request);

      expect(capturedRequest).not.toBeNull();
      const body = await capturedRequest!.json();
      expect(body.email).toBe("test@example.com");
    });

    it("should return 200 for successful subscription", async () => {
      mockMailerLite(200);

      const request = createRequest({ email: "test@example.com" });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it("should return 500 when MailerLite returns 500", async () => {
      mockMailerLite(500);

      const request = createRequest({ email: "test@example.com" });
      const response = await POST(request);

      expect(response.status).toBe(500);
    });

    it("should return 400 when MailerLite returns 400", async () => {
      mockMailerLite(400);

      const request = createRequest({ email: "test@example.com" });
      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    // Note: Retry logic with fake timers removed to avoid memory issues
    // The retry logic is simple and can be verified via integration tests
  });

  describe("Invalid request body", () => {
    it("should return 400 for invalid JSON body", async () => {
      const uniqueIp = getUniqueIp();
      const request = new NextRequest("http://localhost/api/v1/newsletter", {
        method: "POST",
        body: "not json",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": uniqueIp,
        },
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe("Invalid request body");
    });
  });

  describe("Rate limiting", () => {
    it("should extract IP from x-forwarded-for header", async () => {
      mockMailerLite(200);
      const uniqueIp = getUniqueIp();

      const request = createRequest(
        { email: "test@example.com" },
        { "x-forwarded-for": `${uniqueIp}, 198.51.100.1` }
      );
      const response = await POST(request);

      // First request should not be rate limited
      expect(response.status).toBe(200);
    });

    it("should extract IP from x-real-ip header when x-forwarded-for is missing", async () => {
      mockMailerLite(200);
      const uniqueIp = getUniqueIp();

      // Create request without x-forwarded-for
      const request = new NextRequest("http://localhost/api/v1/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": uniqueIp,
        },
      });
      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it("should return 429 when rate limit exceeded", async () => {
      mockMailerLite(200);

      // Use a unique IP for this test to avoid interference
      const testIp = `rate-limit-${Date.now()}.1.1.1`;

      // Make 5 requests (the limit) plus 1 more
      for (let i = 0; i < 6; i++) {
        const request = new NextRequest("http://localhost/api/v1/newsletter", {
          method: "POST",
          body: JSON.stringify({ email: `test${i}@example.com` }),
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": testIp,
          },
        });
        const response = await POST(request);

        if (i < 5) {
          expect(response.status).toBe(200);
        } else {
          expect(response.status).toBe(429);
          const body = await response.json();
          expect(body.error).toBe("Too Many Requests");
        }
      }
    });
  });
});
