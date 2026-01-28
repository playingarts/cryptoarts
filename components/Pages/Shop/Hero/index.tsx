import { FC, HTMLAttributes, useState, useMemo, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Grid from "../../../Grid";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import ArrowButton from "../../../Buttons/ArrowButton";
import Link from "../../../Link";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import { useProducts } from "../../../../hooks/product";
import { HEADER_OFFSET } from "../../../../styles/theme";
import { usePageVisibility } from "../../../../hooks/usePageVisibility";

// Lazy-load Pop modal for product preview
const Pop = dynamic(() => import("../../ProductPage/Pop"), { ssr: false });

const AUTO_ROTATE_INTERVAL = 10000; // 10 seconds between slides

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { products } = useProducts();
  const isPageVisible = usePageVisibility();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Product popup state
  const [showPopup, setShowPopup] = useState(false);

  // Auto-rotation state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get deck products for rotation
  const deckProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => p.type === "deck" && p.image2);
  }, [products]);

  // Current product for display
  const currentProduct = deckProducts[currentIndex] || null;
  const heroImage = currentProduct?.image2 || "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.png";
  const heroAlt = currentProduct ? `${currentProduct.title} deck` : "Shop hero deck";

  // Navigate to next product with fade transition
  const navigateNext = useCallback(() => {
    if (deckProducts.length <= 1 || isTransitioning) return;

    setIsTransitioning(true);

    // After fade out, change product and fade in
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deckProducts.length);
      setIsTransitioning(false);
    }, 300);
  }, [deckProducts.length, isTransitioning]);

  // Auto-rotation (pause when tab not visible or popup is open)
  useEffect(() => {
    if (deckProducts.length <= 1 || !isPageVisible || showPopup) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      navigateNext();
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [deckProducts.length, navigateNext, isPageVisible, showPopup]);

  // Handle click to open popup
  const handleImageClick = useCallback(() => {
    if (currentProduct) {
      setShowPopup(true);
    }
  }, [currentProduct]);

  // Close popup handler
  const handleClosePopup = useCallback(() => {
    document.body.style.overflow = "";
    setShowPopup(false);
  }, []);

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 180,
          paddingBottom: theme.spacing(6),
          background: theme.colors.soft_gray,
          overflow: "hidden",
          [theme.maxMQ.sm]: { paddingTop: HEADER_OFFSET.tablet },
          [theme.maxMQ.xsm]: { paddingTop: HEADER_OFFSET.mobile, paddingBottom: theme.spacing(3) },
        },
      ]}
    >
      <div css={(theme) => [{ gridColumn: "span 6", position: "relative", [theme.maxMQ.sm]: { gridColumn: "1 / -1" } }]}>
        <Text typography="h1">Shop</Text>
        <Text css={(theme) => [{ marginTop: theme.spacing(3), [theme.maxMQ.xsm]: { marginTop: theme.spacing(2) } }]}>
          Limited-edition playing cards and exclusive<br css={(theme) => ({ [theme.maxMQ.xsm]: { display: "none" } })} /> bundles created by visionary artists.
        </Text>
        <div css={(theme) => [{ marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(3), alignItems: "center", [theme.maxMQ.xsm]: { marginTop: theme.spacing(2), gap: theme.spacing(2) } }]}>
          <Link href="#playing-cards">
            <ButtonTemplate
              bordered={true}
              size="medium"
            >
              Playing Cards
            </ButtonTemplate>
          </Link>
          <Link href="#bundles">
            <ArrowButton base size="small" noColor>
              Bundles
            </ArrowButton>
          </Link>
        </div>
        <div
          css={(theme) => [
            {
              width: 672,
              height: 420,
              position: "absolute",
              top: 0,
              left: "100%",
              opacity: 0,
              cursor: "pointer",
              transition: "opacity 500ms ease",
              [theme.maxMQ.sm]: {
                display: "none",
              },
            },
          ]}
          style={
            imageLoaded
              ? {
                  opacity: isTransitioning ? 0 : 1,
                  transform: `translateY(${-25 + scrollY * 0.3}px)`,
                }
              : undefined
          }
          onClick={handleImageClick}
        >
          <Image
            src={heroImage}
            alt={heroAlt}
            width={672}
            height={420}
            priority
            quality={90}
            style={{ objectFit: "cover" }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Product popup */}
      {currentProduct && (
        <MenuPortal show={showPopup}>
          <Pop
            product={currentProduct}
            close={handleClosePopup}
            show={showPopup}
          />
        </MenuPortal>
      )}
    </Grid>
  );
};

export default Hero;
