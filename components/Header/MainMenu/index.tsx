import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ScandiBlock from "../../ScandiBlock";
import ButtonTemplate from "../../Buttons/Button";
import { colord } from "colord";
import Delete from "../../Icons/Delete";
import CTA from "../CTA";
import ArrowButton from "../../Buttons/ArrowButton";
import Link from "../../Link";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useProducts } from "../../../hooks/product";
import MenuGrid from "./MenuGrid";
import NewsletterSection from "./NewsletterSection";
import FooterLinksSection from "./FooterLinksSection";
import CollectionItem from "../../Pages/Home/Collection/CollectionItem";

/**
 * Full-screen navigation menu overlay
 * Displays product links, newsletter signup, and footer navigation
 */
const MainMenu: FC<
  HTMLAttributes<HTMLElement> & { setShow: Dispatch<SetStateAction<boolean>> }
> = ({ setShow, ...props }) => {
  const { products } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<GQL.Product | null>(null);
  const { palette } = usePalette();

  // Get deck products only
  const deckProducts = products?.filter((product) => product.type === "deck") || [];

  useEffect(() => {
    if (deckProducts.length > 0 && !hoveredProduct) {
      setHoveredProduct(deckProducts[0]);
    }
  }, [deckProducts, hoveredProduct]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
      onClick={() => setShow(false)}
      {...props}
    >
      <div
        css={[{ width: "fit-content" }]}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuGrid>
          <ScandiBlock css={{ gridColumn: "span 3", height: 70, padding: 0 }}>
            <ButtonTemplate
              css={(theme) => [
                {
                  paddingLeft: 10,
                  paddingRight: 15,
                  color:
                    theme.colors[palette === "dark" ? "white75" : "dark_gray"] +
                    " !important",
                  transition: theme.transitions.fast("background"),
                  "&:hover": {
                    background:
                      palette === "dark"
                        ? theme.colors.black
                        : colord(theme.colors.white).alpha(0.5).toRgbString(),
                  },
                },
              ]}
              onClick={() => setShow(false)}
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
                height: "100%",
                padding: 0,
                transition: theme.transitions.fast("border-color"),
              },
            ]}
          >
            <CTA />
          </ScandiBlock>

          <div
            css={[
              {
                height: 450,
                display: "flex",
                alignItems: "center",
                gridColumn: "1/-1",
                gap: 12,
                marginTop: 30,
                marginBottom: 30,
              },
            ]}
          >
            <div css={[{ width: 190, display: "grid", gap: 5 }]}>
              {deckProducts.map((product, index) => {
                const deck = product.deck;
                if (!deck) {
                  return undefined;
                }
                return (
                  <Link
                    key={deck.slug + "mainmenu" + index}
                    href={
                      (process.env.NEXT_PUBLIC_BASELINK || "") +
                      "/" +
                      deck.slug
                    }
                    onMouseEnter={() => setHoveredProduct(product)}
                    onClick={() => setShow(false)}
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
            <div css={(theme) => ({ flex: 1, minWidth: 0, height: "100%", borderRadius: 10, "&:hover": { background: theme.colors.soft_gray } })}>
              {hoveredProduct && (
                <CollectionItem
                  key={hoveredProduct._id}
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
