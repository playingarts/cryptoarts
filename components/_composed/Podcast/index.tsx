import { FC, HTMLAttributes } from "react";
import Line from "../../../components/Line";
import { usePodcasts } from "../../../hooks/podcast";
import { socialLinks } from "../../../source/consts";
import Button from "../../Button";
import Itunes from "../../Icons/Itunes";
import Play from "../../Icons/Play";
import Spotify from "../../Icons/Spotify";
import Link from "../../Link";
import StatBlock from "../../StatBlock";
import Text from "../../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  withoutAction?: boolean;
  smallTitle?: boolean;
  name?: string;
}

const Podcast: FC<Props> = ({
  name,
  title,
  withoutAction,
  smallTitle,
  ...props
}) => {
  const { podcasts } = usePodcasts({
    variables: { limit: 1, shuffle: true, ...(name && { name }) },
  });

  const podcast = podcasts && podcasts[0];

  if (!podcast) {
    return null;
  }

  const { image, podcastName, youtube, spotify, apple, episode } = podcast;

  return (
    <StatBlock
      {...props}
      css={(theme) => ({
        background: "#510EAC",
        color: theme.colors.text_title_light,
        gridColumn: "span 6",
        position: "relative",

        [theme.maxMQ.md]: {
          gridColumn: "span 9",
        },
      })}
      title={title + "・EP" + episode.toString().padStart(2, "0")}
      {...(socialLinks.podcastYoutube &&
        !withoutAction && {
          action: {
            children: "Follow on YouTube",
            href: socialLinks.podcastYoutube,
            target: "_blank",
          },
        })}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          css={(theme) => ({
            display: "inline",
            [theme.mq.sm]: {
              flexGrow: 1,
              paddingRight: theme.spacing(17),
            },
            [theme.maxMQ.sm]: {
              width: "calc(100% - 140px)",
            },
          })}
        >
          <Text
            component={smallTitle ? "h3" : "h2"}
            css={(theme) => ({
              marginTop: 0,
              marginBottom: theme.spacing(1),
              [theme.mq.sm]: [!smallTitle && theme.typography.h3],
              [theme.maxMQ.sm]: theme.typography.h3,
            })}
          >
            {podcastName}
          </Text>
          <div
            css={(theme) => ({
              marginTop: theme.spacing(2),
              display: "flex",
              alignItems: "center",
              columnGap: theme.spacing(1),

              [theme.maxMQ.sm]: {
                marginTop: theme.spacing(1.5),
                flexWrap: "wrap",
                gap: theme.spacing(1),
              },
            })}
          >
            {youtube && (
              <Button
                Icon={Play}
                css={{ color: "#510EAC" }}
                component={Link}
                href={youtube}
                target="_blank"
              >
                Watch
              </Button>
            )}
            <div css={{ display: "flex", gap: "inherit" }}>
              {apple && (
                <Button
                  // variant="bordered"
                  size="small"
                  Icon={Itunes}
                  css={(theme) => [
                    {
                      opacity: 1,
                      transition: theme.transitions.fast("background"),
                      background: "rgba(255,255,255,.1)",
                      borderRadius: 50,
                      width: 50,
                      height: 50,
                      "&:hover": {
                        background: "rgba(255,255,255,.2)",
                      },
                      [theme.maxMQ.sm]: {
                        width: 42,
                        height: 42,
                      },
                    },
                  ]}
                  component={Link}
                  href={apple}
                  target="_blank"
                />
              )}
              {spotify && (
                <Button
                  // variant="bordered"
                  size="small"
                  Icon={Spotify}
                  css={(theme) => [
                    {
                      opacity: 1,
                      transition: theme.transitions.fast("background"),
                      background: "rgba(255,255,255,.1)",
                      borderRadius: 50,
                      width: 50,
                      height: 50,
                      "&:hover": {
                        background: "rgba(255,255,255,.2)",
                      },
                      [theme.maxMQ.sm]: {
                        width: 42,
                        height: 42,
                      },
                    },
                  ]}
                  component={Link}
                  href={spotify}
                  target="_blank"
                />
              )}
            </div>
          </div>
          {!withoutAction && (
            <Line
              spacing={0}
              css={(theme) => [
                {
                  marginTop: theme.spacing(2.5),
                  color: "#fff",
                  [theme.mq.sm]: {
                    gridColumn: "1 / -1",
                    width: "100%",
                  },
                },
              ]}
            />
          )}
        </div>
        <div
          css={(theme) => ({
            width: theme.spacing(16),
            height: theme.spacing(16),
            background: "#000",
            borderRadius: "50%",
            flexShrink: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            position: "absolute",
            right: theme.spacing(4),
            top: "50%",
            transform: "translateY(-50%)",
            [theme.maxMQ.sm]: {
              width: theme.spacing(12),
              height: theme.spacing(12),
              right: theme.spacing(2),
            },
          })}
        />
      </div>
    </StatBlock>
  );
};

export default Podcast;
