"use client";

type SkeletonProps = {
  height?: number;
  className?: string;
};

/**
 * Simple skeleton loader for lazy-loaded sections.
 * Shows a subtle pulse animation while content loads.
 */
const Skeleton = ({ height = 400, className = "" }: SkeletonProps) => (
  <div
    className={className}
    style={{
      height,
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "skeleton-pulse 1.5s ease-in-out infinite",
      borderRadius: 8,
      margin: "16px 0",
    }}
  />
);

export default Skeleton;
