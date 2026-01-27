import { FC, HTMLAttributes, useRef, useEffect, useCallback, useMemo, useState } from "react";
import { useRatings } from "../../../../hooks/ratings";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";
import Intro from "./Intro";
import Item from "./Item";
import InstagramItem from "./InstagramItem";
import Press from "./Press";

// Review item width + gap
const ITEM_WIDTH = 520;
const ITEM_WIDTH_MOBILE = 300;
const ITEM_GAP = 20;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds between auto-scrolls
const VIRTUALIZATION_BUFFER = 3; // Render ±3 items from current position

// Instagram posts data with real URLs
const INSTAGRAM_POSTS = [
  { url: "https://www.instagram.com/p/BP5WlUwhw43/", username: "further_up" },
  { url: "https://www.instagram.com/p/CyjJrvTo4k_/", username: "_cardastrophy_" },
  { url: "https://www.instagram.com/p/CsgobM2NqxQ/", username: "_cardastrophy_" },
  { url: "https://www.instagram.com/p/CsDwfVBoJXA/", username: "toma_designstudio" },
  { url: "https://www.instagram.com/p/CWScMYEs6yc/", username: "nobrandonboard" },
  { url: "https://www.instagram.com/p/CIQoqzcDWfI/", username: "mzkvisuals" },
  { url: "https://www.instagram.com/p/CG2qqPDAP8J/", username: "martin.grohs" },
  { url: "https://www.instagram.com/p/CEuK910pOSc/", username: "rubenireland" },
  { url: "https://www.instagram.com/p/BlriozVlgWv/", username: "life_of_magician" },
  { url: "https://www.instagram.com/p/BxTg508nlNC/", username: "giffari_erwa" },
  { url: "https://www.instagram.com/p/BwXfyCcBqet/", username: "vzayycardistry" },
  { url: "https://www.instagram.com/p/Bv4Rbw7h2vf/", username: "madaboutcards" },
  { url: "https://www.instagram.com/p/BqC_fujgl6H/", username: "cardistry_repostoficial" },
  { url: "https://www.instagram.com/p/BXs2L-_DpSh/", username: "playingcardart" },
  { url: "https://www.instagram.com/p/BUvIjtwheqL/", username: "mrlemonademx" },
  { url: "https://www.instagram.com/p/BUrk8jIAkQt/", username: "dnyivn" },
  { url: "https://www.instagram.com/p/DD7SyiSvZ9C/", username: "chambertincards" },
];

// Loading skeleton for review items
const ItemSkeleton: FC = () => (
  <div
    css={(theme) => ({
      padding: theme.spacing(3),
      paddingRight: 60,
      borderRadius: theme.spacing(2),
      background: theme.colors.soft_gray,
      width: ITEM_WIDTH,
      minWidth: ITEM_WIDTH,
      maxWidth: ITEM_WIDTH,
      flexShrink: 0,
      scrollSnapAlign: "start",
      [theme.maxMQ.xsm]: {
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        paddingRight: theme.spacing(3),
      },
    })}
  >
    <div css={{ display: "flex", gap: 4 }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          css={(theme) => ({
            width: 20,
            height: 20,
            borderRadius: 4,
            background: theme.colors.pale_gray,
          })}
        />
      ))}
    </div>
    <div
      css={(theme) => ({
        marginTop: theme.spacing(3),
        height: 80,
        borderRadius: 8,
        background: theme.colors.pale_gray,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      })}
    />
    <div
      css={(theme) => ({
        marginTop: 15,
        height: 20,
        width: 120,
        borderRadius: 4,
        background: theme.colors.pale_gray,
      })}
    />
    <div
      css={(theme) => ({
        marginTop: 15,
        height: 20,
        width: 80,
        borderRadius: 4,
        background: theme.colors.pale_gray,
      })}
    />
  </div>
);

type CarouselItem =
  | { type: "rating"; data: GQL.Rating }
  | { type: "instagram"; data: { url: string; username: string }; index: number };

interface TestimonialsProps extends HTMLAttributes<HTMLElement> {
  deckSlug?: string;
}

