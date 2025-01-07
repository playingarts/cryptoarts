import { colord } from "colord";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useViewed } from "../../contexts/viewedContext";
import { useLoadCards } from "../../hooks/card";
import { useDeck } from "../../hooks/deck";
import { useLoadLosers } from "../../hooks/loser";
import { CardSuits, Sections } from "../../source/enums";
import BlockTitle from "../BlockTitle";
import Button from "../Button";
import CardList from "../Card/List";
import CardNav from "../Card/Nav";
import Cross from "../Icons/Cross";
import Layout from "../Layout";
import Link from "../Link";

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

const JokerSuits = ["red", "black"];

const Modal: FC = () => {
  const {
    query: { deckId, cardSuit, cardValue, ...query },
    pathname,
    push,
  } = useRouter();
  const { deck } = useDeck({ variables: { slug: deckId } });
  const { cards: winners, loadCards } = useLoadCards();
  const { losers, loadLosers } = useLoadLosers();

  const { addViewed } = useViewed();

  useEffect(() => {
    if (!deck) {
      return;
    }

    loadCards({ variables: { deck: deck._id } });
    loadLosers({ variables: { deck: deck._id } });
  }, [deck, loadLosers, loadCards]);

  useEffect(() => {
    if (!cardValue || !cardSuit) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [cardValue, cardSuit]);

  if (!cardValue || !cardSuit || !winners || !losers || !deck) {
    return null;
  }

  const cards = [...winners, ...losers];

  const AllCardValues = [...cardValues, "joker"];

  const suitIndex =
    cardValue === "joker"
      ? JokerSuits.indexOf(cardSuit as CardSuitsType)
      : cardSuits.indexOf(cardSuit as CardSuitsType);

  const prevSuit =
    cardValue === "joker"
      ? suitIndex !== 0
        ? JokerSuits[suitIndex - 1 >= 0 ? suitIndex - 1 : cardSuits.length - 1]
        : cardSuits[cardSuits.length - 1]
      : cardSuits[suitIndex - 1 >= 0 ? suitIndex - 1 : cardSuits.length - 1];

  const prevValue =
    suitIndex === 0
      ? AllCardValues[AllCardValues.indexOf(cardValue as string) - 1]
      : cardValue;

  const nextSuit =
    cardValue === "joker"
      ? JokerSuits[suitIndex + 1 >= cardSuits.length ? 0 : suitIndex + 1]
      : suitIndex === cardSuits.length - 1
      ? cardValue === "ace"
        ? JokerSuits[0]
        : cardSuits[0]
      : cardSuits[suitIndex + 1 >= cardSuits.length ? 0 : suitIndex + 1];

  const nextValue =
    suitIndex === cardSuits.length - 1
      ? AllCardValues[AllCardValues.indexOf(cardValue as string) + 1]
      : cardValue;

  return (
    <div
      css={(theme) => ({
        background: colord(theme.colors.dark_gray).alpha(0.7).toRgbString(),
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
      })}
      ref={(ref) => (ref !== null && ref.focus()) || undefined}
      onClick={() =>
        push(
          {
            href: pathname,
            query: { ...query, deckId, section: Sections.contest },
          },
          undefined,
          { scroll: false, shallow: true }
        )
      }
    >
      <div
        css={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        <div
          css={(theme) => ({
            margin: theme.spacing(1),
          })}
        >
          <Layout
            onClick={(e) => {
              e.stopPropagation();
            }}
            css={(theme) => ({
              maxWidth: theme.spacing(123),
              margin: "0 auto",
              zIndex: 20,
              backgroundColor: theme.colors.page_bg_light,
              paddingBottom: theme.spacing(6),
              paddingLeft: theme.spacing(1.5),
              paddingRight: theme.spacing(1.5),
              borderRadius: theme.spacing(1.5),
              position: "relative",

              [theme.maxMQ.sm]: {
                paddingLeft: theme.spacing(2.5),
                paddingRight: theme.spacing(2.5),
              },
            })}
            notTruncatable={true}
          >
            <CardNav
              css={(theme) => ({
                backgroundColor: theme.colors.page_bg_light,
                color: colord(theme.colors.text_title_light)
                  .alpha(1)
                  .toRgbString(),

                [theme.maxMQ.sm]: {
                  color: theme.colors.text_subtitle_dark,
                },
              })}
              options={{
                scroll: false,
              }}
              prevLinkOptions={{
                onClick: () =>
                  typeof prevValue === "string" &&
                  typeof prevSuit === "string" &&
                  addViewed({
                    value: prevValue,
                    suit: prevSuit,
                    deckSlug: deck.slug,
                  }),
              }}
              nextLinkOptions={{
                onClick: () =>
                  typeof nextValue === "string" &&
                  typeof nextSuit === "string" &&
                  addViewed({
                    value: nextValue,
                    suit: nextSuit,
                    deckSlug: deck.slug,
                  }),
              }}
              {...(nextValue &&
                nextSuit && {
                  nextLink: {
                    pathname: pathname,
                    query: {
                      deckId,
                      cardValue: nextValue,
                      cardSuit: nextSuit,
                      ...query,
                    },
                  },
                })}
              {...(prevValue &&
                prevSuit && {
                  prevLink: {
                    pathname: pathname,
                    query: {
                      deckId,
                      cardValue: prevValue,
                      cardSuit: prevSuit,
                      ...query,
                    },
                  },
                })}
            >
              <div
                css={(theme) => ({
                  position: "sticky",
                  top: 25,
                  zIndex: 1,
                  [theme.mq.sm]: {
                    paddingBottom: theme.spacing(6),
                  },
                  [theme.maxMQ.sm]: {
                    top: theme.spacing(1.5),
                  },
                })}
              >
                <Button
                  scroll={false}
                  shallow={true}
                  component={Link}
                  Icon={Cross}
                  href={{
                    pathname,
                    query: {
                      deckId,
                      scrollIntoView: "[data-id='block-contest']",
                      scrollIntoViewPosition: "start",
                      ...query,
                    },
                  }}
                  css={(theme) => ({
                    position: "absolute",
                    backgroundColor: "#ddd",
                    borderRadius: "50px",
                    color: colord(theme.colors.text_subtitle_dark)
                      .alpha(0.5)
                      .toRgbString(),
                    right: theme.spacing(1),
                    top: theme.spacing(1),
                    [theme.maxMQ.sm]: {
                      top: theme.spacing(-1),
                      right: theme.spacing(0),
                    },
                  })}
                />
              </div>
              <BlockTitle
                variant="h3"
                css={(theme) => ({
                  paddingBottom: theme.spacing(1),
                  gridColumn: "2 / span10",
                  color: "initial",
                })}
                title={
                  cardValue !== "joker" ? (
                    <span css={{ textTransform: "capitalize" }}>
                      {cardValue}{" "}
                      <span css={{ textTransform: "lowercase" }}>of</span>{" "}
                      {cardSuit}
                    </span>
                  ) : (
                    <span css={{ textTransform: "capitalize" }}>
                      {cardSuit} {cardValue}
                    </span>
                  )
                }
              />
              <div
                css={(theme) => ({
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing(3),
                  justifyContent: "center",
                })}
              >
                <CardList
                  css={(theme) => ({
                    paddingLeft: theme.spacing(6),
                    paddingRight: theme.spacing(6),
                    [theme.mq.sm]: {
                      paddingLeft: theme.spacing(12),
                      paddingRight: theme.spacing(12),
                    },
                  })}
                  cards={(cards as GQL.Card[])
                    .filter(
                      (card) =>
                        cardValue === card.value &&
                        cardSuit === card.suit &&
                        card.artist &&
                        card.img
                    )
                    .map((card) => ({
                      ...card,
                      href: {
                        pathname: "/[deckId]/contest/[artistId]",
                        query: {
                          artistId: card.artist.slug,
                          deckId,
                        },
                      },
                    }))}
                />
              </div>
            </CardNav>
          </Layout>
        </div>
      </div>
    </div>
  );
};

export default Modal;
