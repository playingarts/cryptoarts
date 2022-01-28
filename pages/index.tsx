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

const Home: NextPage = () => {
  return (
    <GlobalLayout>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Layout
        css={(theme) => ({
          background: theme.colors.dark_gray,
          paddingTop: theme.spacing(22),
        })}
      >
        <Hero
          title="Collective Art Project"
          text="For creative people who are into graphic design, illustration, playing
          cards and sometimes magic."
          css={(theme) => ({
            padding: "85px 200px",
            width: "75%",
            color: theme.colors.text_title_light,
          })}
        />
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
            })}
            narrow={true}
          >
            <Text variant="h6" css={{ margin: 0, opacity: 0.5 }}>
              Gallery
            </Text>
          </Box>
        </Box>
        <Box>
          <div css={{ display: "flex", columnGap: 30 }}>
            <div key="1" css={{ width: "50%" }}>
              <Box
                css={(theme) => ({
                  background: "#510EAC",
                  color: theme.colors.text_title_light,
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
                    <Text
                      component={Link}
                      href="/"
                      css={{ color: "inherit", opacity: 0.5 }}
                    >
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
            </div>
            <div css={{ width: "25%" }}>
              <Box
                css={(theme) => ({
                  background: "#5865F2",
                  color: theme.colors.text_title_light,
                  position: "relative",
                  overflow: "hidden",
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
                  <Text
                    component={Link}
                    href="/"
                    css={{ color: "inherit", opacity: 0.5 }}
                  >
                    2910 Members
                  </Text>
                </div>
              </Box>
            </div>
            <div key="3" css={{ width: "25%" }}>
              <Box
                css={(theme) => ({
                  background: "#489BE9",
                  color: theme.colors.text_title_light,
                  position: "relative",
                  overflow: "hidden",
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
                  <Text
                    component={Link}
                    href="/"
                    css={{ color: "inherit", opacity: 0.5 }}
                  >
                    9910 Followers
                  </Text>
                </div>
              </Box>
            </div>
          </div>
        </Box>
        <Box>
          <Grid
            items={[
              <Esquire key="esquire" />,
              <FastCompany key="fastcompany" />,
              <CreativeBloq key="creativebloq" />,
              <DigitalArts key="digitalarts" />,
            ]}
          />
          <Box>
            <Quote>
              “Two is a sign of union. And diamonds are a sign of prosperity. I
              wanted to show the duality using my Ugly character wearing a
              twofaced mask.”
            </Quote>
          </Box>
        </Box>
      </Layout>
    </GlobalLayout>
  );
};

export default withApollo(Home);
