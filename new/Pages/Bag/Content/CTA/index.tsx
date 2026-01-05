import { FC, HTMLAttributes, useEffect, useState } from "react";
import ArrowedButton from "../../../../Buttons/ArrowedButton";
import { useProducts } from "../../../../../hooks/product";
import Text from "../../../../Text";
import { useBag } from "../../../../Contexts/bag";
import Button from "../../../../Buttons/Button";
import ArrowButton from "../../../../Buttons/ArrowButton";
import Lock from "../../../../Icons/Lock";
import Visa from "../../../../../components/Icons/Visa";
import Mastercard from "../../../../../components/Icons/Mastercard";
import PayPal from "../../../../../components/Icons/PayPal";
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

  useEffect(() => {
    if (!products || !bag) {
      return;
    }

    const total = products.reduce((prev, cur) => {
      return Number(
        (prev + (getPrice(cur.price, true) as number) * bag[cur._id]).toFixed(2)
      );
    }, 0);

    setTotal(total);
    setTotalPercentage((total / 50) * 100);
    setShippingSavings(total / 50 >= 1 ? 5 : 0);

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
              ? (getPrice(cur.fullPrice, true) as number) - (getPrice(cur.price, true) as number)
              : 0) *
              bag[cur._id]
          );
        }, 0)
    );
  }, [products, bag]);

  return (
    <div
      css={[
        {
          backgroundColor: "white",
          height: "fit-content",
          borderRadius: 15,
          padding: 30,
          position: "sticky",
          top: 70,
        },
      ]}
      {...props}
    >
      <ArrowedButton>Summary</ArrowedButton>
      <div css={[{ marginTop: 60, display: "grid", gap: 15 }]}>
        <div css={[{ display: "flex", justifyContent: "space-between" }]}>
          <Text typography="paragraphSmall">Subtotal</Text>
          <Text typography="paragraphSmall">{getPrice(total)}</Text>
        </div>
        <div css={[{ display: "flex", justifyContent: "space-between" }]}>
          <Text typography="paragraphSmall">Shipping</Text>
          <Text typography="paragraphSmall">
            {getPrice(shippingSaving === 0 ? 5 : 0)}
          </Text>
        </div>
        <div
          css={(theme) => [
            {
              margin: "15px 0",
              position: "relative",
              background:
                total >= 50
                  ? theme.colors.mint
                  : `linear-gradient(to right, ${theme.colors.mint} ${totalPercentage}%,  ${theme.colors.pale_gray} ${totalPercentage}%)`,
              borderRadius: 7,
            },
          ]}
        >
          <Text
            typography="paragraphNano"
            css={[{ textAlign: "center", lineHeight: "45px" }]}
          >
            {total < 50
              ? `You’re just ${getPrice(50 - total)} away from free shipping!`
              : "You have free shipping"}
          </Text>
        </div>
        <div
          css={(theme) => [
            {
              display: "flex",
              justifyContent: "space-between",
              "> *": {
                color: "#469F71",
              },
            },
          ]}
        >
          <Text typography="paragraphSmall">Bundle savings</Text>
          <Text typography="paragraphSmall">{getPrice(savings)}</Text>
        </div>
        <div
          css={(theme) => [
            {
              display: "flex",
              justifyContent: "space-between",
              "> *": {
                color: "#469F71",
              },
            },
          ]}
        >
          <Text typography="paragraphSmall">Shipping savings</Text>
          <Text typography="paragraphSmall">{getPrice(shippingSaving)}</Text>
        </div>
        <div
          css={(theme) => [
            {
              display: "flex",
              justifyContent: "space-between",
              "> *": {
                color: "#469F71",
              },
            },
          ]}
        >
          <Text typography="paragraphSmall">Total savings</Text>
          <Text typography="paragraphSmall">
            {getPrice(savings + shippingSaving)}
          </Text>
        </div>
      </div>
      <div
        css={[
          {
            marginTop: 30,
            display: "flex",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text typography="newh3">Total</Text>
        <Text typography="newh3">
          {getPrice(total + (total >= 50 ? 0 : 5))}
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
        target="_blank"
        rel="noopener"
        css={[{ marginLeft: "auto" }]}
      >
        <ArrowButton color="accent" css={[{ display: "flex", marginTop: 30 }]}>
          Secure check out
        </ArrowButton>
      </Link>
      <ContinueShopping css={[{ display: "flex", marginTop: 30 }]}>
        Continue shopping
      </ContinueShopping>

      <Text
        typography="paragraphSmall"
        css={(theme) => [
          { textAlign: "center", color: theme.colors.black30, marginTop: 30 },
        ]}
      >
        <Lock css={[{ marginRight: 10 }]} />
        100% secure powered by Shopify
      </Text>

      <div
        css={(theme) => [
          {
            gap: 20,
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(0,0,0,20%)",
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