const Testimonials: FC<TestimonialsProps> = ({ deckSlug, ...props }) => {
  const { ratings, loading } = useRatings({
    variables: deckSlug ? { deckSlug } : undefined,
  });
  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;
  const scrollRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const isScrollingRef = useRef(false);
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Build mixed array with Instagram items after every 2-4 reviews (varied pattern)
  const mixedItems = useMemo((): CarouselItem[] => {
    if (!ratings || ratings.length === 0) return [];
    const items: CarouselItem[] = [];
    let instaIndex = 0;
    // Pattern: 3, 2, 4, 3, 2, 4... (varies between 2-4 reviews per Instagram)
    const insertPattern = [3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2];
    let patternIndex = 0;
    let reviewsSinceLastInsta = 0;

    ratings.forEach((rating) => {
      items.push({ type: "rating", data: rating });
      reviewsSinceLastInsta++;

      // Insert Instagram after the pattern-specified number of reviews
      if (
        reviewsSinceLastInsta >= insertPattern[patternIndex % insertPattern.length] &&
        instaIndex < INSTAGRAM_POSTS.length
      ) {
        items.push({ type: "instagram", data: INSTAGRAM_POSTS[instaIndex], index: instaIndex });
        instaIndex++;
        patternIndex++;
        reviewsSinceLastInsta = 0;
      }
    });

    return items;
  }, [ratings]);

  // Triple the items for infinite scroll effect (clone before and after)
  const infiniteItems = useMemo(() => {
    if (mixedItems.length === 0) return [];
    return [...mixedItems, ...mixedItems, ...mixedItems];
  }, [mixedItems]);

  // Calculate single set width based on actual item dimensions for precise alignment
  const singleSetWidth = useMemo(() => {
    const itemWidth = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH;
    return mixedItems.length * (itemWidth + ITEM_GAP);
  }, [mixedItems.length, isMobile]);

  // Position in the middle set on mount
  useEffect(() => {
    if (!scrollRef.current || mixedItems.length === 0) return;
    // Use requestAnimationFrame to ensure DOM is rendered
    requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollLeft = singleSetWidth;
      // Set initial visible index to start of middle set
      const itemWidth = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH;
      setVisibleIndex(Math.round(singleSetWidth / (itemWidth + ITEM_GAP)));
    });
  }, [mixedItems, singleSetWidth, isMobile]);

  // Handle infinite scroll - jump to middle when reaching edges
  // Only check after smooth scroll completes (scrollend event or debounce)
  const handleScrollEnd = useCallback(() => {
    if (!scrollRef.current || mixedItems.length === 0 || isScrollingRef.current) return;

    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;

    // If in the first set, jump to middle set
    if (el.scrollLeft < singleSetWidth * 0.5) {
      isScrollingRef.current = true;
      // Temporarily disable scroll snap for instant jump
      el.style.scrollSnapType = "none";
      el.scrollLeft += singleSetWidth;
      // Re-enable scroll snap after the jump
      requestAnimationFrame(() => {
        el.style.scrollSnapType = "x mandatory";
        isScrollingRef.current = false;
      });
    }
    // If in the third set, jump to middle set
    else if (el.scrollLeft > maxScroll - singleSetWidth * 0.5) {
      isScrollingRef.current = true;
      // Temporarily disable scroll snap for instant jump
      el.style.scrollSnapType = "none";
      el.scrollLeft -= singleSetWidth;
      // Re-enable scroll snap after the jump
      requestAnimationFrame(() => {
        el.style.scrollSnapType = "x mandatory";
        isScrollingRef.current = false;
      });
    }
  }, [mixedItems.length, singleSetWidth]);

  // Calculate visible index from scroll position
  const updateVisibleIndex = useCallback(() => {
    if (!scrollRef.current || infiniteItems.length === 0) return;
    const el = scrollRef.current;
    const itemWidth = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH;
    const itemWithGap = itemWidth + ITEM_GAP;
    const currentIndex = Math.round(el.scrollLeft / itemWithGap);
    setVisibleIndex(currentIndex);
  }, [infiniteItems.length, isMobile]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Use scrollend for browsers that support it, debounced scroll for others
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      // Update visible index on every scroll for virtualization
      updateVisibleIndex();
      clearTimeout(scrollTimeout);
      // Wait longer for smooth scroll to complete before checking position
      scrollTimeout = setTimeout(handleScrollEnd, 300);
    };

    // scrollend is better but not supported in Safari yet
    if ("onscrollend" in window) {
      el.addEventListener("scrollend", handleScrollEnd, { passive: true });
      el.addEventListener("scroll", updateVisibleIndex, { passive: true });
    } else {
      el.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(scrollTimeout);
      if ("onscrollend" in window) {
        el.removeEventListener("scrollend", handleScrollEnd);
        el.removeEventListener("scroll", updateVisibleIndex);
      } else {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScrollEnd, updateVisibleIndex]);

  // Arrows always enabled for infinite scroll
  useEffect(() => {
    if (!leftArrowRef.current || !rightArrowRef.current) return;
    leftArrowRef.current.style.opacity = "1";
    leftArrowRef.current.style.pointerEvents = "auto";
    rightArrowRef.current.style.opacity = "1";
    rightArrowRef.current.style.pointerEvents = "auto";
  }, [mixedItems]);

  const scrollByItem = useCallback((direction: 1 | -1) => {
    const itemWidth = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH;
    scrollRef.current?.scrollBy({
      behavior: "smooth",
      left: direction * (itemWidth + ITEM_GAP),
    });
  }, [isMobile]);

  // Auto-scroll effect
  useEffect(() => {
    if (loading || mixedItems.length === 0) return;

    const interval = setInterval(() => {
      scrollByItem(1);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [loading, mixedItems.length, scrollByItem]);

  return (
    <div
      css={(theme) => [
        { background: theme.colors.pale_gray, paddingTop: theme.spacing(6), paddingBottom: theme.spacing(6), [theme.maxMQ.xsm]: { paddingTop: theme.spacing(3), paddingBottom: theme.spacing(6) } },
      ]}
      {...props}
    >
      <Intro
        leftArrowRef={leftArrowRef}
        rightArrowRef={rightArrowRef}
        onScrollLeft={() => scrollByItem(-1)}
        onScrollRight={() => scrollByItem(1)}
      />
      <div
        ref={scrollRef}
        css={(theme) => ({
          display: "flex",
          alignItems: "flex-start",
          gap: ITEM_GAP,
          height: 500,
          paddingTop: theme.spacing(6),
          paddingBottom: 0,
          paddingLeft: 95,
          paddingRight: 75,
          overflowX: "auto",
          overflowY: "hidden",
          // Scroll snap for touch/swipe
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: 20,
          WebkitOverflowScrolling: "touch",
          // Hide scrollbar
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          [theme.maxMQ.sm]: {
            paddingLeft: 20,
            paddingRight: 20,
          },
          [theme.maxMQ.xsm]: {
            height: 380,
            paddingTop: 0,
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
            scrollPaddingLeft: theme.spacing(1.5),
          },
        })}
      >
        {loading
          ? [...Array(3)].map((_, i) => <ItemSkeleton key={`skeleton-${i}`} />)
          : infiniteItems.map((item, i) => {
              const isVisible = Math.abs(i - visibleIndex) <= VIRTUALIZATION_BUFFER;
              const itemWidth = isMobile ? ITEM_WIDTH_MOBILE : ITEM_WIDTH;

              // Render placeholder for items outside visible range
              if (!isVisible) {
                return (
                  <div
                    key={item.type === "rating" ? `rating-${item.data._id}-${i}` : `instagram-${item.index}-${i}`}
                    css={{
                      width: itemWidth,
                      minWidth: itemWidth,
                      maxWidth: itemWidth,
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }}
                  />
                );
              }

              return item.type === "rating" ? (
                <Item key={`rating-${item.data._id}-${i}`} rating={item.data} currentDeckSlug={deckSlug} />
              ) : (
                <InstagramItem
                  key={`instagram-${item.index}-${i}`}
                  url={item.data.url}
                  username={item.data.username}
                />
              );
            })}
      </div>
      <Press css={(theme) => ({ paddingTop: theme.spacing(3) })} />
    </div>
  );
};

export default Testimonials;
