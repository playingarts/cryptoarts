import { apiSuccess, apiError, ApiErrors } from "../../lib/apiResponse";
import { REQUEST_ID_HEADER } from "../../lib/apiLogger";

describe("lib/apiResponse", () => {
  describe("apiSuccess", () => {
    it("should create a success response with data wrapper", async () => {
      const response = apiSuccess({ users: [{ id: 1 }] });
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({ data: { users: [{ id: 1 }] } });
    });

    it("should support custom status code", async () => {
      const response = apiSuccess({ created: true }, { status: 201 });

      expect(response.status).toBe(201);
    });

    it("should add request ID header when provided", () => {
      const response = apiSuccess({ ok: true }, { requestId: "test-123" });

      expect(response.headers.get(REQUEST_ID_HEADER)).toBe("test-123");
    });

    it("should include Content-Type header", () => {
      const response = apiSuccess({ ok: true });

      expect(response.headers.get("Content-Type")).toBe("application/json");
    });

    it("should support custom headers", () => {
      const response = apiSuccess(
        { ok: true },
        { headers: { "X-Custom": "value" } }
      );

      expect(response.headers.get("X-Custom")).toBe("value");
    });
  });

  describe("apiError", () => {
    it("should create an error response with proper structure", async () => {
      const response = apiError("BAD_REQUEST", "Invalid input");
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        error: {
          code: "BAD_REQUEST",
          message: "Invalid input",
        },
      });
    });

    it("should include details when provided", async () => {
      const response = apiError("VALIDATION_ERROR", "Invalid field", {
        field: "email",
        value: "not-an-email",
      });
      const body = await response.json();

      expect(response.status).toBe(422);
      expect(body.error.details).toEqual({
        field: "email",
        value: "not-an-email",
      });
    });

    it("should map error codes to correct status codes", () => {
      expect(apiError("BAD_REQUEST", "").status).toBe(400);
      expect(apiError("UNAUTHORIZED", "").status).toBe(401);
      expect(apiError("FORBIDDEN", "").status).toBe(403);
      expect(apiError("NOT_FOUND", "").status).toBe(404);
      expect(apiError("RATE_LIMITED", "").status).toBe(429);
      expect(apiError("VALIDATION_ERROR", "").status).toBe(422);
      expect(apiError("INTERNAL_ERROR", "").status).toBe(500);
    });

    it("should add request ID header when provided", () => {
      const response = apiError("BAD_REQUEST", "Error", undefined, {
        requestId: "err-456",
      });

      expect(response.headers.get(REQUEST_ID_HEADER)).toBe("err-456");
    });
  });

  describe("ApiErrors convenience functions", () => {
    it("badRequest should create 400 response", async () => {
      const response = ApiErrors.badRequest("Bad input", { field: "name" });
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error.code).toBe("BAD_REQUEST");
      expect(body.error.message).toBe("Bad input");
      expect(body.error.details).toEqual({ field: "name" });
    });

    it("unauthorized should create 401 response with default message", async () => {
      const response = ApiErrors.unauthorized();
      const body = await response.json();

      expect(response.status).toBe(401);
      expect(body.error.code).toBe("UNAUTHORIZED");
      expect(body.error.message).toBe("Unauthorized");
    });

    it("forbidden should create 403 response", async () => {
      const response = ApiErrors.forbidden("Access denied");
      const body = await response.json();

      expect(response.status).toBe(403);
      expect(body.error.code).toBe("FORBIDDEN");
      expect(body.error.message).toBe("Access denied");
    });

    it("notFound should create 404 response", async () => {
      const response = ApiErrors.notFound("User not found", { userId: "123" });
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error.code).toBe("NOT_FOUND");
      expect(body.error.details).toEqual({ userId: "123" });
    });

    it("rateLimited should create 429 response", async () => {
      const response = ApiErrors.rateLimited();
      const body = await response.json();

      expect(response.status).toBe(429);
      expect(body.error.code).toBe("RATE_LIMITED");
      expect(body.error.message).toBe("Too many requests");
    });

    it("validationError should create 422 response", async () => {
      const response = ApiErrors.validationError("Email invalid", {
        field: "email",
      });
      const body = await response.json();

      expect(response.status).toBe(422);
      expect(body.error.code).toBe("VALIDATION_ERROR");
    });

    it("internal should create 500 response", async () => {
      const response = ApiErrors.internal();
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body.error.code).toBe("INTERNAL_ERROR");
      expect(body.error.message).toBe("Internal server error");
    });
  });
});
