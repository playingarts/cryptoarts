import { FC, HTMLAttributes, useState } from "react";

const CollectionItem: FC<
  HTMLAttributes<HTMLElement> & { product?: GQL.Product }
> = ({ product, ...props }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      css={[{ position: "relative" }]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {product && typeof product.deck === "object" && (
        <img
          src={product.image}
          alt="deck image"
          css={(theme) => [
            {
              position: "absolute",
              left: 0,
              top: 0,
              objectFit: "contain",
              height: "100%",
              width: "100%",
              transition: theme.transitions.fast("opacity"),
            },
          ]}
          style={{ opacity: hover ? 0 : 1 }}
        />
      )}
    </div>
  );
};

export default CollectionItem;
