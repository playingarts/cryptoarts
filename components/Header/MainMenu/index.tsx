import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ScandiBlock from "../../ScandiBlock";
import ButtonTemplate from "../../Buttons/Button";
import { colord } from "colord";
import Delete from "../../Icons/Delete";
import ArrowButton from "../../Buttons/ArrowButton";
import NavButton from "../../Buttons/NavButton";
import Link from "../../Link";
import { useHeroCardsContext } from "../../Pages/Deck/HeroCardsContext";
import { useProducts } from "../../../hooks/product";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import MenuGrid from "./MenuGrid";
import NewsletterSection from "./NewsletterSection";
import FooterLinksSection from "./FooterLinksSection";
import CollectionItem from "../../Pages/Home/Collection/CollectionItem";
import Logo from "../../Icons/Logo";
import { getBaseUrl } from "../../../source/utils";
import MenuPortal from "./MenuPortal";

// Lazy-load Pop modal for card preview
const CardPop = dynamic(() => import("../../Pages/CardPage/Pop"), { ssr: false });

// Type for the selected card when popup is open
type SelectedCard = {
  deckSlug: string;
  artistSlug: string;
  cardImg: string;
} | null;

// Layout constants
const SCROLL_THRESHOLD = 500;
const PRODUCT_PREVIEW_HEIGHT = 450;
const MOBILE_CAROUSEL_HEIGHT = 380;
const PRODUCT_LIST_WIDTH = 190;
const PRODUCT_LIST_GAP = 10;
const SECTION_SPACING = 30;
const PREVIEW_BORDER_RADIUS = 10;
const DECK_LIST_GAP = 12;
const CASCADE_DELAY = 50; // ms delay between each item animation
const CAROUSEL_INTERVAL = 3000; // 3 seconds between slides
const SWIPE_THRESHOLD = 50; // min pixels to register as swipe

/**
 * Skeleton component for deck preview loading state
 */
const DeckPreviewSkeleton: FC = () => (
  <div
    css={{
      width: "100%",
      height: "100%",
      borderRadius: PREVIEW_BORDER_RADIUS,
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "skeleton-pulse 1.5s ease-in-out infinite",
      "@keyframes skeleton-pulse": {
        "0%": { backgroundPosition: "200% 0" },
        "100%": { backgroundPosition: "-200% 0" },
      },
    }}
  />
);

/**
 * Full-screen navigation menu overlay
 * Displays product links, newsletter signup, and footer navigation
 */
const MainMenu: FC<
  HTMLAttributes<HTMLElement> & {
    setShow: Dispatch<SetStateAction<boolean>>;
    show?: boolean;
  }
