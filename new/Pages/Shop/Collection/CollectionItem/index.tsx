import { FC, HTMLAttributes, useEffect, useState } from "react";

import image2 from "../../../../../mocks/images/ShopCollection/photo-big-1.png";
import image3 from "../../../../../mocks/images/ShopCollection/photo-big-2.png";
import image1 from "../../../../../mocks/images/ShopCollection/photo-big.png";
import Label from "../../../../Label";
import NavButton from "../../../../Buttons/NavButton";
import Text from "../../../../Text";
import Button from "../../../../Buttons/Button";
import AddToBag from "../../../../Buttons/AddToBag";
import SoldOut from "../../../../Buttons/SoldOut";
import Link from "../../../../Link";
import MenuPortal from "../../../../Header/MainMenu/MenuPortal";
import Pop from "../../../ProductPage/Pop";
const images = [image1.src, image2.src, image3.src];

const CollectionItem: FC<
  HTMLAttributes<HTMLDivElement> & { palette?: "dark"; product: GQL.Product }
> = ({ palette, product, ...props }) => {
  const [hover, setHover] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  const [show, setShow] = useState(false);

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
      {...props}
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
        onClick={() => setShow(true)}
      >
        <MenuPortal show={show}>
          <Pop product={product} close={() => setShow(false)} />
        </MenuPortal>
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
                  key={label + "ShopCollection" + product._id}
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
            onClick={(e) => {
              e.stopPropagation();
              decreaseIndex();
            }}
          />
          <NavButton
            onClick={(e) => {
              e.stopPropagation();
              increaseIndex();
            }}
          />
        </div>
      </div>
      <div css={[{ margin: 30 }]}>
        <Link
          href={
            (process.env.NEXT_PUBLIC_BASELINK || "") +
            "/shop/" +
            product.short.toLowerCase().split(" ").join("")
          }
        >
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
        </Link>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          {product.deck && product.deck.slug === "crypto" ? (
            hover && palette !== undefined ? (
              <Button
                key="darkExclusive"
                size="small"
                bordered={true}
                palette={palette}
                color="white"
              >
                Exclusive
              </Button>
            ) : (
              <Button size="small" bordered={true}>
                Exclusive
              </Button>
            )
          ) : (
            <>
              {product.status === "soldout" ? (
                <SoldOut />
              ) : (
                <AddToBag productId={product._id} />
              )}
              <Text typography="linkNewTypography">${product.price.usd}</Text>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
