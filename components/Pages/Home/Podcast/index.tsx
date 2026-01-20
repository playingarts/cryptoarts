import { FC, HTMLAttributes, useState, useCallback, useRef } from "react";
import Intro from "../../../Intro";
import ButtonTemplate from "../../../Buttons/Button";
import Grid from "../../../Grid";
import { useLazyPodcasts } from "../../../../hooks/podcast";
import Text from "../../../Text";
import Play from "../../../Icons/Play";
import Link from "../../../Link";
import ArrowButton from "../../../Buttons/ArrowButton";

// Loading skeleton for the featured podcast card
const FeaturedPodcastSkeleton: FC = () => (
  <div css={{ padding: 30 }}>
    <div
      css={(theme) => ({
        width: 120,
        height: 16,
        borderRadius: 4,
        background: theme.colors.pale_gray,
      })}
    />
    <span
      css={{
        marginTop: 15,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div css={{ width: 380 }}>
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
            marginTop: 30,
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
          borderRadius: 15,
          background: theme.colors.pale_gray,
        })}
      />
    </span>
    <div
      css={(theme) => ({
        marginTop: 30,
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
  <div css={{ padding: 30, display: "flex", flexDirection: "column", gap: 5 }}>
    {[...Array(7)].map((_, i) => (
      <div
        key={i}
        css={{
          display: "grid",
          gridTemplateColumns: "70px 1fr auto",
          alignItems: "center",
          gap: 10,
          height: 40,
        }}
      >
        <div
          css={(theme) => ({
            width: 40,
            height: 18,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
        <div
          css={(theme) => ({
            width: "60%",
            height: 18,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
        <div
          css={(theme) => ({
            width: 50,
            height: 18,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
      </div>
    ))}
    <div
      css={(theme) => ({
        marginTop: 10,
        width: 140,
        height: 18,
        borderRadius: 4,
        background: theme.colors.pale_gray,
      })}
    />
  </div>
);

const Podcast: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  // Backend returns Baugasm first when shuffle=true, limit to 7
  const { podcasts, loading, containerRef } = useLazyPodcasts({
    variables: { limit: 7, shuffle: true },
  });

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
      css={(theme) => [{ background: theme.colors.pink, paddingBottom: 60 }]}
      {...props}
    >
      <Intro
        arrowedText="Playing Arts podcast"
        paragraphText="Conversations with artists exploring inspiration, stories, and creativity."
        titleAsText
        bottom={
          <ButtonTemplate
            base={true}
            noColor={true}
            css={{ marginTop: 120, "&:hover": { cursor: "default" } }}
          >
            Episodes
          </ButtonTemplate>
        }
      />
      <Grid css={{ marginTop: 30 }}>
        <div
          css={(theme) => [
            {
              gridColumn: "span 6",
              background: theme.colors.almost_white,
              borderRadius: 15,
            },
          ]}
        >
          {loading ? (
            <FeaturedPodcastSkeleton />
          ) : displayedPodcast ? (
            <div css={{ padding: 30, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
              <Text typography="paragraphSmall">
                EP{displayedPodcast.episode} — {displayedPodcast.time}
              </Text>
              <span
                css={[
                  {
                    marginTop: 15,
                    display: "flex",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <div css={[{ width: 380 }]}>
                  <Text typography="newh2">{displayedPodcast.name}</Text>
                  <Text typography="paragraphSmall" css={[{ marginTop: 30 }]}>
                    {displayedPodcast.desc}
                  </Text>
                </div>
                <img
                  css={[{ width: 160, height: 160, borderRadius: 15 }]}
                  src={displayedPodcast.image}
                  alt={displayedPodcast.name || "Podcast episode thumbnail"}
                />
              </span>
              <Link
                href={displayedPodcast.youtube || ""}
                target="_blank"
                rel="noopener noreferrer"
                css={{ marginTop: "auto", paddingTop: 30 }}
              >
                <ButtonTemplate
                  css={(theme) => [
                    {
                      paddingLeft: 10,
                      fontSize: 20,
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
              borderRadius: 15,
            },
          ]}
        >
          {loading ? (
            <EpisodeListSkeleton />
          ) : (
            <div css={{ padding: 30, display: "flex", flexDirection: "column", gap: 5 }}>
              {podcasts &&
                podcasts.slice(0, 7).map((podcast, index) =>
                  podcast ? (
                    <div
                      key={podcast.desc + podcast.podcastName}
                      onClick={() => setSelectedIndex(index)}
                      onMouseEnter={() => preloadImage(podcast.image)}
                      css={{
                        display: "grid",
                        gridTemplateColumns: "70px 1fr auto",
                        alignItems: "center",
                        gap: 10,
                        cursor: "pointer",
                      }}
                    >
                      <Text typography="paragraphSmall">
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
                      <Text typography="paragraphSmall">
                        {podcast.time}
                      </Text>
                    </div>
                  ) : undefined
                )}
              <Link
                href="https://youtube.com/@PlayingArtsProject"
                target="_blank"
                rel="noopener noreferrer"
                css={{ marginTop: 10 }}
              >
                <ArrowButton
                  css={{ justifyContent: "start" }}
                  noColor={true}
                  base={true}
                  size="small"
                >
                  Watch all episodes
                </ArrowButton>
              </Link>
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default Podcast;
