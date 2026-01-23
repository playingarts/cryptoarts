"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";

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
 * Also loads immediately when navigated to via hash link.
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

  // Check if this section is the hash target and force visibility
  const checkHashTarget = useCallback(() => {
    if (id && window.location.hash === `#${id}`) {
      setIsVisible(true);
    }
  }, [id]);

  // Listen for hash changes (navigation clicks)
  useEffect(() => {
    if (!id) return;

    // Check on mount in case page loaded with hash
    checkHashTarget();

    // Listen for hash changes
    window.addEventListener("hashchange", checkHashTarget);

    // Also listen for custom event dispatched by Link component
    const handleForceLoad = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === id) {
        setIsVisible(true);
      }
    };
    window.addEventListener("lazySection:forceLoad", handleForceLoad);

    return () => {
      window.removeEventListener("hashchange", checkHashTarget);
      window.removeEventListener("lazySection:forceLoad", handleForceLoad);
    };
  }, [id, checkHashTarget]);

  // IntersectionObserver for scroll-based loading
  useEffect(() => {
    if (!ref.current || isVisible) {
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
  }, [rootMargin, isVisible]);

  return (
    <div ref={ref} id={id} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : skeleton}
    </div>
  );
};

export default LazySection;
export type { LazySectionProps };
