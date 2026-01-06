import { FC, HTMLAttributes, useEffect, useState } from "react";
import CollectionItem from "../../../Shop/Collection/CollectionItem";
import { useBag } from "../../../../Contexts/bag";
import { useProducts } from "../../../../../hooks/product";
import Label from "../../../../Label";
import Link from "../../../../Link";
import Text from "../../../../Text";
import AddToBag from "../../../../Buttons/AddToBag";
import Button from "../../../../Buttons/Button";

const Bundle: FC<{ product: GQL.Product }> = ({ product }) => {
  return (
    <div
      css={(theme) => [
        {
          borderRadius: 15,
          backgroundColor: theme.colors.white50,
          height: 515,
          width: 410,
          padding: 30,
          boxSizing: "border-box",
          position: "relative",
        },
      ]}
    >
      <div css={[{ position: "absolute", left: 15, top: 15 }]}>
        {product.labels && product.labels[0] ? (
          <Label
            key={product.labels[0] + product._id}
            css={(theme) => [
              {
                backgroundColor: theme.colors.mint,
                display: "inline-block",
              },
            ]}
          >
            {"Complete " + product.title + " and " + product.labels[0]}
          </Label>
        ) : null}
      </div>
      <Link
        href="/"
        css={[
          {
            height: 200,
            width: 200,
            display: "block",
            paddingTop: 60,
            paddingBottom: 41,
            boxSizing: "content-box",
          },
        ]}
      >
        <img
          src={product.image2}
          alt="deck image"
          css={[
            {
              objectFit: "cover",
              width: "100%",
              height: "100%",
              // padding: "0 50px",
              aspectRatio: "1/1",
            },
          ]}
        />
      </Link>
      <div css={[{}]}>
        <Text typography="newh4">{product.title}</Text>
        <Text typography="paragraphSmall" css={[{ marginTop: 10 }]}>
          The bold beginning, reimagined with AR.
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          <AddToBag productId={product._id} />
          <Button size="small" noColor base>
            ${product.price.usd}
          </Button>
          {product.fullPrice && (
            <Button
              size="small"
              noColor
              base
              css={[{ textDecoration: "line-through" }]}
            >
              ${product.fullPrice.usd.toFixed(2)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Suggestions: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { bag, updateQuantity, removeItem, getPrice } = useBag();

  const { products } = useProducts();

  const { products: bagProducts } = useProducts(
    bag
      ? {
          variables: {
            ids: Object.keys(bag),
          },
        }
      : {}
  );

  const [suggestions, setSuggestions] = useState<(GQL.Product | undefined)[]>();

  useEffect(() => {
    setSuggestions(
      products &&
        bagProducts &&
        bag &&
        products.filter((bundle) => {
          const idsinbag = Object.keys(bag);
          const decks = bundle.decks;

          if (!decks) {
            return false;
          }

          const idsThatFitBundle = idsinbag.filter(
            (id) => decks.findIndex((deck) => deck._id === id) !== -1
          );

          if (idsinbag.findIndex((id) => id === bundle._id) !== -1) {
            return false;
          }
          if (
            idsThatFitBundle.length > 0 &&
            idsThatFitBundle.length < decks.length
          ) {
            return true;
          }
          return false;
        })
    );
  }, [bagProducts, products]);

  return (
    <div css={[{ display: "flex", gap: 30 }]} {...props}>
      {products && (
        <Bundle
          product={
            products.find((product) =>
              suggestions && suggestions[0]
                ? product._id === suggestions[0]._id
                : product.type === "bundle"
            ) as unknown as GQL.Product
          }
        />
      )}
      <div
        css={(theme) => [
          {
            borderRadius: 15,
            backgroundColor: theme.colors.white50,
            height: 515,
            width: 410,
          },
        ]}
      ></div>
    </div>
  );
};

export default Suggestions;
