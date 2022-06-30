import { forwardRef, ForwardRefRenderFunction } from "react";
import { useCards } from "../../../hooks/card";
import { useLosersValues } from "../../../hooks/loser";
import AllEntriesBlock from "../../AllEntriesBlock";
import BlockTitle from "../../BlockTitle";
import Grid from "../../Grid";
import Layout, { Props as LayoutProps } from "../../Layout";

const ComposedEntries: ForwardRefRenderFunction<
  HTMLElement,
  { deck: GQL.Deck } & LayoutProps
> = ({ deck, ...props }, ref) => {
  const { cards: winners, loading: winnersLoading } = useCards({
    variables: { deck: deck._id },
  });

  const { losers, loading } = useLosersValues({
    variables: { deck: deck._id },
  });

  if (
    loading ||
    !losers ||
    losers.length === 0 ||
    !deck ||
    !winners ||
    winnersLoading
  ) {
    return null;
  }

  const allCards = [...winners, ...losers];

  return (
    <Layout
      css={(theme) => ({
        background: theme.colors.page_bg_gray,
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(8.5),
      })}
      ref={ref}
      data-id="block-contest"
      {...props}
    >
      <Grid>
        <BlockTitle
          title={"All Entries"}
          subTitleText={`All ${
            allCards.filter((card) => card.value !== "backside").length
          } entries submitted for the contest`}
          css={(theme) => ({
            gridColumn: "2 / span 10",
            marginBottom: theme.spacing(4),
          })}
        />
      </Grid>

      <AllEntriesBlock
        css={(theme) => ({ maxWidth: theme.spacing(105), margin: "auto" })}
        cards={allCards.filter((card) => card.value !== "backside")}
        deckId={deck.slug}
      />
    </Layout>
  );
};

export default forwardRef(ComposedEntries);
