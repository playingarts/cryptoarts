import { colord } from "colord";
import { FC } from "react";
import { useCards } from "../../../hooks/card";
import { useLosers } from "../../../hooks/loser";
import BlockTitle from "../../BlockTitle";
import Grid from "../../Grid";
import Layout from "../../Layout";
import Text from "../../Text";

const ArtContest: FC<{ deck: GQL.Deck }> = ({ deck }) => {
  const { cards: winners } = useCards({ variables: { deck: deck._id } });
  const { losers } = useLosers({
    variables: { deck: deck._id },
  });

  if (!winners || !losers) {
    return null;
  }

  const cards = [...winners, ...losers].filter(
    (card) =>
      card.artist && card.artist.country && card.artist.name && card.artist.slug
  ) as GQL.Card[];
  // ) as unknown) as (
  //   | GQL.Card
  //   | (Omit<GQL.Loser, "artist"> & {
  //       artist: { name: string; slug: string; country: string };
  //     })
  // )[];
  return (
    <Layout
      css={(theme) => ({
        background: "#F9F9F9",
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(10.5),
        [theme.maxMQ.sm]: {
          paddingBottom: theme.spacing(2.5),
        },
      })}
      notTruncatable={true}
    >
      <BlockTitle
        title="Art Contest"
        subTitleText={deck.info}
        css={(theme) => ({
          gridColumn: "2 / span 10",
          marginBottom: theme.spacing(4),
        })}
      />
      <Grid short={true}>
        <div css={{ gridColumn: "span 2" }}>
          <Text variant="h3" css={{ margin: 0 }}>
            {Array.from(new Set(cards.map((card) => card.artist.name))).length}
          </Text>
          <Text
            variant="h6"
            css={(theme) => ({
              margin: 0,
              color: colord(theme.colors.dark_gray).alpha(0.5).toRgbString(),
            })}
          >
            participants
          </Text>
        </div>
        <div css={{ gridColumn: "span 2" }}>
          <Text variant="h3" css={{ margin: 0 }}>
            {
              Array.from(new Set(cards.map((card) => card.artist.country)))
                .length
            }
          </Text>
          <Text
            variant="h6"
            css={(theme) => ({
              margin: 0,
              color: colord(theme.colors.dark_gray).alpha(0.5).toRgbString(),
            })}
          >
            countries
          </Text>
        </div>
        <div css={{ gridColumn: "span 2" }}>
          <Text variant="h3" css={{ margin: 0 }}>
            {winners.length}
          </Text>
          <Text
            variant="h6"
            css={(theme) => ({
              margin: 0,
              color: colord(theme.colors.dark_gray).alpha(0.5).toRgbString(),
            })}
          >
            winners
          </Text>
        </div>
      </Grid>
    </Layout>
  );
};

export default ArtContest;
