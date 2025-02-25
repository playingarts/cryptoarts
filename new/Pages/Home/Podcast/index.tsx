import { FC, Fragment, HTMLAttributes } from "react";
import Intro from "../../../Intro";
import ButtonTemplate from "../../../Buttons/Button";
import Grid from "../../../../components/Grid";
import { usePodcasts } from "../../../../hooks/podcast";
import Text from "../../../Text";
import Play from "../../../Icons/Play";
import Link from "../../../Link";
import Dot from "../../../Icons/Dot";
import ArrowButton from "../../../Buttons/ArrowButton";

const Podcast: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { podcasts } = usePodcasts({
    variables: { limit: 7, shuffle: false },
  });

  //   const podcast = podcasts && podcasts[0];
  const latestPodcast = podcasts && podcasts[0];

  return (
    <div
      css={(theme) => [{ background: theme.colors.pink, paddingBottom: 60 }]}
    >
      <Intro
        arrowedText="Playing Arts podcast"
        paragraphText="Conversations with artists exploring inspiration, stories, and creativity."
        linkNewText="Watch all episodes"
        bottom={
          <ButtonTemplate base={true} noColor={true} css={{ marginTop: 120 }}>
            Recent episodes
          </ButtonTemplate>
        }
      />
      <Grid css={[!podcasts && { "> *": { height: 397 } }, { marginTop: 30 }]}>
        <div
          css={(theme) => [
            {
              gridColumn: "span 6",
              padding: 30,
              background: theme.colors.almost_white,
              borderRadius: 15,
            },
          ]}
        >
          {latestPodcast && (
            <>
              <Text typography="paragraphSmall">
                EP{latestPodcast.episode} — {latestPodcast.time}
              </Text>
              <span css={[{ marginTop: 15, display: "flex" }]}>
                <div css={[{ width: 380 }]}>
                  <Text typography="newh2">{latestPodcast.name}</Text>
                  <Text typography="paragraphSmall" css={[{ marginTop: 30 }]}>
                    {latestPodcast.desc}
                  </Text>
                </div>
                <img
                  css={[{ width: 160, height: 160, borderRadius: 15 }]}
                  src={latestPodcast.image}
                  alt={latestPodcast.name}
                />
              </span>
              <Link
                href={latestPodcast.youtube || ""}
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
            </>
          )}
        </div>
        <Grid
          auto={true}
          css={(theme) => [
            {
              gridColumn: "span 6",
              padding: 30,
              background: theme.colors.almost_white,
              borderRadius: 15,
            },
          ]}
        >
          {podcasts &&
            podcasts.map((podcast) =>
              podcast ? (
                <Fragment key={podcast.desc + podcast.podcastName}>
                  <Text typography="paragraphSmall">EP{podcast.episode}</Text>
                  <ArrowButton
                    css={[{ gridColumn: "span 3", textAlign: "start" }]}
                    noColor={true}
                    base={true}
                    size="small"
                  >
                    {podcast.name}
                  </ArrowButton>
                  <Text typography="paragraphSmall">{podcast.time}</Text>
                </Fragment>
              ) : undefined
            )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Podcast;
