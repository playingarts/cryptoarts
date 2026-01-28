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
    <Grid auto css={(theme) => [{ alignItems: "center", [theme.maxMQ.xsm]: { paddingLeft: 0, paddingRight: 0, gridTemplateColumns: "1fr 1fr 1fr 1fr" } }]}>
      {showPop && (
        <MenuPortal show={showPop}>
          <Pop product={product} close={() => setShowPop(false)} show={showPop} onViewBag={() => setShowPop(false)} />
        </MenuPortal>
      )}
      {/* Image - 2 columns left (1 on mobile) */}
      <div
        css={(theme) => [
          {
            gridColumn: "span 2",
            position: "relative",
            [theme.maxMQ.xsm]: {
              gridColumn: "span 2 !important",
            },
          },
        ]}
      >
        {/* Label on image (desktop top-left, mobile adjusted) */}
        {(product.status === "low" || product.status === "soldout") && (
          <Label
            css={(theme) => [
              {
                position: "absolute",
                top: 15,
                left: 15,
                zIndex: 1,
                [theme.maxMQ.xsm]: {
                  top: 5,
                  left: 5,
                },
              },
              product.status === "low" && { backgroundColor: "#FFF4CC" },
              product.status === "soldout" && { backgroundColor: "#FFD6D6" },
            ]}
          >
            {product.status === "low" ? "Low stock" : "Sold out"}
          </Label>
        )}
        <img
          css={(theme) => [
            {
              width: "100%",
              aspectRatio: "190/180",
              objectFit: "cover",
              cursor: "pointer",
              [theme.maxMQ.xsm]: {
                width: "90%",
                margin: "0 auto",
                display: "block",
              },
            },
            product.type === "bundle" && {
              [theme.maxMQ.xsm]: {
                width: "70%",
                margin: "0 auto",
                display: "block",
              },
            },
          ]}
          src={product.image}
          alt={product.info}
          onClick={() => setShowPop(true)}
        />
      </div>
      {/* Desktop: Title + qty in middle */}
      <div
        css={(theme) => [
          {
            gridColumn: "span 3",
            verticalAlign: "middle",
            [theme.maxMQ.xsm]: {
              display: "none",
            },
          },
        ]}
      >
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
      {/* Desktop: Price + delete */}
      <div
        css={(theme) => [{ gridColumn: "span 2", textAlign: "end", display: "flex", alignItems: "center", justifyContent: "flex-end", [theme.maxMQ.xsm]: { display: "none" } }]}
      >
        <Text typography="h4">
          ${product.price.usd}
          <Delete
            css={[{ marginLeft: 30, cursor: "pointer" }]}
            onClick={() => removeItem(product._id)}
          />
        </Text>
      </div>
      {/* Mobile: Right column with stacked divs */}
      <div
        css={(theme) => [
          {
            display: "none",
            [theme.maxMQ.xsm]: {
              display: "flex",
              flexDirection: "column",
              gridColumn: "span 2 !important",
            },
          },
        ]}
      >
        {/* Title */}
        <div>
          <Text typography="h4" css={[{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "pointer" }]} onClick={() => setShowPop(true)}>
            {product.short || product.title}
          </Text>
        </div>
        {/* Price with x */}
        <div css={(theme) => [{ marginTop: theme.spacing(1), display: "flex", justifyContent: "space-between", alignItems: "center" }]}>
          <Text typography="h4">${product.price.usd}</Text>
          <Delete css={(theme) => [{ cursor: "pointer", marginRight: theme.spacing(1) }]} onClick={() => removeItem(product._id)} />
        </div>
        {/* Qty controls */}
        <div css={(theme) => [{ marginTop: theme.spacing(1) }]}>
          <Text typography="h4" css={[{ display: "flex", alignItems: "center" }]}>
            <Minus
              css={(theme) => [
                { marginRight: 15, userSelect: "none" },
                quantity <= 1 ? { color: theme.colors.black30 } : { cursor: "pointer" },
              ]}
              onClick={() => quantity > 1 && updateQuantity(product._id, quantity - 1)}
            />
            {bag && bag[product._id]}
            <Plus
              css={[{ marginLeft: 15, cursor: "pointer", userSelect: "none" }]}
              onClick={() => updateQuantity(product._id, quantity + 1)}
            />
          </Text>
        </div>
      </div>
    </Grid>
  );
};

export default Product;
