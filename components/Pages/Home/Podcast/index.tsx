import { FC, HTMLAttributes, useState, useCallback, useRef } from "react";
import Intro from "../../../Intro";
import ButtonTemplate from "../../../Buttons/Button";
import Grid from "../../../Grid";
import { useLazyPodcasts } from "../../../../hooks/podcast";
import Text from "../../../Text";
import Play from "../../../Icons/Play";
import Link from "../../../Link";
import ArrowButton from "../../../Buttons/ArrowButton";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";

// Loading skeleton for the featured podcast card
const FeaturedPodcastSkeleton: FC = () => (
  <div css={(theme) => ({ padding: theme.spacing(3) })}>
    <div
      css={(theme) => ({
        width: 120,
        height: 16,
        borderRadius: 4,
        background: theme.colors.pale_gray,
      })}
    />
    <span
      css={(theme) => ({
        marginTop: 15,
        display: "flex",
        justifyContent: "space-between",
        [theme.maxMQ.xsm]: {
          flexDirection: "column-reverse",
          gap: theme.spacing(2),
        },
      })}
    >
      <div css={(theme) => ({ width: 380, [theme.maxMQ.sm]: { width: "auto", flex: 1 } })}>
        <div
          css={(theme) => ({
            width: "80%",
            height: 32,
            borderRadius: 8,
            background: theme.colors.pale_gray,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s ease-in-out infinite",
            "@keyframes shimmer": {
              "0%": { backgroundPosition: "200% 0" },
              "100%": { backgroundPosition: "-200% 0" },
            },
          })}
        />
        <div
          css={(theme) => ({
            marginTop: theme.spacing(3),
            width: "100%",
            height: 60,
            borderRadius: 8,
            background: theme.colors.pale_gray,
          })}
        />
      </div>
      <div
        css={(theme) => ({
          width: 160,
          height: 160,
          borderRadius: theme.spacing(1.5),
          background: theme.colors.pale_gray,
          flexShrink: 0,
          [theme.maxMQ.xsm]: { width: 100, height: 100 },
        })}
      />
    </span>
    <div
      css={(theme) => ({
        marginTop: theme.spacing(3),
        width: 150,
        height: 44,
        borderRadius: 22,
        background: theme.colors.pale_gray,
      })}
    />
  </div>
);

// Loading skeleton for the episode list
const EpisodeListSkeleton: FC = () => (
  <div css={{ padding: 15, display: "flex", flexDirection: "column", gap: 5 }}>
    {[...Array(7)].map((_, i) => (
      <div
        key={i}
        css={(theme) => ({
          height: 50,
          borderRadius: 8,
          background: theme.colors.pale_gray,
        })}
      />
    ))}
  </div>
);

