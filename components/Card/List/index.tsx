import { FC, HTMLAttributes, Fragment, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { breakpoints } from "../../../source/enums";
import Card from "../../Card";
import Grid from "../../Grid";
import Line from "../../Line";
import Link, { Props as LinkProps } from "../../Link";
import Quote from "../../Quote";
import { useSize } from "../../SizeProvider";

export interface Props extends HTMLAttributes<HTMLElement> {
  // status?:
  //   | "initializing"
  //   | "unavailable"
  //   | "notConnected"
  //   | "connecting"
  //   | "connected";
  // metamaskProps?: {
  //   account: string | null;
  //   ownedCards: OwnedCard[];
  // };
  cards: (GQL.Card & Pick<LinkProps, "href"> & { owned?: boolean })[];
  sorted?: boolean;
  // dark: boolean;
  palette?: "light" | "dark";
  quotesBetweenRows?: boolean;
}

const CardList: FC<Props> = ({
  palette = "light",
  cards,
  sorted,
  // status,
  quotesBetweenRows,
  ...props
}) => {
  const cardSlug = cards && cards[0] && cards[0].artist.slug;
  const { width } = useSize();

  const { width: divWidth, ref } = useResizeDetector({
    refreshMode: "throttle",
    refreshRate: 100,
  });

  const cardsInRow =
    divWidth &&
    Math.floor(
      (divWidth + (width < breakpoints.sm ? 25 : 42)) /
        (width < breakpoints.sm ? 185 : 272)
    );

  const [quoteCards, setQuoteCards] = useState<{ [x: number]: GQL.Card }>();

  useEffect(() => {
    if (!cards || !cardsInRow || !quotesBetweenRows) {
      return;
    }

    const tempCards: typeof quoteCards = {};

    const interval = cardsInRow * 2;

    for (let i = interval - 1; i < cards.length; i = i + interval) {
      if (i + (interval - 1) >= cards.length) {
        continue;
      }

      const uncheckedCards: number[] = Array.from(
        { length: interval },
        (_v, ind) => ind + i
      );

      const getCard: () => GQL.Maybe<GQL.Card> = () => {
        if (uncheckedCards.length === 0) {
          return undefined;
        }
        const index = i - Math.floor(Math.random() * interval);
        const card = cards[index];

        if (card.info) {
          return card;
        }

        uncheckedCards.splice(
          uncheckedCards.findIndex((item) => item === index),
          1
        );
        return card.info ? card : getCard();
      };

      const card = getCard();
      // const card = cards[i - 3];

      if (!card) {
        continue;
      }

      tempCards[i] = card;
    }
    setQuoteCards(tempCards);
  }, [cardSlug, cardsInRow]);

  return (
    <div
      ref={ref}
      {...props}
      css={(theme) => ({
        gridColumn: "1/-1",
        display: "flex",
        gap: theme.spacing(4.2),
        rowGap: theme.spacing(6),
        flexWrap: "wrap",
        justifyContent: "center",

        [theme.maxMQ.sm]: {
          maxWidth: theme.spacing(74),
          width: "100%",
          margin: "auto",
          gap: theme.spacing(2.5),
          rowGap: theme.spacing(3),
        },
      })}
    >
      {cards.map((card, index) => {
        return (
          <Fragment key={card._id}>
            <Link href={card.href} scroll={true}>
              <Card
                sorted={sorted}
                interactive={true}
                css={(theme) => ({
                  color:
                    palette === "dark"
                      ? theme.colors.text_subtitle_light
                      : theme.colors.text_subtitle_dark,
                  [theme.mq.sm]: {
                    ":hover": {
                      color:
                        // status === "connected" && metamaskProps
                        palette === "dark"
                          ? theme.colors.text_title_light
                          : theme.colors.text_title_dark,
                    },
                  },
                })}
                card={card}
                owned={card.owned}
              />
            </Link>

            {quotesBetweenRows && quoteCards && quoteCards[index] && (
              <Grid
                short={true}
                css={(theme) => [
                  {
                    width: divWidth && divWidth - ((divWidth + 25) % 185),
                    [theme.mq.sm]: {
                      width: "100%",
                    },
                  },
                ]}
              >
                <Line
                  palette={palette}
                  css={(theme) => [
                    {
                      width: "100%",
                      gridColumn: "1/-1",
                      marginBottom: theme.spacing(3),
                      [theme.mq.sm]: {
                        marginBottom: theme.spacing(6),
                      },
                    },
                  ]}
                />
                <Quote
                  cardList={true}
                  artist={quoteCards[index].artist}
                  vertical={width <= breakpoints.sm}
                  palette={palette}
                  artistOnTopMobile={true}
                  css={(theme) => [
                    {
                      // width: "100%",
                      width: "fit-content",
                      margin: "0 auto",
                      gridColumn: "1/-1",
                      color:
                        palette === "dark"
                          ? theme.colors.text_subtitle_light
                          : theme.colors.text_subtitle_dark,
                      marginBottom: theme.spacing(3),
                    },
                  ]}
                  truncate={5}
                >
                  {quoteCards[index].info}
                </Quote>
              </Grid>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default CardList;
