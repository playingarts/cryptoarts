/**
 * StatusService
 *
 * Centralized service for running health checks on all monitored services.
 * Stores results in MongoDB and triggers alerts on status changes.
 */

import { connect } from "../mongoose";
import {
  UptimeCheck,
  IUptimeCheck,
  ServiceName,
  ServiceStatus,
} from "../models/UptimeCheck";
import { sendStatusAlert } from "./TelegramService";

export interface CheckResult {
  service: ServiceName;
  status: ServiceStatus;
  latency: number;
  message?: string;
}

interface ServiceCheckConfig {
  name: ServiceName;
  check: () => Promise<CheckResult>;
  critical?: boolean;
}

/**
 * Configuration for HTTP-based health checks
 */
interface HttpCheckConfig {
  service: ServiceName;
  url: string;
  options?: RequestInit;
  timeout?: number;
  /** If latency exceeds this, status becomes "degraded" */
  slowThreshold?: number;
  /** Message when slow (only used if slowThreshold is set) */
  slowMessage?: string;
  /** Message for caught errors */
  errorMessage?: string;
}

/**
 * Run an HTTP-based health check with timing and error handling.
 * Handles the common pattern: timing, fetch, response.ok check, slow threshold, error catch.
 */
async function runHttpCheck(config: HttpCheckConfig): Promise<CheckResult> {
  const {
    service,
    url,
    options = {},
    timeout = 10000,
    slowThreshold,
    slowMessage,
    errorMessage = "Request failed",
  } = config;

  const start = Date.now();

  try {
    const response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(timeout),
    });
    const latency = Date.now() - start;

    if (!response.ok) {
      return { service, status: "down", latency, message: `HTTP ${response.status}` };
    }

    if (slowThreshold && latency > slowThreshold) {
      return { service, status: "degraded", latency, message: slowMessage };
    }

    return { service, status: "up", latency };
  } catch (error) {
    return {
      service,
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : errorMessage,
    };
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dev.playingarts.com";

/**
 * Check website availability
 */
async function checkWebsite(): Promise<CheckResult> {
  return runHttpCheck({
    service: "website",
    url: SITE_URL,
    options: { method: "HEAD" },
    slowThreshold: 5000,
    slowMessage: "Slow response",
    errorMessage: "Connection failed",
  });
}

/**
 * Check MongoDB connectivity by pinging the database
 */
async function checkMongoDB(): Promise<CheckResult> {
  const start = Date.now();
  try {
    const mongooseInstance = await connect();

    // Use ping to verify actual connectivity (readyState can be stale in serverless)
    await mongooseInstance.connection.db?.admin().ping();

    const latency = Date.now() - start;

    return {
      service: "mongodb",
      status: latency > 3000 ? "degraded" : "up",
      latency,
      message: latency > 3000 ? "Slow connection" : undefined,
    };
  } catch (error) {
    return {
      service: "mongodb",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Connection failed",
    };
  }
}

/**
 * Check GraphQL API
 */
async function checkGraphQL(): Promise<CheckResult> {
  return runHttpCheck({
    service: "graphql",
    url: `${SITE_URL}/api/v1/graphql`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ __typename }" }),
    },
    slowThreshold: 5000,
  });
}

/**
 * Check OpenSea API
 */
async function checkOpenSea(): Promise<CheckResult> {
  const start = Date.now();
  const apiKey = process.env.OPENSEA_KEY;

  if (!apiKey) {
    return {
      service: "opensea",
      status: "degraded",
      latency: 0,
      message: "API key not configured",
    };
  }

  try {
    const response = await fetch(
      "https://api.opensea.io/api/v2/collections/cryptoedition/stats",
      {
        headers: { "X-API-KEY": apiKey },
        signal: AbortSignal.timeout(10000),
      }
    );
    const latency = Date.now() - start;

    if (response.status === 429) {
      return {
        service: "opensea",
        status: "degraded",
        latency,
        message: "Rate limited",
      };
    }

    if (!response.ok) {
      return {
        service: "opensea",
        status: "down",
        latency,
        message: `HTTP ${response.status}`,
      };
    }

    return {
      service: "opensea",
      status: latency > 3000 ? "degraded" : "up",
      latency,
    };
  } catch (error) {
    return {
      service: "opensea",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Request failed",
    };
  }
}

/**
 * Check MailerLite API
 */
async function checkMailerLite(): Promise<CheckResult> {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    return {
      service: "mailerlite",
      status: "degraded",
      latency: 0,
      message: "API key not configured",
    };
  }

  return runHttpCheck({
    service: "mailerlite",
    url: "https://api.mailerlite.com/api/v2/me",
    options: { headers: { "X-MailerLite-ApiKey": apiKey } },
  });
}

