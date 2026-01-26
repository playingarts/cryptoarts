"use client";

import { FC, useState, useEffect, useRef, useLayoutEffect } from "react";
import { keyframes } from "@emotion/react";
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  animator?: ArtistData;
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

    <div css={(theme) => ({ marginTop: theme.spacing(6), display: "flex", gap: theme.spacing(3) })}>
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
        <div css={(theme) => ({ marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(3) })}>
          <Shimmer width={24} height={24} borderRadius={4} dark={dark} />
          <Shimmer width={24} height={24} borderRadius={4} dark={dark} />
          <Shimmer width={24} height={24} borderRadius={4} dark={dark} />
        </div>
      </div>
    </div>
  </ScandiBlock>
);

/** Reusable artist/animator block */
interface ArtistBlockProps {
  artist: ArtistData;
  title: string;
  sectionId: string;
  dark?: boolean;
  style?: React.CSSProperties;
}

const ArtistBlock: FC<ArtistBlockProps> = ({ artist, title, sectionId, dark, style }) => {
  const [infoExpanded, setInfoExpanded] = useState(false);
  const infoTextRef = useRef<HTMLDivElement>(null);
  const isInfoTruncated = useIsTruncated(infoTextRef, [artist.info, infoExpanded]);

  return (
    <ScandiBlock id={sectionId} css={{ paddingTop: 15, display: "block" }} style={style}>
      <ArrowedButton
        css={(theme) => ({
          color: theme.colors[dark ? "white75" : "black"],
        })}
        onClick={() =>
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
        }
      >
        {title}
      </ArrowedButton>

      <div>
        <div css={(theme) => ({ marginTop: theme.spacing(6), display: "flex", gap: theme.spacing(3) })}>
          {artist.userpic && (
            <img
              src={artist.userpic}
              alt={artist.name ? `${artist.name} profile` : `${title} profile`}
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
              <Text
                typography="paragraphSmall"
                css={(theme) => ({
                  color: theme.colors[dark ? "white75" : "black"],
                })}
              >
                {artist.info ?? "..."}
              </Text>
            </div>
            {!infoExpanded && isInfoTruncated && (
              <ArrowButton
                size="small"
                noColor
                base
                onClick={() => setInfoExpanded(true)}
                css={(theme) => [
                  { marginTop: 15, color: theme.colors.black },
                  dark && {
                    color: theme.colors.white75,
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
            {artist.social && (
              <div
                css={(theme) => ({
                  marginTop: theme.spacing(3),
                  display: "flex",
                  gap: theme.spacing(3),
                  alignItems: "center",
                  ...(dark && { color: theme.colors.white75 }),
                })}
              >
                {Object.entries(artist.social).map(([key, value]) => {
                  const Icon = socialIcons[key];
                  if (!value || !Icon) return null;

                  return (
                    <Link href={value} key={value} target="_blank" rel="noopener noreferrer">
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

/**
 * P1: The Artist section - loads after initial card display.
 * Uses Intersection Observer to trigger loading when approaching viewport.
 * Also shows "The animator" section if card has an animator.
 * No skeleton - content fades in when loaded.
 */
const HeroArtist: FC<HeroArtistProps> = ({ artist, animator, dark, onVisible, loading }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const isLoaded = !loading && artist?.name;

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

  return (
    <div
      ref={ref}
      css={{
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? "translateY(0)" : "translateY(20px)",
        animation: isLoaded ? `${fadeInUp} 0.4s ease-out` : "none",
      }}
    >
      <ArtistBlock
        artist={artist || {}}
        title="The artist"
        sectionId="artist"
        dark={dark}
      />
      {animator?.name && (
        <ArtistBlock
          artist={animator}
          title={`Animator – ${animator.name}`}
          sectionId="animator"
          dark={dark}
          style={{ marginTop: 60 }} /* TODO: convert to theme.spacing(6) when using css prop */
        />
      )}
    </div>
  );
};

export default HeroArtist;
export { HeroArtistSkeleton };
