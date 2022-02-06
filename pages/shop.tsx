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
import ShopSheets from "../components/ShopSheets";
import Faq from "../components/Faq";

type ProductListsTypes = "sheet" | "deck" | "bundle";

const Content: FC = () => {
  const { addItem } = useBag();
  const { products } = useProducts();

  if (!products) {
    return null;
  }

  const productLists = products.reduce<
    Record<ProductListsTypes, GQL.Product[]>
  >(
    (lists, product) => ({
      ...lists,
      [product.type]: [...lists[product.type as ProductListsTypes], product],
    }),
    { sheet: [], deck: [], bundle: [] }
  );

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
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: theme.spacing(3),
            })}
          >
            {productLists.deck.map((product, index) =>
              product.status === "instock" ? (
                <Fragment key={product._id}>
                  {index === 2 && (
                    <Box
                      css={{
                        gridColumn: "1 / -1",
                      }}
                    >
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
                        “I love these cards. Each colored deck has its charms. I
                        own at least one of each. As I’ve refreshed my supply,
                        I’ve watched the graphics and materials evolve. They’re
                        great out-of-the-case and break in well”
                      </Quote>
                    </Box>
                  )}
                  <ShopItem
                    {...product}
                    css={(theme) => ({
                      height: theme.spacing(50),
                    })}
                    ButtonProps={{
                      onClick: () => addItem(product._id),
                    }}
                  />
                </Fragment>
              ) : (
                <SoldOut
                  title="Special Edition"
                  css={{
                    gridColumn: "1 / -1",
                  }}
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
              )
            )}
          </div>

          <Box>
            <BlockTitle
              titleText="Bundles"
              subTitleText="For serious collectors and true art connoisseurs."
              variant="h3"
              css={(theme) => ({ marginBottom: theme.spacing(3) })}
            />
            <div
              css={(theme) => ({
                display: "grid",
                justifyContent: "center",
                gridTemplateColumns: "1fr 1fr",
                gap: theme.spacing(3),
              })}
            >
              {productLists.bundle.map((product) => (
                <ShopBundle
                  key={product._id}
                  {...product}
                  ButtonProps={{
                    onClick: () => addItem(product._id),
                  }}
                />
              ))}
            </div>
          </Box>
        </Box>
      </Layout>
      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
        })}
      >
        <Box>
          <ShopSheets products={productLists.sheet} />
        </Box>
      </Layout>
      <Layout>
        <Box padding={2}>
          <Faq />
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
