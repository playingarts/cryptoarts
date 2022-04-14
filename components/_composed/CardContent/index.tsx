import { forwardRef, ForwardRefRenderFunction, useEffect } from "react";
import { useLoadCards } from "../../../hooks/card";
import CardNav, { Props as CardNavProps } from "../../Card/Nav";
import ComposedCardBlock from "../CardBlock";

interface Props extends CardNavProps {
  deck: GQL.Deck;
  artistId: string;
}

const ComposedCardContent: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { artistId, deck, ...props },
  ref
) => {
  const { loadCards, cards, loading } = useLoadCards();

  useEffect(() => {
    loadCards({
      variables: {
        deck: deck._id,
      },
    });
  }, [deck, loadCards]);

  if (loading || !cards) {
    return null;
  }

  const card =
    cards && artistId
      ? cards.find(({ artist }) => artist.slug === artistId)
      : undefined;

  if (!card) {
    return null;
  }

  const currentCardIndex = card
    ? cards.findIndex(({ _id }) => _id === card._id)
    : -2;
  const prevCard = card && cards[currentCardIndex - 1];
  const nextCard = card && cards[currentCardIndex + 1];

  return (
    <CardNav
      {...props}
      ref={ref}
      prevLink={prevCard && `/${deck.slug}/${prevCard.artist.slug}`}
      nextLink={nextCard && `/${deck.slug}/${nextCard.artist.slug}`}
      closeLink={{
        pathname: `/${deck.slug}`,
        query: {
          scrollIntoView: `[href*="/${deck.slug}/${card.artist.slug}"]`,
        },
      }}
    >
      <ComposedCardBlock card={card} deck={deck} ref={ref} />
    </CardNav>
  );
};

export default forwardRef(ComposedCardContent);
