import { FC, HTMLAttributes, useEffect, useState } from "react";
import Grid from "../../../../components/Grid";
import { useProducts } from "../../../../hooks/product";
import image2 from "../../../../mocks/images/ShopCollection/photo-big-1.png";
import image3 from "../../../../mocks/images/ShopCollection/photo-big-2.png";
import image1 from "../../../../mocks/images/ShopCollection/photo-big.png";
import ArrowButton from "../../../Buttons/ArrowButton";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import ButtonTemplate from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import Plus from "../../../Icons/Plus";
import Rating from "../../../Icons/Rating";
import Label from "../../../Label";
import Text from "../../../Text";
import AddToBag from "../../../Buttons/AddToBag";

const images = [image1.src, image2.src, image3.src];

const CollectionItem: FC<{ palette?: "dark"; product: GQL.Product }> = ({
  palette,
  product,
}) => {
  const [hover, setHover] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  const [index, setIndex] = useState<number>();

  const increaseIndex = () =>
    index !== undefined
      ? index + 1 >= images.length
        ? setIndex(0)
        : setIndex(index + 1)
      : setIndex(0);

  const decreaseIndex = () =>
    index !== undefined
      ? index - 1 < 0
        ? setIndex(2)
        : setIndex(index - 1)
      : setIndex(images.length - 1);

  useEffect(() => {
    if (!imageHover) {
      setIndex(undefined);
    }
  }, [imageHover]);

  return (
    <div
      css={(theme) => [
        palette === "dark" && {
          "&:hover": {
            backgroundColor: theme.colors.black,
          },
        },
      ]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
        css={[
          {
            position: "relative",
            "&:hover": { cursor: "pointer" },
          },
        ]}
      >
        {index === undefined && product.deck && (
          <div
            css={[
              {
                position: "absolute",
                top: 15,
                left: 15,
                display: "flex",
                gap: 3,
              },
            ]}
            style={{ opacity: hover ? 1 : 0 }}
          >
            {product.status === "low" ? (
              <Label css={[{ backgroundColor: "#FFF4CC" }]}>Low stock</Label>
            ) : product.status === "soldout" ? (
              <Label css={[{ backgroundColor: "#FFD6D6" }]}>Sold out</Label>
            ) : null}
            {product.deck.labels &&
              product.deck.labels.map((label) => (
                <Label
                  css={[
                    palette === "dark" && {
                      background: "#474747",
                      color: "white",
                    },
                  ]}
                >
                  {label}
                </Label>
              ))}
          </div>
        )}
        <img
          src={index !== undefined ? images[index] : product.image2}
          alt="deck image"
          css={[
            {
              objectFit: "contain",
              width: "100%",
              aspectRatio: "1/1",
            },
          ]}
        />
        <div
          css={[
            {
              position: "absolute",
              bottom: 30,
              left: 30,
              ">*": {
                backgroundColor: "white",
              },
            },
          ]}
          style={{ opacity: imageHover ? 1 : 0 }}
        >
          <NavButton
            css={[
              {
                rotate: "180deg",
                marginRight: 5,
              },
            ]}
            onClick={decreaseIndex}
          />
          <NavButton onClick={increaseIndex} />
        </div>
      </div>
      <div css={[{ margin: 30 }]}>
        <Text typography="newh4" palette={hover ? palette : undefined}>
          {product.title}
        </Text>
        <Text
          typography="paragraphSmall"
          css={[{ marginTop: 10 }]}
          palette={hover ? palette : undefined}
        >
          The bold beginning, reimagined with AR.
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          {product.deck && product.deck.slug === "crypto" ? (
            hover && palette !== undefined ? (
              <ButtonTemplate
                key="darkExclusive"
                size="small"
                bordered={true}
                palette={palette}
                color="white"
              >
                Exclusive
              </ButtonTemplate>
            ) : (
              <ButtonTemplate size="small" bordered={true}>
                Exclusive
              </ButtonTemplate>
            )
          ) : (
            <>
              <AddToBag productId={product._id} />
              <Text typography="linkNewTypography">${product.price.usd}</Text>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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
              //   flex: "1 0 30%",
              //   height: 450,
              background: theme.colors.soft_gray,
              borderRadius: 16,
              "&:hover": {
                background: theme.colors.white75,
              },
            },
          },
        ]}
      >
        {
          //   const arr = [];
          //   const deckProducts =
          products &&
            products.map(
              (product, index) =>
                product.type === "deck" && (
                  <>
                    {index === 2 && (
                      <div
                        css={[
                          { display: "grid", alignContent: "space-between" },
                        ]}
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
                  </>
                )
            )
          // <div css={[{ padding: 30 }]}>
          //   <Text typography="paragraphBig">
          //     Eight editions.
          //     <br />
          //     Endless inspiration.
          //   </Text>
          //   <Text typography="linkNewTypography">Discover the journey</Text>
          // </div>
        }
      </div>
    </Grid>
  );
};

export default Collection;
