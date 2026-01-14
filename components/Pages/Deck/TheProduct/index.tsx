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
          paddingTop: 60,
          paddingBottom: 120,
          background:
            palette === "dark" ? "#212121" : theme.colors["pale_gray"],
        },
      ]}
      id="product"
      {...props}
    >
      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            flexDirection: "column",
            alignItems: "start",
            paddingTop: 15,
          },
        ]}
      >
        <ArrowedButton>The product</ArrowedButton>
        <img
          src={product && product.image2}
          alt=""
          css={[
            { width: "100%", height: 400, marginTop: 30, objectFit: "contain" },
          ]}
        />
      </ScandiBlock>

      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            display: "grid",
            alignItems: "initial",
            paddingTop: 15,
          },
        ]}
      >
        <Text css={[{ marginBottom: 30 }]}>A masterpiece you can hold</Text>
        <div>
          <Text typography="paragraphBig">
            Carefully crafted on legendary Bicycle® paper for unparalleled
            artistry and tactile quality.
          </Text>
          <ArrowButton
            color="accent"
            css={[{ marginTop: 30 }]}
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
