import { useEffect, HTMLAttributes, FC, RefObject } from "react";
import { Sections } from "../../../source/enums";
import BlockTitle from "../../BlockTitle";
import CardList from "../../Card/List";
import Grid from "../../Grid";
import Layout from "../../Layout";
import MetamaskButton from "../../MetamaskButton";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: GQL.Card[];
  deckId: string;
  section?: string;
  cardsRef: RefObject<HTMLElement>;
}

const ComposedCardListSection: FC<Props> = ({
  cards,
  deckId,
  section,
  cardsRef,
  ...props
}) => {
  useEffect(() => {
    if (section !== Sections.cards || !cardsRef.current) {
      return;
    }

    cardsRef.current.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }, []);

  return (
    <Layout
      {...props}
      ref={cardsRef}
      css={(theme) => ({
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
      })}
    >
      <Grid>
        <BlockTitle
          title="Cards"
          subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
          {...(deckId === "crypto" && {
            action: <MetamaskButton />,
          })}
          css={(theme) => ({
            gridColumn: "2 / span 10",
            marginBottom: theme.spacing(4),
          })}
        />
      </Grid>

      <CardList cards={cards} />
    </Layout>
  );
};

export default ComposedCardListSection;
