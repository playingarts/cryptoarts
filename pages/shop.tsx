import Head from "next/head";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import Box from "../components/Box";
import ShopItem from "../components/ShopItem";
import Quote from "../components/Quote";
import SoldOut from "../components/SoldOut";
import BlockTitle from "../components/BlockTitle";
import ShopBundle from "../components/ShopBundle";
import { useBag } from "../hooks/bag";
import BagButton from "../components/BagButton";
import { useProducts } from "../hooks/product";
import GlobalLayout from "../components/_composed/GlobalLayout";
import { FC, Fragment } from "react";

const Content: FC = () => {
  const { addItem } = useBag();
  const { products } = useProducts();

  if (!products) {
    return null;
  }

  return (
    <Fragment>
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
              {...products[0]}
              ButtonProps={{
                onClick: () => addItem(products[0]._id),
              }}
            />
            <ShopItem
              {...products[1]}
              ButtonProps={{
                onClick: () => addItem(products[1]._id),
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
              title="name"
              ButtonProps={{}}
            />
            <ShopItem
              image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
              price="12"
              title="name"
              ButtonProps={{}}
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
                price={12}
                title="name"
                ButtonProps={{}}
              />
              <ShopBundle
                image="https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg"
                price={12}
                title="name"
                ButtonProps={{}}
              />
            </div>
          </Box>
        </Box>
      </Layout>
    </Fragment>
  );
};

const Shop: NextPage = () => {
  return (
    <GlobalLayout customShopButton={<BagButton />}>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Content />
    </GlobalLayout>
  );
};

export default withApollo(Shop);
