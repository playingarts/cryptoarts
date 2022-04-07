import { FC, Fragment, useEffect, useState } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import Button, { Props as ButtonProps } from "../components/Button";
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
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import Arrowed from "../components/Arrowed";
import ComposedFaq from "../components/_composed/Faq";
import Grid from "../components/Grid";
import StatBlock from "../components/StatBlock";

const Content: FC<{ CheckoutButton: FC<ButtonProps> }> = ({
  CheckoutButton,
}) => {
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

  let totalPrice = parseFloat(
    products
      .map(({ _id, price }) => bag[_id] * price)
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
  );
  const freeShippingAt = !process.env.NEXT_PUBLIC_FREE_SHIPPING_AT
    ? Infinity
    : parseFloat(process.env.NEXT_PUBLIC_FREE_SHIPPING_AT);
  const shippingPrice = 0; // totalPrice < freeShippingAt ? 5.95 : 0;

  totalPrice = parseFloat((totalPrice + shippingPrice).toFixed(2));

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
            {!products.length ? (
              <Fragment>
                <Text component="h2" css={{ margin: 0 }}>
                  Your Bag Is Empty
                </Text>
                <Text variant="body2">
                  <Text
                    component={Link}
                    variant="label"
                    href="/shop"
                    css={{ opacity: 0.5 }}
                  >
                    <Arrowed>Go shopping</Arrowed>
                  </Text>
                </Text>
              </Fragment>
            ) : (
              <Fragment>
                <Text component="h2" css={{ margin: 0 }}>
                  Your Bag
                </Text>
              </Fragment>
            )}
          </div>
        </Grid>
      </Layout>

      {products.length > 0 && (
        <Fragment>
          <Layout
            css={(theme) => ({
              background: theme.colors.page_bg_gray,
              paddingTop: theme.spacing(6),
              paddingBottom: theme.spacing(15),
            })}
          >
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
                  // price={shippingPrice}
                  titleVariant="h5"
                  info={
                    <Fragment>
                      <Text css={{ opacity: 0.5 }}>
                        Your order will be dispatched in 2 to 5 days. Shipping
                        costs calculated at checkout.
                        {products.find(
                          ({ deck }) => deck && deck.slug === "crypto"
                        ) && Object.keys(bag).length > 1 ? (
                          <Fragment>
                            <br />
                            <br />
                            Your order will arrive in two different packages.
                          </Fragment>
                        ) : null}
                        {/* {freeShippingAt > 0 &&
                          freeShippingAt !== Infinity &&
                          ` Free delivery for orders over €${freeShippingAt}. Enjoy!`} */}
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
                  title="Subtotal (incl. taxes)"
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
                  <StatBlock
                    css={(theme) => ({
                      background: theme.colors.text_title_light,
                    })}
                  >
                    <Text component="h6" css={{ opacity: 0.5, margin: 0 }}>
                      BAG SUBTOTAL
                    </Text>
                    <Text
                      variant="h4"
                      css={(theme) => ({
                        marginTop: theme.spacing(2),
                        marginBottom: theme.spacing(2),
                      })}
                    >
                      {totalPrice.toLocaleString(undefined, {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </Text>
                    <CheckoutButton color="black" />
                    <Line spacing={3} />
                    <Text css={{ margin: 0, opacity: 0.5 }}>
                      <Lock css={{ verticalAlign: "baseline" }} /> Secure
                      payment
                    </Text>
                  </StatBlock>
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
        </Fragment>
      )}
    </Fragment>
  );
};

const Checkout: NextPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (loading) {
      timeout = setTimeout(() => setLoading(false), 3000);
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  const CheckoutButton: FC<ButtonProps> = (props) => {
    const { bag } = useBag();
    const startLoading = () => setLoading(true);

    return (
      <Button
        {...props}
        component={Link}
        href={`https://store.playingarts.com/cart/${Object.entries(bag)
          .map(([id, quantity]) => `${parseInt(id, 10)}:${quantity}`)
          .join(",")}`}
        onClick={startLoading}
        loading={loading}
      >
        CHECK OUT
      </Button>
    );
  };

  return (
    <ComposedGlobalLayout customShopButton={<CheckoutButton />} noNav={true}>
      <Content CheckoutButton={CheckoutButton} />
      <Layout css={(theme) => ({ background: theme.colors.white })}>
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
    </ComposedGlobalLayout>
  );
};

export default withApollo(Checkout);
