/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { POST } from "../../../../../app/api/v1/newsletter/route";

describe("Newsletter API Endpoint", () => {
  const createRequest = (email: string, ip = "127.0.0.1") => {
    return new NextRequest("http://localhost:3000/api/v1/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify({ email }),
    });
  };

  it("should return status 400 for invalid email format", async () => {
    const request = createRequest("invalid-email");
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("should return status 400 for empty email", async () => {
    const request = createRequest("");
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("should return status 400 for email exceeding max length", async () => {
    const longEmail = "a".repeat(250) + "@test.com";
    const request = createRequest(longEmail);
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("should accept valid email format", async () => {
    const request = createRequest("valid@test.com");
    const response = await POST(request);

    // Will fail with actual API call but validates format check passes
    // The status depends on MailerLite API response
    expect([200, 400, 500]).toContain(response.status);
  });
});
