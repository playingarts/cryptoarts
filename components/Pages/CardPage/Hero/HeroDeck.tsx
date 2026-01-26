"use client";

import { FC, useEffect, useRef } from "react";
import { keyframes } from "@emotion/react";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Link from "../../../Link";
import ScandiBlock from "../../../ScandiBlock";

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

/**
 * P3: The Deck section - loads after card info.
 * Shows deck image, description, and navigation links.
 * No skeleton - content fades in when loaded.
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
  const isLoaded = !loading && deck;

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
      <ScandiBlock
        id="the-deck"
        css={(theme) => ({ paddingTop: theme.spacing(1.5), marginTop: theme.spacing(6), display: "block" })}
      >
      <ArrowedButton
        css={(theme) => ({
          display: "block",
          color: theme.colors[dark ? "white75" : "black"],
        })}
        onClick={() =>
          document.getElementById("the-deck")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        The deck
      </ArrowedButton>

      {deck && (
        <>
          {deckImage && (
            <img
              src={deckImage}
              alt={
                deck.title
                  ? editionDisplayName && deck.slug === "future"
                    ? `Future ${editionDisplayName} deck`
                    : `${deck.title}${editionDisplayName ? ` ${editionDisplayName}` : ""} deck`
                  : "Deck"
              }
              loading="lazy"
              css={{ height: 300, aspectRatio: "1", objectFit: "cover" }}
            />
          )}

          <Text
            css={(theme) => ({
              marginTop: theme.spacing(3),
              color: theme.colors[dark ? "white75" : "black"],
            })}
          >
            {deck.info}
          </Text>

          <div css={(theme) => ({ display: "flex", alignItems: "center", gap: theme.spacing(3), marginTop: theme.spacing(3) })}>
            <Link href={shopUrl}>
              <ArrowButton color={dark ? "accent" : "dark_gray"} size="medium">
                Shop {editionDisplayName && deck.slug === "future"
                  ? `Future ${editionDisplayName}`
                  : deck.title}
              </ArrowButton>
            </Link>
            <Link href={deckUrl}>
              <ArrowButton
                size="small"
                noColor
                base
                css={(theme) => [
                  { color: theme.colors.black },
                  dark && {
                    color: theme.colors.white75,
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: theme.colors.white,
                    },
                  },
                ]}
              >
                View the deck
              </ArrowButton>
            </Link>
          </div>
        </>
      )}
    </ScandiBlock>
    </div>
  );
};

export default HeroDeck;
