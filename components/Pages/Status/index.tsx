"use client";

import { FC, useEffect, useState } from "react";
import Head from "next/head";
import Grid from "../../Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import Text from "../../Text";

type ServiceStatus = "up" | "down" | "degraded";

interface ServiceData {
  service: string;
  status: ServiceStatus;
  latency: number;
  message?: string;
  uptime: {
    "24h": number;
    "7d": number;
    "30d": number;
  };
}

interface StatusData {
  overall: ServiceStatus;
  timestamp: string;
  services: ServiceData[];
}

const SERVICE_LABELS: Record<string, string> = {
  website: "Website",
  mongodb: "Database",
  graphql: "GraphQL API",
  opensea: "OpenSea API",
  mailerlite: "Newsletter",
  redis: "Cache",
  "home-cards": "Home Cards API",
  revalidate: "Revalidate API",
};

const getStatusColor = (status: ServiceStatus): string => {
  switch (status) {
    case "up":
      return "#22c55e"; // green
    case "down":
      return "#ef4444"; // red
    case "degraded":
      return "#f59e0b"; // amber
    default:
      return "#6b7280"; // gray
  }
};

const getStatusText = (status: ServiceStatus): string => {
  switch (status) {
    case "up":
      return "Operational";
    case "down":
      return "Down";
    case "degraded":
      return "Degraded";
    default:
      return "Unknown";
  }
};

const ServiceCard: FC<{ service: ServiceData }> = ({ service }) => {
  const statusColor = getStatusColor(service.status);
  const label = SERVICE_LABELS[service.service] || service.service;

  return (
    <div
      css={(theme) => ({
        background: theme.colors.white,
        borderRadius: 8,
        padding: theme.spacing(3),
        border: `1px solid ${theme.colors.black10}`,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      })}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text typography="newh4" css={{ margin: 0 }}>
          {label}
        </Text>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            css={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: statusColor,
            }}
          />
          <Text
            typography="paragraphSmall"
            css={{ color: statusColor, margin: 0 }}
          >
            {getStatusText(service.status)}
          </Text>
        </div>
      </div>

      {service.message && (
        <Text
          typography="paragraphMicro"
          css={(theme) => ({
            color: theme.colors.black50,
            margin: 0,
          })}
        >
          {service.message}
        </Text>
      )}

      <div
        css={(theme) => ({
          display: "flex",
          gap: theme.spacing(3),
          marginTop: "auto",
        })}
      >
        <div>
          <Text
            typography="paragraphMicro"
            css={(theme) => ({
              color: theme.colors.black50,
              margin: 0,
            })}
          >
            Response
          </Text>
          <Text typography="paragraphSmall" css={{ margin: 0 }}>
            {service.latency}ms
          </Text>
        </div>
        <div>
          <Text
            typography="paragraphMicro"
            css={(theme) => ({
              color: theme.colors.black50,
              margin: 0,
            })}
          >
            Uptime 24h
          </Text>
          <Text typography="paragraphSmall" css={{ margin: 0 }}>
            {service.uptime["24h"]}%
          </Text>
        </div>
        <div>
          <Text
            typography="paragraphMicro"
            css={(theme) => ({
              color: theme.colors.black50,
              margin: 0,
            })}
          >
            Uptime 30d
          </Text>
          <Text typography="paragraphSmall" css={{ margin: 0 }}>
            {service.uptime["30d"]}%
          </Text>
        </div>
      </div>
    </div>
  );
};

const StatusPage: FC = () => {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/status");
      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }
      const data = await response.json();
      setStatus(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Refresh every 60 seconds
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const overallColor = status ? getStatusColor(status.overall) : "#6b7280";
  const overallText = status
    ? status.overall === "up"
      ? "All Systems Operational"
      : status.overall === "degraded"
        ? "Some Systems Degraded"
        : "System Outage"
    : "Loading...";

  return (
    <>
      <Head>
        <title>System Status - Playing Arts</title>
      </Head>
      <Header />
      <Grid
        css={(theme) => ({
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(20),
          paddingBottom: theme.spacing(10),
          minHeight: "100vh",
        })}
      >
        <div css={{ gridColumn: "1 / -1" }}>
          <Text
            typography="newh1"
            css={(theme) => ({
              color: theme.colors.dark_gray,
              marginBottom: theme.spacing(4),
            })}
          >
            System Status
          </Text>
          <div
            css={(theme) => ({
              height: 1,
              background: theme.colors.black10,
              marginBottom: theme.spacing(4),
            })}
          />
        </div>

        {/* Overall Status Banner */}
        <div
          css={(theme) => ({
            gridColumn: "1 / -1",
            background: overallColor,
            borderRadius: 8,
            padding: theme.spacing(4),
            marginBottom: theme.spacing(4),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <Text
            typography="newh3"
            css={{
              color: "white",
              margin: 0,
            }}
          >
            {loading ? "Checking services..." : overallText}
          </Text>
          {lastUpdated && (
            <Text
              typography="paragraphSmall"
              css={{
                color: "rgba(255,255,255,0.8)",
                margin: 0,
              }}
            >
              Updated {lastUpdated.toLocaleTimeString()}
            </Text>
          )}
        </div>

        {error && (
          <div
            css={(theme) => ({
              gridColumn: "1 / -1",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: 8,
              padding: theme.spacing(3),
              marginBottom: theme.spacing(4),
            })}
          >
            <Text typography="paragraphSmall" css={{ color: "#dc2626", margin: 0 }}>
              {error}
            </Text>
          </div>
        )}

        {/* Service Cards */}
        <div
          css={(theme) => ({
            gridColumn: "1 / -1",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: theme.spacing(3),
          })}
        >
          {status?.services.map((service) => (
            <ServiceCard key={service.service} service={service} />
          ))}

          {loading && !status && (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  css={(theme) => ({
                    background: theme.colors.white,
                    borderRadius: 8,
                    padding: theme.spacing(3),
                    border: `1px solid ${theme.colors.black10}`,
                    height: 150,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.5 },
                    },
                  })}
                />
              ))}
            </>
          )}
        </div>

        {/* Info Section */}
        <div
          css={(theme) => ({
            gridColumn: "1 / -1",
            marginTop: theme.spacing(6),
          })}
        >
          <Text
            typography="paragraphSmall"
            css={(theme) => ({
              color: theme.colors.black50,
            })}
          >
            Status is checked every 5 minutes. For real-time issues or
            questions, please contact{" "}
            <a
              href="mailto:hey@playingarts.com"
              css={(theme) => ({
                color: theme.colors.accent,
                textDecoration: "underline",
              })}
            >
              hey@playingarts.com
            </a>
          </Text>
        </div>
      </Grid>
      <Footer onlyFooter />
    </>
  );
};

export default StatusPage;