/**
 * Check Crazy Aces game app
 */
async function checkCrazyAces(): Promise<CheckResult> {
  return runHttpCheck({
    service: "crazyaces",
    url: "https://play.playingarts.com",
    options: { method: "HEAD" },
    slowThreshold: 3000,
    slowMessage: "Slow response",
    errorMessage: "Connection failed",
  });
}

/**
 * Check Upstash Redis
 */
async function checkRedis(): Promise<CheckResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return {
      service: "redis",
      status: "degraded",
      latency: 0,
      message: "Not configured (using in-memory fallback)",
    };
  }

  return runHttpCheck({
    service: "redis",
    url: `${redisUrl}/ping`,
    options: { headers: { Authorization: `Bearer ${redisToken}` } },
    timeout: 5000,
  });
}

/**
 * All service checks configuration
 */
const SERVICE_CHECKS: ServiceCheckConfig[] = [
  { name: "website", check: checkWebsite, critical: true },
  { name: "mongodb", check: checkMongoDB, critical: true },
  { name: "graphql", check: checkGraphQL, critical: true },
  { name: "opensea", check: checkOpenSea },
  { name: "mailerlite", check: checkMailerLite },
  { name: "redis", check: checkRedis },
  { name: "crazyaces", check: checkCrazyAces },
];

/**
 * Get the previous status for a service
 */
async function getPreviousStatus(
  service: ServiceName
): Promise<ServiceStatus | null> {
  try {
    const lastCheck = await UptimeCheck.findOne({ service })
      .sort({ timestamp: -1 })
      .lean();
    return lastCheck?.status ?? null;
  } catch {
    return null;
  }
}

// Grace period for flapping services (5 minutes)
const FLAP_GRACE_PERIOD_MS = 5 * 60 * 1000;

/**
 * Check if a service has been in a non-up state for longer than the grace period.
 * Returns the duration in ms if down long enough, or null if within grace period.
 */
async function getDowntimeDuration(service: ServiceName): Promise<number | null> {
  try {
    // Find the most recent "up" status
    const lastUp = await UptimeCheck.findOne({
      service,
      status: "up",
    })
      .sort({ timestamp: -1 })
      .lean();

    if (!lastUp) {
      // Service has never been up, or no history - allow alerts
      return FLAP_GRACE_PERIOD_MS + 1;
    }

    const downDuration = Date.now() - lastUp.timestamp.getTime();
    return downDuration;
  } catch {
    return null;
  }
}

/**
 * Run all health checks and store results
 */
export async function runAllChecks(): Promise<CheckResult[]> {
  await connect();

  const results: CheckResult[] = [];
  const timestamp = new Date();

  // Run all checks in parallel
  const checkPromises = SERVICE_CHECKS.map(async (config) => {
    try {
      const result = await config.check();
      return result;
    } catch (error) {
      return {
        service: config.name,
        status: "down" as ServiceStatus,
        latency: 0,
        message: error instanceof Error ? error.message : "Check failed",
      };
    }
  });

  const checkResults = await Promise.all(checkPromises);

  // Store results and check for status changes
  for (const result of checkResults) {
    results.push(result);

    // Get previous status to detect changes
    const previousStatus = await getPreviousStatus(result.service);

    // Store the check result
    await UptimeCheck.create({
      service: result.service,
      status: result.status,
      latency: result.latency,
      message: result.message,
      timestamp,
    });

    // Send alert if status changed (down or recovered)
    // Use grace period to avoid alerting on brief flaps
    if (previousStatus && previousStatus !== result.status) {
      if (result.status === "down" || result.status === "degraded") {
        // Only alert if service has been down longer than grace period
        const downDuration = await getDowntimeDuration(result.service);
        if (downDuration && downDuration >= FLAP_GRACE_PERIOD_MS) {
          await sendStatusAlert(
            result.service,
            result.status,
            result.message,
            previousStatus
          );
        } else {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.log(
              `[StatusService] ${result.service} is ${result.status} but within grace period (${Math.round((downDuration || 0) / 1000)}s), skipping alert`
            );
          }
        }
      } else if (result.status === "up" && previousStatus === "down") {
        // Only send recovery alert if service was down longer than grace period
        // Check the duration it was down before recovering
        const downDuration = await getDowntimeDuration(result.service);
        // Since it just recovered, downDuration will be very small now
        // We need to check if it was down long enough before to warrant a recovery alert
        // Simple approach: check if we had previously sent a DOWN alert (via lastAlertTime in TelegramService)
        // For now, just skip recovery alerts for brief outages by checking recent history
        const recentDownChecks = await UptimeCheck.countDocuments({
          service: result.service,
          status: { $in: ["down", "degraded"] },
          timestamp: { $gte: new Date(Date.now() - FLAP_GRACE_PERIOD_MS) },
        });
        const recentUpChecks = await UptimeCheck.countDocuments({
          service: result.service,
          status: "up",
          timestamp: { $gte: new Date(Date.now() - FLAP_GRACE_PERIOD_MS) },
        });

        // Only send recovery if it was mostly down during the grace period
        // (more down checks than up checks indicates sustained outage)
        if (recentDownChecks > recentUpChecks) {
          await sendStatusAlert(result.service, "up", undefined, previousStatus);
        } else {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.log(
              `[StatusService] ${result.service} recovered but was flapping (${recentDownChecks} down vs ${recentUpChecks} up in last 5min), skipping alert`
            );
          }
        }
      }
    } else if (!previousStatus && result.status === "down") {
      // First check ever and service is down - still alert immediately
      await sendStatusAlert(result.service, result.status, result.message);
    }
  }

  return results;
}

