import { NextPage } from "next";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { withApollo } from "../source/apollo";
import Grid from "../components/Grid";
import Esquire from "../components/Icons/Esquire";
import FastCompany from "../components/Icons/FastCompany";
import CreativeBloq from "../components/Icons/CreativeBloq";
import DigitalArts from "../components/Icons/DigitalArts";
import Quote from "../components/Quote";
import Text from "../components/Text";
import Link from "../components/Link";
import Button from "../components/Button";
import Twitter from "../components/Icons/Twitter";
import Discord from "../components/Icons/Discord";
import Play from "../components/Icons/Play";
import Itunes from "../components/Icons/Itunes";
import Spotify from "../components/Icons/Spotify";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import Kickstarter from "../components/Icons/Kickstarter";
import Arrowed from "../components/Arrowed";
import StatBlock from "../components/StatBlock";
import ComposedCardOfTheDay from "../components/_composed/CardOfTheDay";
import { socialLinks } from "../source/consts";
import CutoutChevron from "../components/Icons/CutoutChevron";
import BrowseCollection from "../components/_composed/BrowseCollection";
import BlockTitle from "../components/BlockTitle";

const Home: NextPage = () => {
  return (
    <ComposedGlobalLayout>
      <Layout
        css={(theme) => ({
          background: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
          overflow: "hidden",
          paddingTop: theme.spacing(26),
          paddingBottom: theme.spacing(6.5),
          backgroundImage:
            "url(https://s3.amazonaws.com/img.playingarts.com/www/static/home_bg.jpg)",
          backgroundSize: "cover",
        })}
      >
        <Grid>
          <div css={{ gridColumn: "2 / span 6" }}>
            <Text component="h1" css={{ margin: 0 }}>
              Collective Art Project
            </Text>
            <Text variant="body3">
              For creative people who are into art, playing cards and sometimes
              magic.
            </Text>
            <Button
              component={Link}
              href={{
                query: {
                  scrollIntoView: "[data-id='block-about']",
                  scrollIntoViewBehavior: "smooth",
                },
              }}
              shallow={true}
              scroll={false}
              Icon={CutoutChevron}
            />
          </div>
          <Hero css={{ gridColumn: "8 / span 5" }} />
        </Grid>
      </Layout>

      <Layout
        css={(theme) => ({
          background: theme.colors.page_bg_light_gray,
          paddingTop: theme.spacing(14),
          paddingBottom: theme.spacing(12),
        })}
        data-id="block-about"
      >
        <Grid
          css={(theme) => ({
            background: theme.colors.page_bg_light_gray,
          })}
        >
          <Grid css={{ gridColumn: "2 / span 10" }}>
            <Text component="h2" css={{ margin: 0, gridColumn: "1 / -1" }}>
              About
            </Text>
            <div css={{ margin: 0, gridColumn: "span 7" }}>
              <Text variant="body3">
                Playing Arts is a collective art project where leading artists
                from all over the world express their vision of an ordinary
                playing card using personal styles, techniques and imagination.
              </Text>
              <Text
                component={Link}
                variant="label"
                href="/"
                css={{ opacity: 0.5 }}
              >
                <Arrowed>Read our story</Arrowed>
              </Text>
            </div>
            <Text variant="body3" css={{ gridColumn: "9 / span 2" }}>
              <Kickstarter />
            </Text>
          </Grid>
        </Grid>
      </Layout>

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
        })}
      >
        <Grid>
          <BlockTitle
            variant="h3"
            title="Browse Collection"
            css={{ gridColumn: "2 / span 10" }}
          />
        </Grid>
        <BrowseCollection css={(theme) => ({ marginTop: theme.spacing(4) })} />
      </Layout>

      <ComposedCardOfTheDay
        css={(theme) => ({
          background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
          color: theme.colors.page_bg_light,
        })}
      />

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        })}
      >
        <Grid
          css={{
            alignItems: "flex-start",
          }}
        >
          <StatBlock
            css={(theme) => ({
              background: "#510EAC",
              color: theme.colors.text_title_light,
              gridColumn: "span 6",
            })}
            title="PLAYING ARTS PODCAST・EP17"
            {...(socialLinks.podcastYoutube && {
              action: {
                children: "All episodes",
                href: socialLinks.podcastYoutube,
                target: "_blank",
              },
            })}
          >
            <div
              css={{
                display: "flex",
                columnGap: 50,
              }}
            >
              <div css={{ flexGrow: 1 }}>
                <Text
                  component="h3"
                  css={(theme) => ({
                    textTransform: "uppercase",
                    marginTop: 0,
                    marginBottom: theme.spacing(1),
                  })}
                >
                  Prateek Vatash
                </Text>
                <div
                  css={(theme) => ({
                    marginTop: theme.spacing(2),
                    display: "flex",
                    alignItems: "center",
                    columnGap: theme.spacing(2),
                  })}
                >
                  {socialLinks.podcastYoutube && (
                    <Button
                      Icon={Play}
                      css={{ color: "#510EAC" }}
                      component={Link}
                      href={socialLinks.podcastYoutube}
                      target="_blank"
                    >
                      Watch
                    </Button>
                  )}
                  {socialLinks.podcastAppleMusic && (
                    <Button
                      variant="bordered"
                      size="small"
                      Icon={Itunes}
                      css={{ opacity: 0.5 }}
                      component={Link}
                      href={socialLinks.podcastAppleMusic}
                      target="_blank"
                    />
                  )}
                  {socialLinks.podcastSpotify && (
                    <Button
                      variant="bordered"
                      size="small"
                      Icon={Spotify}
                      css={{ opacity: 0.5 }}
                      component={Link}
                      href={socialLinks.podcastSpotify}
                      target="_blank"
                    />
                  )}
                </div>
              </div>
              <div
                css={(theme) => ({
                  width: theme.spacing(16),
                  height: theme.spacing(16),
                  background: "#000",
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundImage:
                    "url(https://s3.amazonaws.com/img.playingarts.com/www/podcast/prateek-vatash.jpg)",
                  backgroundSize: "cover",
                })}
              ></div>
            </div>
          </StatBlock>
          <StatBlock
            css={(theme) => ({
              background: "#5865F2",
              color: theme.colors.text_title_light,
              position: "relative",
              overflow: "hidden",
              gridColumn: "7 / span 3",
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
            <div css={{ position: "relative" }}>
              <Text component="h4" css={{ margin: 0 }}>
                Discord
              </Text>
              <Text css={{ marginTop: 0 }}>Join the conversation</Text>
              {socialLinks.discord && (
                <Button
                  Icon={Discord}
                  css={{ color: "#5865F2" }}
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
              gridColumn: "10 / span 3",
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
            <div css={{ position: "relative" }}>
              <Text component="h4" css={{ margin: 0 }}>
                Twitter
              </Text>
              <Text css={{ marginTop: 0 }}>Follow our latest news</Text>
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
        <Grid
          css={(theme) => ({
            marginBottom: theme.spacing(10),
            marginTop: theme.spacing(16),
          })}
        >
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <Esquire />
          </div>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <FastCompany />
          </div>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <CreativeBloq />
          </div>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <DigitalArts />
          </div>
        </Grid>
        <Grid
          css={(theme) => ({
            marginBottom: theme.spacing(10),
            marginTop: theme.spacing(10),
          })}
        >
          <Quote css={{ gridColumn: "2 / span 10" }}>
            “This really is a unique deck. The concept is playful, and elegant
            at the same time. The colors are vibrant. A wonderful price of art.”
          </Quote>
        </Grid>
      </Layout>
    </ComposedGlobalLayout>
  );
};

export default withApollo(Home);
