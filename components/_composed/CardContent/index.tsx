import { FC, useEffect } from "react";
import { useLoadCards } from "../../../hooks/card";
import CardNav, { Props as CardNavProps } from "../../Card/Nav";
import ComposedCardBlock from "../CardBlock";

interface Props extends CardNavProps {
  deck: GQL.Deck;
  cardId: string;
}

const ComposedCardContent: FC<Props> = ({ cardId, deck, ...props }) => {
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
    cards && cardId ? cards.find(({ _id }) => _id === cardId) : undefined;

  if (!card) {
    return null;
  }

  const currentCardIndex = card
    ? cards.findIndex(({ _id }) => _id === card._id)
    : -2;
  const prevCardLink = card && cards[currentCardIndex - 1];
  const nextCardLink = card && cards[currentCardIndex + 1];

  return (
    <CardNav
      {...props}
      prevLink={
        prevCardLink && {
          pathname: `/decks/${deck.slug}`,
          query: { cardId: prevCardLink._id },
        }
      }
      nextLink={
        nextCardLink && {
          pathname: `/decks/${deck.slug}`,
          query: { cardId: nextCardLink._id },
        }
      }
      closeLink={`/decks/${deck.slug}`}
    >
      <ComposedCardBlock card={card} deck={deck} />
    </CardNav>
  );
};

export default ComposedCardContent;
