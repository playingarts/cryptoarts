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
  const bringIntoViewHandler = ({ current }: RefObject<HTMLElement>) => () => {
    if (!current) {
      return;
    }

    current.scrollIntoView({
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
          opensea
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
          })}
          onClick={bringIntoViewHandler(refs.cardsRef)}
        >
          cards
        </Link>
      )}
      {refs.nftRef && (
        <Link
          href="/"
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
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
          })}
          onClick={bringIntoViewHandler(refs.deckRef)}
        >
          deck
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
          })}
          onClick={bringIntoViewHandler(refs.galleryRef)}
        >
          gallery
        </Link>
      )}
      {links.shop && (
        <Link
          href={links.shop}
          css={(theme) => ({
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            color: "inherit",
          })}
        >
          shop
        </Link>
      )}
    </nav>
  );
};

export default forwardRef(DeckNav);
