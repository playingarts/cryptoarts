import { FC, HTMLAttributes, useEffect, useState } from "react";
import Grid from "../../../Grid";
import Intro from "../../../Intro";
import { useProducts } from "../../../../hooks/product";
import Text from "../../../Text";
import Label from "../../../Label";
import image3Hover from "../../../../mocks/images/ShopBundle/3.png";
import image3 from "../../../../mocks/images/ShopBundle/3-hover.png";
import future from "../../../../mocks/images/ShopBundle/futureHover.png";
import futureHover from "../../../../mocks/images/ShopBundle/future.png";
import AddToBag from "../../../Buttons/AddToBag";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";

const Bundle: FC<{ product: GQL.Product }> = ({ product }) => {
  const [hover, setHover] = useState(false);
  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;

  return (
    <div
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
      key={product._id + "bundleProduct"}
      css={(theme) => [
        {
          gridColumn: "span 6",
          backgroundColor: theme.colors.white50,
          borderRadius: theme.spacing(2),
          padding: theme.spacing(3),
          position: "relative",
          "&:hover": {
            backgroundColor: theme.colors.white,
          },
          [theme.maxMQ.sm]: {
            gridColumn: "1 / -1", // Full width on tablet/mobile
          },
          [theme.maxMQ.xsm]: {
            padding: theme.spacing(2),
            "&:hover": {
              backgroundColor: theme.colors.white50,
            },
          },
        },
      ]}
    >
      <div css={[{ position: "absolute", left: 15, top: 15 }]}>
        {product.labels &&
          product.labels.map((label) => (
            <Label
              key={label + product._id}
              css={(theme) => [
                {
                  backgroundColor: theme.colors.mint,
                  display: "inline-block",
                },
              ]}
            >
              {label}
            </Label>
          ))}
      </div>
      <div
        css={(theme) => [
          {
            height: 250,
            display: "block",
            paddingTop: theme.spacing(6),
            paddingBottom: 26,
            boxSizing: "content-box",
            [theme.maxMQ.xsm]: {
              height: 180,
              paddingTop: theme.spacing(4),
              paddingBottom: 15,
            },
          },
        ]}
      >
        <img
          src={
            hover
              ? product.short === "Complete Edition"
                ? image3.src
                : product.short === "Future Visionary"
                ? future.src
                : product.image2
              : product.short === "Complete Edition"
              ? image3Hover.src
              : product.short === "Future Visionary"
              ? futureHover.src
              : product.image2
          }
          alt="deck image"
          css={[
            {
              objectFit: "contain",
              width: "100%",
              height: "100%",
              // padding: "0 50px",
              aspectRatio: "1/1",
            },
          ]}
        />
      </div>
      <div css={(theme) => [{ marginTop: theme.spacing(3) }]}>
        <Text typography="h4">{product.title}</Text>
        <Text typography="p-s" css={[{ marginTop: 10 }]}>
          {product.description || product.info}
        </Text>
        <div css={(theme) => [{ marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(3), alignItems: "center", [theme.maxMQ.xsm]: { marginTop: theme.spacing(2), gap: theme.spacing(2) } }]}>
          <AddToBag productId={product._id} status={product.status} />
          <Text typography="p-m">
            ${product.price.usd}
          </Text>
          {product.fullPrice && (
            <Text typography="p-m" css={{ textDecoration: "line-through" }}>
              ${product.fullPrice.usd.toFixed(2)}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

const Bundles: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();
  const [bundles, setBundles] = useState<GQL.Product[]>();

  useEffect(() => {
    if (!products) {
      return;
    }
    setBundles(products.filter((product) => product.type === "bundle"));
  }, [products]);

  return (
    <div
      id="bundles"
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: theme.spacing(6),
          paddingBottom: 90,
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(6),
          },
        },
      ]}
      {...props}
    >
      <Intro
        arrowedText="Bundles for every collector"
        paragraphText="Save big and elevate your experience with these curated collections."
        bottom={<div css={(theme) => [{ height: 120, [theme.maxMQ.xsm]: { display: "none" } }]} />}
      />
      <Grid css={(theme) => [{ [theme.maxMQ.xsm]: { gap: theme.spacing(2) } }]}>
        {bundles &&
          bundles.map((product) => (
            <Bundle key={"Bundle" + product._id} product={product} />
          ))}
      </Grid>
    </div>
  );
};

export default Bundles;
