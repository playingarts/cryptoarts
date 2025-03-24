import { FC, Fragment, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import { useProducts } from "../../../../hooks/product";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import ButtonTemplate from "../../../Buttons/Button";
import Rating from "../../../Icons/Rating";
import Text from "../../../Text";
import CollectionItem from "./CollectionItem";

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingBottom: 60,
          paddingTop: 60,
        },
      ]}
    >
      <ArrowedButton css={[{ gridColumn: "1/-1" }]}>
        Discover your next deck
      </ArrowedButton>
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            // flexWrap: "wrap",
            gap: 3,
            marginTop: 60,
            " > *": {
              background: theme.colors.soft_gray,
              borderRadius: 16,
              overflow: "hidden",
              "&:hover": {
                background: theme.colors.white75,
              },
            },
          },
        ]}
      >
        {products &&
          products.map(
            (product, index) =>
              product.type === "deck" && (
                <Fragment key={"product" + product._id}>
                  {index === 2 && (
                    <div
                      css={[{ display: "grid", alignContent: "space-between" }]}
                    >
                      <Text css={[{ margin: 30 }]}>1,000+ reviews</Text>
                      <div css={[{ margin: 30 }]}>
                        <Rating />
                        <Rating />
                        <Rating />
                        <Rating />
                        <Rating />
                        <Text css={[{ marginTop: 30 }]}>
                          “Not only are they little gems by their own right,
                          they are also a perfect way to discover new talented
                          artists.”
                        </Text>
                        <Text
                          typography="paragraphSmall"
                          css={[{ marginTop: 15 }]}
                        >
                          Matthew V. from Florida, USA
                        </Text>
                        <ArrowButton
                          css={[{ marginTop: 15 }]}
                          noColor
                          size="small"
                          base
                        >
                          Edition One
                        </ArrowButton>
                        <div>
                          <ButtonTemplate
                            bordered
                            css={(theme) => [
                              {
                                marginTop: 30,
                                // color: "white",
                              },
                            ]}
                          >
                            View all reviews
                          </ButtonTemplate>
                        </div>
                      </div>
                    </div>
                  )}

                  <CollectionItem
                    palette={
                      product.deck && product.deck.slug === "crypto"
                        ? "dark"
                        : undefined
                    }
                    product={product}
                  />
                </Fragment>
              )
          )}
      </div>
    </Grid>
  );
};

export default Collection;
