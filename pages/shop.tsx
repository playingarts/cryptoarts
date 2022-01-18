import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "../components/Box";
import ShopItem from "../components/ShopItem";
import Quote from "../components/Quote";
import SoldOut from "../components/SoldOut";
import BlockTitle from "../components/BlockTitle";
import ShopBundle from "../components/ShopBundle";
import { useBag } from "../hooks/bag";
import BagButton from "../components/BagButton";

const Home: NextPage = () => {
  const { addItem } = useBag();

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
        customShopButton={<BagButton />}
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
              titleText="Shop"
              subTitleText="The best way to buy the products you love. Hover the card to see
              animation. Click to read the story behind the artwork."
              css={(theme) => ({ marginBottom: theme.spacing(3) })}
            />
            <BagButton />
          </Box>
        </Box>
      </Layout>

      <Layout>
        <Box>
          <div
            css={(theme) => ({
              display: "flex",
              columnGap: theme.spacing(3),
              height: theme.spacing(50),
            })}
          >
            <ShopItem
              image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
              price="12"
              name="name"
              ButtonProps={{
                onClick: () => {
                  addItem({});
                },
              }}
            />
            <ShopItem
              image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
              price="12"
              name="name"
              ButtonProps={{
                onClick: () => {
                  addItem({});
                },
              }}
            />
          </div>
          <Box>
            <Quote
              artist={{
                _id: "",
                name: "Gleb Ryshkov",
                slug: "gleb-ryshkov",
                userpic: "",
                social: {},
              }}
              moreLink="/"
            >
              “I love these cards. Each colored deck has its charms. I own at
              least one of each. As I’ve refreshed my supply, I’ve watched the
              graphics and materials evolve. They’re great out-of-the-case and
              break in well”
            </Quote>
          </Box>
          <div
            css={(theme) => ({
              display: "flex",
              columnGap: theme.spacing(3),
              height: theme.spacing(50),
              boxSizing: "content-box",
            })}
          >
            <ShopItem
              image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
              price="12"
              name="name"
              ButtonProps={{
                onClick: () => {
                  addItem({});
                },
              }}
            />
            <ShopItem
              image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
              price="12"
              name="name"
              ButtonProps={{
                onClick: () => {
                  addItem({});
                },
              }}
            />
          </div>
          <Box>
            <SoldOut
              title="Special Edition"
              cards={[
                {
                  info: "",
                  suit: "clubs",
                  value: "2",
                  opensea: "",
                  img:
                    "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-clubs-tang-yau-hoong.jpg",
                  video: "",
                  _id: "1",
                  artist: {
                    _id: "",
                    name: "",
                    slug: "",
                    userpic: "",
                    social: {},
                  },
                  deck: { _id: "", title: "", info: "", slug: "" },
                },
                {
                  info: "",
                  suit: "diamonds",
                  value: "2",
                  opensea: "",
                  img:
                    "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-diamonds-yemayema.jpg",
                  video: "",
                  _id: "2",
                  artist: {
                    _id: "",
                    name: "",
                    slug: "",
                    userpic: "",
                    social: {},
                  },
                  deck: { _id: "", title: "", info: "", slug: "" },
                },
                {
                  info: "",
                  suit: "hearts",
                  value: "3",
                  opensea: "",
                  img:
                    "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-hearts-peter-tarka.jpg",
                  video: "",
                  _id: "3",
                  artist: {
                    _id: "",
                    name: "",
                    slug: "",
                    userpic: "",
                    social: {},
                  },
                  deck: { _id: "", title: "", info: "", slug: "" },
                },
                {
                  info: "",
                  suit: "spades",
                  value: "2",
                  opensea: "",
                  img:
                    "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-spades-mattias-adolfsson.jpg",
                  video: "",
                  _id: "4",
                  artist: {
                    _id: "",
                    name: "",
                    slug: "",
                    userpic: "",
                    social: {},
                  },
                  deck: { _id: "", title: "", info: "", slug: "" },
                },
                {
                  info: "",
                  suit: "clubs",
                  value: "3",
                  opensea: "",
                  img:
                    "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-clubs-fernando-chamarelli.jpg",
                  video: "",
                  _id: "5",
                  artist: {
                    _id: "",
                    name: "",
                    slug: "",
                    userpic: "",
                    social: {},
                  },
                  deck: { _id: "", title: "", info: "", slug: "" },
                },
              ]}
            />
          </Box>
          <Box>
            <BlockTitle
              titleText="Bundles"
              subTitleText="For serious collectors and true art connoisseurs."
              variant="h3"
              css={(theme) => ({ marginBottom: theme.spacing(3) })}
            />
            <div
              css={(theme) => ({
                display: "flex",
                columnGap: theme.spacing(3),
                height: theme.spacing(50),
                boxSizing: "content-box",
              })}
            >
              <ShopBundle
                image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
                price="12"
                name="name"
                ButtonProps={{
                  onClick: () => {
                    addItem({});
                  },
                }}
              />
              <ShopBundle
                image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
                price="12"
                name="name"
                ButtonProps={{
                  onClick: () => {
                    addItem({});
                  },
                }}
              />
            </div>
          </Box>
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
