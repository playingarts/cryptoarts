import { NextPage } from "next";
import Head from "next/head";
import { FC, Fragment, useLayoutEffect, useState } from "react";
import BagButton from "../components/BagButton";
import BlockTitle from "../components/BlockTitle";
import CardFan from "../components/Card/Fan";
import Grid from "../components/Grid";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Quote from "../components/Quote";
import ScrollIntoView from "../components/ScrollIntoView";
import ShopBundle from "../components/Shop/Bundle";
import ShopItem from "../components/Shop/Item";
import ShopSheets from "../components/Shop/Sheets";
import ShopSoldOut from "../components/Shop/SoldOut";
import { useSize } from "../components/SizeProvider";
import Text from "../components/Text";
import ComposedFaq from "../components/_composed/Faq";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { ProductsQuery, useProducts } from "../hooks/product";
import { theme } from "../pages/_app";
import { initApolloClient, withApollo } from "../source/apollo";
import { breakpoints } from "../source/enums";
import { connect } from "../source/mongoose";
const latestReleaseSlug = process.env.NEXT_PUBLIC_LATEST_RELEASE;

type ProductListsTypes = "sheet" | "deck" | "bundle";

const Content: FC = () => {
  const { products } = useProducts();

  const { width } = useSize();

  const [isEurope, setIsEurope] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setIsEurope(
        Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Europe/")
      );
    }
  }, []);

  if (!products) {
    return null;
  }

  const {
    sheet: sheets,
    deck: decks,
    bundle: bundles,
    // latestRelease,
  } = products.reduce<
    Record<ProductListsTypes, GQL.Product[]>
    // & { latestRelease?: GQL.Product }
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
      <ScrollIntoView />
      <Layout
        css={(theme) => ({
          background: theme.colors.page_bg_light,
          paddingTop: theme.spacing(18),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(12.5),
            paddingBottom: theme.spacing(0),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
          paddingBottom: theme.spacing(4),
        })}
      >
        <Grid
          short={true}
          css={(theme) => ({
            rowGap: theme.spacing(2),
            [theme.maxMQ.sm]: { rowGap: theme.spacing(1) },
          })}
        >
          <Text
            component="h2"
            css={{
              margin: 0,
              gridColumn: "1 / 6",
              display: "flex",
              flexWrap: "wrap",

              [theme.maxMQ.sm]: {
                gridColumn: "1 / 3",
              },
            }}
          >
            Shop
          </Text>
          {/* <Text
            component={Link}
            variant="label"
            css={{
              opacity: 0.5,
              gridColumn: "6 / -1",
              textAlign: "right",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "right",
              transition: theme.transitions.fast("opacity"),
              [theme.mq.sm]: {
                "&:hover": {
                  opacity: 1,
                },
              },

              [theme.maxMQ.sm]: {
                gridColumn: "3 / 7",
                margin: 0,
              },
            }}
            href={{
              query: {
                scrollIntoView: "[data-id='faq']",
                scrollIntoViewBehavior: "smooth",
                scrollIntoViewPosition: "start",
              },
            }}
            shallow={true}
            scroll={false}
          >
          Free worldwide shipping!
          </Text> */}
          <Line
            spacing={0}
            css={{
              [theme.mq.sm]: {
                gridColumn: "1 / -1",
                width: "100%",
              },
            }}
          />
          {/* <Text variant="body2" css={{ margin: 0, gridColumn: "1/-1" }}>
            The best way to buy the products you love.
          </Text> */}
        </Grid>
      </Layout>

      <Layout
        notTruncatable={true}
        css={(theme) => ({
          paddingBottom: theme.spacing(12),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2.5),
          },
          background: theme.colors.page_bg_light,
          overflow: "hidden",
        })}
      >
        {/* Cards Block */}

        {/* <BlockTitle
          alwaysSubtitle={true}
          {...(width <= breakpoints.xsm && { noLine: true })}
          variant="h3"
          title="Decks of Cards"
          subTitleText={
            <span
              css={(theme) => [
                {
                  // [theme.mq.md]: {
                  //   marginTop: theme.spacing(15),
                  // },
                  [theme.maxMQ.sm]: {
                    display: "block",
                    marginBottom: theme.spacing(1.5),
                  },
                  marginBottom: theme.spacing(25),
                },
              ]}
            >
              Printed in the USA on legendary Bicycle® paper, the highest
              quality coated playing card stock.
            </span>
          }
          css={(theme) => ({
            marginBottom: theme.spacing(1),

            [theme.mq.md]: {
              marginTop: theme.spacing(12),
            },
            [theme.maxMQ.md]: {
              marginTop: theme.spacing(10),
            },
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(6),
              marginBottom: theme.spacing(2),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
          })}
        />
 */}
        <Grid>
          <Grid
            shop={true}
            css={(theme) => [
              {
                gap: theme.spacing(3),
                gridColumn: "1 / -1",

                [theme.maxMQ.sm]: {
                  gap: theme.spacing(1),
                },
              },
            ]}
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
                      {/* {width < breakpoints.md && (
                        <Line
                          spacing={1}
                          css={{
                            gridColumn: "1 / -1",
                            width: "100%",
                          }}
                        />
                      )} */}

                      <Grid
                        short={true}
                        css={{
                          gridColumn: "1 / -1",
                        }}
                      >
                        <Quote
                          css={(theme) => ({
                            marginTop: theme.spacing(8),
                            marginBottom: theme.spacing(8),
                            gridColumn: "1 / -1",

                            [theme.maxMQ.md]: {
                              marginTop: theme.spacing(5),
                              marginBottom: theme.spacing(5),
                            },
                          })}
                          withoutUserPic={true}
                          fullArtist={true}
                          artist={{
                            _id: "",
                            name: "Matthew V.",
                            info: "United States",
                            slug: "wim-v",
                            userpic: "",
                            social: {},
                          }}
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
                      // data-id={product.short}
                      {...(product.deck && { "data-id": product.deck.slug })}
                      {...product}
                      isEurope={isEurope}
                      css={(theme) => ({
                        [theme.maxMQ.sm]: {
                          height: theme.spacing(39),
                        },
                        [theme.mq.sm]: {
                          [theme.maxMQ.md]: {
                            aspectRatio: "1",
                          },
                        },
                        [theme.mq.md]: {
                          aspectRatio: "1.15",
                        },
                      })}
                    />
                    {/* {width >= breakpoints.sm && width < breakpoints.md && (
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
                    )} */}
                  </div>
                </Fragment>
              ) : (
                <Fragment key={product._id}>
                  {/* {width < breakpoints.md && (
                    <Line
                      spacing={1}
                      css={{
                        gridColumn: "1 / -1",
                        width: "100%",
                      }}
                    />
                  )} */}
                  <Grid
                    {...(product.deck && { "data-id": product.deck.slug })}
                    short={true}
                    css={(theme) => [
                      {
                        gridColumn: "1 / -1",
                        background: theme.colors.page_bg_light_gray,
                        borderRadius: theme.spacing(2),
                        [theme.mq.sm]: {
                          height: theme.spacing(55),
                        },
                      },
                    ]}
                  >
                    <ShopSoldOut
                      title={title}
                      css={(theme) => [
                        {
                          gridColumn: "span 5",
                          alignSelf: "center",
                          [theme.mq.sm]: {
                            [theme.maxMQ.md]: {
                              paddingLeft: theme.spacing(8),
                            },
                          },
                          [theme.maxMQ.sm]: {
                            paddingLeft: theme.spacing(4),
                            marginBottom: theme.spacing(4),
                          },
                          [theme.maxMQ.xsm]: {
                            gridColumn: "1/ -1",
                            paddingLeft: theme.spacing(2.5),
                            paddingRight: theme.spacing(2.5),
                            marginBottom: theme.spacing(2.5),
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
                          // marginBottom: theme.spacing(10),
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

        {/* {width >= breakpoints.sm && width < breakpoints.md && (
          <Grid>
            <Line spacing={2} css={{ gridColumn: "1 / -1", width: "100%" }} />
          </Grid>
        )} */}

        {/* Bundles Block */}

        <div
          css={(theme) => ({
            [theme.mq.md]: {
              marginTop: theme.spacing(12),
            },
            [theme.maxMQ.md]: {
              marginTop: theme.spacing(10),
            },
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(6),
              marginBottom: theme.spacing(3),
            },
          })}
        >
          <BlockTitle
            alwaysSubtitle={true}
            title="Bundles"
            {...(width <= breakpoints.sm && { noLine: true })}
            subTitleText={
              <span
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: {
                      display: "block",
                      // marginBottom: theme.spacing(1.5),
                    },
                  },
                ]}
              >
                For serious collectors and true art connoisseurs.
              </span>
            }
            variant="h3"
            css={(theme) => ({
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            })}
          />
          <Grid>
            <Grid shop={true} short={true} css={{ gridColumn: "1 / -1" }}>
              {bundles.map((product) => (
                <Fragment key={product._id}>
                  {width < breakpoints.sm && (
                    <Line
                      spacing={2.5}
                      css={[
                        {
                          width: "100%",
                          gridColumn: "1/-1",

                          [theme.maxMQ.sm]: {
                            width: "auto",
                            marginLeft: theme.spacing(2),
                            marginRight: theme.spacing(2),
                          },
                        },
                      ]}
                    />
                  )}
                  <ShopBundle
                    isEurope={isEurope}
                    css={(theme) => ({
                      gridColumn: "span 4",
                      height: theme.spacing(50),
                      [theme.maxMQ.sm]: {
                        gridColumn: "1 / -1",
                        height: theme.spacing(37.8),
                      },
                      [theme.mq.md]: {
                        gridColumn: "span 5",
                        height: theme.spacing(55),
                      },
                    })}
                    {...product}
                  />
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </div>
      </Layout>

      {/* {latestRelease && (
        <Layout
          notTruncatable={true}
          css={[
            {
              background: `linear-gradient(180deg, #eaeaea 0%, #eaeaea 50%)`,
            },
          ]}
        >
          <Grid>
            <LatestRelease
              isEurope={isEurope}
              productId={latestRelease._id}
              price={latestRelease.price[isEurope ? "eur" : "usd"]}
              // data-id="Latest"
              // data-id={latestRelease.deck}
              {...(latestRelease.deck && {
                "data-id": latestRelease.deck.slug,
              })}
              css={(theme) => ({
                gridColumn: "span 9",
                minHeight: theme.spacing(45),
                [theme.maxMQ.md]: {
                  gridColumn: "span 9",
                },
              })}
            />

            <NFTHolder
              metamaskText="Connect MetaMask"
              css={(theme) => [
                {
                  gridColumn: "span 3",
                  [theme.maxMQ.md]: {
                    gridColumn: "span 9",
                    marginTop: theme.spacing(2.5),
                  },
                  [theme.maxMQ.sm]: {
                    marginTop: theme.spacing(1),
                  },
                },
              ]}
            />
          </Grid>
        </Layout>
      )} */}

      {/* Uncut Sheets Block */}

      <Layout
        css={(theme) => ({
          background: `linear-gradient(180deg, ${theme.colors.page_bg_light_gray} 0%, #eaeaea 100%)`,
          // background: `linear-gradient(180deg, #eaeaea 50%, #eaeaea 100%)`,
          paddingTop: theme.spacing(10),
          paddingBottom: theme.spacing(10),
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
          },
        })}
      >
        <ShopSheets products={sheets} isEurope={isEurope} />
      </Layout>

      {/* Shipping FAQ Block */}

      <Layout
        data-id="faq"
        css={(theme) => ({
          background: theme.colors.page_bg_light_gray,
          paddingTop: theme.spacing(12),
          paddingBottom: theme.spacing(11),
          [theme.mq.sm]: {
            zIndex: 1,
            borderRadius: "0px 0px 50px 50px",
          },
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(9),
            paddingBottom: theme.spacing(5),
          },
        })}
      >
        <Grid short={true}>
          <ComposedFaq isEurope={isEurope} css={{ gridColumn: "1 / -1" }} />
        </Grid>
      </Layout>
    </Fragment>
  );
};

const Shop: NextPage = () => (
  <Fragment>
    <Head>
      <title>Shop - Playing Arts</title>
    </Head>
    <ComposedGlobalLayout customShopButton={<BagButton />} noNav={true}>
      <Content />
    </ComposedGlobalLayout>
  </Fragment>
);

export const getStaticProps = async () => {
  await connect();

  const client = initApolloClient(undefined, {
    schema: (await require("../source/graphql/schema")).schema,
  });

  await client.query({ query: ProductsQuery });

  return {
    props: {
      cache: client.cache.extract(),
    },
  };
};

export default withApollo(Shop, { ssr: false });
