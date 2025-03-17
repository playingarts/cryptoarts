import { FC, FormEvent, HTMLAttributes } from "react";
import Grid from "../../../../../components/Grid";
import Text from "../../../../Text";
import Label from "../../../../Label";
import Minus from "../../../../Icons/Minus";
import Delete from "../../../../Icons/Delete";
import { useBag } from "../../../../Contexts/bag";
import Plus from "../../../../Icons/Plus";

const Product: FC<HTMLAttributes<HTMLElement> & { product: GQL.Product }> = ({
  product,
  ...props
}) => {
  const { bag, updateQuantity, removeItem, getPrice } = useBag();

  const quantity = bag ? bag[product._id] : 1;

  return (
    <Grid auto css={[{ alignItems: "center" }]}>
      <img
        css={[
          {
            gridColumn: "span 2",
            width: "100%",
            aspectRatio: "190/180",
            objectFit: "cover",
          },
        ]}
        src={product.image}
        alt={product.info}
      />
      <div
        css={[
          {
            gridColumn: "span 3",
            verticalAlign: "middle",
          },
        ]}
      >
        <div css={[{ display: "flex", alignItems: "center" }]}>
          <Text typography="newh4" css={[{ marginRight: 15 }]}>
            {product.title}
          </Text>
          {product.status === "low" ? (
            <Label
              css={[
                {
                  backgroundColor: "#FFF4CC",
                  height: "fit-content",
                },
              ]}
            >
              Low stock
            </Label>
          ) : product.status === "soldout" ? (
            <Label css={[{ backgroundColor: "#FFD6D6" }]}>Sold out</Label>
          ) : null}
        </div>
        <Text typography="paragraphSmall" css={[{ marginTop: 10 }]}>
          {product.description}
        </Text>
        <Text typography="newh4" css={[{ marginTop: 15 }]}>
          <Minus
            css={(theme) => [
              { marginRight: 22, userSelect: "none" },
              quantity <= 1
                ? {
                    color: theme.colors.black30,
                  }
                : {
                    cursor: "pointer",
                  },
            ]}
            onClick={() =>
              quantity > 1 && updateQuantity(product._id, quantity - 1)
            }
          />
          {bag && bag[product._id]}
          <Plus
            css={[
              {
                marginLeft: 22,
                cursor: "pointer",
                userSelect: "none",
              },
            ]}
            onClick={() => updateQuantity(product._id, quantity + 1)}
          />
        </Text>
      </div>
      <Text
        typography="newh4"
        css={[{ gridColumn: "span 2", textAlign: "end" }]}
      >
        {getPrice(product.price)}
        <Delete
          css={[{ marginLeft: 30, cursor: "pointer" }]}
          onClick={() => removeItem(product._id)}
        />
      </Text>
    </Grid>
  );
};

export default Product;
