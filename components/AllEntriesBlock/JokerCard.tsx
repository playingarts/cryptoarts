import { FC } from "react";
import { CardSuits } from "../../source/enums";
import AllEntriesCard from "../AllEntriesCard";
import Joker from "../Icons/Joker";
import Link, { Props as LinkProps } from "../Link";

const JokerCard: FC<
  { suit: CardSuits.r | CardSuits.b; deckId: string; cards: GQL.Card[] } & Omit<
    LinkProps,
    "href"
  >
> = ({ suit, deckId, cards, ...props }) => (
  <Link
    {...props}
    href={{
      pathname: "/[deckId]",
      query: { deckId, cardValue: "joker", cardSuit: suit },
    }}
  >
    <AllEntriesCard
      cardValue="joker"
      suit={suit}
      Icon={Joker}
      note={`${cards.length} cards`}
    />
  </Link>
);

export default JokerCard;
