import { FC, HTMLAttributes } from "react";
import Card from "../Card";

interface Props extends HTMLAttributes<HTMLElement> {
  cards: GQL.Card[];
}

const CardsBlock: FC<Props> = ({ cards, ...props }) => {
  return (
    <div {...props}>
      <div
        css={{
          marginTop: -25,
          marginBottom: -25,
          position: "relative",
        }}
      >
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gridColumnGap: 30,
          }}
        >
          {cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsBlock;
