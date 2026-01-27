import { FC, HTMLAttributes, useEffect, useState } from "react";
import ArrowedButton from "../../../../Buttons/ArrowedButton";
import { useProducts } from "../../../../../hooks/product";
import Text from "../../../../Text";
import { useBag } from "../../../../Contexts/bag";
import Button from "../../../../Buttons/Button";
import ArrowButton from "../../../../Buttons/ArrowButton";
import Lock from "../../../../Icons/Lock";
import Visa from "../../../../Icons/Visa";
import Mastercard from "../../../../Icons/Mastercard";
import PayPal from "../../../../Icons/PayPal";
import ApplePay from "../../../../Icons/ApplePay";
import GooglePay from "../../../../Icons/GooglePay";
import Link from "../../../../Link";
import ContinueShopping from "../../../../Buttons/ContinueShopping";

const CTA: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { bag, updateQuantity, removeItem, getPrice } = useBag();

  const { products } = useProducts(
    bag
      ? {
          variables: {
            ids: Object.keys(bag),
          },
        }
      : {}
  );

  const [total, setTotal] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [savings, setSavings] = useState(0);
  const [shippingSaving, setShippingSavings] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!products || !bag) {
      return;
    }

    const total = products
      .filter((product) => bag[product._id])
      .reduce((prev, cur) => {
        return Number(
          (prev + cur.price.usd * bag[cur._id]).toFixed(2)
        );
      }, 0);

    setTotal(total);
    setTotalPercentage((total / 45) * 100);
    setShippingSavings(total / 45 >= 1 ? 5 : 0);

    setSavings(
      products
        .filter(
          (product) =>
            Object.keys(bag).findIndex((bg) => bg === product._id) !== -1
        )
        .reduce((prev, cur) => {
          return (
            prev +
            (cur.fullPrice
              ? cur.fullPrice.usd - cur.price.usd
              : 0) *
              bag[cur._id]
          );
        }, 0)
    );
  }, [products, bag]);

  return (
    <div
      css={(theme) => [
        {
          backgroundColor: "white",
          height: "fit-content",
          borderRadius: theme.spacing(1.5),
          padding: theme.spacing(3),
          position: "sticky",
          top: 70,
          [theme.maxMQ.sm]: {
            position: "relative",
            top: "auto",
            marginTop: theme.spacing(3),
          },
        },
      ]}
      {...props}
    >
      <ArrowedButton>Summary</ArrowedButton>
      <div css={(theme) => [{ marginTop: theme.spacing(3), display: "grid", gap: theme.spacing(1.5) }]}>
        <div css={[{ display: "flex", justifyContent: "space-between" }]}>
          <Text typography="p-s">Subtotal</Text>
          <Text typography="p-s">${total.toFixed(2)}</Text>
        </div>
        <div css={[{ display: "flex", justifyContent: "space-between" }]}>
          <Text typography="p-s">Shipping</Text>
          <Text typography="p-s">
            ${(shippingSaving === 0 ? 5 : 0).toFixed(2)}
          </Text>
        </div>
        <div
          css={(theme) => [
            {
              position: "relative",
              background:
                total >= 45
                  ? theme.colors.mint
                  : `linear-gradient(to right, ${theme.colors.mint} ${totalPercentage}%,  ${theme.colors.pale_gray} ${totalPercentage}%)`,
              borderRadius: 7,
            },
          ]}
        >
          <Text
            typography="p-xs"
            css={[{ textAlign: "center", lineHeight: "45px" }]}
          >
            {total < 45
              ? `You're just $${(45 - total).toFixed(2)} away from free shipping!`
              : "You have free shipping"}
          </Text>
        </div>
        {savings > 0 && (
          <div
            css={(theme) => [
              {
                display: "flex",
                justifyContent: "space-between",
                "> *": {
                  color: theme.colors.success,
                },
              },
            ]}
          >
            <Text typography="p-s">Bundle savings</Text>
            <Text typography="p-s">${savings.toFixed(2)}</Text>
          </div>
        )}
        {shippingSaving > 0 && (
          <div
            css={(theme) => [
              {
                display: "flex",
                justifyContent: "space-between",
                "> *": {
                  color: theme.colors.success,
                },
              },
            ]}
          >
            <Text typography="p-s">Shipping savings</Text>
            <Text typography="p-s">${shippingSaving.toFixed(2)}</Text>
          </div>
        )}
        {savings > 0 && shippingSaving > 0 && (
          <div
            css={(theme) => [
              {
                display: "flex",
                justifyContent: "space-between",
                "> *": {
                  color: theme.colors.success,
                },
              },
            ]}
          >
            <Text typography="p-s">Total savings</Text>
            <Text typography="p-s">
              ${(savings + shippingSaving).toFixed(2)}
            </Text>
          </div>
        )}
      </div>
      <div
        css={(theme) => [
          {
            marginTop: theme.spacing(3),
            display: "flex",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text typography="h3">Total</Text>
        <Text typography="h3">
          ${(total + (total >= 45 ? 0 : 5)).toFixed(2)}
        </Text>
      </div>
      <Link
        href={
          !bag
            ? "/"
            : `https://secure.playingarts.com/cart/${Object.entries(bag)
                .map(([id, quantity]) => `${parseInt(id, 10)}:${quantity}`)
                .join(",")}`
        }
        css={[{ marginLeft: "auto", marginTop: 15, display: "block" }]}
        onClick={() => setCheckoutLoading(true)}
      >
        <ArrowButton color="accent" size="medium" css={[{ display: "flex" }, checkoutLoading && { opacity: 0.7, cursor: "wait" }]}>
          {checkoutLoading ? "Loading..." : "Secure check out"}
        </ArrowButton>
      </Link>
      <ContinueShopping css={[{ display: "flex", marginTop: 15 }]}>
        Continue shopping
      </ContinueShopping>

      <Text
        typography="p-s"
        css={(theme) => [
          { textAlign: "center", color: theme.colors.black30, marginTop: theme.spacing(3), fontSize: 15 },
        ]}
      >
        <Lock css={[{ marginRight: 10 }]} />
        100% secure powered by Shopify
      </Text>

      <div
        css={(theme) => [
          {
            gap: 20,
            marginTop: theme.spacing(3),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            color: "rgba(0,0,0,20%)",
            [theme.maxMQ.xsm]: {
              gap: 15,
            },
          },
        ]}
      >
        <Visa css={[{ width: 49.82 }]} />
        <Mastercard css={[{ width: 42.7 }]} />
        <PayPal css={[{ width: 60.5 }]} />
        <ApplePay css={[{ width: 53.38 }]} />
        <GooglePay css={[{ width: 55.56 }]} />
      </div>
    </div>
  );
};

export default CTA;
