"use client";

import { FC } from "react";
import Grid from "../../../Grid";

const ITEM_WIDTH = 428;
const ITEM_GAP = 3;
const SKELETON_COUNT = 4;

/** Shimmer animation styles */
const shimmerStyles = {
  background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite linear",
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" },
  },
} as const;

/** Skeleton item for product carousel */
const ProductSkeleton: FC = () => (
  <div
    css={{
      width: ITEM_WIDTH,
      flexShrink: 0,
      padding: 30,
      display: "flex",
      flexDirection: "column",
      gap: 15,
    }}
  >
    {/* Product image skeleton */}
    <div
      css={{
        width: "100%",
        height: 350,
        borderRadius: 10,
        ...shimmerStyles,
      }}
    />
    {/* Title skeleton */}
    <div
      css={{
        height: 28,
        width: "70%",
        borderRadius: 4,
        ...shimmerStyles,
      }}
    />
    {/* Price skeleton */}
    <div
      css={{
        height: 22,
        width: "30%",
        borderRadius: 4,
        ...shimmerStyles,
      }}
    />
    {/* Button skeleton */}
    <div
      css={{
        height: 45,
        width: 120,
        borderRadius: 5,
        marginTop: "auto",
        ...shimmerStyles,
      }}
    />
  </div>
);

/**
 * Skeleton for the ProductPage Collection carousel.
 * Shows intro area + product carousel placeholders.
 */
const CollectionSkeleton: FC = () => (
  <Grid
    css={(theme) => ({
      background: theme.colors.pale_gray,
      paddingBottom: 60,
    })}
  >
    {/* Intro skeleton */}
    <div css={{ gridColumn: "1/-1", paddingTop: 60, paddingBottom: 30 }}>
      <div css={{ ...shimmerStyles, width: 250, height: 32, borderRadius: 16 }} />
      <div css={{ ...shimmerStyles, width: 300, height: 20, borderRadius: 4, marginTop: 20 }} />
      <div css={{ ...shimmerStyles, width: 150, height: 45, borderRadius: 8, marginTop: 30 }} />
      {/* Nav buttons skeleton */}
      <div css={{ display: "flex", gap: 5, marginTop: 120 }}>
        <div css={{ ...shimmerStyles, width: 44, height: 44, borderRadius: 22 }} />
        <div css={{ ...shimmerStyles, width: 44, height: 44, borderRadius: 22 }} />
      </div>
    </div>

    {/* Product carousel skeleton */}
    <div
      css={(theme) => ({
        gridColumn: "1/-1",
        marginTop: 30,
        background: theme.colors.white50,
        borderRadius: 20,
        overflow: "hidden",
      })}
    >
      <div
        css={{
          display: "flex",
          gap: ITEM_GAP,
          overflowX: "hidden",
        }}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  </Grid>
);

export default CollectionSkeleton;
