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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dev.playingarts.com";

/**
 * Check website availability
 */
async function checkWebsite(): Promise<CheckResult> {
  const start = Date.now();
  try {
    const response = await fetch(SITE_URL, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
    });
    const latency = Date.now() - start;

    if (!response.ok) {
      return {
        service: "website",
        status: "down",
        latency,
        message: `HTTP ${response.status}`,
      };
    }

    return {
      service: "website",
      status: latency > 5000 ? "degraded" : "up",
      latency,
      message: latency > 5000 ? "Slow response" : undefined,
    };
  } catch (error) {
    return {
      service: "website",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Connection failed",
    };
  }
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
  const start = Date.now();
  try {
    const response = await fetch(`${SITE_URL}/api/v1/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ __typename }" }),
      signal: AbortSignal.timeout(10000),
    });
    const latency = Date.now() - start;

    if (!response.ok) {
      return {
        service: "graphql",
        status: "down",
        latency,
        message: `HTTP ${response.status}`,
      };
    }

    return {
      service: "graphql",
      status: latency > 5000 ? "degraded" : "up",
      latency,
    };
  } catch (error) {
    return {
      service: "graphql",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Request failed",
    };
  }
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
  const start = Date.now();
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    return {
      service: "mailerlite",
      status: "degraded",
      latency: 0,
      message: "API key not configured",
    };
  }

  try {
    const response = await fetch("https://api.mailerlite.com/api/v2/me", {
      headers: { "X-MailerLite-ApiKey": apiKey },
      signal: AbortSignal.timeout(10000),
    });
    const latency = Date.now() - start;

    if (!response.ok) {
      return {
        service: "mailerlite",
        status: "down",
        latency,
        message: `HTTP ${response.status}`,
      };
    }

    return {
      service: "mailerlite",
      status: "up",
      latency,
    };
  } catch (error) {
    return {
      service: "mailerlite",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Request failed",
    };
  }
}

/**
 * Check Crazy Aces game app
 */
async function checkCrazyAces(): Promise<CheckResult> {
  const start = Date.now();
  const CRAZY_ACES_URL = "https://play.playingarts.com";

  try {
    const response = await fetch(CRAZY_ACES_URL, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
    });
    const latency = Date.now() - start;

    if (!response.ok) {
      return {
        service: "crazyaces",
        status: "down",
        latency,
        message: `HTTP ${response.status}`,
      };
    }

    return {
      service: "crazyaces",
      status: latency > 3000 ? "degraded" : "up",
      latency,
      message: latency > 3000 ? "Slow response" : undefined,
    };
  } catch (error) {
    return {
      service: "crazyaces",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Connection failed",
    };
  }
}

/**
 * Check Upstash Redis
 */
async function checkRedis(): Promise<CheckResult> {
  const start = Date.now();
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

  try {
    const response = await fetch(`${redisUrl}/ping`, {
      headers: { Authorization: `Bearer ${redisToken}` },
      signal: AbortSignal.timeout(5000),
    });
    const latency = Date.now() - start;

    if (!response.ok) {
      return {
        service: "redis",
        status: "down",
        latency,
        message: `HTTP ${response.status}`,
      };
    }

    return {
      service: "redis",
      status: "up",
      latency,
    };
  } catch (error) {
    return {
      service: "redis",
      status: "down",
      latency: Date.now() - start,
      message: error instanceof Error ? error.message : "Request failed",
    };
  }
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
    if (previousStatus && previousStatus !== result.status) {
      if (result.status === "down" || result.status === "degraded") {
        await sendStatusAlert(
          result.service,
          result.status,
          result.message,
          previousStatus
        );
      } else if (result.status === "up" && previousStatus === "down") {
        await sendStatusAlert(result.service, "up", undefined, previousStatus);
      }
    } else if (!previousStatus && result.status === "down") {
      // First check ever and service is down
      await sendStatusAlert(result.service, result.status, result.message);
    }
  }

  return results;
}

/**
 * Get current status for all services (latest check per service)
 */
export async function getCurrentStatus(): Promise<CheckResult[]> {
  await connect();

  const results: CheckResult[] = [];

  for (const config of SERVICE_CHECKS) {
    const lastCheck = await UptimeCheck.findOne({ service: config.name })
      .sort({ timestamp: -1 })
      .lean();

    if (lastCheck) {
      results.push({
        service: lastCheck.service,
        status: lastCheck.status,
        latency: lastCheck.latency,
        message: lastCheck.message,
      });
    }
  }

  return results;
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
