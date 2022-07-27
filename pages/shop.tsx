import { NextPage } from "next";
import { FC, Fragment } from "react";
import AddToBagButton from "../components/AddToBagButton";
import BagButton from "../components/BagButton";
import BlockTitle from "../components/BlockTitle";
import CardFan from "../components/Card/Fan";
import Grid from "../components/Grid";
import Bag from "../components/Icons/Bag";
import LatestRelease from "../components/LatestRelease";
import Layout from "../components/Layout";
import Line from "../components/Line";
import NFTHolder from "../components/NFTHolder";
import Quote from "../components/Quote";
import ShopBundle from "../components/Shop/Bundle";
import ShopItem from "../components/Shop/Item";
import ShopSheets from "../components/Shop/Sheets";
import ShopSoldOut from "../components/Shop/SoldOut";
import { useSize } from "../components/SizeProvider";
import Text from "../components/Text";
import ComposedFaq from "../components/_composed/Faq";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { useProducts } from "../hooks/product";
import { withApollo } from "../source/apollo";
import { breakpoints } from "../source/enums";

const latestReleaseSlug = process.env.NEXT_PUBLIC_LATEST_RELEASE;

type ProductListsTypes = "sheet" | "deck" | "bundle";

const Content: FC = () => {
  const { products } = useProducts();

  const { width } = useSize();

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
          background: theme.colors.page_bg_light,
          paddingTop: theme.spacing(20),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(12.5),
            paddingBottom: theme.spacing(2.5),
          },
          paddingBottom: theme.spacing(5),
        })}
      >
        <Grid
          short={true}
          css={(theme) => ({
            rowGap: theme.spacing(2),
            [theme.maxMQ.sm]: { rowGap: theme.spacing(1) },
          })}
        >
          <Text component="h2" css={{ margin: 0, gridColumn: "1 / -1" }}>
            Shop
          </Text>
          <Text variant="body2" css={{ margin: 0, gridColumn: "1/-1" }}>
            The best way to buy the products you love.
          </Text>
        </Grid>
      </Layout>

      <Layout
        notTruncatable={true}
        css={(theme) => ({
          [theme.mq.sm]: {
            paddingTop: theme.spacing(6),
          },
          paddingBottom: theme.spacing(15),
          [theme.maxMQ.sm]: {
            paddingBottom: theme.spacing(2.5),
          },
          background: theme.colors.page_bg_light,
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

            <NFTHolder
              css={(theme) => [
                {
                  gridColumn: "span 3",
                  [theme.maxMQ.sm]: {
                    gridColumn: "1 / -1",
                    marginTop: theme.spacing(2.5),
                  },
                },
              ]}
            />
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
                  {index === 2 && width >= breakpoints.sm && (
                    <Grid
                      css={[
                        {
                          gridColumn: "1 / -1",
                        },
                      ]}
                    >
                      {width < breakpoints.md && (
                        <Line
                          spacing={1}
                          css={{
                            gridColumn: "1 / -1",
                            width: "100%",
                          }}
                        />
                      )}
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
                    </Grid>
                  )}
                  <div
                    css={(theme) => ({
                      gridColumn: "span 4",
                      [theme.maxMQ.sm]: {
                        gridColumn: "1 / -1",
                      },
                      [theme.mq.md]: {
                        gridColumn: "span 6",
                      },
                    })}
                  >
                    <ShopItem
                      {...product}
                      css={(theme) => ({
                        [theme.maxMQ.sm]: {
                          height: theme.spacing(45),
                        },
                        [theme.mq.sm]: {
                          [theme.maxMQ.md]: {
                            aspectRatio: "0.99",
                          },
                        },
                        [theme.mq.md]: {
                          aspectRatio: "1.2",
                        },
                      })}
                    />
                    {width >= breakpoints.sm && width < breakpoints.md && (
                      <div
                        css={(theme) => ({
                          marginBottom: theme.spacing(5),
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
                    )}
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {width >= breakpoints.sm && width < breakpoints.md && (
                    <Line
                      spacing={1}
                      css={{
                        gridColumn: "1 / -1",
                        width: "100%",
                      }}
                    />
                  )}
                  <Grid short={true} css={{ gridColumn: "1 / -1" }}>
                    <ShopSoldOut
                      title={title}
                      css={(theme) => [
                        {
                          gridColumn: "span 4",
                          alignSelf: "center",
                          [theme.maxMQ.sm]: {
                            gridColumn: "1/ -1",
                            paddingLeft: theme.spacing(2.5),
                            paddingRight: theme.spacing(2.5),
                            marginBottom: theme.spacing(1),
                          },
                        },
                      ]}
                    />
                    {product.deck && (
                      <div
                        css={(theme) => ({
                          textAlign: "center",
                          gridColumn: "span 3 / -1",
                          marginRight: theme.spacing(-2.5),
                          [theme.maxMQ.md]: {
                            gridColumn: "span 2 / -1",
                          },
                          [theme.maxMQ.sm]: {
                            gridColumn: "1 / -1",
                            marginTop: theme.spacing(2.5),
                            marginBottom: theme.spacing(10),
                            order: -1,
                            justifyContent: "end",
                            display: "flex",
                          },
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

        {width >= breakpoints.sm && width < breakpoints.md && (
          <Grid>
            <Line spacing={4} css={{ gridColumn: "1 / -1", width: "100%" }} />
          </Grid>
        )}

        <div
          css={(theme) => ({
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(7.5),
            },
            marginTop: theme.spacing(9),
          })}
        >
          <BlockTitle
            alwaysSubtitle={true}
            title="Bundles"
            subTitleText={
              <span
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: {
                      display: "block",
                      marginBottom: theme.spacing(1.5),
                    },
                  },
                ]}
              >
                For serious collectors and true art connoisseurs.
              </span>
            }
            variant="h3"
            css={(theme) => ({
              marginBottom: theme.spacing(3),
            })}
          />
          <Grid>
            <Grid short={true} shop={true} css={{ gridColumn: "1/-1" }}>
              {bundles.map((product) => (
                <Fragment key={product._id}>
                  <ShopBundle
                    css={(theme) => ({
                      gridColumn: "span 4",
                      height: theme.spacing(60.3),
                      [theme.maxMQ.sm]: {
                        gridColumn: "1 / -1",
                        height: theme.spacing(37.8),
                      },
                      [theme.mq.md]: { gridColumn: "span 5" },
                    })}
                    {...product}
                  />
                  {width < breakpoints.sm && (
                    <Line
                      spacing={2.5}
                      css={[
                        {
                          width: "100%",
                          gridColumn: "1/-1",
                        },
                      ]}
                    />
                  )}
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </div>
      </Layout>

      <Layout
        css={(theme) => ({
          background: theme.colors.page_bg_light,
          paddingTop: theme.spacing(11),
          paddingBottom: theme.spacing(11),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
          },
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
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
          },
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
