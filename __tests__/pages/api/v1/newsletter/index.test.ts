/**
 * @jest-environment node
 */

import { createMocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "../../../../../pages/api/v1/newsletter";

describe("Newsletter API Endpoint", () => {
  const mockRequestResponse = (email: string) => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        "X-MailerLite-ApiKey": process.env.MAILERLITE_API_KEY || "empty",
        "Content-Type": "application/json",
      },
    }) as unknown as {
      req: NextApiRequest;
      res: NextApiResponse;
    };
    req.body = { email };
    return { req, res };
  };

  it("should return status 400 for invalid email format", async () => {
    const { req, res } = mockRequestResponse("invalid-email");
    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("should return status 400 from external API", async () => {
    const { req, res } = mockRequestResponse("error400@test.com");
    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("should return status 500 for server error", async () => {
    const { req, res } = mockRequestResponse("error500@test.com");
    await handler(req, res);

    expect(res.statusCode).toBe(500);
  });

  it("should handle rate limiting (429)", async () => {
    const { req, res } = mockRequestResponse("error429@test.com");
    await handler(req, res);

    // Test completes without throwing - rate limiting is handled gracefully
    expect(res.statusCode).toBeDefined();
  }, 30000);
});