/**
 * Get current status for all services (latest check per service)
 * Uses a single aggregation query for efficiency in serverless environments
 */
export async function getCurrentStatus(): Promise<CheckResult[]> {
  await connect();

  // Use aggregation to get latest check for each service in a single query
  const latestChecks = await UptimeCheck.aggregate<IUptimeCheck>([
    { $sort: { service: 1, timestamp: -1 } },
    {
      $group: {
        _id: "$service",
        service: { $first: "$service" },
        status: { $first: "$status" },
        latency: { $first: "$latency" },
        message: { $first: "$message" },
        timestamp: { $first: "$timestamp" },
      },
    },
  ]);

  return latestChecks.map((check) => ({
    service: check.service,
    status: check.status,
    latency: check.latency,
    message: check.message,
  }));
}

/**
 * Get uptime history for a service
 */
export async function getUptimeHistory(
  service: ServiceName,
  hours: number = 24
): Promise<IUptimeCheck[]> {
  await connect();

  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  return UptimeCheck.find({
    service,
    timestamp: { $gte: since },
  })
    .sort({ timestamp: 1 })
    .lean();
}

/**
 * Calculate uptime percentage for a service
 */
export async function getUptimePercentage(
  service: ServiceName,
  hours: number = 24
): Promise<number> {
  const history = await getUptimeHistory(service, hours);

  if (history.length === 0) {
    return 100; // No data, assume up
  }

  const upCount = history.filter((check) => check.status === "up").length;
  return Math.round((upCount / history.length) * 100 * 100) / 100;
}

/**
 * Get uptime percentages for all services in a single aggregation query
 * Returns { service: { "24h": number, "7d": number, "30d": number } }
 */
export async function getAllUptimePercentages(): Promise<
  Map<ServiceName, { "24h": number; "7d": number; "30d": number }>
> {
  await connect();

  const now = Date.now();
  const since24h = new Date(now - 24 * 60 * 60 * 1000);
  const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const since30d = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Get all checks from the last 30 days in a single query
  const checks = await UptimeCheck.find({
    timestamp: { $gte: since30d },
  })
    .select("service status timestamp")
    .lean();

  const result = new Map<ServiceName, { "24h": number; "7d": number; "30d": number }>();

  // Group checks by service
  const byService = new Map<ServiceName, IUptimeCheck[]>();
  for (const check of checks) {
    const list = byService.get(check.service) || [];
    list.push(check);
    byService.set(check.service, list);
  }

  // Calculate percentages for each service
  for (const [service, serviceChecks] of byService) {
    const checks24h = serviceChecks.filter((c) => c.timestamp >= since24h);
    const checks7d = serviceChecks.filter((c) => c.timestamp >= since7d);
    const checks30d = serviceChecks;

    const calcPercent = (list: IUptimeCheck[]) => {
      if (list.length === 0) return 100;
      const upCount = list.filter((c) => c.status === "up").length;
      return Math.round((upCount / list.length) * 100 * 100) / 100;
    };

    result.set(service, {
      "24h": calcPercent(checks24h),
      "7d": calcPercent(checks7d),
      "30d": calcPercent(checks30d),
    });
  }

  return result;
}

/**
 * Get overall system status
 */
export async function getOverallStatus(): Promise<ServiceStatus> {
  const currentStatus = await getCurrentStatus();

  const hasDown = currentStatus.some((s) => s.status === "down");
  const hasDegraded = currentStatus.some((s) => s.status === "degraded");

  if (hasDown) return "down";
  if (hasDegraded) return "degraded";
  return "up";
}
