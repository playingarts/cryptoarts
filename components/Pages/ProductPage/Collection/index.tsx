import { FC, HTMLAttributes, useRef, useState, useEffect, useCallback, useMemo } from "react";
import Intro from "../../../Intro";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../Grid";
import CollectionItem from "../../Shop/Collection/CollectionItem";
import Link from "../../../Link";
import { useRouter } from "next/router";

const ITEM_WIDTH = 428;
const ITEM_GAP = 3;
const AUTO_SCROLL_INTERVAL = 6000;

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();
  const { query: { pId } } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [centerIndex, setCenterIndex] = useState<number>(-1);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter out bundles and current deck
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      // Exclude bundles
      if (product.type === "bundle") return false;
      // Exclude current product
      const productSlug = product.short.toLowerCase().split(" ").join("");
      if (productSlug === pId) return false;
      return true;
    });
  }, [products, pId]);

  // Duplicate products for infinite scroll effect
  const infiniteProducts = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    // Triple the products for seamless looping
    return [...filteredProducts, ...filteredProducts, ...filteredProducts];
  }, [filteredProducts]);

  // Calculate center index based on scroll position
  // Returns the normalized index within the original product set
  const updateCenterIndex = useCallback(() => {
    if (!ref.current || infiniteProducts.length === 0 || filteredProducts.length === 0) return;
    const container = ref.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const itemFullWidth = ITEM_WIDTH + ITEM_GAP;
    const rawIndex = Math.round(containerCenter / itemFullWidth - 0.5);
    // Normalize to the product index (0 to filteredProducts.length - 1)
    const normalizedIndex = ((rawIndex % filteredProducts.length) + filteredProducts.length) % filteredProducts.length;
    setCenterIndex(normalizedIndex);
  }, [infiniteProducts.length, filteredProducts.length]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (ref.current && filteredProducts.length > 0) {
      const middleStart = filteredProducts.length * (ITEM_WIDTH + ITEM_GAP);
      ref.current.scrollLeft = middleStart;
      // Calculate initial center index after scroll position is set
      requestAnimationFrame(() => updateCenterIndex());
    }
  }, [filteredProducts, updateCenterIndex]);

  // Handle infinite scroll reset
  const handleScroll = useCallback(() => {
    if (!ref.current || filteredProducts.length === 0) return;
    const scrollLeft = ref.current.scrollLeft;
    const singleSetWidth = filteredProducts.length * (ITEM_WIDTH + ITEM_GAP);

    // Update center index
    updateCenterIndex();

    // If scrolled past the end of middle set, jump back to middle
    if (scrollLeft >= singleSetWidth * 2) {
      ref.current.scrollLeft = scrollLeft - singleSetWidth;
    }
    // If scrolled before the start of middle set, jump forward to middle
    else if (scrollLeft < singleSetWidth * 0.1) {
      ref.current.scrollLeft = scrollLeft + singleSetWidth;
    }
  }, [filteredProducts, updateCenterIndex]);

  const scrollByOne = useCallback((direction: 1 | -1) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      behavior: "smooth",
      left: direction * (ITEM_WIDTH + ITEM_GAP),
    });
  }, []);

  const navigate = useCallback((direction: 1 | -1) => {
    scrollByOne(direction);
    // Pause auto-scroll after manual navigation
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 15000);
  }, [scrollByOne]);

  // Auto-scroll
  useEffect(() => {
    if (filteredProducts.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      scrollByOne(1);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [filteredProducts, isPaused, scrollByOne]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };

  return (
    <Grid
      id="related"
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingBottom: 60,
        },
      ]}
    >
      <Intro
        css={[
          {
            gridColumn: "1/-1",
          },
        ]}
        arrowedText="Complete your collection"
        paragraphText="Loved this deck? Continue the story
with these collector's favourites."
        titleAsText
        beforeLinkNew={<Link href="/shop"><Button bordered css={{ fontSize: 20 }}>View all products</Button></Link>}
        bottom={
          <div css={[{ display: "flex", gap: 5, marginTop: 120 }]}>
            <NavButton
              css={[{ background: "white", rotate: "180deg" }]}
              onClick={() => navigate(-1)}
            />
            <NavButton
              css={[{ background: "white" }]}
              onClick={() => navigate(1)}
            />
          </div>
        }
      />
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            marginTop: 30,
            background: theme.colors.white50,
            borderRadius: 20,
            overflow: "hidden",
          },
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          css={[
            {
              overflow: "scroll",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            },
          ]}
          ref={ref}
          onScroll={handleScroll}
        >
          <div
            css={[
              {
                display: "inline-flex",
                width: "fit-content",
                gap: ITEM_GAP,
              },
            ]}
          >
            {infiniteProducts.map((product, index) => {
                // Normalize index to match centerIndex (which is normalized to filteredProducts.length)
                const normalizedIndex = index % filteredProducts.length;
                const isCenter = normalizedIndex === centerIndex;
                return (
                  <CollectionItem
                    key={product._id + "collection" + index}
                    css={(theme) => [
                      {
                        display: "inline-block",
                        background: isCenter ? theme.colors.white75 : "transparent",
                        width: ITEM_WIDTH,
                        scrollSnapAlign: "start",
                        transition: "background 0.3s ease",
                        "&:hover": {
                          background: theme.colors.white75,
                        },
                      },
                    ]}
                    product={product}
                    useAltImage={isCenter}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default Collection;
