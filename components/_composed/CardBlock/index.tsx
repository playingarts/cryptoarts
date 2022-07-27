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
      {
        paddingBottom: theme.spacing(14),
        paddingTop: theme.spacing(14),
        [theme.maxMQ.sm]: {
          paddingBottom: theme.spacing(2.5),
          paddingTop: theme.spacing(11.5),
        },
      },
      contest && {
        minHeight: "100vh",
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
