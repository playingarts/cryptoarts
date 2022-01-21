import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  RefObject,
} from "react";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Opensea from "../Icons/Opensea";
import Share from "../Icons/Share";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  deckId: string;
  refs: {
    cardsRef?: RefObject<HTMLElement>;
    nftRef?: RefObject<HTMLElement>;
    deckRef?: RefObject<HTMLElement>;
    galleryRef?: RefObject<HTMLElement>;
  };
  links?: {
    buyNow?: string;
    opensea?: string;
    share?: string;
    shop?: string;
  };
}

const DeckNav: ForwardRefRenderFunction<HTMLElement, Props> = (
  { links = {}, deckId, refs, ...props },
  ref
) => {
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
      {links.share && (
        <Button
          component={Link}
          href={links.share}
          Icon={Share}
          variant="bordered"
          css={(theme) => ({
            marginRight: theme.spacing(2),
          })}
        />
      )}
      {refs.cardsRef && (
        <Link
          href={`/decks/${deckId}/cards`}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.cardsRef)}
        >
          Cards
        </Link>
      )}
      {refs.nftRef && (
        <Link
          href="/"
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.nftRef)}
        >
          (PACE) nft
        </Link>
      )}
      {refs.deckRef && (
        <Link
          href={`/decks/${deckId}/deck`}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.deckRef)}
        >
          Deck
        </Link>
      )}
      {refs.galleryRef && (
        <Link
          href={`/decks/${deckId}/gallery`}
          shallow={true}
          scroll={false}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
            fontWeight: 600,
          })}
          onClick={bringIntoViewHandler(refs.galleryRef)}
        >
          Gallery
        </Link>
      )}
      {links.shop && (
        <Link
          href={links.shop}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
            fontWeight: 600,
          })}
        >
          Shop
        </Link>
      )}
    </nav>
  );
};

export default forwardRef(DeckNav);
