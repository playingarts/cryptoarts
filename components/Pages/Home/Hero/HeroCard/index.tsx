import Card from "../../../../Card";
import { useSize } from "../../../../SizeProvider";
import { breakpoints } from "../../../../../source/enums";
import { FC, ReactNode, useEffect, useState, useRef } from "react";
import { useHomeCards } from "../../../../../hooks/card";

type HomeCard = {
  _id: string;
  img: string;
  cardBackground: string;
};

type HeroCardProps = {
  setCard: (card: GQL.Card) => void;
  onReady?: () => void;
  initialCards?: HomeCard[];
};

const HeroCard: FC<HeroCardProps> = ({ setCard, onReady, initialCards }) => {
  const { width } = useSize();
  const readyCalledRef = useRef(false);

  // Skip GraphQL query if we have initial cards from SSR
  const { cards: fetchedCards } = useHomeCards({
    skip: !!initialCards?.length,
  });

  // Use SSR cards if available, otherwise use fetched cards
  const cards = (initialCards as unknown as GQL.Card[]) || fetchedCards;
  const [index, setIndex] = useState(0);

  // Set card and signal ready when cards data arrives
  useEffect(() => {
    if (!cards || cards.length === 0) {
      return;
    }

    setCard(cards[index]);

    // Only call onReady once
    if (!readyCalledRef.current) {
      readyCalledRef.current = true;
      onReady?.();
    }
  }, [cards, index]);

  return (
    <div
      css={[
        {
          position: "relative",
          "> *": {
            // boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
          },
          ">:nth-child(2)": { transform: "rotate(5deg)" },
          ">:nth-child(1)": { transform: "rotate(-12deg)" },
          ">:not(:last-child)": {
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
          },
        },
      ]}
    >
      {!cards
        ? null
        : cards.reduce((prev, card, i) => {
            if (i === index) {
              return prev;
            }
            const cardNode = (
              <Card
                key={"HeroCard" + card._id}
                size={width >= breakpoints.sm ? "big" : "nano"}
                noArtist
                card={card}
              />
            );
            return index === 0 || i < index
              ? [cardNode, ...prev]
              : [...prev, cardNode];
          }, [] as ReactNode[])}
      {!cards ? null : (
        <Card
          key={"HeroCard" + cards[index]._id}
          size={width >= breakpoints.sm ? "big" : "nano"}
          noArtist
          card={cards[index]}
          noFavorite
          onClick={() => {
            setIndex(index === cards.length - 1 ? 0 : index + 1);
          }}
        />
      )}
    </div>
  );
};

export default HeroCard;
