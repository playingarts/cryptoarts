import Head from "next/head";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import Box from "../components/Box";
import ShopItem from "../components/Shop/Item";
import Quote from "../components/Quote";
import ShopSoldOut from "../components/Shop/SoldOut";
import BlockTitle from "../components/BlockTitle";
import ShopBundle from "../components/Shop/Bundle";
import { useBag } from "../hooks/bag";
import BagButton from "../components/BagButton";
import { useProducts } from "../hooks/product";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { FC, Fragment } from "react";
import ShopSheets from "../components/Shop/Sheets";
import CardFan from "../components/Card/Fan";
import Grid from "../components/Grid";
import Text from "../components/Text";
import Line from "../components/Line";
import ComposedFaq from "../components/_composed/Faq";

type ProductListsTypes = "sheet" | "deck" | "bundle";

const Content: FC = () => {
  const { addItem } = useBag();
  const { products } = useProducts();

  if (!products) {
    return null;
  }

  const { sheet: sheets, deck: decks, bundle: bundles } = products.reduce<
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
          paddingTop: theme.spacing(20),
          paddingBottom: theme.spacing(5),
        })}
      >
        <Grid>
          <div css={{ gridColumn: "2 / span 7" }}>
            <Text component="h2" css={{ margin: 0 }}>
              Shop
            </Text>
            <Text variant="body2">
              The best way to buy the products you love. Hover the card to see
              animation. Click to read the story behind the artwork.
            </Text>
          </div>
          <div css={{ gridColumn: "2 / span 10" }}>
            <Line spacing={3} css={{ marginTop: 0 }} />
            <BagButton />
          </div>
        </Grid>
      </Layout>

      <Layout>
        <Grid
          css={(theme) => ({
            rowGap: theme.spacing(3),
            marginTop: theme.spacing(6),
          })}
        >
          {decks.map((product, index) =>
            product.status === "instock" ? (
              <Fragment key={product._id}>
                {index === 2 && (
                  <Quote
                    css={(theme) => ({
                      gridColumn: "2 / span 10",
                      marginTop: theme.spacing(9),
                      marginBottom: theme.spacing(9),
                    })}
                    artist={{
                      _id: "",
                      name: "Gleb Ryshkov",
                      slug: "gleb-ryshkov",
                      userpic: "",
                      social: {},
                    }}
                    moreLink="/"
                  >
                    “I love these cards. Each colored deck has its charms. I own
                    at least one of each. As I’ve refreshed my supply, I’ve
                    watched the graphics and materials evolve. They’re great
                    out-of-the-case and break in well”
                  </Quote>
                )}
                <ShopItem
                  {...product}
                  css={(theme) => ({
                    height: theme.spacing(50),
                    gridColumn: "span 6",
                  })}
                  ButtonProps={{
                    onClick: () => addItem(product._id),
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                <ShopSoldOut
                  title="Special Edition"
                  css={{ gridColumn: "2 / span 4", alignSelf: "center" }}
                />
                {product.deck && (
                  <div
                    css={(theme) => ({
                      textAlign: "center",
                      gridColumn: "7 / span 6",
                      marginTop: theme.spacing(4),
                      marginBottom: theme.spacing(16),
                    })}
                  >
                    <CardFan deck={product.deck} />
                  </div>
                )}
              </Fragment>
            )
          )}
        </Grid>

        <Box>
          <BlockTitle
            title="Bundles"
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
            {bundles.map((product) => (
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
      </Layout>
      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
        })}
      >
        <ShopSheets
          products={sheets}
          css={(theme) => ({
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
          })}
        />
      </Layout>
      <Layout>
        <Grid>
          <ComposedFaq
            css={(theme) => ({
              marginTop: theme.spacing(15),
              marginBottom: theme.spacing(15),
              gridColumn: "2 / span 10",
            })}
          />
        </Grid>
      </Layout>
    </Fragment>
  );
};

const Shop: NextPage = () => {
  return (
    <ComposedGlobalLayout customShopButton={<BagButton />}>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Content />
    </ComposedGlobalLayout>
  );
};

export default withApollo(Shop);
