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
import ScandiBlock from "../../ScandiBlock";
import ButtonTemplate from "../../Buttons/Button";
import { colord } from "colord";
import Delete from "../../Icons/Delete";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useProducts } from "../../../hooks/product";
import MenuGrid from "./MenuGrid";
import NewsletterSection from "./NewsletterSection";
import FooterLinksSection from "./FooterLinksSection";
import CollectionItem from "../../Pages/Home/Collection/CollectionItem";
import Logo from "../../Icons/Logo";
import { getBaseUrl } from "../../../source/utils";

// Layout constants
const SCROLL_THRESHOLD = 600;
const PRODUCT_PREVIEW_HEIGHT = 450;
const PRODUCT_LIST_WIDTH = 190;
const PRODUCT_LIST_GAP = 5;
const SECTION_SPACING = 30;
const PREVIEW_BORDER_RADIUS = 10;
const DECK_LIST_GAP = 12;

/**
 * Full-screen navigation menu overlay
 * Displays product links, newsletter signup, and footer navigation
 */
const MainMenu: FC<
  HTMLAttributes<HTMLElement> & { setShow: Dispatch<SetStateAction<boolean>> }
> = ({ setShow, ...props }) => {
  const { products, loading, error } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<GQL.Product | null>(null);
  const { palette } = usePalette();
  const hasInitialized = useRef(false);

  // Capture scroll position at mount time (before body overflow is hidden)
  const [scrolledPast600] = useState(() => window.scrollY >= SCROLL_THRESHOLD);

  // Get deck products only
  const deckProducts = products?.filter((product) => product.type === "deck") || [];

  // Initialize hovered product only once when products load
  useEffect(() => {
    if (deckProducts.length > 0 && !hasInitialized.current) {
      setHoveredProduct(deckProducts[0]);
      hasInitialized.current = true;
    }
  }, [deckProducts]);

  // Handle body overflow
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Handle Escape key to close menu
  const handleClose = useCallback(() => setShow(false), [setShow]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black30,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      ]}
      onClick={handleClose}
      {...props}
    >
      <div
        css={[{ width: "fit-content" }]}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuGrid isHeader scrolledPast600={scrolledPast600}>
          <ScandiBlock css={{ gridColumn: "span 3", height: "var(--menu-header-height, 68px)", lineHeight: "var(--menu-header-line-height, 68px)", padding: 0 }}>
            <ButtonTemplate
              css={(theme) => [
                {
                  paddingLeft: 10,
                  paddingRight: 15,
                  transition: theme.transitions.fast("background"),
                },
                palette === "dark"
                  ? {
                      color: theme.colors.white75,
                      "&:hover": { background: theme.colors.black },
                    }
                  : {
                      color: theme.colors.dark_gray,
                      "&:hover": {
                        background: colord(theme.colors.white).alpha(0.5).toRgbString(),
                      },
                    },
              ]}
              onClick={handleClose}
              noColor={true}
            >
              <Delete css={[{ marginRight: 10 }]} />
              Close
            </ButtonTemplate>
          </ScandiBlock>

          <ScandiBlock
            css={(theme) => [
              {
                gridColumn: "span 3",
                justifyContent: "space-between",
                height: "var(--menu-header-height, 68px)",
                lineHeight: "var(--menu-header-line-height, 68px)",
                padding: 0,
              },
            ]}
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
            <Link href={getBaseUrl("/shop")} onClick={handleClose}>
              <ArrowButton
                color={palette === "dark" ? "white" : undefined}
                palette={palette}
              >
                Shop
              </ArrowButton>
            </Link>
          </ScandiBlock>

          <div
            css={[
              {
                height: PRODUCT_PREVIEW_HEIGHT,
                display: "flex",
                alignItems: "center",
                gridColumn: "1/-1",
                gap: DECK_LIST_GAP,
                marginTop: SECTION_SPACING,
                marginBottom: SECTION_SPACING,
              },
            ]}
          >
            <div css={[{ width: PRODUCT_LIST_WIDTH, display: "grid", gap: PRODUCT_LIST_GAP }]}>
              {loading && <div css={{ opacity: 0.5 }}>Loading...</div>}
              {error && <div css={{ opacity: 0.5 }}>Unable to load</div>}
              {!loading && !error && deckProducts.map((product) => {
                const deck = product.deck;
                if (!deck) {
                  return null;
                }
                return (
                  <Link
                    key={`mainmenu-${product._id}`}
                    href={getBaseUrl(`/${deck.slug}`)}
                    onMouseEnter={() => setHoveredProduct(product)}
                    onClick={handleClose}
                  >
                    <ArrowButton
                      css={[{ textAlign: "start" }]}
                      size="small"
                      noColor={true}
                      base={true}
                    >
                      {deck.short}
                    </ArrowButton>
                  </Link>
                );
              })}
            </div>
            <div css={(theme) => ({ flex: 1, minWidth: 0, height: "100%", borderRadius: PREVIEW_BORDER_RADIUS, "&:hover": { background: theme.colors.soft_gray } })}>
              {hoveredProduct && (
                <CollectionItem
                  product={hoveredProduct}
                  paletteOnHover={palette === "dark" ? "dark" : "light"}
                  css={{ height: "100%" }}
                  priority
                />
              )}
            </div>
          </div>
        </MenuGrid>

        <NewsletterSection />
        <FooterLinksSection />
      </div>
    </div>
  );
};

export default MainMenu;
