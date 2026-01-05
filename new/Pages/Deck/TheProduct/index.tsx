import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useProducts } from "../../../../hooks/product";
import { useRouter } from "next/router";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import ArrowButton from "../../../Buttons/ArrowButton";
import { usePalette } from "../DeckPaletteContext";

const TheProduct: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  const [product, setProduct] = useState<GQL.Product>();
  const {
    query: { deckId },
  } = useRouter();

  useEffect(() => {
    if (!products || !deckId || typeof deckId !== "string") {
      return;
    }
    setProduct(
      products.find((product) => product.deck && product.deck.slug === deckId)
    );
  }, [products, deckId]);

  const { palette } = usePalette();

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 150,
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
          <ArrowButton color="accent" css={[{ marginTop: 30 }]}>
            Shop this deck
          </ArrowButton>
        </div>
      </ScandiBlock>
    </Grid>
  );
};

export default TheProduct;
