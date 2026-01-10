"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  /** Distance from viewport to start loading (default: 200px) */
  rootMargin?: string;
  /** Minimum height before content loads (prevents layout shift) */
  minHeight?: number;
  /** Section ID for navigation */
  id?: string;
  /** Optional loading skeleton to show before content loads */
  skeleton?: ReactNode;
};

/**
 * Renders children only when they're about to enter viewport.
 * Uses IntersectionObserver for efficient lazy loading.
 */
const LazySection = ({
  children,
  rootMargin = "200px",
  minHeight = 400,
  id,
  skeleton,
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} id={id} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : skeleton}
    </div>
  );
};

export default LazySection;
export type { LazySectionProps };
