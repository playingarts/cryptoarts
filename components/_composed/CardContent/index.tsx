import Head from "next/head";
import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  useEffect,
} from "react";
import { useCards, useLoadCards } from "../../../hooks/card";
import { useLoadLosers, useLosers } from "../../../hooks/loser";
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

  const { loadCards, cards: winners, loading } = (typeof window === undefined
    ? (useCards as typeof useLoadCards)
    : useLoadCards)();
  const { loadLosers, losers, loading: loadingLosers } = (typeof window ===
    undefined
    ? (useLosers as typeof useLoadLosers)
    : useLoadLosers)();

  useEffect(() => {
    if (loadCards) {
      loadCards({
        variables: {
          deck: deck._id,
        },
      });
    }

    if (loadLosers) {
      loadLosers({
        variables: {
          deck: deck._id,
        },
      });
    }
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
    : card.edition && deck.editions
    ? winners.filter(({ edition }) => edition === card.edition)
    : winners;

  const currentCardIndex = card
    ? cards.findIndex(({ _id }) => _id === card._id)
    : -2;
  const prevCard = card && cards[currentCardIndex - 1];
  const nextCard = card && cards[currentCardIndex + 1];

  return (
    <Fragment>
      {card && (
        <Head>
          <title>
            {(
              card.artist.name +
              " - " +
              (card.value === "joker"
                ? card.suit + " " + card.value
                : card.value +
                  (card.value !== "backside" ? " of " + card.suit : "")) +
              " for " +
              deck.title +
              " - Playing Arts"
            ).replace(/\b\w/g, (l) => l.toUpperCase())}
          </title>
          {card.info ? <meta name="description" content={card.info} /> : null}
        </Head>
      )}
      <CardNav
        stopOnMobile={true}
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
          css={(theme) => [
            {
              color: theme.colors.page_bg_light,
            },
          ]}
          ownedCards={ownedCards}
          contest={contest}
          card={card}
          deck={deck}
          ref={ref}
        />
      </CardNav>
    </Fragment>
  );
};

export default forwardRef(ComposedCardContent);
