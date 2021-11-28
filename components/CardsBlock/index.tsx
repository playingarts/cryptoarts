import { FC, HTMLAttributes } from "react";
import Card from "../Card";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: GQL.Card[];
}

const CardsBlock: FC<Props> = ({ cards, ...props }) => {
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
          <Card
            key={card._id}
            card={card}
            css={(theme) => ({
              marginTop: theme.spacing(6),
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsBlock;
