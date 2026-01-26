import { FC, useEffect, useRef, useState } from "react";
import Card, { CardProps } from "./index";

/**
 * LazyCard - Defers Card rendering until it's near the viewport
 * Uses IntersectionObserver for efficient scroll-based loading
 */
const LazyCard: FC<CardProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Load 200px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Placeholder with same dimensions to prevent layout shift
  if (!isVisible) {
    return (
      <div
        ref={ref}
        css={(theme) => ({
          width: 300,
          height: 450, // Approximate card height with artist name
          [theme.maxMQ.xsm]: {
            width: "100%",
            height: "auto",
            aspectRatio: "0.7076923076923077",
          },
        })}
      />
    );
  }

  return <Card {...props} />;
};

export default LazyCard;
