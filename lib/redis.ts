/**
 * Redis client for distributed caching and rate limiting
 *
 * Uses Upstash Redis for serverless-compatible Redis.
 * Falls back gracefully when Redis is not configured.
 *
 * Required environment variables:
 * - UPSTASH_REDIS_REST_URL: Upstash Redis REST API URL
 * - UPSTASH_REDIS_REST_TOKEN: Upstash Redis REST API token
 */

import { Redis } from "@upstash/redis";

/**
 * Check if Redis is configured via environment variables
 */
export function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

/**
 * Get Redis client instance
 * Returns null if Redis is not configured
 */
export function getRedisClient(): Redis | null {
  if (!isRedisConfigured()) {
    return null;
  }

  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

/**
 * Singleton Redis client for reuse across requests
 */
let redisClient: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (redisClient === undefined) {
    redisClient = getRedisClient();
  }
  return redisClient;
}
