import { FC, HTMLAttributes, useState } from "react";
import AddToBagButton from "../../AddToBagButton";
import Button from "../../Button";
import Grid from "../../Grid";
import Bag from "../../Icons/Bag";
import Line from "../../Line";
import Select, { Props as SelectProps } from "../../Select";
import Text from "../../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  products: GQL.Product[];
}

const ShopSheets: FC<Props> = ({ products, ...props }) => {
  const notSoldout = ({ status }: GQL.Product) => status !== "soldout";
  const [product, setProduct] = useState(
    products.find(notSoldout) || products[0]
  );
  const options = products.reduce(
    (options, { title }) => ({ ...options, [title]: title }),
    {}
  );
  const changeProduct: SelectProps["onChange"] = ({ target }) => {
    setProduct(
      products.find(({ title }) => title === target.value) || products[0]
    );
  };

  return (
    <Grid
      {...props}
      css={{
        alignItems: "center",
      }}
    >
      <div css={{ gridColumn: "span 5" }}>
        <img
          src={product.image}
          alt={product.title}
          css={(theme) => ({
            borderRadius: theme.spacing(1),
            maxHeight: "100%",
            maxWidth: "100%",
          })}
        />
      </div>
      <div css={{ gridColumn: "7 / span 5" }}>
        <Text css={{ margin: 0 }} component="h3">
          Uncut Sheets
        </Text>
        <Text
          css={{
            margin: 0,
            opacity: 0.5,
          }}
          variant="body2"
        >
          €{product.price}
        </Text>
        <Line spacing={3} />
        <Text>
          An uncut sheet is a normal deck of playing cards - uncut. Just before
          the sheets were cut into decks at USPCC, some were removed - destined
          for display on your wall.
        </Text>
        <Text
          css={{
            margin: 0,
            opacity: 0.5,
          }}
        >
          Size: 22x26,5 inches. Frame not included.
        </Text>
        <Line spacing={3} />
        <div
          css={(theme) => ({
            display: "flex",
            alignItems: "center",
            columnGap: theme.spacing(2),
          })}
        >
          {notSoldout(product) ? (
            <AddToBagButton productId={product._id} color="black" Icon={Bag} />
          ) : (
            <Button disabled={true} color="black">
              sold out
            </Button>
          )}
          <Select
            value={product.title}
            onChange={changeProduct}
            options={options}
          />
        </div>
      </div>
    </Grid>
  );
};

export default ShopSheets;
