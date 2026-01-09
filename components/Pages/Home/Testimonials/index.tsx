import { FC, HTMLAttributes, useRef, useEffect, useCallback, useMemo, useState } from "react";
import { StaticImageData } from "next/image";
import { useRatings } from "../../../../hooks/ratings";
import testimonialsImage from "../../../../mocks/images/gallery-thumbnail.png";
import Intro from "./Intro";
import Item from "./Item";
import InstagramItem from "./InstagramItem";
import Press from "./Press";

// Review item width + gap
const ITEM_WIDTH = 520;
const ITEM_GAP = 20;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds between auto-scrolls
const AUTO_SCROLL_PAUSE = 3000; // 3 seconds pause after user interaction

// Loading skeleton for review items
const ItemSkeleton: FC = () => (
  <div
    css={(theme) => ({
      padding: 30,
      paddingRight: 60,
      borderRadius: 20,
      background: theme.colors.soft_gray,
      width: ITEM_WIDTH,
      minWidth: ITEM_WIDTH,
      maxWidth: ITEM_WIDTH,
      flexShrink: 0,
      scrollSnapAlign: "start",
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
        marginTop: 30,
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

// Instagram posts data - can be moved to API/database later
const INSTAGRAM_POSTS = [
  { image: testimonialsImage, username: "playingcardart" },
  { image: testimonialsImage, username: "playingcardart" },
  { image: testimonialsImage, username: "playingcardart" },
];

type CarouselItem =
  | { type: "rating"; data: GQL.Rating }
  | { type: "instagram"; data: { image: string | StaticImageData; username: string }; index: number };

const Testimonials: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { ratings, loading } = useRatings();
  const scrollRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const isScrollingRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build mixed array with Instagram items after every 4 reviews
  const mixedItems = useMemo((): CarouselItem[] => {
    if (!ratings || ratings.length === 0) return [];
    const items: CarouselItem[] = [];
    let instaIndex = 0;

    ratings.forEach((rating, i) => {
      items.push({ type: "rating", data: rating });
      // After every 4th rating, insert an Instagram item
      if ((i + 1) % 4 === 0 && instaIndex < INSTAGRAM_POSTS.length) {
        items.push({ type: "instagram", data: INSTAGRAM_POSTS[instaIndex], index: instaIndex });
        instaIndex++;
      }
    });

    return items;
  }, [ratings]);

  // Triple the items for infinite scroll effect (clone before and after)
  const infiniteItems = useMemo(() => {
    if (mixedItems.length === 0) return [];
    return [...mixedItems, ...mixedItems, ...mixedItems];
  }, [mixedItems]);

  // Position in the middle set on mount
  useEffect(() => {
    if (!scrollRef.current || mixedItems.length === 0) return;
    const itemFullWidth = ITEM_WIDTH + ITEM_GAP;
    const middleSetStart = mixedItems.length * itemFullWidth;
    scrollRef.current.scrollLeft = middleSetStart;
  }, [mixedItems]);

  // Handle infinite scroll - jump to middle when reaching edges
  // Only check after smooth scroll completes (scrollend event or debounce)
  const handleScrollEnd = useCallback(() => {
    if (!scrollRef.current || mixedItems.length === 0 || isScrollingRef.current) return;

    const el = scrollRef.current;
    const itemFullWidth = ITEM_WIDTH + ITEM_GAP;
    const singleSetWidth = mixedItems.length * itemFullWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;

    // If in the first set, jump to middle set
    if (el.scrollLeft < singleSetWidth * 0.8) {
      isScrollingRef.current = true;
      el.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 50);
    }
    // If in the third set, jump to middle set
    else if (el.scrollLeft > maxScroll - singleSetWidth * 0.8) {
      isScrollingRef.current = true;
      el.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 50);
    }
  }, [mixedItems]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Use scrollend for browsers that support it, debounced scroll for others
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };

    // scrollend is better but not supported in Safari yet
    if ("onscrollend" in window) {
      el.addEventListener("scrollend", handleScrollEnd, { passive: true });
    } else {
      el.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(scrollTimeout);
      if ("onscrollend" in window) {
        el.removeEventListener("scrollend", handleScrollEnd);
      } else {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScrollEnd]);

  // Arrows always enabled for infinite scroll
  useEffect(() => {
    if (!leftArrowRef.current || !rightArrowRef.current) return;
    leftArrowRef.current.style.opacity = "1";
    leftArrowRef.current.style.pointerEvents = "auto";
    rightArrowRef.current.style.opacity = "1";
    rightArrowRef.current.style.pointerEvents = "auto";
  }, [mixedItems]);

  const scrollByItem = useCallback((direction: 1 | -1) => {
    scrollRef.current?.scrollBy({
      behavior: "smooth",
      left: direction * (ITEM_WIDTH + ITEM_GAP),
    });
  }, []);

  // Pause auto-scroll temporarily after user interaction
  const pauseAutoScroll = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, AUTO_SCROLL_PAUSE);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (loading || mixedItems.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      scrollByItem(1);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [loading, mixedItems.length, isPaused, scrollByItem]);

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Handle hover pause
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Handle arrow click with pause
  const handleArrowClick = useCallback((direction: 1 | -1) => {
    pauseAutoScroll();
    scrollByItem(direction);
  }, [pauseAutoScroll, scrollByItem]);

  return (
    <div
      css={(theme) => [
        { background: theme.colors.pale_gray, paddingBottom: 60 },
      ]}
      {...props}
    >
      <Intro
        leftArrowRef={leftArrowRef}
        rightArrowRef={rightArrowRef}
        onScrollLeft={() => handleArrowClick(-1)}
        onScrollRight={() => handleArrowClick(1)}
      />
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        css={(theme) => ({
          display: "flex",
          alignItems: "flex-start",
          gap: ITEM_GAP,
          paddingTop: 60,
          paddingBottom: 60,
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
        })}
      >
        {loading
          ? [...Array(3)].map((_, i) => <ItemSkeleton key={`skeleton-${i}`} />)
          : infiniteItems.map((item, i) =>
              item.type === "rating" ? (
                <Item key={`rating-${item.data._id}-${i}`} rating={item.data} />
              ) : (
                <InstagramItem
                  key={`instagram-${item.index}-${i}`}
                  image={item.data.image}
                  username={item.data.username}
                />
              )
            )}
      </div>
      <Press />
    </div>
  );
};

export default Testimonials;
