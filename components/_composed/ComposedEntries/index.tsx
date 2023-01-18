import { forwardRef, ForwardRefRenderFunction, useEffect } from "react";
import { useLoadCards } from "../../../hooks/card";
import { useLosersValues } from "../../../hooks/loser";
import AllEntriesBlock from "../../AllEntriesBlock";
import BlockTitle from "../../BlockTitle";
import Layout, { Props as LayoutProps } from "../../Layout";

const ComposedEntries: ForwardRefRenderFunction<
  HTMLElement,
  { deck: GQL.Deck; contest?: boolean } & LayoutProps
> = ({ deck, contest, ...props }, ref) => {
  const { cards: winners, loading: winnersLoading, loadCards } = useLoadCards();

  useEffect(() => {
    if (!deck.editions) {
      loadCards({
        variables: { deck: deck._id },
      });
      return;
    }

    deck.editions.map((edition) => {
      loadCards({
        variables: { deck: deck._id, edition: edition.name },
      });
    });
  }, [deck]);

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
      css={(theme) => [
        contest && { borderRadius: 0 + "!important" },
        {
          [theme.mq.sm]: {
            background: theme.colors.page_bg_gray,
            paddingTop: theme.spacing(12),
            paddingBottom: theme.spacing(10),
          },
        },
      ]}
      ref={ref}
      data-id="block-contest"
      {...props}
      notTruncatable={contest}
    >
      <BlockTitle
        variant="h3"
        title={`All ${
          allCards.filter((card) => card.value !== "backside").length
        } Entries`}
        // subTitleText={`${
        //   allCards.filter((card) => card.value !== "backside").length
        // } entries submitted for the contest`}
        css={(theme) => ({
          [theme.maxMQ.sm]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(1),
          },
        })}
      >
        <AllEntriesBlock
          css={(theme) => ({
            maxWidth: theme.spacing(105),
            margin: "auto",
            paddingTop: theme.spacing(1),
            [theme.maxMQ.sm]: {
              paddingBottom: theme.spacing(5),
              paddingTop: theme.spacing(2.5),
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
            },
          })}
          cards={allCards.filter((card) => card.value !== "backside")}
          deckId={deck.slug}
        />
      </BlockTitle>
    </Layout>
  );
};

export default forwardRef(ComposedEntries);
