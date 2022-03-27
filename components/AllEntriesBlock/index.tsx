import { FC, Fragment, HTMLAttributes } from "react";
import Clubs from "../Icons/Clubs";
import Diamonds from "../Icons/Diamonds";
import Hearts from "../Icons/Hearts";
import Spades from "../Icons/Spades";
import AllEntriesCard from "../AllEntriesCard";
import Link from "../Link";
import { CardSuits, CardValues } from "../../source/enums";
import JokerCard from "./JokerCard";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: GQL.Card[];
  deckId: string;
}

type CardSuitsType = CardSuits.s | CardSuits.c | CardSuits.h | CardSuits.d;

const cardSuits: Array<CardSuitsType> = [
  CardSuits.s,
  CardSuits.c,
  CardSuits.h,
  CardSuits.d,
];

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
];

const Icons: Record<CardSuitsType, FC<HTMLAttributes<SVGElement>>> = {
  [CardSuits.s]: Spades,
  [CardSuits.h]: Hearts,
  [CardSuits.c]: Clubs,
  [CardSuits.d]: Diamonds,
};

const AllEntriesBlock: FC<Props> = ({ cards, deckId, ...props }) => {
  const filteredCards = cards.reduce(
    (data, card) =>
      !card.suit
        ? data
        : {
            ...data,
            [card.value]: {
              ...data[card.value],
              [card.suit]: [...data[card.value][card.suit as CardSuits], card],
            },
          },
    [...cardValues, "joker"].reduce<
      Record<string, Record<CardSuits, GQL.Card[]>>
    >(
      (data, value) => ({
        ...data,
        [value]: {
          spades: [],
          clubs: [],
          hearts: [],
          diamonds: [],
          red: [],
          black: [],
        },
      }),
      {}
    )
  );

  return (
    <div
      {...props}
      css={(theme) => ({
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: theme.spacing(3),
      })}
    >
      {cardValues.map((cardValue) => (
        <Fragment key={cardValue}>
          {cardValue === CardValues.a && (
            <JokerCard
              suit={CardSuits.r}
              deckId={deckId}
              cards={filteredCards["joker"]["red"]}
              css={{ justifySelf: "flex-end" }}
            />
          )}

          <div
            css={(theme) => ({
              display: "grid",
              gridTemplateAreas: `"${cardSuits.join(" ")}"`,
              gap: theme.spacing(1),
            })}
          >
            {cardSuits.map((suit) => (
              <Link
                key={suit}
                href={{
                  pathname: "/[deckId]",
                  query: {
                    deckId,
                    cardValue,
                    cardSuit: suit,
                  },
                }}
                css={{ gridArea: suit }}
              >
                <AllEntriesCard
                  suit={suit}
                  Icon={Icons[suit]}
                  cardValue={cardValue}
                  note={`${filteredCards[cardValue][suit].length} cards`}
                />
              </Link>
            ))}
          </div>

          {cardValue === CardValues.a && (
            <JokerCard
              suit={CardSuits.b}
              deckId={deckId}
              cards={filteredCards["joker"]["black"]}
              css={{ justifySelf: "flex-start" }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default AllEntriesBlock;
