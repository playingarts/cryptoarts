/**
 * TelegramService
 *
 * Sends alert notifications to Telegram when services go down or recover.
 * Uses Telegram Bot API.
 *
 * Required environment variables:
 * - TELEGRAM_BOT_TOKEN: Bot token from @BotFather
 * - TELEGRAM_CHAT_ID: Chat/group ID to send messages to
 */

import { ServiceName, ServiceStatus } from "../models/UptimeCheck";

const TELEGRAM_API_BASE = "https://api.telegram.org/bot";

// Cache of last alert time per service to prevent spam
const lastAlertTime: Record<string, number> = {};
const ALERT_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

interface TelegramResponse {
  ok: boolean;
  result?: unknown;
  description?: string;
}

/**
 * Send a message to the configured Telegram chat
 */
async function sendMessage(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[TelegramService] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API_BASE}${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = (await response.json()) as TelegramResponse;

    if (!data.ok) {
      console.error("[TelegramService] Failed to send message:", data.description);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[TelegramService] Error sending message:", error);
    return false;
  }
}

/**
 * Format service name for display
 */
function formatServiceName(service: ServiceName): string {
  const names: Record<ServiceName, string> = {
    website: "Website",
    mongodb: "MongoDB Database",
    graphql: "GraphQL API",
    opensea: "OpenSea API",
    mailerlite: "MailerLite",
    redis: "Upstash Redis",
    "home-cards": "Home Cards API",
    newsletter: "Newsletter API",
    revalidate: "Revalidate API",
  };
  return names[service] || service;
}

/**
 * Get emoji for status
 */
function getStatusEmoji(status: ServiceStatus): string {
  switch (status) {
    case "up":
      return "\u2705"; // green check
    case "down":
      return "\u274C"; // red X
    case "degraded":
      return "\u26A0\uFE0F"; // warning
    default:
      return "\u2753"; // question mark
  }
}

/**
 * Send alert for service status change
 */
export async function sendStatusAlert(
  service: ServiceName,
  status: ServiceStatus,
  message?: string,
  previousStatus?: ServiceStatus
): Promise<boolean> {
  // Check cooldown
  const alertKey = `${service}-${status}`;
  const now = Date.now();
  const lastAlert = lastAlertTime[alertKey];

  if (lastAlert && now - lastAlert < ALERT_COOLDOWN_MS) {
    console.log(`[TelegramService] Alert cooldown active for ${alertKey}`);
    return false;
  }

  const emoji = getStatusEmoji(status);
  const serviceName = formatServiceName(service);
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Madrid",
    dateStyle: "short",
    timeStyle: "medium",
  });

  let text: string;

  if (status === "down") {
    text = `${emoji} <b>SERVICE DOWN</b>\n\n` +
      `<b>Service:</b> ${serviceName}\n` +
      `<b>Status:</b> DOWN\n` +
      (message ? `<b>Error:</b> ${message}\n` : "") +
      `<b>Time:</b> ${timestamp}`;
  } else if (status === "up" && previousStatus === "down") {
    text = `${emoji} <b>SERVICE RECOVERED</b>\n\n` +
      `<b>Service:</b> ${serviceName}\n` +
      `<b>Status:</b> UP\n` +
      `<b>Time:</b> ${timestamp}`;
  } else if (status === "degraded") {
    text = `${emoji} <b>SERVICE DEGRADED</b>\n\n` +
      `<b>Service:</b> ${serviceName}\n` +
      `<b>Status:</b> DEGRADED\n` +
      (message ? `<b>Issue:</b> ${message}\n` : "") +
      `<b>Time:</b> ${timestamp}`;
  } else {
    // Don't alert for normal "up" status unless recovering from down
    return false;
  }

  const success = await sendMessage(text);

  if (success) {
    lastAlertTime[alertKey] = now;
  }

  return success;
}

/**
 * Send a test message to verify bot configuration
 */
export async function sendTestMessage(): Promise<boolean> {
  const text = `\u2705 <b>Telegram Alerts Configured</b>\n\n` +
    `Playing Arts monitoring is now connected.\n` +
    `You will receive alerts when services go down or recover.`;

  return sendMessage(text);
}
