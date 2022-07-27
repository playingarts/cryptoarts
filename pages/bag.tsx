import { NextPage } from "next";
import { FC, Fragment, useEffect, useState } from "react";
import Arrowed from "../components/Arrowed";
import Button, { Props as ButtonProps } from "../components/Button";
import EurToUsd from "../components/EurToUsd";
import Grid from "../components/Grid";
import Lock from "../components/Icons/Lock";
import ThickChevron from "../components/Icons/ThickChevron";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Link from "../components/Link";
import ShopCheckoutItem, {
  Props as CheckoutItemProps,
} from "../components/Shop/CheckoutItem";
import { useSize } from "../components/SizeProvider";
import StatBlock from "../components/StatBlock";
import Text from "../components/Text";
import ComposedFaq from "../components/_composed/Faq";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import { useBag } from "../hooks/bag";
import { useProducts } from "../hooks/product";
import { withApollo } from "../source/apollo";
import { breakpoints } from "../source/enums";

const Content: FC<{
  CheckoutButton: FC<ButtonProps & { noIcon?: boolean }>;
}> = ({ CheckoutButton }) => {
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

  const { width } = useSize();

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
          background: theme.colors.page_bg_light,
          paddingTop: theme.spacing(20),
          [theme.mq.sm]: {
            paddingBottom: theme.spacing(5),
          },
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(12.5),
          },
        })}
      >
        <Grid short={true}>
          <div css={{ gridColumn: "1 / -1" }}>
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
                <Text
                  variant="body2"
                  css={(theme) => [
                    {
                      margin: 0,
                      gridColumn: "1/-1",
                      marginTop: theme.spacing(1),
                      marginBottom: theme.spacing(1),
                    },
                  ]}
                >
                  Please note for the festive season, all online purchases made
                  between 03/11/21 and 15/12/2021 can be returned up to
                  31/01/22.
                </Text>
                <Line spacing={1} />
              </Fragment>
            )}
          </div>
        </Grid>
      </Layout>

      {products.length > 0 && (
        <Fragment>
          <Layout
            css={(theme) => ({
              background: theme.colors.page_bg_light,
              [theme.mq.sm]: {
                paddingTop: theme.spacing(6),
              },
              [theme.maxMQ.sm]: {
                paddingBottom: theme.spacing(5.5),
              },
              paddingBottom: theme.spacing(15),
            })}
          >
            <Grid>
              <div
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: {
                      gridColumn: "1/-1",
                    },
                    [theme.mq.sm]: {
                      gridColumn: "span 9",
                      gridTemplateColumns: "repeat(9, 1fr)",
                    },
                    gap: "inherit",
                    display: "grid",
                  },
                ]}
              >
                <div css={{ gridColumn: "1/-1" }}>
                  {products.map((product, index) => (
                    <Fragment key={product._id}>
                      {index !== 0 && (
                        <Line spacing={width < breakpoints.sm ? 1 : 3} />
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

                  <Line spacing={width < breakpoints.sm ? 1 : 4} />
                </div>
                {totalPrice - shippingPrice < freeShippingAt &&
                  totalPrice - shippingPrice + 15 >= freeShippingAt && (
                    <Text
                      css={(theme) => ({
                        background: `linear-gradient(90deg, #7142D6 0%, #2FBACE 100%)`,
                        borderRadius: theme.spacing(1),
                        [theme.mq.sm]: { marginLeft: theme.spacing(21) },
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
                {products.find(({ deck }) => deck && deck.slug === "crypto") &&
                Object.keys(bag).length > 1 ? (
                  <Text
                    variant="body"
                    css={(theme) => ({
                      gridColumn: "3 / span 7",
                      [theme.maxMQ.sm]: {
                        gridColumn: "1 / -1",
                        fontSize: 13,
                        padding: 0,
                        textAlign: "center",
                        lineHeight: `${theme.spacing(4.5)}px`,
                      },
                      paddingLeft: theme.spacing(2.5),
                      lineHeight: `${theme.spacing(5)}px`,
                      alignContent: "center",
                      background: theme.colors.gradient_three,
                      borderRadius: theme.spacing(1),
                      color: theme.colors.text_title_light,
                      fontWeight: 500,
                      margin: 0,
                      marginBottom: theme.spacing(3),
                    })}
                  >
                    Your order will arrive in two different packages.
                  </Text>
                ) : null}
                <ShopCheckoutItem
                  title="Shipping and handling"
                  // price={shippingPrice}
                  titleVariant="h5"
                  withoutPic={true}
                  css={(theme) => [
                    {
                      gridColumn: "3 / 7",
                      [theme.maxMQ.sm]: {
                        marginTop: theme.spacing(4.5),
                        gridColumn: "1 / -1",
                      },
                    },
                  ]}
                  info={
                    <Fragment>
                      <Text
                        css={(theme) => [
                          {
                            opacity: 0.5,
                            [theme.maxMQ.sm]: {
                              fontSize: 16,
                            },
                          },
                        ]}
                      >
                        Your order will be dispatched in 2 to 5 days. Shipping
                        costs calculated at checkout.
                        {/* {freeShippingAt > 0 &&
                          freeShippingAt !== Infinity &&
                          ` Free delivery for orders over €${freeShippingAt}. Enjoy!`} */}
                      </Text>
                      <Link
                        shallow={true}
                        href={{
                          query: {
                            scrollIntoView: "[data-id='block-faq']",
                            scrollIntoViewBehavior: "smooth",
                          },
                        }}
                      >
                        <Text
                          variant="label"
                          component="button"
                          css={{ opacity: 0.5 }}
                        >
                          <Arrowed>Shipping FAQ</Arrowed>
                        </Text>
                      </Link>
                    </Fragment>
                  }
                />
                <Line
                  spacing={4}
                  css={(theme) => ({
                    [theme.mq.sm]: {
                      marginLeft: theme.spacing(21),
                    },
                    gridColumn: "span 7",
                    [theme.maxMQ.sm]: {
                      marginTop: theme.spacing(2.5),
                      marginBottom: theme.spacing(2.5),
                      gridColumn: "1/-1",
                    },
                    width: "100%",
                  })}
                />
                {(width < breakpoints.sm || width >= breakpoints.md) && (
                  <Fragment>
                    <div
                      css={(theme) => [
                        {
                          display: "flex",
                          justifyContent: "space-between",
                          gridColumn: "1 / -1",
                          [theme.mq.sm]: {
                            gridColumn: "3 / -1",
                          },
                        },
                      ]}
                    >
                      <Text
                        component={width >= breakpoints.sm ? "h4" : "h3"}
                        css={[
                          {
                            margin: 0,
                          },
                        ]}
                      >
                        Subtotal
                        {width >= breakpoints.sm ? " (incl. taxes)" : ""}
                      </Text>
                      <div
                        css={(theme) => [
                          {
                            [theme.mq.sm]: {
                              minWidth: theme.spacing(18),
                            },
                          },
                        ]}
                      >
                        <Text
                          variant={width < breakpoints.sm ? "h3" : "h4"}
                          css={[{ margin: 0 }]}
                        >
                          {totalPrice.toLocaleString(undefined, {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </Text>
                        <EurToUsd css={{ opacity: 0.5 }} eur={totalPrice} />
                      </div>
                    </div>
                    {width < breakpoints.sm && (
                      <Fragment>
                        <CheckoutButton
                          color="black"
                          css={(theme) => [
                            { width: "100%", marginTop: theme.spacing(2.3) },
                          ]}
                          centeredText={true}
                          noIcon={true}
                        />
                        <Text
                          component={Link}
                          href="/shop"
                          variant="label"
                          css={(theme) => ({
                            display: "inline-block",
                            textAlign: "center",
                            marginTop: theme.spacing(3),
                            opacity: 0.5,
                          })}
                        >
                          <Arrowed position="prepend">
                            Continue shopping
                          </Arrowed>
                        </Text>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
              {width >= breakpoints.sm && (
                <div
                  css={(theme) => ({
                    position: "sticky",
                    gridColumn: "3 / span 7",
                    [theme.mq.md]: {
                      gridColumn: "span 3",
                    },
                    height: "fit-content",
                    top: theme.spacing(15),
                    textAlign: "center",
                  })}
                >
                  <StatBlock
                    css={(theme) => ({
                      background: theme.colors.text_title_light,
                    })}
                  >
                    {width < breakpoints.md ? (
                      <div
                        css={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text component="h4" css={{ margin: 0 }}>
                          Subtotal (incl. taxes)
                        </Text>
                        <div
                          css={(theme) => ({
                            minWidth: theme.spacing(18),
                            textAlign: "initial",
                          })}
                        >
                          <Text component="h4" css={{ margin: 0 }}>
                            {totalPrice.toLocaleString(undefined, {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </Text>
                          <Text
                            component="p"
                            css={(theme) => ({
                              margin: 0,
                              marginTop: theme.spacing(0.5),
                              marginBottom: theme.spacing(2),
                              color: theme.colors.text_subtitle_dark,
                            })}
                          >
                            ~
                            {totalPrice.toLocaleString(undefined, {
                              style: "currency",
                              currency: "USD",
                            })}
                          </Text>
                        </div>
                      </div>
                    ) : (
                      <div>
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
                      </div>
                    )}
                    <CheckoutButton
                      color="black"
                      css={{ width: "100%" }}
                      centeredText={true}
                    />
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
              )}
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

  const CheckoutButton: FC<ButtonProps & { noIcon?: boolean }> = ({
    noIcon,
    ...props
  }) => {
    const { bag } = useBag();
    const startLoading = () => setLoading(true);

    const { width } = useSize();

    return (
      <Button
        {...props}
        {...((noIcon ? width >= breakpoints.sm : width < breakpoints.sm) && {
          Icon: ThickChevron,
        })}
        component={Link}
        href={`https://store.playingarts.com/cart/${Object.entries(bag)
          .map(([id, quantity]) => `${parseInt(id, 10)}:${quantity}`)
          .join(",")}`}
        onClick={startLoading}
        loading={loading}
        css={(theme) => [
          !noIcon && {
            [theme.maxMQ.sm]: {
              background: theme.colors.page_bg_light,
              color: theme.colors.black,
            },
          },
        ]}
        iconProps={{
          css: (theme) => [
            { width: theme.spacing(1.25), height: theme.spacing(2) },
          ],
        }}
      >
        {width >= breakpoints.sm || noIcon ? "CHECK OUT" : ""}
      </Button>
    );
  };

  return (
    <ComposedGlobalLayout customShopButton={<CheckoutButton />} noNav={true}>
      <Content CheckoutButton={CheckoutButton} />
      <Layout css={(theme) => ({ background: theme.colors.white })}>
        <Grid short={true}>
          <ComposedFaq
            css={(theme) => ({
              [theme.maxMQ.sm]: {
                marginTop: theme.spacing(5),
                marginBottom: theme.spacing(2),
              },
              marginTop: theme.spacing(15),
              marginBottom: theme.spacing(15),
              gridColumn: "1 / -1",
            })}
          />
        </Grid>
      </Layout>
    </ComposedGlobalLayout>
  );
};

export default withApollo(Checkout);
