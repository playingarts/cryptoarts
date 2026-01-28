import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import Image from "next/image";
import { useProducts } from "../../../../hooks/product";
import Text from "../../../Text";
import SoldOut from "../../../Buttons/SoldOut";
import Button from "../../../Buttons/Button";
import AddToBag from "../../../Buttons/AddToBag";
import ContinueShopping from "../../../Buttons/ContinueShopping";
import Grid from "../../../Grid";
import { HEADER_OFFSET } from "../../../../styles/theme";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { pId },
  } = useRouter();

  const { products } = useProducts();

  const [product, setProduct] = useState<GQL.Product>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    products &&
      pId &&
      setProduct(
        products.find(
          (prod) => prod.slug === pId || prod.short.toLowerCase().split(" ").join("") === pId
        )
      );
  }, [pId, products]);

  return product && product.deck ? (
    <Grid css={[{ overflow: "hidden" }]}>
      <div
        css={(theme) => [
          {
            paddingTop: HEADER_OFFSET.desktop,
            paddingBottom: theme.spacing(6),
            display: "grid",
            gap: theme.spacing(1.5),
            gridColumn: "7 / span 6",
            position: "relative",
            [theme.maxMQ.md]: { gridColumn: "4 / -1" },
            [theme.maxMQ.sm]: { paddingTop: HEADER_OFFSET.tablet, gridColumn: "1 / -1" },
            [theme.maxMQ.xsm]: { paddingTop: HEADER_OFFSET.mobile, paddingBottom: theme.spacing(3), gridColumn: "1 / -1" },
          },
        ]}
      >
        <Text typography="h1" css={(theme) => ({ textAlign: "left", fontSize: 65, [theme.maxMQ.xsm]: { fontSize: 40 } })}>{product.title}</Text>
        <Text>{product.description}</Text>
        <Text>{product.deck?.slug === "crypto" ? "Exclusive" : `$${product.price.usd}`}</Text>
        <div css={(theme) => ({ display: "flex", alignItems: "center", gap: theme.spacing(3) })}>
          {product.deck?.slug === "crypto" ? (
            <Button size="medium" bordered>
              Info
            </Button>
          ) : product.status === "soldout" || product.status === "soon" ? (
            <SoldOut size="medium" status={product.status} />
          ) : (
            <AddToBag productId={product._id} size="medium" />
          )}
          <ContinueShopping css={{ fontSize: 18 }} />
        </div>
        <div
          css={(theme) => [
            {
              width: 960,
              height: 600,
              position: "absolute",
              top: 120,
              left: -837,
              pointerEvents: "none",
              opacity: 0,
              transition: "opacity 500ms ease",
              [theme.maxMQ.sm]: {
                display: "none",
              },
            },
          ]}
          style={
            imageLoaded
              ? {
                  opacity: 1,
                  transform: `translateY(${-25 + scrollY * 0.3}px)`,
                }
              : undefined
          }
        >
          <Image
            src={product.image2}
            alt={product.title}
            width={960}
            height={600}
            priority
            quality={90}
            style={{ objectFit: "contain" }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </Grid>
  ) : null;
};

export default Hero;
