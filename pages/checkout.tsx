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
import { useProducts } from "../hooks/product";
import { useBag } from "../hooks/bag";
import CheckoutItem, {
  Props as CheckoutItemProps,
} from "../components/CheckoutItem";

const Home: NextPage = () => {
  const { bag, updateQuantity, removeItem } = useBag();
  const { products } = useProducts({
    variables: {
      ids: Object.keys(bag),
    },
  });

  const changeQuantity = (
    _id: string
  ): CheckoutItemProps["changeQuantity"] => ({ target }) =>
    updateQuantity(_id, parseInt(target.value, 10));

  const remove = (_id: string): CheckoutItemProps["remove"] => () =>
    removeItem(_id);

  if (!products) {
    return null;
  }

  const shippingPrice = 5.95;
  const totalPrice = parseFloat(
    (
      products
        .map(({ _id, price }) => bag[_id] * price)
        .reduce((a, b) => a + b, 0) + shippingPrice
    ).toFixed(2)
  );

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
            {products.map((product, index) => (
              <Fragment key={product._id}>
                {index !== 0 && (
                  <Line
                    spacing={3}
                    css={(theme) => ({ marginLeft: theme.spacing(21) })}
                  />
                )}
                <CheckoutItem
                  image={product.image}
                  price={product.price}
                  title={product.title}
                  info={product.info}
                  remove={remove(product._id)}
                  quantity={bag[product._id]}
                  changeQuantity={changeQuantity(product._id)}
                />
              </Fragment>
            ))}
            <Line spacing={4} />
            <CheckoutItem
              title="Shipping and handling"
              price={shippingPrice}
              titleVariant="h5"
              info={
                <Fragment>
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
                </Fragment>
              }
            />
            <Line
              spacing={4}
              css={(theme) => ({ marginLeft: theme.spacing(21) })}
            />
            <CheckoutItem
              title="Total (incl. taxes)"
              price={totalPrice}
              info2={`~${(totalPrice * 1.13).toFixed(2)} USD`}
              priceVariant="h4"
            />
          </div>
          <div
            css={(theme) => ({
              width: theme.spacing(28.5),
              flexShrink: 0,
            })}
          >
            <div
              css={(theme) => ({
                position: "sticky",
                top: theme.spacing(15),
                textAlign: "center",
              })}
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
