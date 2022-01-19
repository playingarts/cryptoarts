import Head from "next/head";
import { ChangeEvent, Fragment } from "react";
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
import Chevron from "../components/Icons/Chevron";
import { CSSObject } from "@emotion/serialize";
import { useProducts } from "../hooks/product";
import { useBag } from "../hooks/bag";

const Home: NextPage = () => {
  const { bag, updateQuantity, removeItem } = useBag();
  const { products } = useProducts({
    variables: {
      ids: Object.keys(bag),
    },
  });

  const changeQuantity = (_id: string) => ({
    target,
  }: ChangeEvent<HTMLSelectElement>) =>
    updateQuantity(_id, parseInt(target.value, 10));

  const remove = (_id: string) => () => removeItem(_id);

  if (!products) {
    return null;
  }

  const totalPrice = products
    .map(({ _id, price }) => bag[_id] * price)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

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
        <Box css={{ display: "flex", columnGap: 30 }}>
          <div css={{ flexGrow: 1 }}>
            {products.map((product, index) => {
              return (
                <Fragment key={product._id}>
                  {index !== 0 && (
                    <Line spacing={3} css={{ marginLeft: 210 }} />
                  )}
                  <div css={{ display: "flex", alignItems: "center" }}>
                    <div
                      css={{
                        width: 180,
                        height: 150,
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                        marginRight: 30,
                      }}
                    />
                    <div
                      css={{
                        display: "flex",
                        alignItems: "baseline",
                        flexGrow: 1,
                      }}
                    >
                      <div css={{ flexGrow: 1 }}>
                        <Text css={{ margin: 0 }} variant="h4">
                          {product.title}
                        </Text>
                        <Text css={{ margin: 0, opacity: 0.5, marginTop: 5 }}>
                          Deck of Cards!!!#!@#!@#@
                        </Text>
                      </div>
                      <div
                        css={{
                          marginLeft: 30,
                        }}
                      >
                        <div
                          css={{
                            position: "relative",
                          }}
                        >
                          <Chevron
                            // style={bool ? { transform: "rotate(180deg)" } : {}}
                            css={(theme) => ({
                              width: theme.spacing(0.8),
                              height: theme.spacing(1.2),
                              transform: "rotate(90deg) translate(-100%, 0)",
                              position: "absolute",
                              right: theme.spacing(1.1),
                              top: "50%",
                            })}
                          />
                          <select
                            css={(theme) => ({
                              border: 0,
                              backgroundColor: "unset",
                              appearance: "none",
                              paddingRight: theme.spacing(3),
                              paddingLeft: theme.spacing(3),
                              position: "relative",
                              textAlign: "right",
                              ...(theme.typography.h5 as CSSObject),
                            })}
                            value={bag[product._id]}
                            onChange={changeQuantity(product._id)}
                          >
                            {Array.from({ length: 10 }).map((_, index) => (
                              <option
                                key={index}
                                value={index + 1}
                                css={{ direction: "rtl" }}
                              >
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div css={{ width: 180, marginLeft: 30 }}>
                        <Text variant="h5" css={{ margin: 0 }}>
                          €{product.price.toFixed(2)}
                        </Text>
                        <Text
                          component="button"
                          css={{ opacity: 0.5, marginTop: 7 }}
                          onClick={remove(product._id)}
                        >
                          Remove
                        </Text>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
            <Line spacing={4} />
            <div
              css={(theme) => ({
                marginLeft: theme.spacing(21),
              })}
            >
              <div css={{ display: "flex" }}>
                <div css={{ flexGrow: 1 }}>
                  <Text variant="h5" css={{ margin: 0 }}>
                    Shipping and handling
                  </Text>
                  <Text css={{ opacity: 0.5 }}>
                    Your order will be dispatched in 2 to 5 days. Free delivery
                    for orders over €69. Enjoy!
                  </Text>
                  <Text
                    variant="label"
                    component="button"
                    css={{ opacity: 0.5 }}
                  >
                    Shipping FAQ
                    <Arrow
                      css={(theme) => ({
                        verticalAlign: "baseline",
                        marginLeft: theme.spacing(0.7),
                      })}
                    />
                  </Text>
                </div>
                <div
                  css={{
                    marginLeft: 30,
                  }}
                >
                  <div
                    css={{
                      position: "relative",
                    }}
                  >
                    <select
                      css={(theme) => ({
                        visibility: "hidden",
                        border: 0,
                        backgroundColor: "unset",
                        appearance: "none",
                        paddingRight: theme.spacing(3),
                        paddingLeft: theme.spacing(3),
                        position: "relative",
                        textAlign: "right",
                        ...(theme.typography.h5 as CSSObject),
                      })}
                      value="1"
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <option
                          key={index}
                          value={index + 1}
                          css={{ direction: "rtl" }}
                        >
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  css={(theme) => ({
                    width: theme.spacing(18),
                    flexShrink: 0,
                    marginLeft: theme.spacing(3),
                  })}
                >
                  <Text variant="h5" css={{ margin: 0 }}>
                    €14.90
                  </Text>
                </div>
              </div>
              <Line spacing={4} />
              <div css={{ display: "flex" }}>
                <div css={{ flexGrow: 1 }}>
                  <Text variant="h4" css={{ margin: 0 }}>
                    Total (incl. taxes)
                  </Text>
                </div>
                <div
                  css={(theme) => ({ width: theme.spacing(18), flexShrink: 0 })}
                >
                  <Text variant="h4" css={{ margin: 0 }}>
                    €{totalPrice}
                  </Text>
                  <Text css={{ opacity: 0.5, margin: 0 }}>~$67.30 USD</Text>
                </div>
              </div>
            </div>
          </div>
          <div
            css={(theme) => ({
              width: theme.spacing(28.5),
              flexShrink: 0,
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
                  €{totalPrice}
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
