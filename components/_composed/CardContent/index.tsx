import { FC, useEffect } from "react";
import { useLoadCards } from "../../../hooks/card";
import CardNav, { Props as CardNavProps } from "../../Card/Nav";
import ComposedCardBlock from "../CardBlock";

interface Props extends CardNavProps {
  deck: GQL.Deck;
  artistId: string;
}

const ComposedCardContent: FC<Props> = ({ artistId, deck, ...props }) => {
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
      prevLink={prevCard && `/${deck.slug}/${prevCard.artist.slug}`}
      nextLink={nextCard && `/${deck.slug}/${nextCard.artist.slug}`}
      closeLink={`/${deck.slug}`}
    >
      <ComposedCardBlock card={card} deck={deck} />
    </CardNav>
  );
};

export default ComposedCardContent;