const Podcast: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  // Backend returns Baugasm first when shuffle=true, limit to 7
  const { podcasts, loading, containerRef } = useLazyPodcasts({
    variables: { limit: 7, shuffle: true },
  });

  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;
  const episodeLimit = isMobile ? 5 : 7;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const preloadedImages = useRef<Set<string>>(new Set());

  // Preload image on hover for instant display when clicked
  const preloadImage = useCallback((imageUrl: string | undefined | null) => {
    if (!imageUrl || preloadedImages.current.has(imageUrl)) return;
    preloadedImages.current.add(imageUrl);
    const img = new Image();
    img.src = imageUrl;
  }, []);

  // Show selected episode (default to first - Baugasm)
  const displayedPodcast = podcasts && podcasts[selectedIndex];

  return (
    <div
      ref={containerRef}
      css={(theme) => [{ background: theme.colors.pink, paddingTop: theme.spacing(6), paddingBottom: theme.spacing(6), [theme.maxMQ.xsm]: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(6) } }]}
      {...props}
    >
      <Intro
        arrowedText="Playing Arts podcast"
        paragraphText="Conversations with artists exploring inspiration, stories, and creativity."
        beforeLinkNew={
          <Link
            href="https://youtube.com/@PlayingArtsProject"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonTemplate bordered size="small">
              Watch all episodes
            </ButtonTemplate>
          </Link>
        }
        bottom={
          <ButtonTemplate
            base={true}
            noColor={true}
            css={(theme) => ({ marginTop: theme.spacing(12), "&:hover": { cursor: "default" }, [theme.maxMQ.xsm]: { display: "none" } })}
          >
            Episodes
          </ButtonTemplate>
        }
      />
      <Grid css={(theme) => ({ marginTop: theme.spacing(3), [theme.maxMQ.xsm]: { gap: theme.spacing(1.5), marginTop: 0 } })}>
        <div
          css={(theme) => [
            {
              gridColumn: "span 6",
              background: theme.colors.almost_white,
              borderRadius: theme.spacing(1.5),
              [theme.maxMQ.xsm]: {
                gridColumn: "1 / -1",
              },
            },
          ]}
        >
          {loading ? (
            <FeaturedPodcastSkeleton />
          ) : displayedPodcast ? (
            <div css={(theme) => ({ padding: theme.spacing(3), display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", [theme.maxMQ.xsm]: { padding: theme.spacing(2) } })}>
              <Text typography="p-s">
                EP{displayedPodcast.episode} — {displayedPodcast.time}
              </Text>
              <span
                css={(theme) => [
                  {
                    marginTop: 15,
                    display: "flex",
                    justifyContent: "space-between",
                    [theme.maxMQ.xsm]: {
                      alignItems: "flex-start",
                      gap: theme.spacing(2),
                      marginTop: theme.spacing(2),
                    },
                  },
                ]}
              >
                <div css={(theme) => [{ width: 380, [theme.maxMQ.sm]: { width: "auto", flex: 1 } }]}>
                  <Text typography="h2">{displayedPodcast.name}</Text>
                  <Text typography="p-s" css={(theme) => [{ marginTop: theme.spacing(3), [theme.maxMQ.xsm]: { display: "none" } }]}>
                    {displayedPodcast.desc}
                  </Text>
                  {/* Mobile-only button under artist name */}
                  <Link
                    href={displayedPodcast.youtube || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    css={(theme) => ({ display: "none", [theme.maxMQ.xsm]: { display: "block", marginTop: theme.spacing(2) } })}
                  >
                    <ButtonTemplate
                      size="medium"
                      css={{ paddingLeft: 10 }}
                    >
                      <Play css={{ marginRight: 10 }} />
                      Watch episode
                    </ButtonTemplate>
                  </Link>
                </div>
                <img
                  css={(theme) => [{ width: 160, height: 160, borderRadius: theme.spacing(1.5), flexShrink: 0, [theme.maxMQ.xsm]: { width: 100, height: 100 } }]}
                  src={displayedPodcast.image}
                  alt={displayedPodcast.name || "Podcast episode thumbnail"}
                />
              </span>
              {/* Desktop-only button at bottom */}
              <Link
                href={displayedPodcast.youtube || ""}
                target="_blank"
                rel="noopener noreferrer"
                css={(theme) => ({ marginTop: "auto", paddingTop: 30, [theme.maxMQ.xsm]: { display: "none" } })}
              >
                <ButtonTemplate
                  size="medium"
                  css={(theme) => [
                    {
                      paddingLeft: 10,
                    },
                  ]}
                >
                  <Play
                    css={{
                      marginRight: 10,
                    }}
                  />
                  Watch episode
                </ButtonTemplate>
              </Link>
            </div>
          ) : null}
        </div>
        <div
          css={(theme) => [
            {
              gridColumn: "span 6",
              background: theme.colors.almost_white,
              borderRadius: theme.spacing(1.5),
              [theme.maxMQ.xsm]: {
                gridColumn: "1 / -1",
              },
            },
          ]}
        >
          {loading ? (
            <EpisodeListSkeleton />
          ) : (
            <div css={(theme) => ({ padding: 15, display: "flex", flexDirection: "column", gap: 5, [theme.maxMQ.xsm]: { padding: theme.spacing(1) } })}>
              {podcasts &&
                podcasts.slice(0, episodeLimit).map((podcast, index) =>
                  podcast ? (
                    <div
                      key={podcast.desc + podcast.podcastName}
                      onClick={() => setSelectedIndex(index)}
                      onMouseEnter={() => preloadImage(podcast.image)}
                      css={(theme) => ({
                        display: "grid",
                        gridTemplateColumns: "70px 1fr auto",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                        padding: "5px 15px",
                        borderRadius: 8,
                        background: selectedIndex === index ? theme.colors.pink : "transparent",
                        transition: "background 0.2s ease",
                        [theme.maxMQ.xsm]: {
                          gridTemplateColumns: "1fr auto",
                          padding: "2px 15px",
                        },
                      })}
                    >
                      <Text typography="p-s" css={(theme) => ({ [theme.maxMQ.xsm]: { display: "none" } })}>
                        EP{podcast.episode}
                      </Text>
                      <ArrowButton
                        css={{ justifyContent: "start" }}
                        noColor={true}
                        base={true}
                        size="small"
                      >
                        {podcast.name}
                      </ArrowButton>
                      <Text typography="p-s">
                        {podcast.time}
                      </Text>
                    </div>
                  ) : undefined
                )}
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default Podcast;
