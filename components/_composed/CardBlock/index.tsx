import { FC } from "react";
import CardBlock from "../../CardsPage/Block";
import Layout, { Props as LayoutProps } from "../../Layout";

export interface Props extends LayoutProps {
  card: GQL.Card;
  cardOfTheDay?: boolean;
}

const ComposedCardBlock: FC<Props> = ({ cardOfTheDay, card, ...props }) => (
  <Layout
    {...props}
    css={(theme) => ({
      paddingBottom: theme.spacing(14),
      paddingTop: theme.spacing(14),
    })}
  >
    <CardBlock stick={14} cardOfTheDay={cardOfTheDay} card={card} />
  </Layout>
);

export default ComposedCardBlock;
