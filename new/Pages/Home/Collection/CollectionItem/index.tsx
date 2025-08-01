import { FC, HTMLAttributes, useEffect, useState } from "react";
import ArrowButton from "../../../../Buttons/ArrowButton";
import NavButton from "../../../../Buttons/NavButton";
import Card from "../../../../Card";
import Label from "../../../../Label";
import MenuPortal from "../../../../Header/MainMenu/MenuPortal";
import Pop from "../../../CardPage/Pop";

const CollectionItem: FC<
  HTMLAttributes<HTMLElement> & {
    product?: GQL.Product;
    paletteOnHover?: "light" | "dark";
  }
> = ({ product, paletteOnHover = "light", ...props }) => {
  const [hover, setHover] = useState(false);

  const [index, setIndex] = useState(0);

  const [previewCards, setPreviewCards] = useState<GQL.Card[]>([]);

  const [show, setShow] = useState(false);

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
          transition: theme.transitions.fast("background"),
          " > *": {
            transition: theme.transitions.fast("opacity"),
          },
          [theme.maxMQ.sm]: {
            flexBasis: "100%",
          },
        },
        hover &&
          paletteOnHover === "dark" && {
            background: theme.colors.black,
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
                <Label
                  css={(theme) => [
                    paletteOnHover === "dark" && {
                      background: theme.colors.white_gray,
                      color: "white",
                    },
                  ]}
                  key={label + product._id}
                >
                  {label}
                </Label>
              ))}
          </div>

          {previewCards[index] && (
            <div
              css={[
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
              <NavButton
                palette={hover && paletteOnHover === "dark" ? "dark" : "light"}
                css={[
                  {
                    rotate: "180deg",
                  },
                ]}
                onClick={() =>
                  setIndex(index === 0 ? previewCards.length - 1 : index - 1)
                }
              />
              <Card
                noArtist={true}
                size="nano"
                card={previewCards[index]}
                onClick={() => setShow(true)}
                palette={hover && paletteOnHover === "dark" ? "dark" : "light"}
              />
              {product.deck && (
                <MenuPortal show={show}>
                  <Pop
                    close={() => setShow(false)}
                    cardSlug={previewCards[index].artist.slug}
                    deckId={product.deck.slug}
                  />
                </MenuPortal>
              )}
              <NavButton
                palette={hover && paletteOnHover === "dark" ? "dark" : "light"}
                onClick={() =>
                  setIndex(index === previewCards.length - 1 ? 0 : index + 1)
                }
              />
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
            <ArrowButton
              href={
                (process.env.NEXT_PUBLIC_BASELINK || "") +
                "/" +
                product.deck?.slug
              }
              css={(theme) => [
                hover &&
                  paletteOnHover === "dark" && {
                    color: theme.colors.white75,
                  },
              ]}
              noColor={true}
              base={true}
              size="small"
            >
              View {" " + product.title}
            </ArrowButton>
            <ArrowButton
              href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/shop"}
              noColor={true}
              base={true}
              size="small"
              css={(theme) => [
                hover &&
                  paletteOnHover === "dark" && {
                    color: theme.colors.white75,
                  },
              ]}
            >
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
