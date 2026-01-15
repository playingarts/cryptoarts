"use client";

import { FC } from "react";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import Link from "../../../Link";
import Shimmer from "./Shimmer";

interface HeroHeaderProps {
  artistName?: string;
  country?: string;
  shopUrl: string;
  deckUrl: string;
  dark?: boolean;
}

/** Skeleton for artist name and country */
const HeroHeaderSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div css={{ maxWidth: 520, height: 610, display: "grid", alignContent: "center" }}>
    {/* Artist name skeleton */}
    <Shimmer width={280} height={56} borderRadius={8} dark={dark} />
    {/* Country skeleton */}
    <Shimmer width={120} height={24} borderRadius={4} dark={dark} style={{ marginTop: 8 }} />
    {/* Buttons skeleton */}
    <div css={{ display: "flex", gap: 30, marginTop: 30 }}>
      <Shimmer width={150} height={44} borderRadius={22} dark={dark} />
      <Shimmer width={140} height={44} borderRadius={22} dark={dark} />
    </div>
  </div>
);

/**
 * P0: Artist name, country, and CTA buttons.
 * Displays instantly from ssrCard data.
 * Animates with fadeIn effect matching the Pop window.
 */
const HeroHeader: FC<HeroHeaderProps> = ({
  artistName,
  country,
  shopUrl,
  deckUrl,
  dark,
}) => {
  if (!artistName) {
    return <HeroHeaderSkeleton dark={dark} />;
  }

  return (
    <div
      css={{
        display: "grid",
        alignContent: "center",
        maxWidth: 520,
        height: 610,
        animation: "fadeIn 0.3s ease-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Text typography="newh1">{artistName}</Text>
      <Text typography="newh4">{country ?? "..."}</Text>
      <div css={{ display: "flex", alignItems: "center", gap: 30, marginTop: 30 }}>
        <Link href={shopUrl}>
          <ArrowButton color="accent">Shop this deck</ArrowButton>
        </Link>
        <Link href={deckUrl}>
          <ArrowButton size="small" noColor base>
            Explore all cards
          </ArrowButton>
        </Link>
      </div>
    </div>
  );
};

export default HeroHeader;
export { HeroHeaderSkeleton };
