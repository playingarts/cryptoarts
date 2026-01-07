import {
  ErrorCode,
  AppError,
  NetworkError,
  ApiError,
  RateLimitError,
  OpenSeaError,
  ValidationError,
  isAppError,
  wrapError,
} from "../../../source/lib/errors";

describe("source/lib/errors", () => {
  describe("ErrorCode enum", () => {
    it("should have network error codes", () => {
      expect(ErrorCode.NETWORK_ERROR).toBe("NETWORK_ERROR");
      expect(ErrorCode.API_ERROR).toBe("API_ERROR");
      expect(ErrorCode.TIMEOUT_ERROR).toBe("TIMEOUT_ERROR");
      expect(ErrorCode.RATE_LIMITED).toBe("RATE_LIMITED");
    });

    it("should have data error codes", () => {
      expect(ErrorCode.VALIDATION_ERROR).toBe("VALIDATION_ERROR");
      expect(ErrorCode.NOT_FOUND).toBe("NOT_FOUND");
      expect(ErrorCode.PARSE_ERROR).toBe("PARSE_ERROR");
    });

    it("should have auth error codes", () => {
      expect(ErrorCode.UNAUTHORIZED).toBe("UNAUTHORIZED");
      expect(ErrorCode.FORBIDDEN).toBe("FORBIDDEN");
      expect(ErrorCode.SIGNATURE_INVALID).toBe("SIGNATURE_INVALID");
    });

    it("should have external service error codes", () => {
      expect(ErrorCode.OPENSEA_ERROR).toBe("OPENSEA_ERROR");
      expect(ErrorCode.MONGODB_ERROR).toBe("MONGODB_ERROR");
    });
  });

  describe("AppError", () => {
    it("should create error with code and message", () => {
      const error = new AppError(ErrorCode.UNKNOWN_ERROR, "Test error");

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe("AppError");
      expect(error.code).toBe(ErrorCode.UNKNOWN_ERROR);
      expect(error.message).toBe("Test error");
    });

    it("should include timestamp", () => {
      const before = new Date().toISOString();
      const error = new AppError(ErrorCode.UNKNOWN_ERROR, "Test");
      const after = new Date().toISOString();

      expect(error.timestamp).toBeDefined();
      expect(error.timestamp >= before).toBe(true);
      expect(error.timestamp <= after).toBe(true);
    });

    it("should include optional metadata", () => {
      const metadata = { userId: "123", action: "test" };
      const error = new AppError(ErrorCode.UNKNOWN_ERROR, "Test", { metadata });

      expect(error.metadata).toEqual(metadata);
    });

    it("should include original error", () => {
      const originalError = new Error("Original");
      const error = new AppError(ErrorCode.UNKNOWN_ERROR, "Wrapped", {
        originalError,
      });

      expect(error.originalError).toBe(originalError);
    });

    it("should serialize to JSON", () => {
      const originalError = new Error("Original");
      const error = new AppError(ErrorCode.API_ERROR, "API failed", {
        originalError,
        metadata: { endpoint: "/api/test" },
      });

      const json = error.toJSON();

      expect(json.code).toBe(ErrorCode.API_ERROR);
      expect(json.message).toBe("API failed");
      expect(json.timestamp).toBe(error.timestamp);
      expect(json.metadata).toEqual({ endpoint: "/api/test" });
      expect(json.originalError).toBe(originalError);
    });

    it("should have proper stack trace", () => {
      const error = new AppError(ErrorCode.UNKNOWN_ERROR, "Test");

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("AppError");
    });
  });

  describe("NetworkError", () => {
    it("should create network error", () => {
      const error = new NetworkError("Connection failed");

      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe("NetworkError");
      expect(error.code).toBe(ErrorCode.NETWORK_ERROR);
      expect(error.message).toBe("Connection failed");
    });

    it("should accept options", () => {
      const originalError = new Error("ECONNREFUSED");
      const error = new NetworkError("Connection refused", {
        originalError,
        metadata: { host: "api.example.com" },
      });

      expect(error.originalError).toBe(originalError);
      expect(error.metadata).toEqual({ host: "api.example.com" });
    });
  });

  describe("ApiError", () => {
    it("should create API error with status code", () => {
      const error = new ApiError(404, "Not Found");

      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe("ApiError");
      expect(error.code).toBe(ErrorCode.API_ERROR);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("Not Found");
    });

    it("should handle various status codes", () => {
      const error400 = new ApiError(400, "Bad Request");
      const error500 = new ApiError(500, "Internal Server Error");
      const error503 = new ApiError(503, "Service Unavailable");

      expect(error400.statusCode).toBe(400);
      expect(error500.statusCode).toBe(500);
      expect(error503.statusCode).toBe(503);
    });
  });

  describe("RateLimitError", () => {
    it("should create rate limit error", () => {
      const error = new RateLimitError("Too many requests");

      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe("RateLimitError");
      expect(error.code).toBe(ErrorCode.RATE_LIMITED);
    });

    it("should include retryAfter", () => {
      const error = new RateLimitError("Rate limited", { retryAfter: 60 });

      expect(error.retryAfter).toBe(60);
    });

    it("should handle missing retryAfter", () => {
      const error = new RateLimitError("Rate limited");

      expect(error.retryAfter).toBeUndefined();
    });
  });

  describe("OpenSeaError", () => {
    it("should create OpenSea error", () => {
      const error = new OpenSeaError("OpenSea API failed");

      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe("OpenSeaError");
      expect(error.code).toBe(ErrorCode.OPENSEA_ERROR);
    });
  });

  describe("ValidationError", () => {
    it("should create validation error", () => {
      const error = new ValidationError("Invalid email format");

      expect(error).toBeInstanceOf(AppError);
      expect(error.name).toBe("ValidationError");
      expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
    });

    it("should include field name", () => {
      const error = new ValidationError("Email is required", { field: "email" });

      expect(error.field).toBe("email");
    });
  });

  describe("isAppError", () => {
    it("should return true for AppError instances", () => {
      expect(isAppError(new AppError(ErrorCode.UNKNOWN_ERROR, "test"))).toBe(true);
    });

    it("should return true for subclass instances", () => {
      expect(isAppError(new NetworkError("test"))).toBe(true);
      expect(isAppError(new ApiError(400, "test"))).toBe(true);
      expect(isAppError(new RateLimitError("test"))).toBe(true);
      expect(isAppError(new OpenSeaError("test"))).toBe(true);
      expect(isAppError(new ValidationError("test"))).toBe(true);
    });

    it("should return false for regular Error", () => {
      expect(isAppError(new Error("test"))).toBe(false);
    });

    it("should return false for non-error values", () => {
      expect(isAppError(null)).toBe(false);
      expect(isAppError(undefined)).toBe(false);
      expect(isAppError("error")).toBe(false);
      expect(isAppError({ message: "error" })).toBe(false);
    });
  });

  describe("wrapError", () => {
    it("should return AppError unchanged", () => {
      const original = new AppError(ErrorCode.API_ERROR, "API error");
      const wrapped = wrapError(original);

      expect(wrapped).toBe(original);
    });

    it("should return subclass errors unchanged", () => {
      const original = new NetworkError("Network failed");
      const wrapped = wrapError(original);

      expect(wrapped).toBe(original);
    });

    it("should wrap regular Error", () => {
      const original = new Error("Something went wrong");
      const wrapped = wrapError(original);

      expect(wrapped).toBeInstanceOf(AppError);
      expect(wrapped.code).toBe(ErrorCode.UNKNOWN_ERROR);
      expect(wrapped.message).toBe("Something went wrong");
      expect(wrapped.originalError).toBe(original);
    });

    it("should wrap string errors", () => {
      const wrapped = wrapError("String error");

      expect(wrapped).toBeInstanceOf(AppError);
      expect(wrapped.code).toBe(ErrorCode.UNKNOWN_ERROR);
      expect(wrapped.metadata?.originalValue).toBe("String error");
    });

    it("should wrap null with default message", () => {
      const wrapped = wrapError(null);

      expect(wrapped).toBeInstanceOf(AppError);
      expect(wrapped.message).toBe("An unexpected error occurred");
    });

    it("should use custom default message", () => {
      const wrapped = wrapError(null, "Custom fallback message");

      expect(wrapped.message).toBe("Custom fallback message");
    });

    it("should wrap number values", () => {
      const wrapped = wrapError(404);

      expect(wrapped).toBeInstanceOf(AppError);
      expect(wrapped.metadata?.originalValue).toBe("404");
    });
  });
});
