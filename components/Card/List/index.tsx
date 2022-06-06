import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import { useCards } from "../../../hooks/card";
import { OwnedCard } from "../../../pages/[deckId]";
import Card from "../../Card";
import Grid from "../../Grid";
import Link from "../../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  deckId: string;
  metamaskProps?: {
    account: string | null;
    ownedCards: OwnedCard[];
  };
}

const CardList: FC<Props> = ({ deckId, metamaskProps, ...props }) => {
  const { query } = useRouter();
  const { cards, loading } = useCards({
    variables: { deck: deckId },
  });

  if (loading || !cards) {
    return null;
  }

  return (
    <Grid
      {...props}
      css={(theme) => ({
        display: "flex",
        rowGap: theme.spacing(6),
        flexWrap: "wrap",
        justifyContent: "center",
      })}
    >
      {cards.map((card) => (
        <Link key={card._id} href={`/${query.deckId}/${card.artist.slug}`}>
          <Card
            css={(theme) => ({
              color: metamaskProps
                ? theme.colors.text_subtitle_light
                : theme.colors.text_subtitle_dark,
              ":hover": {
                color: metamaskProps
                  ? theme.colors.text_title_light
                  : theme.colors.text_title_dark,
              },
            })}
            card={card}
            owned={
              metamaskProps &&
              metamaskProps.ownedCards.findIndex(
                (owned) =>
                  owned.suit === card.suit && owned.value === card.value
              ) !== -1
            }
          />
        </Link>
      ))}
    </Grid>
  );
};

export default CardList;
