import { FC, HTMLAttributes, useEffect, useState } from "react";
import Label from "../../../../Label";
import Text from "../../../../Text";
import ArrowButton from "../../../../Buttons/ArrowButton";
import Card from "../../../../Card";
import { mockCard } from "../../../../../mocks/card";
import Button from "../../../../Buttons/Button";
import Arrow from "../../../../Icons/Arrow";

const CollectionItem: FC<
  HTMLAttributes<HTMLElement> & { product?: GQL.Product }
> = ({ product, ...props }) => {
  const [hover, setHover] = useState(false);

  const [index, setIndex] = useState(0);

  const [previewCards, setPreviewCards] = useState<GQL.Card[]>([]);

  useEffect(() => {
    if (
      product &&
      product.deck &&
      product.deck.previewCards &&
      product.deck.previewCards !== null
    ) {
      setPreviewCards(product.deck.previewCards);
    }
  }, [product]);

  return (
    <div
      css={(theme) => [
        {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          " > *": {
            transition: theme.transitions.fast("opacity"),
          },
        },
      ]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {product && (
        <>
          <div
            css={(theme) => [
              {
                padding: 10,
                display: "flex",
                gap: 3,
              },
            ]}
            style={{ opacity: hover ? 1 : 0 }}
          >
            {product.deck &&
              product.deck.labels &&
              product.deck.labels.map((label) => (
                <Label key={label + product._id}>{label}</Label>
              ))}
          </div>

          {previewCards[index] && (
            <div
              css={(theme) => [
                {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 31,
                  position: "absolute",
                  top: 84.56,
                  left: "50%",
                  transform: "translateX(-50%)",
                },
              ]}
              style={{ opacity: hover ? 1 : 0 }}
            >
              <Button
                base={true}
                noColor={true}
                css={(theme) => [
                  {
                    rotate: "180deg",
                    width: 45,
                    borderRadius: "100%",
                    "&:hover": {
                      background: theme.colors.dark_gray,
                      color: theme.colors.white,
                    },
                  },
                ]}
                onClick={() =>
                  setIndex(index === 0 ? previewCards.length - 1 : index - 1)
                }
              >
                <Arrow />
              </Button>
              <Card
                noArtist={true}
                size="nano"
                card={{ ...mockCard, img: previewCards[index].img }}
              />
              <Button
                base={true}
                noColor={true}
                css={(theme) => [
                  {
                    width: 45,
                    borderRadius: "100%",
                    "&:hover": {
                      background: theme.colors.dark_gray,
                      color: theme.colors.white,
                    },
                  },
                ]}
                onClick={() =>
                  setIndex(index === previewCards.length - 1 ? 0 : index + 1)
                }
              >
                <Arrow />
              </Button>
            </div>
          )}

          <div
            css={(theme) => [
              {
                padding: "20px 30px",
                display: "flex",
                justifyContent: "space-between",
              },
            ]}
            style={{ opacity: hover ? 1 : 0 }}
          >
            <ArrowButton noColor={true} base={true} size="small">
              View {" " + product.title}
            </ArrowButton>
            <ArrowButton noColor={true} base={true} size="small">
              Shop
            </ArrowButton>
          </div>
        </>
      )}
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
              pointerEvents: "none",
            },
          ]}
          style={{ opacity: hover ? 0 : 1 }}
        />
      )}
    </div>
  );
};

export default CollectionItem;
