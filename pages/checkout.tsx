import Head from "next/head";
import { FC, Fragment } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import Box from "../components/Box";
import BlockTitle from "../components/BlockTitle";
import Button from "../components/Button";
import Text from "../components/Text";
import Line from "../components/Line";
import Lock from "../components/Icons/Lock";
import Link from "../components/Link";
import { useProducts } from "../hooks/product";
import { useBag } from "../hooks/bag";
import ShopCheckoutItem, {
  Props as CheckoutItemProps,
} from "../components/Shop/CheckoutItem";
import EurToUsd from "../components/EurToUsd";
import ComposedGallery from "../components/_composed/Gallery";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import Arrowed from "../components/Arrowed";
import ComposedFaq from "../components/_composed/Faq";
import Grid from "../components/Grid";

const Content: FC = () => {
  const { bag, updateQuantity, removeItem } = useBag();
  const { products } = useProducts({
    variables: {
      ids: Object.keys(bag),
    },
  });

  const changeQuantity =
    (_id: string): CheckoutItemProps["changeQuantity"] =>
    ({ target }) =>
      updateQuantity(_id, parseInt(target.value, 10));

  const remove =
    (_id: string): CheckoutItemProps["remove"] =>
    () =>
      removeItem(_id);

  if (!products) {
    return null;
  }

  let totalPrice = parseFloat(
    products
      .map(({ _id, price }) => bag[_id] * price)
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
  );
  const freeShippingAt = !process.env.NEXT_PUBLIC_FREE_SHIPPING_AT
    ? Infinity
    : parseFloat(process.env.NEXT_PUBLIC_FREE_SHIPPING_AT);
  const shippingPrice = totalPrice < freeShippingAt ? 5.95 : 0;

  totalPrice = parseFloat((totalPrice + shippingPrice).toFixed(2));

  return (
    <Fragment>
      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
          paddingTop: theme.spacing(14),
        })}
      >
        <Box css={{ paddingTop: 0, paddingBottom: 0 }}>
          <BlockTitle
            title="Your Bag"
            subTitleText="Please note for the festive season, all online purchases made between 03/11/21 and 15/12/2021 can be returned up to 31/01/22."
            css={(theme) => ({ marginBottom: theme.spacing(3) })}
          />
        </Box>
      </Layout>

      <Layout>
        <Grid>
          <div css={{ gridColumn: "span 9" }}>
            {products.map((product, index) => (
              <Fragment key={product._id}>
                {index !== 0 && (
                  <Line
                    spacing={3}
                    css={(theme) => ({ marginLeft: theme.spacing(21) })}
                  />
                )}
                <ShopCheckoutItem
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
            {totalPrice - shippingPrice < freeShippingAt &&
              totalPrice - shippingPrice + 15 >= freeShippingAt && (
                <Text
                  css={(theme) => ({
                    background: `linear-gradient(90deg, #7142D6 0%, #2FBACE 100%)`,
                    borderRadius: theme.spacing(1),
                    marginLeft: theme.spacing(21),
                    marginBottom: theme.spacing(3),
                    textAlign: "center",
                    color: theme.colors.text_title_light,
                    lineHeight: `${theme.spacing(5)}px`,
                  })}
                  variant="label"
                >
                  Add one more deck and get free shipping!
                </Text>
              )}
            <ShopCheckoutItem
              title="Shipping and handling"
              price={shippingPrice}
              titleVariant="h5"
              info={
                <Fragment>
                  <Text css={{ opacity: 0.5 }}>
                    Your order will be dispatched in 2 to 5 days.
                    {freeShippingAt > 0 &&
                      freeShippingAt !== Infinity &&
                      ` Free delivery for orders over €${freeShippingAt}. Enjoy!`}
                  </Text>
                  <Text
                    variant="label"
                    component="button"
                    css={{ opacity: 0.5 }}
                  >
                    <Arrowed>Shipping FAQ</Arrowed>
                  </Text>
                </Fragment>
              }
            />
            <Line
              spacing={4}
              css={(theme) => ({ marginLeft: theme.spacing(21) })}
            />
            <ShopCheckoutItem
              title="Total (incl. taxes)"
              price={totalPrice}
              info2={<EurToUsd css={{ opacity: 0.5 }} eur={totalPrice} />}
              priceVariant="h4"
            />
          </div>
          <div
            css={{
              gridColumn: "10 / span 3",
            }}
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
                  €{totalPrice.toFixed(2)}
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
                  opacity: 0.5,
                })}
              >
                <Arrowed position="prepend">Continue shopping</Arrowed>
              </Text>
            </div>
          </div>
        </Grid>
      </Layout>

      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
        })}
      >
        <ComposedGallery />
      </Layout>

      <Layout>
        <Grid>
          <ComposedFaq
            css={(theme) => ({
              marginTop: theme.spacing(9),
              marginBottom: theme.spacing(9),
              gridColumn: "2 / span 10",
            })}
          />
        </Grid>
      </Layout>
    </Fragment>
  );
};

const Checkout: NextPage = () => {
  return (
    <ComposedGlobalLayout customShopButton={<Button>Check out</Button>}>
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Content />
    </ComposedGlobalLayout>
  );
};

export default withApollo(Checkout);
