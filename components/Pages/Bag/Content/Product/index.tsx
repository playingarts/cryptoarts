import { FC, FormEvent, HTMLAttributes, useState } from "react";
import Grid from "../../../../Grid";
import Text from "../../../../Text";
import Label from "../../../../Label";
import Minus from "../../../../Icons/Minus";
import Delete from "../../../../Icons/Delete";
import { useBag } from "../../../../Contexts/bag";
import Plus from "../../../../Icons/Plus";
import MenuPortal from "../../../../Header/MainMenu/MenuPortal";
import Pop from "../../../ProductPage/Pop";

const Product: FC<HTMLAttributes<HTMLElement> & { product: GQL.Product }> = ({
  product,
  ...props
}) => {
  const { bag, updateQuantity, removeItem, getPrice } = useBag();
  const [showPop, setShowPop] = useState(false);

  const quantity = bag ? bag[product._id] : 1;

  return (
    <Grid auto css={[{ alignItems: "center" }]}>
      <MenuPortal show={showPop}>
        <Pop product={product} close={() => setShowPop(false)} show={showPop} onViewBag={() => setShowPop(false)} />
      </MenuPortal>
      <img
        css={[
          {
            gridColumn: "span 2",
            width: "100%",
            aspectRatio: "190/180",
            objectFit: "cover",
            cursor: "pointer",
          },
        ]}
        src={product.image}
        alt={product.info}
        onClick={() => setShowPop(true)}
      />
      <div
        css={[
          {
            gridColumn: "span 3",
            verticalAlign: "middle",
          },
        ]}
      >
        {product.status === "low" ? (
          <Label
            css={[
              {
                backgroundColor: "#FFF4CC",
                height: "fit-content",
                marginBottom: 10,
                width: "fit-content",
              },
            ]}
          >
            Low stock
          </Label>
        ) : product.status === "soldout" ? (
          <Label css={[{ backgroundColor: "#FFD6D6", marginBottom: 10, width: "fit-content" }]}>Sold out</Label>
        ) : null}
        <Text typography="h4" css={[{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "pointer" }]} onClick={() => setShowPop(true)}>
          {product.title}
        </Text>
                <Text typography="h4" css={[{ marginTop: 15 }]}>
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
        typography="h4"
        css={[{ gridColumn: "span 2", textAlign: "end" }]}
      >
        ${product.price.usd}
        <Delete
          css={[{ marginLeft: 30, cursor: "pointer" }]}
          onClick={() => removeItem(product._id)}
        />
      </Text>
    </Grid>
  );
};

export default Product;
