import { FC, HTMLAttributes, useRef, useEffect, useCallback, useState } from "react";
import Grid from "../../../Grid";
import Text from "../../../Text";
import Spades from "../../../Icons/Suits/Spades";
import Clubs from "../../../Icons/Suits/Clubs";
import Diamonds from "../../../Icons/Suits/Diamonds";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";
import { usePageVisibility } from "../../../../hooks/usePageVisibility";

const SCROLL_INTERVAL = 3000; // 3 seconds
const SWIPE_THRESHOLD = 50; // minimum swipe distance in pixels

const Trust: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;
  const isPageVisible = usePageVisibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const items = [
    {
      icon: <Spades css={(theme) => [{ color: theme.colors.black30 }]} />,
      text: <>Free shipping<br />for orders over $45!</>
    },
    {
      icon: <Spades css={(theme) => [{ color: theme.colors.black30, rotate: "180deg" }]} />,
      text: <>Hassle-free returns,<br />money-back guarantee</>
    },
    {
      icon: <Clubs css={(theme) => [{ color: theme.colors.black30 }]} />,
      text: <>Trusted by 10,000+<br />customers worldwide</>
    },
    {
      icon: <Diamonds css={(theme) => [{ color: theme.colors.black30 }]} />,
      text: <>Secure payments,<br />worry-free checkout</>
    },
  ];

  // Duplicate first item at the end for seamless loop
  const extendedItems = [...items, items[0]];
  // Max index before we need to reset (items.length positions, 0 to items.length-1)
  const resetIndex = items.length;

  const advanceCarousel = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= resetIndex ? prev : prev + 1));
  }, [resetIndex]);

  const retreatCarousel = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  // Handle seamless reset when reaching duplicated items
  useEffect(() => {
    if (currentIndex === resetIndex) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Wait for transition to complete
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, resetIndex]);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advanceCarousel, SCROLL_INTERVAL);
  }, [advanceCarousel]);

  useEffect(() => {
    if (!isMobile || !isPageVisible) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, isPageVisible, startAutoScroll]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Block swiping during reset transition
    if (currentIndex >= resetIndex) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) {
      // Swipe left - go forward
      advanceCarousel();
      startAutoScroll();
    } else if (diff < -SWIPE_THRESHOLD) {
      // Swipe right - go back
      retreatCarousel();
      startAutoScroll();
    }
  };

  // Full width item (100vw - 40px padding)
  const itemWidth = `calc(100vw - 40px)`;

  if (isMobile) {
    return (
      <div
        css={(theme) => ({
          background: theme.colors.pale_gray,
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(4),
          overflow: "hidden",
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        })}
        {...props}
      >
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          css={{
            display: "flex",
            transition: isTransitioning ? "transform 0.5s ease" : "none",
          }}
          style={{
            transform: `translateX(calc(-${currentIndex} * ${itemWidth}))`,
          }}
        >
          {extendedItems.map((item, i) => (
            <div
              key={i}
              css={{
                flexShrink: 0,
                paddingBottom: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              style={{ width: itemWidth }}
              onClick={() => {
                if (currentIndex < resetIndex) {
                  advanceCarousel();
                  startAutoScroll();
                }
              }}
            >
              {item.icon}
              <Text
                typography="p-s"
                css={(theme) => [{ color: theme.colors.black50, marginTop: 15, textAlign: "center" }]}
              >
                {item.text}
              </Text>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(9),
          rowGap: 30,
          "> *": {
            gridColumn: "span 3",
            textAlign: "center",
          },
          [theme.maxMQ.sm]: {
            paddingTop: 40,
            paddingBottom: 40,
            "> *": {
              gridColumn: "span 6",
              textAlign: "center",
            },
          },
        },
      ]}
      {...props}
    >
      {items.map((item, i) => (
        <div key={i}>
          {item.icon}
          <Text
            typography="p-xs"
            css={(theme) => [{ color: theme.colors.black50, marginTop: 15, textAlign: "center" }]}
          >
            {item.text}
          </Text>
        </div>
      ))}
    </Grid>
  );
};

export default Trust;
