import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { FC, HTMLAttributes } from "react";
import { CardSuits } from "../../source/enums";
import AllEntriesCard from "../AllEntriesCard";
import Joker from "../Icons/Joker";
import Link, { Props as LinkProps } from "../Link";

const JokerCard: FC<
  HTMLAttributes<HTMLDivElement> & {
    suit: CardSuits.r | CardSuits.b;
    deckId: string;
    cards: GQL.Card[];
    pathname: string;
    query: NextParsedUrlQuery;
    viewed?: boolean;
  } & Omit<LinkProps, "href">
> = ({ viewed, suit, deckId, cards, pathname, query, ...props }) => {
  const firstCard = cards.find(
    (card) => card.suit === suit && card.value === "joker" && card.artist
  );

  if (!firstCard) {
    return null;
  }

  return (
    <Link
      {...props}
      href={{
        pathname: pathname,
        query: {
          ...query,
          deckId,
          cardValue: "joker",
          cardSuit: suit,
        },
      }}
    >
      <AllEntriesCard
        viewed={viewed}
        cardValue="joker"
        suit={suit}
        Icon={Joker}
        note={`${cards.length} cards`}
      />
    </Link>
  );
};

export default JokerCard;
