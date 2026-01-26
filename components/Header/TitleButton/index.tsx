import Menu from "../../Icons/Menu";
import Button from "../../Buttons/Button";
import { FC, HTMLAttributes, useMemo } from "react";
import ScandiBlock, { Props } from "../../ScandiBlock";
import { useRouter } from "next/router";
import { useDeck } from "../../../hooks/deck";
import { useCard } from "../../../hooks/card";
import { useProducts } from "../../../hooks/product";
import { colord } from "colord";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useSize } from "../../SizeProvider";
import { breakpoints } from "../../../source/enums";
import { useMenu } from "../../Contexts/menu";

const TitleButton: FC<
  HTMLAttributes<HTMLElement> & { showSiteNav?: "top" | "afterTop"; pageTitle?: string } & Props
> = ({ showSiteNav = "top", pageTitle, ...props }) => {
  const { openMenu } = useMenu();
  const router = useRouter();
  const {
    query: { deckId, pId, artistSlug },
  } = router;

  const { palette } = usePalette();

  const { deck } = useDeck({ variables: { slug: deckId }, skip: !deckId });

  // Get current card's edition for proper deck title (e.g., "Future Chapter I")
  const { card } = useCard({
    variables: { slug: artistSlug, deckSlug: deckId },
    skip: !artistSlug || !deckId,
  });

  // Build deck title with edition for Future decks
  const deckTitle = useMemo(() => {
    if (!deck) return null;
    // For Future deck with edition, show "Future Chapter I" or "Future Chapter II"
    if (deck.slug === "future" && card?.edition) {
      const editionName = card.edition
        .replace(/\b\w/g, (c: string) => c.toUpperCase())
        .replace(/\bIi\b/g, "II");
      return `Future ${editionName}`;
    }
    return deck.title;
  }, [deck, card?.edition]);

  // Get products to find deck title for product pages
  const { products } = useProducts();
  const productDeckTitle = useMemo(() => {
    if (!pId || typeof pId !== "string" || !products) return null;
    const product = products.find(
      (p) => p.short.toLowerCase().split(" ").join("") === pId
    );
    return product?.title || null;
  }, [pId, products]);

  const { width } = useSize();

  // Check if we're on the shop page, product page, or bag page
  const isShopPage = router.pathname === "/shop";
  const isProductPage = router.pathname === "/shop/[pId]";
  const isBagPage = router.pathname === "/bag";

  return (
    <ScandiBlock
      css={(theme) => [
        {
          // Mobile: 1 column for menu button, left-aligned
          [theme.maxMQ.xsm]: {
            gridColumn: "span 1",
            justifyContent: "flex-start",
          },
          [theme.mq.sm]: {
            gridColumn: "span 3",
          },
          height: "100%",
          position: "relative",
          padding: 0,
        },
      ]}
      palette={palette}
      {...props}
    >
      <Button
        base={true}
        icon={width < breakpoints.sm}
        css={(theme) => [
          {
            [theme.mq.sm]: {
              paddingLeft: 10,
              paddingRight: 15,
            },
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
        onClick={openMenu}
      >
        <Menu css={(theme) => [{ [theme.mq.sm]: { marginRight: 10 } }]} />

        {width >= breakpoints.sm && (
          <span
            css={(theme) => ({
              whiteSpace: "nowrap",
              transition: theme.transitions.fast("opacity"),
            })}
          >
            {showSiteNav === "afterTop" && isBagPage
              ? "Your Bag"
              : showSiteNav === "afterTop" && isShopPage
              ? "Shop"
              : showSiteNav === "afterTop" && isProductPage && productDeckTitle
              ? productDeckTitle
              : deckId && deckTitle && showSiteNav === "afterTop"
              ? deckTitle
              : showSiteNav === "afterTop" && pageTitle
              ? pageTitle
              : "Playing Arts"}
          </span>
        )}
      </Button>
      {/* <PageNav
        css={[
          {
            position: "absolute",
            left: 0,
            bottom: "-54px",
            zIndex: 1,
            height: 45,
          },
        ]}
      /> */}
    </ScandiBlock>
  );
};

export default TitleButton;
