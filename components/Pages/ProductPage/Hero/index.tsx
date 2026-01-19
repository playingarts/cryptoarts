import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useProducts } from "../../../../hooks/product";
import Text from "../../../Text";
import SoldOut from "../../../Buttons/SoldOut";
import AddToBag from "../../../Buttons/AddToBag";
import ContinueShopping from "../../../Buttons/ContinueShopping";
import Grid from "../../../Grid";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { pId },
  } = useRouter();

  const { products } = useProducts();

  const [product, setProduct] = useState<GQL.Product>();

  useEffect(() => {
    products &&
      pId &&
      setProduct(
        products.find(
          (prod) => prod.short.toLowerCase().split(" ").join("") === pId
        )
      );
  }, [pId, products]);

  return product && product.deck ? (
    <Grid css={[{ overflow: "hidden" }]}>
      <div
        css={[
          {
            paddingTop: 235,
            paddingBottom: 60,
            display: "grid",
            gap: 15,
            gridColumn: "7 / span 5",
            position: "relative",
          },
        ]}
      >
        <Text typography="newh1" css={{ textAlign: "left" }}>{product.title}</Text>
        <Text>{product.description}</Text>
        <Text>${product.price.usd}</Text>
        <div css={{ display: "flex", alignItems: "center", gap: 30 }}>
          {product.status === "soldout" ? (
            <SoldOut size="big" css={{ fontSize: 20 }} />
          ) : (
            <AddToBag productId={product._id} size="big" css={{ fontSize: 20 }} />
          )}
          <ContinueShopping css={{ fontSize: 20 }} />
        </div>
        <img
          src={product.image2}
          alt=""
          css={[
            {
              width: 960,
              height: 600,
              objectFit: "contain",
              position: "absolute",
              top: 120,
              left: -837,
              pointerEvents: "none",
            },
          ]}
        />
      </div>
    </Grid>
  ) : null;
};

export default Hero;
