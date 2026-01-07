/**
 * @jest-environment node
 */

import { http, HttpResponse } from "msw";
import { server } from "../../jest/node";

// Mock the fetchLogger before importing fetch
jest.mock("../../source/logger", () => ({
  fetchLogger: jest.fn((response) => response),
}));

import fetch from "../../source/fetch";
import { fetchLogger } from "../../source/logger";

describe("source/fetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should make fetch request and return response", async () => {
    server.use(
      http.get("https://example.com/api/test", () =>
        HttpResponse.json({ success: true })
      )
    );

    const response = await fetch("https://example.com/api/test");

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it("should call fetchLogger with response and init", async () => {
    server.use(
      http.get("https://example.com/api/logged", () =>
        HttpResponse.json({ data: "test" })
      )
    );

    await fetch("https://example.com/api/logged", { method: "GET" });

    expect(fetchLogger).toHaveBeenCalledTimes(1);
    expect(fetchLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        url: "https://example.com/api/logged",
      }),
      expect.objectContaining({
        method: "GET",
        startTime: expect.any(Number),
      })
    );
  });

  it("should pass startTime in init", async () => {
    server.use(
      http.get("https://example.com/api/timed", () =>
        HttpResponse.json({})
      )
    );

    const beforeTime = Date.now();
    await fetch("https://example.com/api/timed");
    const afterTime = Date.now();

    const call = (fetchLogger as jest.Mock).mock.calls[0];
    const init = call[1];

    expect(init.startTime).toBeGreaterThanOrEqual(beforeTime);
    expect(init.startTime).toBeLessThanOrEqual(afterTime);
  });

  it("should handle POST requests", async () => {
    server.use(
      http.post("https://example.com/api/post", () =>
        HttpResponse.json({ created: true }, { status: 201 })
      )
    );

    const response = await fetch("https://example.com/api/post", {
      method: "POST",
      body: JSON.stringify({ name: "test" }),
      headers: { "Content-Type": "application/json" },
    });

    expect(response.status).toBe(201);
    expect(fetchLogger).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("should handle error responses", async () => {
    server.use(
      http.get("https://example.com/api/error", () =>
        HttpResponse.json({ error: "Not found" }, { status: 404 })
      )
    );

    const response = await fetch("https://example.com/api/error");

    expect(response.status).toBe(404);
    expect(response.ok).toBe(false);
    expect(fetchLogger).toHaveBeenCalled();
  });

  it("should pass through request info", async () => {
    let capturedRequest: Request | null = null;

    server.use(
      http.get("https://example.com/api/headers", ({ request }) => {
        capturedRequest = request;
        return HttpResponse.json({});
      })
    );

    await fetch("https://example.com/api/headers", {
      headers: { Authorization: "Bearer token123" },
    });

    expect(capturedRequest).not.toBeNull();
    expect(capturedRequest!.headers.get("Authorization")).toBe("Bearer token123");
  });

  it("should work with URL object", async () => {
    server.use(
      http.get("https://example.com/api/url-object", () =>
        HttpResponse.json({ ok: true })
      )
    );

    const url = new URL("https://example.com/api/url-object");
    const response = await fetch(url);

    expect(response.ok).toBe(true);
  });

  it("should work with Request object", async () => {
    server.use(
      http.get("https://example.com/api/request-object", () =>
        HttpResponse.json({ ok: true })
      )
    );

    const request = new Request("https://example.com/api/request-object");
    const response = await fetch(request);

    expect(response.ok).toBe(true);
  });
});
