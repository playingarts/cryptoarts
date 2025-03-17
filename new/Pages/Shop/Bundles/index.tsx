import { FC, HTMLAttributes, useEffect, useState } from "react";
import Grid from "../../../../components/Grid";
import Intro from "../../../Intro";
import { useProducts } from "../../../../hooks/product";
import Link from "../../../Link";
import Text from "../../../Text";
import Button from "../../../Buttons/Button";
import Plus from "../../../Icons/Plus";
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
      <Link
        href="/"
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
              ? product.short === "3x Edition"
                ? image3.src
                : product.short === "2x Future"
                ? future.src
                : product.image2
              : product.short === "3x Edition"
              ? image3Hover.src
              : product.short === "2x Future"
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
      </Link>
      <div css={[{ marginTop: 30 }]}>
        <Text typography="newh4">{product.title}</Text>
        <Text typography="paragraphSmall" css={[{ marginTop: 10 }]}>
          The bold beginning, reimagined with AR.
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          <AddToBag productId={product._id} />
          <Button size="small" noColor base>
            ${product.price.usd}
          </Button>
          {product.fullPrice && (
            <Button
              size="small"
              noColor
              base
              css={[{ textDecoration: "line-through" }]}
            >
              ${product.fullPrice.usd.toFixed(2)}
            </Button>
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
      css={(theme) => [
        { background: theme.colors.soft_gray, paddingBottom: 90 },
      ]}
    >
      <Intro
        arrowedText="Bundles for every collector"
        paragraphText="Save big and elevate your experience with these curated collections."
        css={[{ minHeight: 241, boxSizing: "content-box", marginBottom: 60 }]}
      />
      {bundles &&
        bundles.map((product) => (
          <Bundle key={"Bundle" + product._id} product={product} />
        ))}
    </Grid>
  );
};

export default Bundles;
