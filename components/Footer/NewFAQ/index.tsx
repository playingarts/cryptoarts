import { FC, HTMLAttributes, useEffect, useState } from "react";
import Intro from "../../Intro";
import ButtonTemplate from "../../Buttons/Button";
import Grid from "../../Grid";
import Item from "./Item";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { useRouter } from "next/router";
import { useCards } from "../../../hooks/card";
import Card from "../../Card";

const faq = {
  "Are these physical decks?":
    "Playing Arts brings together artists from around the world, transforming traditional playing cards into a diverse gallery of creative expression.",
  "How do I use the AR feature?":
    "Playing Arts brings together artists from around the world, transforming traditional playing cards into a diverse gallery of creative expression.",
  "How much does it cost to ship a package?":
    "Playing Arts brings together artists from around the world, transforming traditional playing cards into a diverse gallery of creative expression.",
  "Can I track my order?":
    "Playing Arts brings together artists from around the world, transforming traditional playing cards into a diverse gallery of creative expression.",
  "How to participate as an artist?":
    "Playing Arts brings together artists from around the world, transforming traditional playing cards into a diverse gallery of creative expression.",
};

const FooterCards = () => {
  const {
    query: { deckId },
  } = useRouter();

  const { cards } = useCards({ variables: { deck: deckId }, skip: !deckId });

  const [faqCards, setFaqCards] = useState<GQL.Card[]>();

  useEffect(() => {
    if (!cards) {
      return;
    }

    const arr = [];

    const backsides = cards.filter((card) => card.value === "backside");

    arr.push(backsides[Math.floor(Math.random() * (backsides.length - 1))]);

    const jokers = cards.filter((card) => card.value === "joker");

    arr.push(jokers[Math.floor(Math.random() * (jokers.length - 1))]);

    setFaqCards(arr);
  }, [cards]);

  return !faqCards ? null : (
    <>
      <Card
        noArtist
        animated
        card={faqCards[1]}
        css={[{ rotate: "-8deg", transformOrigin: "bottom left" }]}
      />
      <Card
        noArtist
        animated
        card={faqCards[0]}
        css={[{ rotate: "8deg", transformOrigin: "left" }]}
      />
    </>
  );
};

const FAQ: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { palette } = usePalette();

  return (
    <div
      css={(theme) => [
        {
          background:
            theme.colors[palette === "dark" ? "darkBlack" : "soft_gray"],
        },
      ]}
    >
      <Intro
        arrowedText="FAQ"
        paragraphText="All your questions, dealt."
        linkNewText="Read full FAQ"
        beforeLinkNew={
          <ButtonTemplate
            bordered={true}
            size="small"
            palette={palette}
            color={palette === "dark" ? "white75" : undefined}
          >
            Ask a question
          </ButtonTemplate>
        }
      />
      <Grid>
        <div
          css={[
            {
              gridColumn: "span 6",
              position: "relative",
              height: 525,
              marginTop: 15,
            },
          ]}
        >
          <div
            css={[
              {
                position: "absolute",
                top: "60%",
                left: "50%",
                "> *": {
                  width: 250,
                  height: 350,
                  borderRadius: 15,
                  position: "absolute",
                  transform: "translate(-50%,-70%)",
                  top: 0,
                  left: 0,
                },
              },
            ]}
          >
            <FooterCards />
          </div>
        </div>
        <div
          css={[
            {
              gridColumn: "span 6",
              display: "grid",
              paddingTop: 120,
              paddingBottom: 120,
              marginTop: 15,
              paddingRight: 30,
              gap: 15,
              alignContent: "center",
            },
          ]}
        >
          {Object.keys(faq).map((item) => (
            <Item
              key={item}
              question={item}
              answer={faq[item as unknown as keyof typeof faq]}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default FAQ;
