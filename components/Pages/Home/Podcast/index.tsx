import { FC, Fragment, HTMLAttributes, useState } from "react";
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
  <Grid
    auto={true}
    css={{
      alignItems: "center",
      justifyContent: "start",
      rowGap: 5,
      padding: 30,
    }}
  >
    {[...Array(10)].map((_, i) => (
      <Fragment key={i}>
        <div
          css={(theme) => ({
            width: 30,
            height: 16,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
        <div
          css={(theme) => ({
            gridColumn: "span 3",
            width: "70%",
            height: 20,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
        <div
          css={(theme) => ({
            width: 50,
            height: 16,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
      </Fragment>
    ))}
  </Grid>
);

const Podcast: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { podcasts, loading, containerRef } = useLazyPodcasts({
    variables: { limit: 10, shuffle: true },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Show selected episode (default to first/latest)
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
            <div css={{ padding: 30 }}>
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
              >
                <ButtonTemplate
                  css={(theme) => [
                    {
                      marginTop: 30,
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
              borderRadius: 15,
            },
          ]}
        >
          {loading ? (
            <EpisodeListSkeleton />
          ) : (
            <div css={{ padding: 30, display: "flex", flexDirection: "column", gap: 5 }}>
              {podcasts &&
                podcasts.slice(0, 10).map((podcast, index) =>
                  podcast ? (
                    <div
                      key={podcast.desc + podcast.podcastName}
                      onClick={() => setSelectedIndex(index)}
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
