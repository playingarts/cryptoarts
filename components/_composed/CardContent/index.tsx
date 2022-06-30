import { forwardRef, ForwardRefRenderFunction, useEffect } from "react";
import { useRouter } from "next/router";
import { useLoadCards } from "../../../hooks/card";
import { useLoadLosers } from "../../../hooks/loser";
import { OwnedCard } from "../../../pages/[deckId]";
import { Sections } from "../../../source/enums";
import CardNav, { Props as CardNavProps } from "../../Card/Nav";
import ComposedCardBlock from "../CardBlock";

interface Props extends CardNavProps {
  deck: GQL.Deck;
  artistId: string;

  contest: boolean;
  ownedCards?: OwnedCard[];
}

const ComposedCardContent: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { ownedCards, artistId, deck, contest, ...props },

  ref
) => {
  const {
    query: { cardValue, cardSuit },
  } = useRouter();

  const { loadCards, cards: winners, loading } = useLoadCards();
  const { loadLosers, losers, loading: loadingLosers } = useLoadLosers();

  useEffect(() => {
    loadCards({
      variables: {
        deck: deck._id,
      },
    });

    loadLosers({
      variables: {
        deck: deck._id,
      },
    });
  }, [deck, loadCards, loadLosers]);

  if (loading || !winners || loadingLosers) {
    return null;
  }

  const allCards = [...winners, ...(losers ? losers : [])] as GQL.Card[];

  const card = artistId
    ? allCards.find(({ artist }) => artist.slug === artistId)
    : undefined;

  if (!card) {
    return null;
  }

  const cards = contest
    ? allCards.filter(
        ({ suit, value }) => value === card.value && suit === card.suit
      )
    : winners;

  const currentCardIndex = card
    ? cards.findIndex(({ _id }) => _id === card._id)
    : -2;
  const prevCard = card && cards[currentCardIndex - 1];
  const nextCard = card && cards[currentCardIndex + 1];

  return (
    <CardNav
      {...props}
      ref={ref}
      disableKeys={!!cardValue && !!cardSuit}
      prevLink={
        prevCard && {
          pathname: `/${deck.slug}${contest ? "/contest" : ""}/${
            prevCard.artist.slug
          }`,
        }
      }
      nextLink={
        nextCard && {
          pathname: `/${deck.slug}${contest ? "/contest" : ""}/${
            nextCard.artist.slug
          }`,
        }
      }
      closeLink={{
        pathname: `/${deck.slug}`,
        query: contest
          ? {
              section: Sections.contest,
              scrollIntoView: "[data-id='block-contest']",
            }
          : {
              scrollIntoView: `[href*="/${deck.slug}/${card.artist.slug}"]`,
            },
      }}
    >
      <ComposedCardBlock
        ownedCards={ownedCards}
        contest={contest}
        card={card}
        deck={deck}
        ref={ref}
      />
    </CardNav>
  );
};

export default forwardRef(ComposedCardContent);
