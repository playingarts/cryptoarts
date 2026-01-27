import { FC, HTMLAttributes, useMemo, useState } from "react";
import { useBag } from "../../../../Contexts/bag";
import { useProducts } from "../../../../../hooks/product";
import ArrowedButton from "../../../../Buttons/ArrowedButton";
import Label from "../../../../Label";
import Text from "../../../../Text";
import AddToBag from "../../../../Buttons/AddToBag";
import MenuPortal from "../../../../Header/MainMenu/MenuPortal";
import Pop from "../../../ProductPage/Pop";

// Product suggestion component
const ProductSuggestion: FC<{ product: GQL.Product; label?: string }> = ({ product, label }) => {
  const [showPop, setShowPop] = useState(false);

  return (
    <>
      <MenuPortal show={showPop}>
        <Pop product={product} close={() => setShowPop(false)} show={showPop} onViewBag={() => setShowPop(false)} />
      </MenuPortal>
      <div
        css={(theme) => ({
          flex: "0 0 calc(50% - 1.5px)",
          background: theme.colors.white50,
          borderRadius: theme.spacing(1.5),
          padding: theme.spacing(3),
          position: "relative",
          "&:hover": {
            background: theme.colors.white75,
          },
        })}
      >
        {label && (
          <Label
            css={(theme) => ({
              backgroundColor: theme.colors.mint,
              position: "absolute",
              top: 15,
              left: 15,
            })}
          >
            {label}
          </Label>
        )}
        <div
          css={{ display: "block", cursor: "pointer" }}
          onClick={() => setShowPop(true)}
        >
          <img
            src={product.image2 || product.image}
            alt={product.title}
            css={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "contain",
            }}
          />
          <Text typography="h4">{product.title}</Text>
          <Text typography="p-s" css={{ marginTop: 10 }}>
            {product.description || product.info}
          </Text>
        </div>
        <div css={(theme) => ({ marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(3), alignItems: "center" })}>
          <AddToBag productId={product._id} onViewBag={() => setShowPop(false)} status={product.status} />
          <Text typography="p-m">${product.price.usd}</Text>
          {product.fullPrice && (
            <Text typography="p-m" css={{ textDecoration: "line-through", opacity: 0.5 }}>
              ${product.fullPrice.usd}
            </Text>
          )}
        </div>
      </div>
    </>
  );
};

const Suggestions: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { bag } = useBag();
  const { products } = useProducts();

  // Check for bundle suggestion opportunity
  const bundleSuggestion = useMemo(() => {
    if (!products || !bag) return null;
    const bagIds = Object.keys(bag);

    // Check if Future Bundle is NOT in the bag
    const futureBundle = products.find(p => p.title === "Future Visionary Bundle");
    const futureBundleInBag = futureBundle && bagIds.includes(futureBundle._id);

    // Check if Complete Bundle is NOT in the bag
    const completeBundle = products.find(p => p.title === "Complete Edition Bundle");
    const completeBundleInBag = completeBundle && bagIds.includes(completeBundle._id);

    // Check if one future deck is in bag (but not the bundle)
    if (!futureBundleInBag && futureBundle) {
      const futureDeckSlugs = ["future", "future-two"];
      const futureDecksInBag = products.filter(
        p => p.deck?.slug && futureDeckSlugs.includes(p.deck.slug) && bagIds.includes(p._id)
      );
      // If exactly one future deck in bag, suggest the bundle
      if (futureDecksInBag.length === 1) {
        return { bundle: futureBundle, label: "Complete Future bundle and save 25%" };
      }
    }

    // Check if one or two edition decks are in bag (but not the bundle)
    if (!completeBundleInBag && completeBundle) {
      const editionDeckSlugs = ["one", "two", "three"];
      const editionDecksInBag = products.filter(
        p => p.deck?.slug && editionDeckSlugs.includes(p.deck.slug) && bagIds.includes(p._id)
      );
      // If 1 or 2 edition decks in bag, suggest the bundle
      if (editionDecksInBag.length >= 1 && editionDecksInBag.length < 3) {
        return { bundle: completeBundle, label: "Complete Edition bundle and save 33%" };
      }
    }

    return null;
  }, [products, bag]);

  // Get products not in the bag, excluding bundles and products covered by bundles in bag
  const relatedProducts = useMemo(() => {
    if (!products || !bag) return [];
    const bagIds = Object.keys(bag);

    // Check if Complete Edition Bundle is in the bag
    const completeBundle = products.find(p => p.title === "Complete Edition Bundle" && bagIds.includes(p._id));
    // Check if Future Visionary Bundle is in the bag
    const futureBundle = products.find(p => p.title === "Future Visionary Bundle" && bagIds.includes(p._id));

    // Deck slugs to exclude based on bundles in bag
    const excludedDeckSlugs: string[] = [];
    if (completeBundle) {
      excludedDeckSlugs.push("one", "two", "three");
    }
    if (futureBundle) {
      excludedDeckSlugs.push("future", "future-two");
    }

    return products.filter((product) => {
      // Skip if already in bag
      if (bagIds.includes(product._id)) return false;
      // Skip bundles
      if (product.type === "bundle") return false;
      // Skip sold out products
      if (product.status === "soldout") return false;
      // Skip crypto edition
      if (product.deck?.slug === "crypto") return false;
      // Skip if product's deck is covered by a bundle in bag
      if (product.deck?.slug && excludedDeckSlugs.includes(product.deck.slug)) return false;
      // Skip if this product is the suggested bundle
      if (bundleSuggestion && product._id === bundleSuggestion.bundle._id) return false;
      return true;
    });
  }, [products, bag, bundleSuggestion]);

  // Determine how many regular products to show
  const regularProductsCount = bundleSuggestion ? 1 : 2;

  // Calculate total items to display
  const displayedProducts = relatedProducts.slice(0, regularProductsCount);
  const totalItems = (bundleSuggestion ? 1 : 0) + displayedProducts.length;

  if (relatedProducts.length === 0 && !bundleSuggestion) return null;

  return (
    <div {...props}>
      <ArrowedButton css={(theme) => ({ marginBottom: theme.spacing(3) })}>You may like</ArrowedButton>
      <div css={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {bundleSuggestion && (
          <ProductSuggestion
            product={bundleSuggestion.bundle}
            label={bundleSuggestion.label}
          />
        )}
        {displayedProducts.map((product) => (
          <ProductSuggestion
            key={product._id + "suggestion"}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
