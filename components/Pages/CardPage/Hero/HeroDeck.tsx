"use client";

import { FC, useEffect, useRef } from "react";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Link from "../../../Link";
import ScandiBlock from "../../../ScandiBlock";
import Shimmer from "./Shimmer";

interface HeroDeckProps {
  deck?: GQL.Deck;
  deckImage?: string;
  editionDisplayName?: string | null;
  shopUrl: string;
  deckUrl: string;
  dark?: boolean;
  /** Called when section enters viewport - triggers loading */
  onVisible?: () => void;
  /** Is the data loading? */
  loading?: boolean;
}

/** Skeleton for deck section */
const HeroDeckSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <ScandiBlock css={{ paddingTop: 15, marginTop: 60, display: "block" }}>
    {/* "The deck" button skeleton */}
    <Shimmer width={90} height={32} borderRadius={16} dark={dark} />

    {/* Deck image skeleton */}
    <Shimmer
      width={300}
      height={300}
      borderRadius={8}
      dark={dark}
      style={{ marginTop: 30 }}
    />

    {/* Deck description skeleton */}
    <div css={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 8 }}>
      <Shimmer height={18} width="80%" dark={dark} />
      <Shimmer height={18} width="60%" dark={dark} />
    </div>

    {/* Buttons skeleton */}
    <div css={{ display: "flex", gap: 30, marginTop: 30 }}>
      <Shimmer width={150} height={44} borderRadius={22} dark={dark} />
      <Shimmer width={130} height={44} borderRadius={22} dark={dark} />
    </div>
  </ScandiBlock>
);

/**
 * P3: The Deck section - loads after card info.
 * Shows deck image, description, and navigation links.
 */
const HeroDeck: FC<HeroDeckProps> = ({
  deck,
  deckImage,
  editionDisplayName,
  shopUrl,
  deckUrl,
  dark,
  onVisible,
  loading,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

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
      { rootMargin: "100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  // Show skeleton while loading or no data
  if (loading || !deck) {
    return (
      <div ref={ref}>
        <HeroDeckSkeleton dark={dark} />
      </div>
    );
  }

  return (
    <ScandiBlock
      id="the-deck"
      css={{ paddingTop: 15, marginTop: 60, display: "block" }}
    >
      <ArrowedButton
        css={{ display: "block" }}
        onClick={() =>
          document.getElementById("the-deck")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        The deck
      </ArrowedButton>

      {deckImage && (
        <img
          src={deckImage}
          alt={
            deck.title
              ? `${deck.title}${editionDisplayName ? ` ${editionDisplayName}` : ""} deck`
              : "Deck"
          }
          loading="lazy"
          css={{ height: 300, aspectRatio: "1", objectFit: "cover" }}
        />
      )}

      <Text css={{ marginTop: 30 }}>
        This card belongs to the {deck.title}
        {editionDisplayName ? ` — ${editionDisplayName}` : ""} deck
        {deck.description ? ` — ${deck.description}` : ""}
      </Text>

      <div css={{ display: "flex", alignItems: "center", gap: 30, marginTop: 30 }}>
        <Link href={shopUrl}>
          <ArrowButton color="accent" css={{ fontSize: 20 }}>Shop this deck</ArrowButton>
        </Link>
        <Link href={deckUrl}>
          <ArrowButton size="small" noColor base>
            Explore all cards
          </ArrowButton>
        </Link>
      </div>
    </ScandiBlock>
  );
};

export default HeroDeck;
export { HeroDeckSkeleton };
