import { FC, HTMLAttributes, useEffect } from "react";
import { useLoadHeroCards } from "../../../../../hooks/card";
import { useRouter } from "next/router";

const HeroCards: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    heroCards = [
      {
        _id: "card01",
        video: "",
        img: null,
        value: "",
        suit: "",
        info: "",
        deck: "",
        artist: "",
      },
      {
        _id: "card02",
        video: "",
        img: null,
        value: "",
        suit: "",
        info: "",
        deck: "",
        artist: "",
      },
    ] as unknown as GQL.Card[],
    loadHeroCards,
  } = useLoadHeroCards();

  const {
    query: { deckId },
  } = useRouter();

  useEffect(() => {
    if (!deckId) {
      return;
    }
    loadHeroCards({ variables: { deck: "", slug: deckId } });
  }, [deckId, loadHeroCards]);

  return (
    <div
      css={[
        {
          gridColumn: "span 6",
          position: "relative",
          "> *": {
            width: 329,
            height: 463,
            position: "absolute",
            top: -37.59,
            borderRadius: 20,
          },
        },
      ]}
    >
      <img
        css={[{ left: 308.35, rotate: "15deg" }]}
        src={heroCards[1].img}
        alt=""
      />
      <img
        css={[{ left: 61.07, rotate: "-15deg" }]}
        src={heroCards[0].img}
        alt=""
      />
    </div>
  );
};

export default HeroCards;
