import { Theme } from "@emotion/react";
import { CSSInterpolation, CSSObject } from "@emotion/serialize";
import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  RefObject,
} from "react";
import { Sections } from "../../source/enums";
import { useOwnedAssets } from "../../hooks/opensea";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  refs: {
    aboutRef?: RefObject<HTMLElement>;
    cardsRef?: RefObject<HTMLElement>;
    nftRef?: RefObject<HTMLElement>;
    contestRef?: RefObject<HTMLElement>;
    deckRef?: RefObject<HTMLElement>;
    roadmapRef?: RefObject<HTMLElement>;
    gameRef?: RefObject<HTMLElement>;
  };
  deck?: GQL.Deck;
  linkCss?: ((_: Theme) => CSSInterpolation) | CSSObject;
}

const DeckNav: ForwardRefRenderFunction<HTMLElement, Props> = (
  { linkCss, deck, refs, ...props },
  ref
) => {
  const {
    query: { section: _, ...query },
    query: { deckId, artistId },
    pathname,
  } = useRouter();

  const bringIntoViewHandler = (blockRef: RefObject<HTMLElement>) => () => {
    if (!blockRef.current) {
      return;
    }

    blockRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const ownedAssets = useOwnedAssets("crypto");

  return (
    <nav
      {...props}
      ref={ref}
      css={(theme) => [
        theme.typography.body,
        {
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
        },
      ]}
    >
      {deck && deck.product && (
        <Button
          component={Link}
          href={{
            pathname: "/shop",
            query: {
              scrollIntoView: `[data-id='${deck.slug}']`,
              scrollIntoViewBehavior: "smooth",
            },
          }}
          Icon={Bag}
          css={(theme) => ({
            marginRight: theme.spacing(2),
            background:
              theme.colors.decks[deck.slug as keyof typeof theme.colors.decks]
                .nav.button.background,
            color:
              theme.colors.decks[deck.slug as keyof typeof theme.colors.decks]
                .nav.button.color,
            [theme.mq.sm]: {
              transition: theme.transitions.fast("background"),
              "&:hover": {
                background:
                  theme.colors.decks[
                    deck.slug as keyof typeof theme.colors.decks
                  ].nav.button.hoverColor,
              },
            },
          })}
        >
          {deck.openseaCollection
            ? "Claim"
            : deck.product.status === "soldout"
            ? "Sold out"
            : "Buy now"}
        </Button>
      )}
      {refs.aboutRef && (
        <Link
          href={{
            pathname,
            query: { ...query },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => [
            {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              fontWeight: 600,
              ...linkCss,
            },
          ]}
          onClick={bringIntoViewHandler(refs.aboutRef)}
        >
          About
        </Link>
      )}
      {refs.cardsRef && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.cards },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
            ...linkCss,
          })}
          onClick={bringIntoViewHandler(refs.cardsRef)}
        >
          {/* {((deckId === "special" ||
            deckId === "future_i" ||
            deckId === "future_ii") &&
            "Winners") ||
            "Cards"} */}
          Cards
        </Link>
      )}
      {refs.contestRef && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.contest },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            ...linkCss,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.contestRef)}
        >
          All Entries
        </Link>
      )}
      {deckId === "crypto" && refs.gameRef && ownedAssets && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.game },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            ...linkCss,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.gameRef)}
        >
          Game
        </Link>
      )}
      {refs.nftRef && !artistId && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.nft },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            ...linkCss,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.nftRef)}
        >
          NFT
        </Link>
      )}

      {deckId === "crypto" && refs.roadmapRef && !artistId && !ownedAssets && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.nft },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            ...linkCss,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.roadmapRef)}
        >
          Roadmap
        </Link>
      )}

      {refs.deckRef && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.deck },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            ...linkCss,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.deckRef)}
        >
          Deck
        </Link>
      )}
    </nav>
  );
};

export default forwardRef(DeckNav);
