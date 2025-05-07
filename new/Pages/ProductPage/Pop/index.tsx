import { FC, HTMLAttributes, useEffect, useState } from "react";
import { convertToProductSlug } from "..";
import { useLoadCards } from "../../../../hooks/card";
import { useProducts } from "../../../../hooks/product";
import AddToBag from "../../../Buttons/AddToBag";
import ArrowButton from "../../../Buttons/ArrowButton";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import { useBag } from "../../../Contexts/bag";
import Plus from "../../../Icons/Plus";
import Label from "../../../Label";
import Link from "../../../Link";
import Text from "../../../Text";
import { CardPreview } from "../About";

const CustomMiddle: FC<{
  productState: GQL.Product;
  setProductState: (arg0: GQL.Product | undefined) => void;
}> = ({ productState, setProductState }) => {
  const { products } = useProducts();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!products) {
      return;
    }
    setCounter(
      products.findIndex((product) => product.short === productState.short)
    );
  }, [products, productState]);

  return products ? (
    <Text
      typography="paragraphSmall"
      css={[
        {
          display: "flex",
          alignItems: "center",
          paddingRight: 66,
          justifyContent: "end",
        },
      ]}
    >
      <NavButton
        onClick={() =>
          setProductState(
            counter > 0 ? products[counter - 1] : products[products.length - 1]
          )
        }
        css={[{ transform: "rotate(180deg)" }]}
      />

      <NavButton
        onClick={() =>
          setProductState(
            counter < products.length - 1 ? products[counter + 1] : products[0]
          )
        }
      />
      {/* <span css={[{ marginLeft: 30 }]}>
        Card {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + products.length.toString().padStart(2, "0")}
      </span> */}
    </Text>
  ) : null;
};

const Pop: FC<
  HTMLAttributes<HTMLElement> & {
    close: () => void;
    product: GQL.Product;
  }
> = ({ close, product, ...props }) => {
  const { loadCards } = useLoadCards();

  const [productState, setProductState] = useState<GQL.Product>();
  useEffect(() => {
    if (product) {
      setProductState(product);
    }
    if (product.deck) {
      loadCards({ variables: { deck: product.deck._id } });
    }
  }, [product]);

  const { getPrice } = useBag();

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black30,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,

          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      ]}
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
      {...props}
    >
      <div
        css={(theme) => [
          {
            width: "100%",
            maxWidth: 1130,
            padding: 30,
            paddingBottom: 90,
            backgroundColor: theme.colors.pale_gray,
            display: "flex",
            gap: 60,
            borderRadius: 15,
            margin: "0 auto",
            marginTop: 60,
            marginBottom: 60,
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          css={[
            {
              flex: 1,
              maxWidth: 600,
            },
          ]}
        >
          <div
            css={(theme) => [
              {
                width: "100%",
                background: theme.colors.white30,
                aspectRatio: "1",
                position: "relative",
                borderRadius: 20,
              },
            ]}
          >
            {productState ? (
              <>
                <img
                  src={productState.image2}
                  alt=""
                  css={[
                    { width: "100%", height: "100%", objectFit: "contain" },
                  ]}
                />
                {productState.deck && (
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
                  >
                    {productState.deck.labels &&
                      productState.deck.labels.map((label) => (
                        <Label key={label}>{label}</Label>
                      ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
          {productState &&
          productState.deck &&
          productState.deck.previewCards ? (
            <CardPreview
              previewCards={productState.deck.previewCards}
              deckId={productState.deck.slug}
            />
          ) : null}
        </div>
        <div
          css={[
            {
              width: 410,
              height: 600,
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: 30,
            },
          ]}
        >
          <div
            css={[
              {
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
              },
            ]}
          >
            {productState ? (
              <CustomMiddle
                productState={productState}
                setProductState={setProductState}
              />
            ) : null}
            <Button
              css={[
                {
                  borderRadius: "100%",
                  padding: 0,
                  width: 45,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                },
              ]}
              onClick={close}
            >
              <Plus css={[{ rotate: "45deg" }]} />
            </Button>
          </div>
          {productState ? (
            <div
              css={[
                {
                  display: "grid",
                  alignContent: "center",
                  maxWidth: 410,
                  flex: 1,
                },
              ]}
            >
              <Text typography="newh2"> {productState.title} </Text>
              <Text typography="paragraphSmall"> {productState.info} </Text>
              <Text typography="newh4"> {getPrice(productState.price)} </Text>
              <div
                css={[
                  {
                    marginTop: 30,
                    display: "flex",
                    gap: 30,
                    alignItems: "center",
                  },
                ]}
              >
                <AddToBag productId={productState._id} />

                <Link
                  href={"/new/shop/" + convertToProductSlug(productState.short)}
                  onClick={close}
                >
                  <ArrowButton noColor base size="small">
                    Details
                  </ArrowButton>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Pop;
