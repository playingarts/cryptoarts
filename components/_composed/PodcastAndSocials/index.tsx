import React, { FC, HTMLAttributes } from "react";
import Layout, { Props as LayoutProps } from "../../Layout";
import Grid from "../../Grid";
import Podcast from "../Podcast";
import StatBlock from "../../StatBlock";
import Discord from "../../Icons/Discord";
import Text from "../../Text";
import Button from "../../Button";
import Link from "../../Link";
import { socialLinks } from "../../../source/consts";
import { breakpoints } from "../../../source/enums";
import { useSize } from "../../SizeProvider";
import Twitter from "../../Icons/Twitter";

const PodcastAndSocials: FC<HTMLAttributes<HTMLElement> & LayoutProps> = (
  props
) => {
  const { width } = useSize();
  return (
    <Layout {...props}>
      <Grid
        css={(theme) => ({
          alignItems: "flex-start",
          gap: theme.spacing(3),
          [theme.maxMQ.sm]: {
            gap: theme.spacing(1),
          },
        })}
      >
        <Podcast title="PODCAST" />
        <StatBlock
          css={(theme) => ({
            background: "#5865F2",
            color: theme.colors.text_title_light,
            position: "relative",
            overflow: "hidden",
            gridColumn: "span 3",

            [theme.mq.md]: {
              gridColumn: "span 3",
            },

            [theme.maxMQ.md]: {
              gridColumn: "span 4",
            },

            [theme.maxMQ.sm]: {
              gridColumn: "span 9",
            },
          })}
        >
          <Discord
            css={{
              "& stop:first-child": {
                stopColor: "currentColor",
                stopOpacity: 0.5,
              },
              "& stop:last-child": {
                stopColor: "#5865F2",
              },
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translate(50%, -50%)",
              height: "80%",
              width: "100%",
              fill: "url(#gradient)",
              opacity: 0.5,
            }}
          />
          <div
            css={(theme) => ({
              position: "relative",
              [theme.maxMQ.sm]: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            })}
          >
            <Text
              component={width >= breakpoints.sm ? "h4" : "h3"}
              css={(theme) => ({
                margin: 0,
                [theme.maxMQ.sm]: {
                  paddingTop: 7,
                },
              })}
            >
              Discord
            </Text>
            {width >= breakpoints.sm && (
              <Text
                css={{
                  marginTop: 10,
                }}
              >
                Join our community
              </Text>
            )}
            {socialLinks.discord && (
              <Button
                Icon={Discord}
                css={{ marginTop: 0, color: "#5865F2" }}
                component={Link}
                href={socialLinks.discord}
                target="_blank"
              >
                Join
              </Button>
            )}
          </div>
        </StatBlock>
        <StatBlock
          css={(theme) => ({
            background: "#489BE9",
            color: theme.colors.text_title_light,
            position: "relative",
            overflow: "hidden",
            gridColumn: "span 3",

            [theme.mq.md]: {
              gridColumn: "span 3",
            },

            [theme.maxMQ.md]: {
              gridColumn: "span 4",
            },

            [theme.maxMQ.sm]: {
              gridColumn: "span 9",
            },
          })}
        >
          <Twitter
            css={{
              "& stop:first-child": {
                stopColor: "currentColor",
                stopOpacity: 0.5,
              },
              "& stop:last-child": {
                stopColor: "#489BE9",
              },
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translate(50%, -50%)",
              height: "80%",
              width: "100%",
              fill: "url(#gradient)",
              opacity: 0.5,
            }}
          />
          <div
            css={(theme) => ({
              position: "relative",
              [theme.maxMQ.sm]: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
            })}
          >
            <Text
              component={width >= breakpoints.sm ? "h4" : "h3"}
              css={(theme) => ({
                margin: 0,
                [theme.maxMQ.sm]: {
                  paddingTop: 7,
                },
              })}
            >
              Twitter
            </Text>
            {width >= breakpoints.sm && (
              <Text
                css={{
                  marginTop: 10,
                }}
              >
                Latest breaking news
              </Text>
            )}
            {socialLinks.twitter && (
              <Button
                Icon={Twitter}
                css={{ color: "#489BE9" }}
                component={Link}
                href={socialLinks.twitter}
                target="_blank"
              >
                Follow
              </Button>
            )}
          </div>
        </StatBlock>
      </Grid>
    </Layout>
  );
};

export default PodcastAndSocials;
