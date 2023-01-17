import { forwardRef, ForwardRefRenderFunction } from "react";
import { OwnedCard } from "../../../pages/[deckId]";
import CardBlock from "../../Card/Block";
import Layout, { Props as LayoutProps } from "../../Layout";

export interface Props extends LayoutProps {
  card: GQL.Card;
  deck: GQL.Deck;
  cardOfTheDay?: boolean;
  ownedCards?: OwnedCard[];
  contest?: boolean;
}

const ComposedCardBlock: ForwardRefRenderFunction<HTMLElement, Props> = (
  { ownedCards, cardOfTheDay, card, deck, contest, ...props },
  ref
) => (
  <Layout
    {...props}
    css={(theme) => [
      cardOfTheDay
        ? {
            [theme.mq.md]: {
              paddingTop: theme.spacing(6),
              paddingBottom: theme.spacing(6),
            },
            [theme.maxMQ.md]: {
              paddingTop: theme.spacing(6),
              paddingBottom: theme.spacing(6),
            },
            [theme.maxMQ.sm]: {
              paddingTop: theme.spacing(2.5),
              paddingBottom: theme.spacing(2.5),
            },
          }
        : {
          [theme.mq.md]: {
            paddingTop: theme.spacing(14),
            paddingBottom: theme.spacing(10),
          },
          [theme.maxMQ.md]: {
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
          },
            [theme.maxMQ.sm]: {
              paddingTop: theme.spacing(10.5),
              paddingBottom: theme.spacing(3),
            },
          },
      {
      },
      contest && {
        // minHeight: "100vh",
        [theme.maxMQ.sm]: {
          marginBottom: theme.spacing(2),
        },
      },
    ]}
    ref={ref}
  >
    <CardBlock
      ownedCards={ownedCards}
      stick={14}
      contest={contest}
      cardOfTheDay={cardOfTheDay}
      card={card}
      deck={deck}
    />
  </Layout>
);

export default forwardRef(ComposedCardBlock);
