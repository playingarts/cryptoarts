"use client";

import { FC, useState, useEffect, useRef, useLayoutEffect } from "react";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import Shimmer from "./Shimmer";

/** Check if element is truncated (content overflows) */
const useIsTruncated = (ref: React.RefObject<HTMLElement | null>, deps: unknown[] = []) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setIsTruncated(el.scrollHeight > el.clientHeight);
  }, deps);

  return isTruncated;
};

interface HeroCardInfoProps {
  info?: string | null;
  dark?: boolean;
  /** Called when section enters viewport - triggers loading */
  onVisible?: () => void;
  /** Is the data loading? */
  loading?: boolean;
}

/** Skeleton for card info section */
const HeroCardInfoSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div css={{ marginTop: 60 }}>
    {/* Card description skeleton - multiple paragraphs */}
    <div css={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Shimmer height={18} dark={dark} />
      <Shimmer height={18} dark={dark} />
      <Shimmer height={18} width="95%" dark={dark} />
      <Shimmer height={18} dark={dark} />
      <Shimmer height={18} width="88%" dark={dark} />
      <Shimmer height={18} dark={dark} />
      <Shimmer height={18} width="75%" dark={dark} />
    </div>
  </div>
);

/**
 * P2: Card description/info section.
 * Loads after artist info is displayed.
 */
const HeroCardInfo: FC<HeroCardInfoProps> = ({ info, dark, onVisible, loading }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  // Check if text is truncated (more than 10 lines)
  const isTruncated = useIsTruncated(textRef, [info, expanded]);

  // Intersection Observer to trigger loading
  useEffect(() => {
    if (!onVisible || hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onVisible();
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  // Show skeleton while loading
  if (loading) {
    return (
      <div ref={ref}>
        <HeroCardInfoSkeleton dark={dark} />
      </div>
    );
  }

  // Don't render anything if no info
  if (!info) {
    return <div ref={ref} />;
  }

  return (
    <div ref={ref}>
      <div
        ref={textRef}
        css={[
          { marginTop: 60 },
          !expanded && {
            display: "-webkit-box",
            WebkitLineClamp: 10,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          },
        ]}
      >
        <Text
          css={(theme) => ({
            color: theme.colors[dark ? "white75" : "black"],
          })}
        >
          {info}
        </Text>
      </div>
      {!expanded && isTruncated && (
        <ArrowButton
          size="small"
          noColor
          base
          onClick={() => setExpanded(true)}
          css={(theme) => [
            { marginTop: 15, color: theme.colors.black },
            dark && {
              color: "#FFFFFFBF",
              transition: "color 0.2s ease",
              "&:hover": {
                color: theme.colors.white,
              },
            },
          ]}
        >
          Continue reading
        </ArrowButton>
      )}
    </div>
  );
};

export default HeroCardInfo;
export { HeroCardInfoSkeleton };
