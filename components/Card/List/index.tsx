import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import Card from "../../Card";
import Grid from "../../Grid";
import Link from "../../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: GQL.Card[];
}

const CardList: FC<Props> = ({ cards, ...props }) => {
  const { query } = useRouter();

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
        <Link key={card._id} href={{ query: { ...query, cardId: card._id } }}>
          <Card card={card} />
        </Link>
      ))}
    </Grid>
  );
};

export default CardList;