> = ({ setShow, show = true, ...props }) => {
  const router = useRouter();
  const { prefetchHeroCards } = useHeroCardsContext();
  const { products, error } = useProducts();
  const isPageVisible = usePageVisibility();
  const [hoveredProduct, setHoveredProduct] = useState<GQL.Product | null>(null);
  const hasInitialized = useRef(false);
  const prefetchedRef = useRef<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Card popup state
  const [selectedCard, setSelectedCard] = useState<SelectedCard>(null);

  // Popup handlers
  const handleCardClick = useCallback(
    (deckSlug: string, artistSlug: string, cardImg: string) => {
      setSelectedCard({ deckSlug, artistSlug, cardImg });
    },
    []
  );

  const handleCloseCardPopup = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const isCardPopupOpen = selectedCard !== null;

  // Intent-based prefetching for instant navigation
  const prefetchPage = useCallback((href: string) => {
    if (prefetchedRef.current.has(href)) return;
    prefetchedRef.current.add(href);
    router.prefetch(href);
  }, [router]);

  // Capture scroll position at mount time (before body overflow is hidden)
  const [scrolledPast600, setScrolledPast600] = useState(() =>
    typeof window !== "undefined" ? window.scrollY >= SCROLL_THRESHOLD : false
  );

  // Update scroll position when menu becomes visible
  useEffect(() => {
    if (show) {
      setScrolledPast600(window.scrollY >= SCROLL_THRESHOLD);
    }
  }, [show]);

  // Auto-prefetch homepage when menu opens (most common destination)
  useEffect(() => {
    prefetchPage(getBaseUrl("/"));
  }, [prefetchPage]);

  // Deck slug sort order: Zero, One, Two, Three, Special, Future, Crypto, (new decks come after)
  const deckSortOrder: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    special: 4,
    future: 5,
    crypto: 6,
  };

  // Get deck products only, sorted by edition order (new decks get 99, after Crypto)
  // Exclude future-ii as it's combined with future in the menu
  const deckProducts = (products?.filter((product) => product.type === "deck" && product.deck?.slug !== "future-ii") || [])
    .sort((a, b) => {
      const orderA = deckSortOrder[a.deck?.slug || ""] ?? 99;
      const orderB = deckSortOrder[b.deck?.slug || ""] ?? 99;
      return orderA - orderB;
    });

  // Get current deck slug from URL (works for /[deckId] and /[deckId]/[artistSlug] pages)
  const currentDeckSlug = router.query.deckId as string | undefined;

  // Find product matching current page's deck
  const currentDeckProduct = currentDeckSlug
    ? deckProducts.find((p) => p.deck?.slug === currentDeckSlug)
    : null;

  // Initialize hovered product - prefer current page's deck, fallback to first
  useEffect(() => {
    if (deckProducts.length > 0 && !hasInitialized.current) {
      setHoveredProduct(currentDeckProduct || deckProducts[0]);
      hasInitialized.current = true;
    }
  }, [deckProducts, currentDeckProduct]);

  // Update hovered product when menu opens on a different deck page
  useEffect(() => {
    if (show && currentDeckProduct && hasInitialized.current) {
      setHoveredProduct(currentDeckProduct);
    }
  }, [show, currentDeckProduct]);

  // Handle body overflow - only when visible
  useEffect(() => {
    if (!show) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [show]);

  // Handle Escape key to close menu
  const handleClose = useCallback(() => setShow(false), [setShow]);
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, show]);

  // Track show state changes to restart animations and scroll to top
  const [animationKey, setAnimationKey] = useState(0);
  const resetCarouselRef = useRef<() => void>(() => {});
  useEffect(() => {
    if (show) {
      setAnimationKey((k) => k + 1);
      // Scroll menu to top when opened
      scrollContainerRef.current?.scrollTo(0, 0);
      // Reset carousel to first slide and unpause
      setCarouselIndex(0);
      resetCarouselRef.current();
    }
  }, [show]);

  // Mobile carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);

  // Reset auto-rotate when menu opens
  resetCarouselRef.current = () => setAutoRotate(true);

  // Stop auto-rotation permanently on any interaction
  const handleInteraction = useCallback(() => {
    setAutoRotate(false);
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
      carouselIntervalRef.current = null;
    }
  }, []);

  // Auto-advance carousel (only when autoRotate is true and page is visible)
  useEffect(() => {
    if (!show || deckProducts.length <= 1 || !autoRotate || !isPageVisible) {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
        carouselIntervalRef.current = null;
      }
      return;
    }

    carouselIntervalRef.current = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % deckProducts.length);
    }, CAROUSEL_INTERVAL);

    return () => {
      if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    };
  }, [show, deckProducts.length, autoRotate, isPageVisible]);

  const handleCarouselTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    handleInteraction(); // Stop auto-rotate on touch
  }, [handleInteraction]);

  const handleCarouselTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;

    if (diff > 0) {
      // Swipe left - next
      setCarouselIndex((prev) => (prev + 1) % deckProducts.length);
    } else {
      // Swipe right - prev
      setCarouselIndex((prev) => (prev - 1 + deckProducts.length) % deckProducts.length);
    }
  }, [deckProducts.length]);

  return (
    <div
      ref={scrollContainerRef}
      css={(theme) => [
        {
          background: theme.colors.black30,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          overflow: "scroll",
          overscrollBehavior: "contain",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          [theme.maxMQ.xsm]: {
            background: theme.colors.pale_gray,
          },
        },
      ]}
      onClick={handleClose}
      {...props}
    >
      <div
        css={(theme) => [{ width: "fit-content", [theme.maxMQ.xsm]: { width: "100%", overflow: "hidden" } }]}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile header - outside grid, matches global header styling exactly */}
        <div
          css={(theme) => ({
            display: "none",
            [theme.maxMQ.xsm]: {
              display: "flex",
              alignItems: "center",
              height: 50,
              lineHeight: "50px",
              paddingLeft: 20,
              paddingRight: 20,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              background: colord("#FFFFFF").alpha(0.9).toRgbString(),
              backdropFilter: "blur(10px)",
            },
          })}
        >
          {/* Close button - matches TitleButton styling */}
          <ButtonTemplate
            base={true}
            icon={true}
            css={(theme) => ({
              marginRight: 15,
              color: theme.colors.dark_gray + " !important",
              transition: theme.transitions.fast("background"),
              "&:hover": {
                background: colord(theme.colors.white).alpha(0.5).toRgbString(),
              },
            })}
            onClick={handleClose}
          >
            <Delete />
          </ButtonTemplate>

          {/* Logo - matches Middle section styling */}
          <Link
            href={getBaseUrl("/")}
            onClick={handleClose}
            css={{ display: "flex", alignItems: "center" }}
          >
            <Logo css={{ height: 24, width: "auto" }} />
          </Link>

          {/* Shop button - matches CTA styling */}
          <div css={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            <Link href={getBaseUrl("/shop")} onClick={handleClose}>
              <ButtonTemplate color="accent" size="medium">
                Shop
              </ButtonTemplate>
            </Link>
          </div>
        </div>

        <MenuGrid isHeader scrolledPast600={scrolledPast600} css={(theme) => ({ [theme.maxMQ.xsm]: { paddingTop: 50 } })}>
          {/* Desktop header */}
          <ScandiBlock palette="light" css={(theme) => ({ gridColumn: "span 3", height: "var(--menu-header-height, 68px)", lineHeight: "var(--menu-header-line-height, 68px)", padding: 0, [theme.maxMQ.xsm]: { display: "none" } })} style={scrolledPast600 ? { borderTop: "none" } : undefined}>
            <ButtonTemplate
              css={(theme) => [
                {
                  paddingLeft: 10,
                  paddingRight: 15,
                  transition: theme.transitions.fast("background"),
                  color: theme.colors.dark_gray,
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.5)",
                  },
                },
              ]}
              onClick={handleClose}
              noColor={true}
            >
              <Delete css={[{ marginRight: 10 }]} />
              Close menu
            </ButtonTemplate>
          </ScandiBlock>

          <ScandiBlock
            palette="light"
            css={(theme) => [
              {
                gridColumn: "span 3",
                justifyContent: "space-between",
                height: "var(--menu-header-height, 68px)",
                lineHeight: "var(--menu-header-line-height, 68px)",
                padding: 0,
                [theme.maxMQ.xsm]: { display: "none" },
              },
            ]}
            style={scrolledPast600 ? { borderTop: "none" } : undefined}
          >
            <span
              onMouseEnter={() => prefetchPage(getBaseUrl("/"))}
              onTouchStart={() => prefetchPage(getBaseUrl("/"))}
            >
              <Link
                href={getBaseUrl("/")}
                onClick={handleClose}
                css={(theme) => [
                  {
                    display: "inline-block",
                    "&:hover": {
                      opacity: 0.5,
                    },
                    transition: theme.transitions.fast("opacity"),
                  },
                ]}
              >
                <Logo />
              </Link>
            </span>
            <span
              onMouseEnter={() => prefetchPage(getBaseUrl("/shop"))}
              onTouchStart={() => prefetchPage(getBaseUrl("/shop"))}
            >
              <Link href={getBaseUrl("/shop")} onClick={handleClose}>
                <ArrowButton size="medium">
                  Shop
                </ArrowButton>
              </Link>
            </span>
          </ScandiBlock>

          {/* Desktop: deck list + single preview */}
          <div
            css={(theme) => ({
              height: PRODUCT_PREVIEW_HEIGHT,
              display: "flex",
              alignItems: "center",
              gridColumn: "1/-1",
              gap: DECK_LIST_GAP,
              marginTop: SECTION_SPACING,
              marginBottom: SECTION_SPACING,
              [theme.maxMQ.xsm]: {
                display: "none",
              },
            })}
          >
            <div
              css={{
                width: PRODUCT_LIST_WIDTH,
                display: "grid",
                gap: PRODUCT_LIST_GAP,
                "@keyframes cascadeIn": {
                  "0%": { opacity: 0, transform: "translateX(-10px)" },
                  "100%": { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              {error && <div css={{ opacity: 0.5 }}>Unable to load</div>}
              {deckProducts.map((product, index) => {
                const deck = product.deck;
                if (!deck) {
                  return null;
                }
                const isCurrentDeck = deck.slug === currentDeckSlug;
                const deckHref = getBaseUrl(`/${deck.slug}`);
                const handleHover = () => {
                  setHoveredProduct(product);
                  prefetchPage(deckHref);
                  prefetchHeroCards(deck.slug);
                };
                const handleClick = (e: React.MouseEvent) => {
                  if (isCurrentDeck) {
                    e.preventDefault();
                  }
                  handleClose();
                };
                return (
                  <span
                    key={`mainmenu-${product._id}-${animationKey}`}
                    onMouseEnter={handleHover}
                    onTouchStart={handleHover}
                    css={{
                      opacity: 0,
                      animation: `cascadeIn 0.3s ease-out forwards`,
                      animationDelay: `${index * CASCADE_DELAY}ms`,
                    }}
                  >
                    <Link
                      href={deckHref}
                      onClick={handleClick}
                    >
                      <ArrowButton
                        css={{ textAlign: "start", color: "black" }}
                        size="small"
                        noColor={true}
                        base={true}
                      >
                        {deck.short}
                      </ArrowButton>
                    </Link>
                  </span>
                );
              })}
            </div>
            <div css={{ flex: 1, minWidth: 0, height: "100%", borderRadius: PREVIEW_BORDER_RADIUS }}>
              {hoveredProduct ? (
                <CollectionItem
                  product={hoveredProduct}
                  paletteOnHover={hoveredProduct.deck?.slug === "crypto" ? "dark" : "light"}
                  css={{ height: "100%" }}
                  priority
                  currentDeckSlug={currentDeckSlug}
                  onClose={handleClose}
                  onCardClick={handleCardClick}
                />
              ) : (
                <DeckPreviewSkeleton />
              )}
            </div>
          </div>

          {/* Mobile: product carousel with dots */}
          <div
            css={(theme) => ({
              display: "none",
              [theme.maxMQ.xsm]: {
                display: "block",
                gridColumn: "1/-1",
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(3),
                width: "100%",
                overflow: "hidden",
              },
            })}
          >
            {/* Carousel container with arrows */}
            <div css={{ position: "relative" }}>
              {/* Left arrow */}
              <NavButton
                palette="light"
                css={{
                  position: "absolute",
                  left: 15,
                  top: "50%",
                  transform: "translateY(-50%) rotate(180deg)",
                  zIndex: 2,
                }}
                onClick={() => {
                  setCarouselIndex((prev) => (prev - 1 + deckProducts.length) % deckProducts.length);
                  handleInteraction();
                }}
              />

              {/* Right arrow */}
              <NavButton
                palette="light"
                css={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                }}
                onClick={() => {
                  setCarouselIndex((prev) => (prev + 1) % deckProducts.length);
                  handleInteraction();
                }}
              />

              <div
                css={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: PREVIEW_BORDER_RADIUS,
                }}
                onTouchStart={handleCarouselTouchStart}
                onTouchEnd={handleCarouselTouchEnd}
              >
                <div
                  css={{
                    display: "flex",
                    width: "100%",
                    transition: "transform 0.5s ease",
                  }}
                  style={{
                    transform: `translateX(-${carouselIndex * 100}%)`,
                  }}
                >
                  {deckProducts.map((product, index) => (
                    <div
                      key={`carousel-${product._id}`}
                      css={{
                        flex: "0 0 100%",
                        minWidth: 0,
                        width: "100%",
                        height: MOBILE_CAROUSEL_HEIGHT,
                      }}
                    >
                      <CollectionItem
                        product={product}
                        paletteOnHover={product.deck?.slug === "crypto" ? "dark" : "light"}
                        css={{
                          height: "100%",
                          width: "100%",
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: 10,
                        }}
                        priority
                        currentDeckSlug={currentDeckSlug}
                        onClose={handleClose}
                        mobileCarousel
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            {deckProducts.length > 1 && (
              <div
                css={(theme) => ({
                  display: "flex",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: theme.spacing(3),
                })}
              >
                {deckProducts.map((_, i) => (
                  <div
                    key={`dot-${i}`}
                    onClick={() => {
                      setCarouselIndex(i);
                      handleInteraction(); // Stop auto-rotate permanently
                    }}
                    css={(theme) => ({
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      cursor: "pointer",
                      background: i === carouselIndex ? theme.colors.accent : "rgba(0,0,0,0.2)",
                      transition: "background 0.3s ease",
                    })}
                  />
                ))}
              </div>
            )}
          </div>
        </MenuGrid>

        <NewsletterSection />
        <FooterLinksSection onClose={handleClose} />
      </div>

      {/* Card popup for preview card clicks */}
      <MenuPortal show={isCardPopupOpen}>
        {selectedCard && (
          <CardPop
            close={handleCloseCardPopup}
            cardSlug={selectedCard.artistSlug}
            deckId={selectedCard.deckSlug}
            initialImg={selectedCard.cardImg}
            showNavigation={true}
            onNavigate={handleClose}
          />
        )}
      </MenuPortal>
    </div>
  );
};

export default MainMenu;
