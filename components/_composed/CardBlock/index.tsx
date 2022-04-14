import { forwardRef, ForwardRefRenderFunction } from "react";
import CardBlock from "../../Card/Block";
import Layout, { Props as LayoutProps } from "../../Layout";

export interface Props extends LayoutProps {
  card: GQL.Card;
  deck: GQL.Deck;
  cardOfTheDay?: boolean;
}

const ComposedCardBlock: ForwardRefRenderFunction<HTMLElement, Props> = (
  { cardOfTheDay, card, deck, ...props },
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
    <CardBlock stick={14} cardOfTheDay={cardOfTheDay} card={card} deck={deck} />
  </Layout>
);

export default forwardRef(ComposedCardBlock);
