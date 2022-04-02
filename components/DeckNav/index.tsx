import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  RefObject,
} from "react";
import { Sections } from "../../source/enums";
import Arrowed from "../Arrowed";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Opensea from "../Icons/Opensea";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  refs: {
    aboutRef?: RefObject<HTMLElement>;
    cardsRef?: RefObject<HTMLElement>;
    nftRef?: RefObject<HTMLElement>;
    deckRef?: RefObject<HTMLElement>;
  };
  links?: {
    buyNow?: string;
    opensea?: string;
    shop?: string;
  };
}

const DeckNav: ForwardRefRenderFunction<HTMLElement, Props> = (
  { links = {}, refs, ...props },
  ref
) => {
  const {
    query: { section: _, ...query },
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
      {links.opensea && (
        <Button
          component={Link}
          href={links.opensea}
          Icon={Opensea}
          css={(theme) => ({
            background: theme.colors.gradient,
            marginRight: theme.spacing(2),
          })}
          target="_blank"
        >
          Opensea
        </Button>
      )}
      {links.buyNow && (
        <Button
          component={Link}
          href={links.buyNow}
          Icon={Bag}
          css={(theme) => ({
            marginRight: theme.spacing(2),
          })}
        >
          Buy now
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
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
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
          })}
          onClick={bringIntoViewHandler(refs.cardsRef)}
        >
          Cards
        </Link>
      )}
      {refs.nftRef && (
        <Link
          href={{
            pathname,
            query: { ...query, section: Sections.nft },
          }}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.nftRef)}
        >
          (PACE) nft
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
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.deckRef)}
        >
          Deck
        </Link>
      )}

      {links.shop && (
        <Link
          href={links.shop}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontWeight: 600,
          })}
        >
          <Arrowed>Shop</Arrowed>
        </Link>
      )}
    </nav>
  );
};

export default forwardRef(DeckNav);
