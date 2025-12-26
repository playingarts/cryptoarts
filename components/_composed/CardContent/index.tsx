import Head from "next/head";
import { useRouter } from "next/router";
import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  useEffect,
} from "react";
import { useLoadCards } from "../../../hooks/card";
import { useLoadLosers } from "../../../hooks/loser";
import { mockEmptyCard } from "../../../mocks/card";
import { OwnedCard } from "../../../pages/[deckId]";
import { Sections } from "../../../source/enums";
import CardNav, { Props as CardNavProps } from "../../Card/Nav";
import ComposedCardBlock from "../CardBlock";

interface Props extends CardNavProps {
  deck?: GQL.Deck;
  artistId: string;

  contest: boolean;
  ownedCards?: OwnedCard[];
}

const ComposedCardContent: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { ownedCards, artistId, deck, contest, ...props },
  ref
) => {
  const {
    query: { cardValue, cardSuit, deckId },
  } = useRouter();

  const {
    loadCards,
    cards: winners = Array.from({ length: 56 }).map((_, index) => ({
      ...mockEmptyCard,
      _id: index + "listCard",
      noInfo: true,
      background: deck ? deck.cardBackground : undefined,
      href: "/" + deckId || "",
      owned: false,
    })),
  } = useLoadCards();
  // typeof window === undefined
  //   ? (useCards as typeof useLoadCards)
  //   : useLoadCards
  const { loadLosers, losers } = useLoadLosers();
  // typeof window === undefined
  //   ? (useLosers as typeof useLoadLosers)
  //   : useLoadLosers

  useEffect(() => {
    if (!deck) {
      return;
    }

    loadCards({
      variables: {
        deck: deck._id,
      },
    });

    if (loadLosers) {
      loadLosers({
        variables: {
          deck: deck._id,
        },
      });
    }
  }, [deck, loadCards, loadLosers]);

  // if (loading || !winners || loadingLosers) {
  //   return null;
  // }

  const allCards = [...winners, ...(losers || [])] as GQL.Card[];

  const card = artistId
    ? allCards.find(({ artist }) => artist.slug === artistId)
    : undefined;

  // if (!card) {
  //   return null;
  // }

  const cards = !card
    ? [mockEmptyCard]
    : contest
    ? allCards.filter(
        ({ suit, value }) => value === card.value && suit === card.suit
      )
    : card.edition && deck && deck.editions
    ? winners.filter(({ edition }) => edition === card.edition)
    : winners;

  const currentCardIndex =
    card && cards.findIndex(({ _id }) => _id === card._id);
  const prevCard =
    currentCardIndex !== undefined && cards[currentCardIndex - 1];
  const nextCard =
    currentCardIndex !== undefined && cards[currentCardIndex + 1];

  return (
    <Fragment>
      {card && deck && (
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
          prevCard && typeof deckId === "string"
            ? {
                pathname: `/${deckId}${contest ? "/contest" : ""}/${
                  prevCard.artist.slug
                }`,
              }
            : undefined
        }
        nextLink={
          nextCard && typeof deckId === "string"
            ? {
                pathname: `/${deckId}${contest ? "/contest" : ""}/${
                  nextCard.artist.slug
                }`,
              }
            : undefined
        }
        closeLink={
          typeof deckId === "string" && card
            ? {
                pathname: `/${deckId}`,
                query: contest
                  ? {
                      section: Sections.contest,
                      scrollIntoView: "[data-id='block-contest']",
                    }
                  : {
                      scrollIntoView: `[href*="/${deckId}/${card.artist.slug}"]`,
                    },
              }
            : undefined
        }
      >
        <ComposedCardBlock
          css={(theme) => [
            {
              color: theme.colors.page_bg_light,
            },
          ]}
          ownedCards={ownedCards}
          contest={contest}
          card={card || cards[0]}
          deck={deck}
          ref={ref}
        />
      </CardNav>
    </Fragment>
  );
};

export default forwardRef(ComposedCardContent);
