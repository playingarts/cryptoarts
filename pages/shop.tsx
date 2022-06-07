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
import AddToBagButton from "../components/AddToBagButton";
import Bag from "../components/Icons/Bag";
import Line from "../components/Line";

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
        <Grid short={true} css={(theme) => ({ rowGap: theme.spacing(2) })}>
          <Text component="h2" css={{ margin: 0, gridColumn: "1 / -1" }}>
            Shop
          </Text>
          <Text variant="body2" css={{ margin: 0, gridColumn: "span 7" }}>
            The best way to buy the products you love. Hover the card to see
            animation. Click to read the story behind the artwork.
          </Text>
        </Grid>
      </Layout>

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(15),
          background: theme.colors.page_bg_gray,
          overflow: "hidden",
        })}
      >
        {latestRelease && (
          <Grid css={(theme) => ({ marginBottom: theme.spacing(3) })}>
            <LatestRelease
              productId={latestRelease._id}
              css={(theme) => ({
                gridColumn: "span 9",
                [theme.maxMQ.md]: {
                  gridColumn: "span 6",
                },
              })}
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

        <Grid>
          <Grid
            shop={true}
            css={(theme) => ({ gap: theme.spacing(3), gridColumn: "1 / -1" })}
          >
            {decks.map(({ title, ...product }, index) =>
              product.status === "instock" ? (
                <Fragment key={product._id}>
                  {index === 2 && (
                    <Fragment>
                      <Line
                        spacing={1}
                        css={(theme) => ({
                          gridColumn: "1 / -1",
                          width: "100%",
                          [theme.mq.md]: {
                            display: "none",
                          },
                        })}
                      />
                      <Grid
                        short={true}
                        css={{
                          gridColumn: "1 / -1",
                        }}
                      >
                        <Quote
                          css={(theme) => ({
                            marginTop: theme.spacing(9),
                            marginBottom: theme.spacing(9),
                            gridColumn: "1 / -1",
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
                          “Thank you for the smooth handling of getting the
                          playing cards I ordered to me; not only are they
                          little gems by their own right, they are also a
                          perfect way to discover new talented artists, who I
                          may otherwise never come across.”
                        </Quote>
                      </Grid>
                    </Fragment>
                  )}
                  <div
                    css={(theme) => ({
                      gridColumn: "span 4",
                      [theme.mq.md]: {
                        gridColumn: "span 6",
                      },
                    })}
                  >
                    <ShopItem
                      {...product}
                      css={(theme) => ({
                        aspectRatio: "0.99",
                        [theme.mq.md]: {
                          aspectRatio: "1.2",
                        },
                      })}
                    />
                    <div
                      css={(theme) => ({
                        marginBottom: theme.spacing(5),
                        [theme.mq.md]: {
                          display: "none",
                        },
                      })}
                    >
                      <Text
                        component="h4"
                        css={(theme) => ({
                          margin: 0,
                          marginTop: theme.spacing(4),
                        })}
                      >
                        {title}
                      </Text>
                      <Text variant="body2" css={{ opacity: 0.5, margin: 0 }}>
                        {product.price.toLocaleString(undefined, {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </Text>
                      <AddToBagButton
                        productId={product._id}
                        Icon={Bag}
                        color="black"
                        css={(theme) => ({
                          alignSelf: "flex-end",
                          marginTop: theme.spacing(2),
                        })}
                      />
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <Line
                    spacing={1}
                    css={(theme) => ({
                      gridColumn: "1 / -1",
                      width: "100%",
                      [theme.mq.md]: {
                        display: "none",
                      },
                    })}
                  />
                  <Grid short={true} css={{ gridColumn: "1 / -1" }}>
                    <ShopSoldOut
                      title={title}
                      css={{ gridColumn: "span 4", alignSelf: "center" }}
                    />
                    {product.deck && (
                      <div
                        css={(theme) => ({
                          textAlign: "center",
                          gridColumn: "span 3 / -1",
                          marginTop: theme.spacing(4),
                          marginBottom: theme.spacing(16),
                        })}
                      >
                        <CardFan deck={product.deck} />
                      </div>
                    )}
                  </Grid>
                </Fragment>
              )
            )}
          </Grid>
        </Grid>

        <Grid css={(theme) => ({ [theme.mq.md]: { display: "none" } })}>
          <Line spacing={4} css={{ gridColumn: "1 / -1", width: "100%" }} />
        </Grid>

        <div css={(theme) => ({ marginTop: theme.spacing(9) })}>
          <BlockTitle
            title="Bundles"
            subTitleText="For serious collectors and true art connoisseurs."
            variant="h3"
            css={(theme) => ({
              marginBottom: theme.spacing(3),
            })}
          />
          <Grid>
            <Grid short={true} shop={true} css={{ gridColumn: "1/-1" }}>
              {bundles.map((product) => (
                <ShopBundle
                  key={product._id}
                  css={(theme) => ({
                    gridColumn: "span 4",
                    [theme.mq.md]: { gridColumn: "span 5" },
                  })}
                  {...product}
                />
              ))}
            </Grid>
          </Grid>
        </div>
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
        <Grid short={true}>
          <ComposedFaq css={{ gridColumn: "1 / -1" }} />
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
