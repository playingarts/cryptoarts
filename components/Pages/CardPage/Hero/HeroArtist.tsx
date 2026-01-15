"use client";

import { FC, useState, useEffect, useRef, useLayoutEffect } from "react";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Link from "../../../Link";
import ScandiBlock from "../../../ScandiBlock";
import Instagram from "../../../Icons/Instagram";
import Twitter from "../../../Icons/Twitter";
import Website from "../../../Icons/Website";
import Facebook from "../../../Icons/Facebook";
import Behance from "../../../Icons/Behance";
import Foundation from "../../../Icons/Foundation";
import Shimmer from "./Shimmer";

/** Check if element is truncated (content overflows) */
const useIsTruncated = (ref: React.RefObject<HTMLElement | null>, deps: unknown[] = []) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Check if scrollHeight > clientHeight (text is clamped)
    setIsTruncated(el.scrollHeight > el.clientHeight);
  }, deps);

  return isTruncated;
};

const socialIcons: Record<string, FC> = {
  website: Website,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  behance: Behance,
  foundation: Foundation,
};

/** Artist data from either SSR card props or Apollo GQL.Artist */
interface ArtistData {
  name?: string;
  userpic?: string | null;
  info?: string | null;
  social?: Record<string, string | null> | GQL.Socials | null;
}

interface HeroArtistProps {
  artist?: ArtistData;
  dark?: boolean;
  /** Called when section enters viewport - triggers loading */
  onVisible?: () => void;
  /** Is the data loading? */
  loading?: boolean;
}

/** Skeleton for artist section */
const HeroArtistSkeleton: FC<{ dark?: boolean }> = ({ dark }) => (
  <ScandiBlock css={{ paddingTop: 15, display: "block" }}>
    {/* "The artist" button skeleton */}
    <Shimmer width={100} height={32} borderRadius={16} dark={dark} />

    <div css={{ maxWidth: 520, marginTop: 60, display: "flex", gap: 30 }}>
      {/* Userpic skeleton */}
      <Shimmer width={80} height={80} borderRadius={10} dark={dark} />

      <div css={{ flexBasis: 0, flexGrow: 1 }}>
        {/* Bio text skeleton - 5 lines */}
        <div css={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Shimmer height={16} dark={dark} />
          <Shimmer height={16} dark={dark} />
          <Shimmer height={16} width="90%" dark={dark} />
          <Shimmer height={16} width="95%" dark={dark} />
          <Shimmer height={16} width="60%" dark={dark} />
        </div>

        {/* Social icons skeleton */}
        <div css={{ marginTop: 30, display: "flex", gap: 30 }}>
          <Shimmer width={24} height={24} borderRadius={4} dark={dark} />
          <Shimmer width={24} height={24} borderRadius={4} dark={dark} />
          <Shimmer width={24} height={24} borderRadius={4} dark={dark} />
        </div>
      </div>
    </div>
  </ScandiBlock>
);

/**
 * P1: The Artist section - loads after initial card display.
 * Uses Intersection Observer to trigger loading when approaching viewport.
 */
const HeroArtist: FC<HeroArtistProps> = ({ artist, dark, onVisible, loading }) => {
  const [infoExpanded, setInfoExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  // Check if artist info text is truncated (more than 5 lines)
  const isInfoTruncated = useIsTruncated(infoTextRef, [artist?.info, infoExpanded]);

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
  if (loading || !artist?.name) {
    return (
      <div ref={ref}>
        <HeroArtistSkeleton dark={dark} />
      </div>
    );
  }

  return (
    <ScandiBlock id="the-artist" css={{ paddingTop: 15, display: "block" }}>
      <ArrowedButton
        onClick={() =>
          document.getElementById("the-artist")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        The artist
      </ArrowedButton>

      <div css={{ maxWidth: 520 }}>
        <div css={{ marginTop: 60, display: "flex", gap: 30 }}>
          {artist.userpic && (
            <img
              src={artist.userpic}
              alt={artist.name ? `${artist.name} profile` : "Artist profile"}
              loading="lazy"
              css={{
                borderRadius: 10,
                aspectRatio: "1",
                height: 80,
              }}
            />
          )}
          <div css={{ flexBasis: 0, flexGrow: 1 }}>
            <div
              ref={infoTextRef}
              css={
                !infoExpanded && {
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              }
            >
              <Text typography="paragraphSmall">
                {artist.info ?? "..."}
              </Text>
            </div>
            {!infoExpanded && isInfoTruncated && (
              <ArrowButton
                size="small"
                noColor
                base
                onClick={() => setInfoExpanded(true)}
                css={{ marginTop: 15 }}
              >
                Continue reading
              </ArrowButton>
            )}
            {artist.social && (
              <div
                css={(theme) => ({
                  marginTop: 30,
                  display: "flex",
                  gap: 30,
                  alignItems: "center",
                  ...(dark && { color: theme.colors.white75 }),
                })}
              >
                {Object.entries(artist.social).map(([key, value]) => {
                  const Icon = socialIcons[key];
                  if (!value || !Icon) return null;

                  return (
                    <Link href={value} key={value}>
                      <Icon />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </ScandiBlock>
  );
};

export default HeroArtist;
export { HeroArtistSkeleton };
