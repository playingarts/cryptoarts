import { FC, Fragment, HTMLAttributes } from "react";

import Clubs from "../Icons/Clubs";
import Diamonds from "../Icons/Diamonds";
import Hearts from "../Icons/Hearts";
import Spades from "../Icons/Spades";
import AllEntriesCard from "../AllEntriesCard";
import Link from "../Link";
import { CardSuits, CardValues } from "../../source/enums";
import JokerCard from "./JokerCard";
import { useRouter } from "next/router";
import { useViewed } from "../../contexts/viewedContext";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: (GQL.Card | GQL.Loser)[];
  deckId: string;
}

type CardSuitsType = CardSuits.s | CardSuits.c | CardSuits.h | CardSuits.d;

const cardSuits: Array<CardSuitsType> = [
  CardSuits.s,
  CardSuits.h,
  CardSuits.c,
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
  [CardSuits.c]: Clubs,
  [CardSuits.h]: Hearts,
  [CardSuits.d]: Diamonds,
};

const AllEntriesBlock: FC<Props> = ({ cards, deckId, ...props }) => {
  const { query, pathname } = useRouter();
  const { addViewed, exists } = useViewed();

  const filteredCards = cards.reduce(
    (data, card) =>
      !card.suit || !card.value
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
    <Fragment>
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
                viewed={exists({
                  value: "joker",
                  suit: CardSuits.r,
                  deckSlug: deckId,
                })}
                onClick={() =>
                  addViewed({
                    value: "joker",
                    suit: CardSuits.r,
                    deckSlug: deckId,
                  })
                }
                shallow={true}
                scroll={false}
                pathname={pathname}
                query={query}
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
              {cardSuits.map((suit) => {
                const firstCard = cards.find(
                  (card) =>
                    card.suit === suit &&
                    card.value === cardValue &&
                    card.artist
                );

                if (!firstCard) {
                  return;
                }

                return (
                  <Link
                    key={suit}
                    href={{
                      pathname: pathname,
                      query: {
                        ...query,
                        deckId,
                        cardValue,
                        cardSuit: suit,
                      },
                    }}
                    css={{
                      gridArea: suit,
                    }}
                    onClick={() =>
                      addViewed({ value: cardValue, suit, deckSlug: deckId })
                    }
                    shallow={true}
                    scroll={false}
                  >
                    <AllEntriesCard
                      suit={suit}
                      Icon={Icons[suit]}
                      cardValue={cardValue}
                      viewed={exists({
                        value: cardValue,
                        suit,
                        deckSlug: deckId,
                      })}
                      note={`${filteredCards[cardValue][suit].length} cards`}
                    />
                  </Link>
                );
              })}
            </div>

            {cardValue === CardValues.a && (
              <JokerCard
                viewed={exists({
                  value: "joker",
                  suit: CardSuits.b,
                  deckSlug: deckId,
                })}
                onClick={() =>
                  addViewed({
                    value: "joker",
                    suit: CardSuits.b,
                    deckSlug: deckId,
                  })
                }
                shallow={true}
                scroll={false}
                pathname={pathname}
                query={query}
                suit={CardSuits.b}
                deckId={deckId}
                cards={filteredCards["joker"]["black"]}
                css={{ justifySelf: "flex-start" }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default AllEntriesBlock;
