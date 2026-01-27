import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useProducts } from "../../../../hooks/product";
import { useRouter } from "next/router";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import { usePalette } from "../DeckPaletteContext";
import { useFutureChapter } from "../FutureChapterContext";

const TheProduct: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();
  const { activeTab, isFutureDeck } = useFutureChapter();

  const [product, setProduct] = useState<GQL.Product>();
  const {
    query: { deckId },
  } = useRouter();

  useEffect(() => {
    if (!products || !deckId || typeof deckId !== "string") {
      return;
    }

    // For Future deck, select product based on active chapter tab
    let targetDeckSlug = deckId;
    if (isFutureDeck) {
      // future-i tab -> "future" deck, future-ii tab -> "future-ii" deck
      targetDeckSlug = activeTab === "future-ii" ? "future-ii" : "future";
    }

    setProduct(
      products.find(
        (product) =>
          product.type === "deck" &&
          product.deck &&
          product.deck.slug === targetDeckSlug
      )
    );
  }, [products, deckId, isFutureDeck, activeTab]);

  const { palette } = usePalette();

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(12),
          background:
            palette === "dark" ? "#212121" : theme.colors["pale_gray"],
        },
      ]}
      {...props}
    >
      <ScandiBlock
        css={(theme) => [
          {
            gridColumn: "span 6",
            flexDirection: "column",
            alignItems: "start",
            paddingTop: 15,
            [theme.maxMQ.xsm]: {
              gridColumn: "1 / -1",
              paddingBottom: theme.spacing(2),
            },
          },
        ]}
      >
        <ArrowedButton
          css={(theme) => ({
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          The product
        </ArrowedButton>
        <img
          src={product && product.image2}
          alt={product?.title ? `${product.title} deck` : "Playing Arts deck"}
          css={(theme) => [
            { width: "100%", height: 400, marginTop: theme.spacing(3), objectFit: "contain", [theme.maxMQ.xsm]: { height: 250 } },
          ]}
        />
      </ScandiBlock>

      <ScandiBlock
        css={(theme) => [
          {
            gridColumn: "span 6",
            display: "grid",
            alignItems: "initial",
            paddingTop: 15,
            [theme.maxMQ.xsm]: {
              gridColumn: "1 / -1",
              borderTop: "none",
              paddingTop: theme.spacing(3),
              paddingBottom: theme.spacing(3),
            },
          },
        ]}
      >
        <Text
          css={(theme) => ({
            marginBottom: theme.spacing(3),
            color: theme.colors[palette === "dark" ? "white75" : "black"],
          })}
        >
          A masterpiece you can hold
        </Text>
        <div>
          <Text
            typography="p-l"
            css={(theme) => ({
              color: theme.colors[palette === "dark" ? "white75" : "black"],
            })}
          >
            Carefully crafted on legendary Bicycle® paper for unparalleled
            artistry and tactile quality.
          </Text>
          <ArrowButton
            color="accent"
            size="medium"
            css={(theme) => [{ marginTop: theme.spacing(3), [theme.maxMQ.xsm]: { marginBottom: theme.spacing(3) } }]}
            href={
              product?.short
                ? `/shop/${product.short.toLowerCase().replace(/\s/g, "")}`
                : undefined
            }
          >
            {product?.title ? `Shop ${product.title}` : "Shop this deck"}
          </ArrowButton>
        </div>
      </ScandiBlock>
    </Grid>
  );
};

export default TheProduct;
