import { FC } from "react";
import CardBlock from "../../Card/Block";
import Layout, { Props as LayoutProps } from "../../Layout";

export interface Props extends LayoutProps {
  card: GQL.Card;
  deck: GQL.Deck;
  cardOfTheDay?: boolean;
}

const ComposedCardBlock: FC<Props> = ({
  cardOfTheDay,
  card,
  deck,
  ...props
}) => (
  <Layout
    {...props}
    css={(theme) => ({
      paddingBottom: theme.spacing(14),
      paddingTop: theme.spacing(14),
    })}
  >
    <CardBlock stick={14} cardOfTheDay={cardOfTheDay} card={card} deck={deck} />
  </Layout>
);

export default ComposedCardBlock;
