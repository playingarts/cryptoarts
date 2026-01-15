"use client";

import { FC, CSSProperties } from "react";

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  dark?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * Reusable shimmer skeleton for loading states.
 * Supports both light and dark palettes.
 */
const Shimmer: FC<ShimmerProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  dark = false,
  style,
  className,
}) => (
  <div
    className={className}
    css={{
      width,
      height,
      borderRadius,
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
    style={style}
  />
);

export default Shimmer;
