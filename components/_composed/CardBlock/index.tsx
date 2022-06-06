import { forwardRef, ForwardRefRenderFunction } from "react";
import { OwnedCard } from "../../../pages/[deckId]";
import CardBlock from "../../Card/Block";
import Layout, { Props as LayoutProps } from "../../Layout";

export interface Props extends LayoutProps {
  card: GQL.Card;
  deck: GQL.Deck;
  cardOfTheDay?: boolean;
  ownedCards?: OwnedCard[];
}

const ComposedCardBlock: ForwardRefRenderFunction<HTMLElement, Props> = (
  { ownedCards, cardOfTheDay, card, deck, ...props },
  ref
) => (
  <Layout
    {...props}
    css={(theme) => ({
      paddingBottom: theme.spacing(14),
      paddingTop: theme.spacing(14),
    })}
    ref={ref}
  >
    <CardBlock
      ownedCards={ownedCards}
      stick={14}
      cardOfTheDay={cardOfTheDay}
      card={card}
      deck={deck}
    />
  </Layout>
);

export default forwardRef(ComposedCardBlock);
