import { FC, HTMLAttributes, useEffect } from "react";
import { useLoadHeroCards } from "../../../../../hooks/card";
import { useRouter } from "next/router";
import Card from "../../../../Card";

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
      {heroCards.length === 0 ? null : (
        <>
          {heroCards[1] && (
            <Card
              animated
              noArtist
              size="hero"
              card={heroCards[1]}
              css={[{ left: 308.35, rotate: "15deg" }]}
            />
          )}
          {heroCards[0] && (
            <Card
              animated
              noArtist
              size="hero"
              card={heroCards[0]}
              css={[{ left: 61.07, rotate: "-15deg" }]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HeroCards;
