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
        })}
      >
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardsBlock;
