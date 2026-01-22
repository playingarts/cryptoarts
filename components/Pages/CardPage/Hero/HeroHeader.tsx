"use client";

import { FC, useEffect, useState } from "react";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import Button from "../../../Buttons/Button";
import Link from "../../../Link";
import Star from "../../../Icons/Star";
import { useFavorites } from "../../../Contexts/favorites";
import Shimmer from "./Shimmer";

/** Favorite button - shows star icon, links to favorites page when favorited */
const FavButton: FC<{ deckSlug: string; cardId: string }> = ({ deckSlug, cardId }) => {
  const { isFavorite, addItem } = useFavorites();
  const [favState, setFavState] = useState(false);

  useEffect(() => {
    setFavState(isFavorite(deckSlug, cardId));
  }, [isFavorite, deckSlug, cardId]);

  const Btn = (
    <Button
      color={favState ? "white" : "accent"}
      css={(theme) => [
        {
          padding: 0,
          width: 45,
          height: 45,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        },
        favState && {
          color: theme.colors.accent,
          "&:hover": {
            color: theme.colors.accent,
          },
        },
      ]}
      onClick={() => {
        !favState && addItem(deckSlug, cardId);
      }}
    >
      <Star />
    </Button>
  );

  return favState ? (
    <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/favorites"}>
      {Btn}
    </Link>
  ) : (
    Btn
  );
};

interface HeroHeaderProps {
  artistName?: string;
  country?: string;
  shopUrl: string;
  deckUrl: string;
  dark?: boolean;
  deckSlug: string;
  cardId?: string;
  deckTitle?: string;
}

/** Skeleton for artist name and country - matches newh1 (70px/120%) and newh4 (25px/45px) */
const HeroHeaderSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <div css={{ maxWidth: 520, height: 610, display: "grid", alignContent: "center" }}>
    {/* Artist name skeleton - newh1: 70px fontSize, 120% lineHeight = 84px */}
    <Shimmer width={280} height={84} borderRadius={8} dark={dark} />
    {/* Country skeleton - newh4: 25px fontSize, 45px lineHeight */}
    <Shimmer width={120} height={45} borderRadius={4} dark={dark} style={{ marginTop: 8 }} />
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
  deckSlug,
  cardId,
  deckTitle,
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
      <div css={{ display: "flex", alignItems: "center", gap: 15, marginTop: 30 }}>
        {cardId && <FavButton deckSlug={deckSlug} cardId={cardId} />}
        <Link href={shopUrl}>
          <ArrowButton color="accent" css={{ fontSize: 20 }}>Shop {deckTitle || "this deck"}</ArrowButton>
        </Link>
        <Link href={deckUrl} css={{ marginLeft: 15 }}>
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
