import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import Card from "../Card";
import Link from "../Link";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: GQL.Card[];
}

const CardsBlock: FC<Props> = ({ cards, ...props }) => {
  const { query } = useRouter();

  return (
    <div {...props}>
      <div
        css={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gridColumnGap: theme.spacing(3),
          marginTop: -theme.spacing(6),
        })}
      >
        {cards.map((card) => (
          <Link
            href={{ query: { ...query, cardId: card._id } }}
            key={card._id}
            css={(theme) => ({
              marginTop: theme.spacing(6),
            })}
          >
            <Card card={card} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardsBlock;
