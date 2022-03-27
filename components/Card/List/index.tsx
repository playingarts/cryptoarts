import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import { useCards } from "../../../hooks/card";
import Card from "../../Card";
import Grid from "../../Grid";
import Link from "../../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  deckId: string;
}

const CardList: FC<Props> = ({ deckId, ...props }) => {
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
          <Card card={card} />
        </Link>
      ))}
    </Grid>
  );
};

export default CardList;
