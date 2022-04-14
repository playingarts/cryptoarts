import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import ShopItem from "../components/Shop/Item";
import Quote from "../components/Quote";
import ShopSoldOut from "../components/Shop/SoldOut";
import BlockTitle from "../components/BlockTitle";
import ShopBundle from "../components/Shop/Bundle";
import BagButton from "../components/BagButton";
import { useProducts } from "../hooks/product";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { FC, Fragment } from "react";
import ShopSheets from "../components/Shop/Sheets";
import CardFan from "../components/Card/Fan";
import Grid from "../components/Grid";
import Text from "../components/Text";
import ComposedFaq from "../components/_composed/Faq";
import LatestRelease from "../components/LatestRelease";
import NFTHolder from "../components/NFTHolder";

const latestReleaseSlug = process.env.NEXT_PUBLIC_LATEST_RELEASE;

type ProductListsTypes = "sheet" | "deck" | "bundle";

const Content: FC = () => {
  const { products } = useProducts();

  if (!products) {
    return null;
  }

  const {
    sheet: sheets,
    deck: decks,
    bundle: bundles,
    latestRelease,
  } = products.reduce<
    Record<ProductListsTypes, GQL.Product[]> & { latestRelease?: GQL.Product }
  >(
    (lists, product) => ({
      ...lists,
      ...(latestReleaseSlug &&
      product.type === "deck" &&
      product.deck &&
      product.deck.slug === latestReleaseSlug
        ? {
            latestRelease: product,
          }
        : {
            [product.type]: [
              ...lists[product.type as ProductListsTypes],
              product,
            ],
          }),
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
          <Text component="h2" css={{ margin: 0, gridColumn: "2 / span 7" }}>
            Shop products
          </Text>
        </Grid>
      </Layout>

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(15),
          background: theme.colors.page_bg_gray,
        })}
      >
        {latestRelease && (
          <Grid css={(theme) => ({ marginBottom: theme.spacing(3) })}>
            <LatestRelease
              productId={latestRelease._id}
              css={{ gridColumn: "span 9" }}
              price={latestRelease.price}
            />

            {latestRelease.deck && (
              <NFTHolder
                css={{ gridColumn: "span 3" }}
                deck={latestRelease.deck}
                productId={latestRelease._id}
              />
            )}
          </Grid>
        )}

        <Grid
          css={(theme) => ({
            rowGap: theme.spacing(3),
          })}
        >
          {decks.map(({ title, ...product }, index) =>
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
                      name: "Wim V.",
                      slug: "wim-v",
                      userpic: "",
                      social: {},
                    }}
                    moreLink="/"
                  >
                    “Thank you for the smooth handling of getting the playing
                    cards I ordered to me; not only are they little gems by
                    their own right, they are also a perfect way to discover new
                    talented artists, who I may otherwise never come across.”
                  </Quote>
                )}
                <ShopItem
                  {...product}
                  css={(theme) => ({
                    height: theme.spacing(50),
                    gridColumn: "span 6",
                  })}
                />
              </Fragment>
            ) : (
              <Fragment>
                <ShopSoldOut
                  title={title}
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

        <Grid css={(theme) => ({ marginTop: theme.spacing(12) })}>
          <div css={{ gridColumn: "2 / span 10" }}>
            <BlockTitle
              title="Bundles"
              subTitleText="For serious collectors and true art connoisseurs."
              variant="h3"
              css={(theme) => ({
                marginBottom: theme.spacing(3),
              })}
            />
            <Grid
              css={{
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {bundles.map((product) => (
                <ShopBundle key={product._id} {...product} />
              ))}
            </Grid>
          </div>
        </Grid>
      </Layout>

      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
          paddingTop: theme.spacing(11),
          paddingBottom: theme.spacing(11),
        })}
      >
        <ShopSheets products={sheets} />
      </Layout>
      <Layout
        data-id="block-faq"
        css={(theme) => ({
          background: theme.colors.white,
          paddingTop: theme.spacing(15),
          paddingBottom: theme.spacing(15),
        })}
      >
        <Grid>
          <ComposedFaq css={{ gridColumn: "2 / span 10" }} />
        </Grid>
      </Layout>
    </Fragment>
  );
};

const Shop: NextPage = () => {
  return (
    <ComposedGlobalLayout customShopButton={<BagButton />} noNav={true}>
      <Content />
    </ComposedGlobalLayout>
  );
};

export default withApollo(Shop);
