import { FC, HTMLAttributes, useState, useRef, useEffect, useCallback } from "react";
import Grid from "../../../../Grid";
import Fastcompany from "../../../../Icons/Fastcompany";
import CreativeBloq from "../../../../Icons/CreativeBloq";
import DigitalArts from "../../../../Icons/DigitalArts";
import Esquire from "../../../../Icons/Esquire";
import { useSize } from "../../../../SizeProvider";
import { breakpoints } from "../../../../../source/enums";

const SCROLL_INTERVAL = 3000; // 3 seconds
const SWIPE_THRESHOLD = 50;

const PRESS_LINKS = [
  {
    name: "Fast Company",
    href: "https://www.fastcompany.com/90575448/these-playing-cards-show-fantastical-ways-the-world-could-change-by-2120",
    Icon: Fastcompany,
    scale: 0.8,
  },
  {
    name: "Creative Bloq",
    href: "https://www.creativebloq.com/illustration/artists-collaborate-picture-perfect-playing-cards-10134891",
    Icon: CreativeBloq,
    scale: 0.8,
  },
  {
    name: "Digital Arts",
    href: "https://www.digitalartsonline.co.uk/features/illustration/55-global-designers-illustrators-each-designed-playing-card-in-this-unique-deck/",
    Icon: DigitalArts,
    scale: 0.7,
  },
  {
    name: "Esquire",
    href: "https://www.esquire.com/style/mens-fashion/g4233463/artistic-deck-of-cards",
    Icon: Esquire,
    scale: 0.8,
  },
];

const Press: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const items = PRESS_LINKS;
  const extendedItems = [...items, items[0]];
  const resetIndex = items.length;

  const advanceCarousel = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= resetIndex ? prev : prev + 1));
  }, [resetIndex]);

  const retreatCarousel = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  useEffect(() => {
    if (currentIndex === resetIndex) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, resetIndex]);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advanceCarousel, SCROLL_INTERVAL);
  }, [advanceCarousel]);

  useEffect(() => {
    if (!isMobile) return;
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, startAutoScroll]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (currentIndex >= resetIndex) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > SWIPE_THRESHOLD) {
      advanceCarousel();
      startAutoScroll();
    } else if (diff < -SWIPE_THRESHOLD) {
      retreatCarousel();
      startAutoScroll();
    }
  };

  const itemWidth = `calc(100vw - 40px)`;

  if (isMobile) {
    return (
      <div
        id="press"
        css={(theme) => ({
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
          {extendedItems.map(({ name, href, Icon, scale }, i) => (
            <a
              key={`${name}-${i}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read about Playing Arts on ${name}`}
              css={(theme) => ({
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: theme.spacing(1.5),
                color: theme.colors.third_black,
              })}
              style={{ width: itemWidth }}
            >
              <div css={{ transform: `scale(${scale - 0.1})` }}>
                <Icon />
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Grid id="press" {...props}>
      {items.map(({ name, href, Icon, scale }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read about Playing Arts on ${name}`}
          css={(theme) => ({
            gridColumn: "span 3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            color: theme.colors.third_black,
            transition: "color 0.2s",
            "&:hover": {
              color: theme.colors.black,
            },
            "&:focus-visible": {
              outline: `2px solid ${theme.colors.dark_gray}`,
              outlineOffset: 4,
              borderRadius: 4,
            },
          })}
        >
          <div
            css={{
              transform: scale !== 1 ? `scale(${scale})` : undefined,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon />
          </div>
        </a>
      ))}
    </Grid>
  );
};

export default Press;
