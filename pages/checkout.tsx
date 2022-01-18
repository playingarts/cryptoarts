import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "../components/Box";
import BlockTitle from "../components/BlockTitle";
import Button from "../components/Button";
import Text from "../components/Text";
import Line from "../components/Line";
import Lock from "../components/Icons/Lock";
import Link from "../components/Link";
import Arrow from "../components/Icons/Arrow";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Header
        css={(theme) => ({
          position: "fixed",
          left: theme.spacing(1),
          right: theme.spacing(1),
          top: theme.spacing(1),
          zIndex: 100,

          "@media (min-width: 1440px)": {
            maxWidth: theme.spacing(142),
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
          },
        })}
        customShopButton={<Button>Check out</Button>}
      />

      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
          paddingTop: theme.spacing(14),
        })}
      >
        <Box>
          <Box css={{ paddingTop: 0, paddingBottom: 0 }}>
            <BlockTitle
              titleText="Your Bag"
              subTitleText="Please note for the festive season, all online purchases made between 03/11/21 and 15/12/2021 can be returned up to 31/01/22."
              css={(theme) => ({ marginBottom: theme.spacing(3) })}
            />
          </Box>
        </Box>
      </Layout>

      <Layout>
        <Box css={{ display: "flex" }}>
          <div css={{ flexGrow: 1, height: 1000 }}>LEFT</div>
          <div
            css={(theme) => ({
              width: theme.spacing(28.5),
            })}
          >
            <div
              css={{
                position: "sticky",
                top: 150,
                textAlign: "center",
              }}
            >
              <Box
                narrow={true}
                css={(theme) => ({
                  background: theme.colors.text_title_light,
                  position: "sticky",
                  top: 150,
                })}
              >
                <Text component="h6" css={{ opacity: 0.5, margin: 0 }}>
                  Your bag total
                </Text>
                <Text
                  variant="h4"
                  css={(theme) => ({
                    marginTop: theme.spacing(2),
                    marginBottom: theme.spacing(2),
                  })}
                >
                  €59.80
                </Text>
                <Button color="black">Check out</Button>
                <Line spacing={3} />
                <Text css={{ margin: 0, opacity: 0.5 }}>
                  <Lock css={{ verticalAlign: "baseline" }} /> Secure payment
                </Text>
              </Box>
              <Text
                component={Link}
                href="/shop"
                variant="label"
                css={(theme) => ({
                  display: "inline-block",
                  marginTop: theme.spacing(3),
                  color: "inherit",
                  opacity: 0.5,
                })}
              >
                <Arrow
                  css={(theme) => ({
                    verticalAlign: "baseline",
                    marginRight: theme.spacing(0.7),
                    transform: "rotate(-180deg)",
                  })}
                />
                Continue shopping
              </Text>
            </div>
          </div>
        </Box>
      </Layout>

      <Layout>
        <Box
          css={(theme) => ({
            background: theme.colors.light_gray,
            marginBottom: theme.spacing(1),
          })}
        >
          <Footer />
        </Box>
      </Layout>
    </Fragment>
  );
};

export default withApollo(Home);
