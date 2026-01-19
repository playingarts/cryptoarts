"use client";

import { FC } from "react";
import Grid from "../../../Grid";
import Intro from "../../../Intro";

interface MoreSkeletonProps {
  dark?: boolean;
}

/** Shimmer component for skeleton loading */
const Shimmer: FC<{
  width?: number | string;
  height?: number;
  borderRadius?: number;
  dark?: boolean;
  marginTop?: number;
}> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  dark = false,
  marginTop,
}) => (
  <div
    css={{
      width,
      height,
      borderRadius,
      marginTop,
      background: dark
        ? "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)"
        : "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite linear",
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "200% 0" },
        "100%": { backgroundPosition: "-200% 0" },
      },
    }}
  />
);

/** Card skeleton for carousel - matches cardSizesHover.preview (285x400) */
const CardSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    css={{
      width: 285,
      height: 400,
      flexShrink: 0,
    }}
  >
    <Shimmer width={285} height={400} borderRadius={12} dark={dark} />
  </div>
);

/**
 * Skeleton for the More section while it loads.
 * Shows intro area + card carousel placeholders.
 */
const MoreSkeleton: FC<MoreSkeletonProps> = ({ dark }) => (
  <>
    <Grid
      css={(theme) => ({
        background: theme.colors[dark ? "darkBlack" : "soft_gray"],
      })}
    >
      <div css={{ gridColumn: "1/-1" }}>
        {/* Intro skeleton */}
        <div css={{ paddingTop: 60, paddingBottom: 30 }}>
          <Shimmer width={200} height={32} borderRadius={16} dark={dark} />
          <Shimmer
            width={250}
            height={20}
            borderRadius={4}
            dark={dark}
            marginTop={20}
          />
          {/* Nav buttons skeleton */}
          <div css={{ display: "flex", gap: 5, marginTop: 120 }}>
            <Shimmer width={44} height={44} borderRadius={22} dark={dark} />
            <Shimmer width={44} height={44} borderRadius={22} dark={dark} />
          </div>
        </div>
      </div>
    </Grid>
    {/* Cards carousel skeleton */}
    <div
      css={(theme) => ({
        background: theme.colors[dark ? "darkBlack" : "soft_gray"],
        paddingBottom: 120,
        paddingTop: 60,
        paddingLeft: 95,
        paddingRight: 75,
        display: "flex",
        gap: 30,
        overflowX: "hidden",
      })}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} dark={dark} />
      ))}
    </div>
  </>
);

export default MoreSkeleton;
