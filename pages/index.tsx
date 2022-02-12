import Head from "next/head";
import { NextPage } from "next";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { withApollo } from "../source/apollo";
import Box from "../components/Box";
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
import Gallery from "../components/_composed/Gallery";
import GlobalLayout from "../components/_composed/GlobalLayout";
import Chevron from "../components/Icons/Chevron";

const Home: NextPage = () => {
  return (
    <GlobalLayout>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Layout
        css={(theme) => ({
          background: theme.colors.dark_gray,
          paddingTop: theme.spacing(18),
          color: theme.colors.text_title_light,
          overflow: "hidden",
        })}
      >
        <Box>
          <Grid>
            <div css={{ gridColumn: "2 / span 6" }}>
              <Text component="h1" css={{ margin: 0 }}>
                Collective Art Project
              </Text>
              <Text
                variant="body3"
                css={(theme) => ({
                  margin: 0,
                  marginTop: theme.spacing(2),
                  paddingTop: 20,
                  paddingBottom: 45,
                })}
              >
                For creative people who are into art, playing cards and
                sometimes magic.
              </Text>
              <Button
                variant="bordered"
                Icon={Chevron}
                size="small"
                iconProps={{ css: { height: 16, transform: "rotate(90deg)" } }}
              />
            </div>
            <Hero css={{ gridColumn: "8 / span 5" }} />
          </Grid>
        </Box>
      </Layout>

      <Layout>
        <Gallery />
      </Layout>

      <Layout css={(theme) => ({ background: theme.colors.page_bg_dark })}>
        asd
      </Layout>

      <Layout>
        <Box>
          <Box
            css={(theme) => ({
              background: "#000",
              color: theme.colors.text_title_light,
              height: theme.spacing(60),
              marginTop: theme.spacing(9),
              marginBottom: theme.spacing(9),
            })}
            narrow={true}
          >
            <Text variant="h6" css={{ margin: 0, opacity: 0.5 }}>
              Gallery
            </Text>
          </Box>
          <Grid
            css={(theme) => ({
              marginBottom: theme.spacing(9),
              marginTop: theme.spacing(9),
              alignItems: "flex-start",
            })}
          >
            <Box
              css={(theme) => ({
                background: "#510EAC",
                color: theme.colors.text_title_light,
                gridColumn: "span 6",
              })}
              narrow={true}
            >
              <Text variant="h6" css={{ margin: 0, opacity: 0.5 }}>
                Podcast
              </Text>
              <div
                css={(theme) => ({
                  display: "flex",
                  columnGap: 50,
                  marginTop: theme.spacing(2),
                })}
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
                    Bram Vanhaeren
                  </Text>
                  <Text variant="h6" css={{ margin: 0, opacity: 0.5 }}>
                    EP01 - 10/13 - 12:00 PST
                  </Text>
                  <div
                    css={(theme) => ({
                      marginTop: theme.spacing(2),
                      marginBottom: theme.spacing(2),
                      display: "flex",
                      alignItems: "center",
                      columnGap: theme.spacing(2),
                    })}
                  >
                    <Button Icon={Play} css={{ color: "#510EAC" }}>
                      Watch
                    </Button>
                    <Button
                      variant="bordered"
                      size="small"
                      Icon={Itunes}
                      css={{ opacity: 0.5 }}
                    />
                    <Button
                      variant="bordered"
                      size="small"
                      Icon={Spotify}
                      css={{ opacity: 0.5 }}
                    />
                  </div>
                  <Text component={Link} href="/" css={{ opacity: 0.5 }}>
                    All episodes
                  </Text>
                </div>
                <div
                  css={(theme) => ({
                    width: theme.spacing(16),
                    height: theme.spacing(16),
                    background: "#000",
                    borderRadius: "50%",
                    flexShrink: 0,
                  })}
                ></div>
              </div>
            </Box>
            <Box
              css={(theme) => ({
                background: "#5865F2",
                color: theme.colors.text_title_light,
                position: "relative",
                overflow: "hidden",
                gridColumn: "7 / span 3",
              })}
              narrow={true}
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
                  height: "100%",
                  width: "100%",
                  fill: "url(#gradient)",
                  opacity: 0.5,
                }}
              />
              <div css={{ position: "relative" }}>
                <Text component="h4" css={{ margin: 0 }}>
                  Discord
                </Text>
                <Text css={{ margin: 0 }}>Join the conversation</Text>
                <div
                  css={(theme) => ({
                    marginTop: theme.spacing(2),
                    marginBottom: theme.spacing(2),
                  })}
                >
                  <Button Icon={Discord} css={{ color: "#5865F2" }}>
                    Join
                  </Button>
                </div>
                <Text component={Link} href="/" css={{ opacity: 0.5 }}>
                  2910 Members
                </Text>
              </div>
            </Box>
            <Box
              css={(theme) => ({
                background: "#489BE9",
                color: theme.colors.text_title_light,
                position: "relative",
                overflow: "hidden",
                gridColumn: "10 / span 3",
              })}
              narrow={true}
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
                  height: "100%",
                  width: "100%",
                  fill: "url(#gradient)",
                  opacity: 0.5,
                }}
              />
              <div css={{ position: "relative" }}>
                <Text component="h4" css={{ margin: 0 }}>
                  Twitter
                </Text>
                <Text css={{ margin: 0 }}>Follow our latest news</Text>
                <div
                  css={(theme) => ({
                    marginTop: theme.spacing(2),
                    marginBottom: theme.spacing(2),
                  })}
                >
                  <Button Icon={Twitter} css={{ color: "#489BE9" }}>
                    Follow
                  </Button>
                </div>
                <Text component={Link} href="/" css={{ opacity: 0.5 }}>
                  9910 Followers
                </Text>
              </div>
            </Box>
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
              “Two is a sign of union. And diamonds are a sign of prosperity. I
              wanted to show the duality using my Ugly character wearing a
              twofaced mask.”
            </Quote>
          </Grid>
        </Box>
      </Layout>
    </GlobalLayout>
  );
};

export default withApollo(Home);
