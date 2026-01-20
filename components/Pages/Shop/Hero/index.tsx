import { FC, HTMLAttributes, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Grid from "../../../Grid";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import ArrowButton from "../../../Buttons/ArrowButton";
import Link from "../../../Link";
import { useProducts } from "../../../../hooks/product";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { products } = useProducts();

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pick a random deck product for hero image (memoized to stay consistent during render)
  const heroProduct = useMemo(() => {
    if (!products) return null;
    const deckProducts = products.filter((p) => p.type === "deck" && p.image2);
    if (deckProducts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * deckProducts.length);
    return deckProducts[randomIndex];
  }, [products]);

  const heroImage = heroProduct?.image2 || "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.png";
  const heroAlt = heroProduct ? `${heroProduct.title} deck` : "Shop hero deck";

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 235,
          paddingBottom: 60,
          background: theme.colors.soft_gray,
          overflow: "hidden",
        },
      ]}
    >
      <div css={[{ gridColumn: "span 6", position: "relative" }]}>
        <Text typography="newh1">Shop</Text>
        <Text css={[{ marginTop: 30 }]}>
          Limited-edition playing cards and exclusive
          <br /> bundles created by visionary artists.
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30, alignItems: "center" }]}>
          <Link href="#playing-cards">
            <ButtonTemplate
              bordered={true}
              css={(theme) => [
                {
                  fontSize: 20,
                },
              ]}
            >
              Playing Cards
            </ButtonTemplate>
          </Link>
          <Link href="#bundles">
            <ArrowButton base size="small" noColor>
              Bundles
            </ArrowButton>
          </Link>
        </div>
        <div
          css={[
            {
              width: 960,
              height: 600,
              position: "absolute",
              top: -50,
              left: 455,
              opacity: 0,
              transition: "opacity 500ms ease",
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
            src={heroImage}
            alt={heroAlt}
            width={960}
            height={600}
            priority
            quality={90}
            style={{ objectFit: "cover" }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </Grid>
  );
};

export default Hero;
