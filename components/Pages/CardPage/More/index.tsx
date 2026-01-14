import { FC, HTMLAttributes, useMemo, useRef, useState } from "react";
import Intro from "../../../Intro";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../Grid";
import { useRouter } from "next/router";
import { useDeck } from "../../../../hooks/deck";
import { useCards } from "../../../../hooks/card";
import Card from "../../../Card";
import Link from "../../../Link";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../Pop";
import { sortCards } from "../../../../source/utils/sortCards";

const More: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  const ref = useRef<HTMLDivElement>(null);

  const {
    query: { deckId },
  } = useRouter();

  const { deck } = useDeck({
    variables: { slug: deckId },
  });

  const { cards } = useCards(
    deck && {
      variables: { deck: deck._id },
    }
  );

  // Sort cards: 2-Ace, spades/hearts/clubs/diamonds per value
  const sortedCards = useMemo(() => {
    return cards ? sortCards(cards) : undefined;
  }, [cards]);

  const [card, setCard] = useState<GQL.Card>();

  return (
    <>
      <Grid
        css={(theme) => [
          {
            background:
              theme.colors[deckId === "crypto" ? "darkBlack" : "soft_gray"],
          },
        ]}
      >
        <Intro
          css={[
            {
              gridColumn: "1/-1",
            },
          ]}
          arrowedText={`More from ` + (deck ? deck.title : null)}
          paragraphText="Other cards you may like."
          titleAsText
          bottom={
            <div css={[{ display: "flex", gap: 5, marginTop: 120 }]}>
              <NavButton
                css={[
                  deckId !== "crypto" && {
                    background: "white",
                  },
                  {
                    rotate: "180deg",
                  },
                ]}
                onClick={() => {
                  ref.current &&
                    ref.current.scrollBy({
                      behavior: "smooth",
                      left: -1293,
                    });
                }}
              />
              <NavButton
                css={
                  deckId !== "crypto" && [
                    {
                      background: "white",
                    },
                  ]
                }
                onClick={() => {
                  ref.current &&
                    ref.current.scrollBy({
                      behavior: "smooth",
                      left: 1293,
                    });
                }}
              />
            </div>
          }
        />
      </Grid>
      <Grid
        css={(theme) => [
          {
            background:
              theme.colors[deckId === "crypto" ? "darkBlack" : "soft_gray"],
            paddingBottom: 120,
            overflow: "scroll",
            paddingTop: 60,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          },
        ]}
        ref={ref}
      >
        <div
          css={[
            {
              gridColumn: "1/-1",
              display: "inline-flex",
              width: "fit-content",
              paddingRight: 75,

              "> *:not(:first-of-type)": {
                marginLeft: 30,
              },
            },
          ]}
        >
          {sortedCards &&
            sortedCards.map((card) => (
              <Card
                onClick={() => setCard(card)}
                key={card._id + "carousel"}
                css={[{ paddingRight: 7.5, paddingLeft: 7.5 }]}
                card={card}
                size="preview"
              />
            ))}
        </div>
        <MenuPortal show={!!card}>
          {card && deck ? (
            <Pop
              cardSlug={card.artist.slug}
              close={() => setCard(undefined)}
              deckId={deck.slug}
              initialImg={card.img}
            />
          ) : null}
        </MenuPortal>
      </Grid>
    </>
  );
};

export default More;
