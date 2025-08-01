import { FC, HTMLAttributes } from "react";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../../components/Grid";
import Text from "../../../Text";
import Dot from "../../../Icons/Dot";
import CollectionItem from "./CollectionItem";

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
        },
      ]}
      {...props}
    >
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            " > *": {
              flex: "1 0 30%",
              height: 450,
              background: theme.colors.soft_gray,
              borderRadius: 16,
            },
          },
        ]}
      >
        {(() => {
          const arr = [];
          const deckProducts =
            products && products.filter((product) => product.type === "deck");
          for (let i = 0; i < 8; i++) {
            const product = deckProducts && deckProducts[i];
            product &&
              product.deck &&
              arr.push(
                <CollectionItem
                  paletteOnHover={
                    product.deck.slug === "crypto" ? "dark" : "light"
                  }
                  product={product}
                  key={"CollectionItem" + i}
                />
              );
          }
          arr.push(
            <div css={[{ padding: 30 }]} key={"Endless inspiration"}>
              <Text typography="paragraphBig">
                Eight editions.
                <br />
                Endless inspiration.
              </Text>
              <Text typography="linkNewTypography">
                Discover the journey <Dot />
              </Text>
            </div>
          );
          return arr;
        })()}
      </div>
    </Grid>
  );
};

export default Collection;
