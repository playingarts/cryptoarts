import { FC, HTMLAttributes, useRef, useEffect, useCallback, useMemo, useState } from "react";
import Intro from "../../../Intro";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../Grid";
import CollectionItem from "../../Shop/Collection/CollectionItem";
import Link from "../../../Link";
import { useRouter } from "next/router";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";

const ITEM_WIDTH_DESKTOP = 428;
const ITEM_GAP_DESKTOP = 3;
const ITEM_GAP_MOBILE = 10;
const MOBILE_MARGIN = 40; // spacing(2) * 2 = 40px
const AUTO_SCROLL_INTERVAL = 6000;
const SKELETON_COUNT = 4;

/** Skeleton item for product carousel loading state */
const ProductSkeleton: FC = () => (
  <div
    css={(theme) => ({
      width: ITEM_WIDTH_DESKTOP,
      flexShrink: 0,
      padding: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1.5),
    })}
  >
    {/* Product image skeleton */}
    <div
      css={{
        width: "100%",
        height: 350,
        borderRadius: 10,
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      }}
    />
    {/* Title skeleton */}
    <div
      css={{
        height: 28,
        width: "70%",
        borderRadius: 4,
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
    {/* Price skeleton */}
    <div
      css={{
        height: 22,
        width: "30%",
        borderRadius: 4,
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
    {/* Button skeleton */}
    <div
      css={{
        height: 45,
        width: 120,
        borderRadius: 5,
        marginTop: "auto",
        background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
      }}
    />
  </div>
);

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();
  const { query: { pId } } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [centerIndex, setCenterIndex] = useState<number>(-1);
  const { width } = useSize();
  const isMobile = width > 0 && width < breakpoints.xsm;

  // Calculate item width and gap based on screen size
  const itemWidth = isMobile ? Math.max(width - MOBILE_MARGIN, 100) : ITEM_WIDTH_DESKTOP;
  const itemGap = isMobile ? ITEM_GAP_MOBILE : ITEM_GAP_DESKTOP;

  // Filter out bundles and current deck
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      // Exclude bundles
      if (product.type === "bundle") return false;
      // Exclude current product
      const productSlug = product.slug || product.short.toLowerCase().split(" ").join("");
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
    const itemFullWidth = itemWidth + itemGap;
    const rawIndex = Math.round(containerCenter / itemFullWidth - 0.5);
    // Normalize to the product index (0 to filteredProducts.length - 1)
    const normalizedIndex = ((rawIndex % filteredProducts.length) + filteredProducts.length) % filteredProducts.length;
    setCenterIndex(normalizedIndex);
  }, [infiniteProducts.length, filteredProducts.length, itemWidth, itemGap]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    if (ref.current && filteredProducts.length > 0) {
      const middleStart = filteredProducts.length * (itemWidth + itemGap);
      ref.current.scrollLeft = middleStart;
      // Calculate initial center index after scroll position is set
      requestAnimationFrame(() => updateCenterIndex());
    }
  }, [filteredProducts, updateCenterIndex, itemWidth, itemGap]);

  // Handle infinite scroll reset
  const handleScroll = useCallback(() => {
    if (!ref.current || filteredProducts.length === 0) return;
    const scrollLeft = ref.current.scrollLeft;
    const singleSetWidth = filteredProducts.length * (itemWidth + itemGap);

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
  }, [filteredProducts, updateCenterIndex, itemWidth, itemGap]);

  const scrollByOne = useCallback((direction: 1 | -1) => {
    if (!ref.current) return;
    // Get actual scroll distance from DOM by measuring item positions
    const items = ref.current.querySelectorAll('[data-carousel-item]');
    if (items.length >= 2) {
      const firstItem = items[0] as HTMLElement;
      const secondItem = items[1] as HTMLElement;
      const scrollDistance = secondItem.offsetLeft - firstItem.offsetLeft;
      ref.current.scrollBy({
        behavior: "smooth",
        left: direction * scrollDistance,
      });
    } else {
      ref.current.scrollBy({
        behavior: "smooth",
        left: direction * (itemWidth + itemGap),
      });
    }
  }, [itemWidth, itemGap]);

  // Reset auto-scroll timer
  const resetAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (filteredProducts.length > 0) {
      intervalRef.current = setInterval(() => {
        scrollByOne(1);
      }, AUTO_SCROLL_INTERVAL);
    }
  }, [filteredProducts.length, scrollByOne]);

  // Auto-scroll
  useEffect(() => {
    if (filteredProducts.length === 0) return;
    intervalRef.current = setInterval(() => {
      scrollByOne(1);
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [filteredProducts, scrollByOne]);

  return (
    <Grid
      id="related"
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            paddingLeft: 0,
            paddingRight: 0,
          },
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
        beforeLinkNew={<Link href="/shop"><Button bordered size="medium">View all products</Button></Link>}
        bottom={
          <div css={(theme) => [{ display: "flex", gap: 5, marginTop: theme.spacing(12), [theme.maxMQ.xsm]: { marginTop: theme.spacing(3) } }]}>
            <NavButton
              css={[{ background: "white", rotate: "180deg" }]}
              onClick={() => { scrollByOne(-1); resetAutoScroll(); }}
            />
            <NavButton
              css={[{ background: "white" }]}
              onClick={() => { scrollByOne(1); resetAutoScroll(); }}
            />
          </div>
        }
      />
      <div
        css={(theme) => [
          {
            gridColumn: "1/-1",
            marginTop: theme.spacing(3),
            [theme.maxMQ.xsm]: {
              marginTop: 0,
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2),
            },
          },
        ]}
      >
        <div
          css={(theme) => [
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
            css={(theme) => [
              {
                display: "inline-flex",
                width: "fit-content",
                gap: ITEM_GAP_DESKTOP,
                [theme.maxMQ.xsm]: {
                  gap: ITEM_GAP_MOBILE,
                },
              },
            ]}
          >
            {infiniteProducts.length === 0
              ? // Show skeleton while products are loading
                Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <ProductSkeleton key={`skeleton-${i}`} />
                ))
              : infiniteProducts.map((product, index) => {
                  // Normalize index to match centerIndex (which is normalized to filteredProducts.length)
                  const normalizedIndex = index % filteredProducts.length;
                  const isCenter = normalizedIndex === centerIndex;
                  return (
                    <CollectionItem
                      key={product._id + "collection" + index}
                      data-carousel-item
                      css={(theme) => [
                        {
                          display: "inline-block",
                          background: theme.colors.soft_gray,
                          borderRadius: 16,
                          overflow: "hidden",
                          width: ITEM_WIDTH_DESKTOP,
                          scrollSnapAlign: "start",
                          [theme.maxMQ.xsm]: {
                            width: `calc(100vw - ${theme.spacing(4)}px)`,
                          },
                        },
                      ]}
                      product={product}
                      useAltImage={isCenter}
                      singleImage
                      fullWidthMobile
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
