import { FC, HTMLAttributes, useEffect, useState } from "react";
import { convertToProductSlug } from "..";
import { useProducts } from "../../../../hooks/product";
import AddToBag from "../../../Buttons/AddToBag";
import ArrowButton from "../../../Buttons/ArrowButton";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import Plus from "../../../Icons/Plus";
import Label from "../../../Label";
import Link from "../../../Link";
import Text from "../../../Text";
import { useFlyingFav } from "../../../Contexts/flyingFav";

const CustomMiddle: FC<{
  productState: GQL.Product;
  setProductState: (arg0: GQL.Product | undefined) => void;
}> = ({ productState, setProductState }) => {
  const { products } = useProducts();
  const [counter, setCounter] = useState(0);

  // Filter out bundles from navigation - only show deck products
  const deckProducts = products?.filter((p) => p.type === "deck") ?? [];

  useEffect(() => {
    if (!deckProducts.length) {
      return;
    }
    setCounter(
      deckProducts.findIndex((product) => product.short === productState.short)
    );
  }, [deckProducts, productState]);

  return deckProducts.length ? (
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
            counter > 0 ? deckProducts[counter - 1] : deckProducts[deckProducts.length - 1]
          )
        }
        css={[{ transform: "rotate(180deg)" }]}
      />

      <NavButton
        onClick={() =>
          setProductState(
            counter < deckProducts.length - 1 ? deckProducts[counter + 1] : deckProducts[0]
          )
        }
      />
    </Text>
  ) : null;
};

const Pop: FC<
  HTMLAttributes<HTMLElement> & {
    close: () => void;
    product: GQL.Product;
    show?: boolean;
    onViewBag?: () => void;
  }
> = ({ close, product, show = true, onViewBag, ...props }) => {
  const { setPopupOpen } = useFlyingFav();

  // Lock body scroll and notify floating button when popup is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      setPopupOpen(true);
    } else {
      document.body.style.overflow = "";
      setPopupOpen(false);
    }
    return () => {
      setPopupOpen(false);
    };
  }, [show, setPopupOpen]);

  const [productState, setProductState] = useState<GQL.Product>();
  useEffect(() => {
    if (product) {
      setProductState(product);
    }
  }, [product]);

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
                  alt={`${productState.title} product image`}
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
              aria-label="Close popup"
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
              <Text typography="newh2" css={{ whiteSpace: "pre-line" }}>{productState.title.replace("Future Chapter", "Future\nChapter")}</Text>
              <Text typography="paragraphSmall" css={{ marginTop: 15 }}>{productState.description || productState.info}</Text>
              <Text typography="newh4" css={{ marginTop: 15 }}>${productState.price.usd}</Text>
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
                <AddToBag productId={productState._id} onViewBag={onViewBag} />

                <Link
                  href={
                    (process.env.NEXT_PUBLIC_BASELINK || "") +
                    "/shop/" +
                    convertToProductSlug(productState.short)
                  }
                  onClick={() => {
                    document.body.style.overflow = "";
                    close();
                  }}
                  css={{ display: "flex", alignItems: "center" }}
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
