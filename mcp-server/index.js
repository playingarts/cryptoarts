#!/usr/bin/env node

/**
 * Playing Arts MCP Server
 *
 * Provides tools for Claude Code to check service status and logs.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const STATUS_URL = "https://dev.playingarts.com/api/status";
const HEALTH_CHECK_URL = "https://dev.playingarts.com/api/cron/health-check";

const server = new Server(
  {
    name: "playingarts-monitor",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "check_status",
        description: "Check current status of all Playing Arts services (website, mongodb, graphql, opensea, mailerlite, redis, crazyaces)",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "run_health_check",
        description: "Trigger a fresh health check on all services and return results",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "get_vercel_logs",
        description: "Get recent Vercel deployment logs for Playing Arts",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Number of log entries to fetch (default 20)",
            },
            filter: {
              type: "string",
              description: "Filter logs by keyword (e.g., 'error', 'warn')",
            },
          },
          required: [],
        },
      },
      {
        name: "check_deployment",
        description: "Check latest Vercel deployment status",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "check_status": {
        const response = await fetch(STATUS_URL);
        const data = await response.json();

        let summary = `Overall Status: ${data.overall.toUpperCase()}\n`;
        summary += `Timestamp: ${data.timestamp}\n\n`;
        summary += "Services:\n";

        for (const service of data.services) {
          const statusIcon = service.status === "up" ? "+" : service.status === "down" ? "X" : "!";
          summary += `[${statusIcon}] ${service.service}: ${service.status}`;
          if (service.latency) summary += ` (${service.latency}ms)`;
          if (service.message) summary += ` - ${service.message}`;
          summary += `\n    24h: ${Math.round(service.uptime["24h"])}% | 30d: ${Math.round(service.uptime["30d"])}%\n`;
        }

        return { content: [{ type: "text", text: summary }] };
      }

      case "run_health_check": {
        const response = await fetch(HEALTH_CHECK_URL);
        const data = await response.json();

        let summary = `Health Check Results\n`;
        summary += `Duration: ${data.duration}ms\n`;
        summary += `Timestamp: ${data.timestamp}\n\n`;
        summary += `Summary: ${data.status.up} up, ${data.status.degraded} degraded, ${data.status.down} down\n\n`;

        for (const result of data.results) {
          const statusIcon = result.status === "up" ? "+" : result.status === "down" ? "X" : "!";
          summary += `[${statusIcon}] ${result.service}: ${result.status}`;
          if (result.latency) summary += ` (${result.latency}ms)`;
          if (result.message) summary += `\n    Error: ${result.message}`;
          summary += "\n";
        }

        return { content: [{ type: "text", text: summary }] };
      }

      case "get_vercel_logs": {
        const limit = args?.limit || 20;
        const filterArg = args?.filter ? `| grep -i "${args.filter}"` : "";

        try {
          const { stdout } = await execAsync(
            `vercel logs dev.playingarts.com --limit ${limit} 2>&1 ${filterArg}`,
            { timeout: 30000 }
          );
          return { content: [{ type: "text", text: stdout || "No logs found" }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error fetching logs: ${error.message}` }] };
        }
      }

      case "check_deployment": {
        try {
          const { stdout } = await execAsync(
            `vercel list 2>&1 | head -15`,
            { timeout: 15000 }
          );
          return { content: [{ type: "text", text: stdout }] };
        } catch (error) {
          return { content: [{ type: "text", text: `Error checking deployments: ${error.message}` }] };
        }
      }

      default:
        return { content: [{ type: "text", text: `Unknown tool: ${name}` }] };
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Playing Arts MCP server running");
}

main().catch(console.error);
