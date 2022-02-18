import throttle from "just-throttle";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { useLoadRandomCards } from "../../../hooks/card";
import Card from "..";

interface Props extends HTMLAttributes<HTMLDivElement> {
  deck: GQL.Deck;
}

const CardFan: FC<Props> = ({ deck, ...props }) => {
  const { loadRandomCards, cards } = useLoadRandomCards();
  const ref = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(1);
  const getPercent = (top: number, height: number, offset = 1) =>
    1 -
    Math.max(
      0,
      Math.min(1, (top + (height / 2) * offset) / (window.innerHeight / 2) - 1)
    );
  const cardsLength = 5;

  useEffect(() => {
    const calculateSpread = throttle(() => {
      if (!ref.current) {
        return;
      }

      const { top, height } = ref.current.getBoundingClientRect();

      setSpread(1 + getPercent(top, height, getPercent(top, height)));
    }, 10);

    document.addEventListener("scroll", calculateSpread);
    calculateSpread();

    return () => document.removeEventListener("scroll", calculateSpread);
  }, []);

  useEffect(() => {
    loadRandomCards({ variables: { deck: deck._id, limit: cardsLength } });
  }, [loadRandomCards, deck._id]);

  if (!cards) {
    return null;
  }

  return (
    <div
      {...props}
      ref={ref}
      css={{ position: "relative", display: "inline-block" }}
    >
      {cards.map((card, index) => {
        index = index - Math.floor(cardsLength / 2);

        return (
          <Card
            key={card._id}
            card={card}
            isStatic={true}
            noInfo={true}
            interactive={true}
            css={{
              top: 0,
              position: index === 0 ? "relative" : "absolute",
              zIndex: cardsLength - 1 * index,
            }}
            style={{
              transform: `translate3d(${index * 16 * spread}%, ${
                Math.abs(index) * 4
              }%, 0) rotate3d(0, 0, 1, ${index * 4 * spread}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default CardFan;
