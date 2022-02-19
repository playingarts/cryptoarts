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
        rowGap: theme.spacing(6),
      })}
    >
      {cards.map((card) => (
        <div
          key={card._id}
          css={{
            gridColumn: "span 3",
          }}
        >
          <Link href={{ query: { ...query, cardId: card._id } }}>
            <Card card={card} />
          </Link>
        </div>
      ))}
    </Grid>
  );
};

export default CardList;
