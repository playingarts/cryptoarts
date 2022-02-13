import { FC } from "react";
import CardNav, { Props as CardNavProps } from "../../CardNav";
import ComposedCardBlock from "../CardBlock";

interface Props extends CardNavProps {
  deck: GQL.Deck;
  cardId: string;
  cards: GQL.Card[];
}

const ComposedCardContent: FC<Props> = ({ cardId, cards, deck, ...props }) => {
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
      <ComposedCardBlock card={card} />
    </CardNav>
  );
};

export default ComposedCardContent;
