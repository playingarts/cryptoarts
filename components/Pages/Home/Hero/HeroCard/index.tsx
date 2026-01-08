import Card from "../../../../Card";
import { useSize } from "../../../../SizeProvider";
import { breakpoints } from "../../../../../source/enums";
import { FC, ReactNode, useEffect, useState } from "react";
import { useHomeCards } from "../../../../../hooks/card";

const HeroCard: FC<{ setCard: (arg0: GQL.Card) => void }> = ({ setCard }) => {
  const { width } = useSize();

  const { cards } = useHomeCards();
  const [index, setIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all hero card images before showing
  useEffect(() => {
    if (!cards || cards.length === 0) {
      return;
    }

    let loadedCount = 0;
    const totalImages = cards.length;

    cards.forEach((card) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = card.img;
    });
  }, [cards]);

  useEffect(() => {
    if (!cards || !imagesLoaded) {
      return;
    }

    setCard(cards[index]);
  }, [cards, index, imagesLoaded]);

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
      {!cards || !imagesLoaded
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
      {!cards || !imagesLoaded ? null : (
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
