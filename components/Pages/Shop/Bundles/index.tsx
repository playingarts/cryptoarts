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

const Bundle: FC<{ product: GQL.Product }> = ({ product }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={product._id + "bundleProduct"}
      css={(theme) => [
        {
          gridColumn: "span 6",
          backgroundColor: theme.colors.white50,
          borderRadius: 20,
          padding: 30,
          position: "relative",
          "&:hover": {
            backgroundColor: theme.colors.white,
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
        css={[
          {
            height: 250,
            display: "block",
            paddingTop: 60,
            paddingBottom: 26,
            boxSizing: "content-box",
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
      <div css={[{ marginTop: 30 }]}>
        <Text typography="newh4">{product.title}</Text>
        <Text typography="paragraphSmall" css={[{ marginTop: 10 }]}>
          {product.description || product.info}
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30, alignItems: "center" }]}>
          <AddToBag productId={product._id} />
          <Text css={{ fontSize: 20 }}>
            ${product.price.usd}
          </Text>
          {product.fullPrice && (
            <Text css={{ textDecoration: "line-through", fontSize: 20 }}>
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
    <Grid
      id="bundles"
      css={(theme) => [
        { background: theme.colors.soft_gray, paddingBottom: 90 },
      ]}
    >
      <Intro
        arrowedText="Bundles for every collector"
        paragraphText="Save big and elevate your experience with these curated collections."
        css={[{ minHeight: 241, boxSizing: "content-box", marginBottom: 60 }]}
        titleAsText
      />
      {bundles &&
        bundles.map((product) => (
          <Bundle key={"Bundle" + product._id} product={product} />
        ))}
    </Grid>
  );
};

export default Bundles;
