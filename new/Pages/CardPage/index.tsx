import { FC, HTMLAttributes, useEffect, useState } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Hero from "./Hero";
import { withApollo } from "../../../source/apollo";
import More from "./More";
import { useCards } from "../../../hooks/card";
import { useRouter } from "next/router";
import { useDeck } from "../../../hooks/deck";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";

const CustomMiddle = () => {
  const {
    query: { deckId, artistSlug },
  } = useRouter();

  const { deck } = useDeck({
    variables: { slug: deckId },
  });

  const { cards } = useCards(
    deck && {
      variables: { deck: deck._id },
    }
  );
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!cards || !deckId || typeof deckId !== "string") {
      return;
    }
    setCounter(cards.findIndex((card) => card.artist.slug === artistSlug));
  }, [artistSlug, cards]);

  return cards ? (
    <Text
      typography="paragraphSmall"
      css={[
        {
          display: "flex",
          alignItems: "center",
          paddingRight: 66,
          justifyContent: "end",
        },
      ]}
    >
      <Link
        css={[{ marginRight: 5 }]}
        href={
          "/new/" +
          deckId +
          "/" +
          (counter > 0
            ? cards[counter - 1].artist.slug
            : cards[cards.length - 1].artist.slug)
        }
        shallow={true}
      >
        <NavButton css={[{ transform: "rotate(180deg)" }]} />
      </Link>
      <Link
        css={[{ marginRight: 5 }]}
        href={
          "/new/" +
          deckId +
          "/" +
          (counter < cards.length - 1
            ? cards[counter + 1].artist.slug
            : cards[0].artist.slug)
        }
        shallow={true}
      >
        <NavButton />
      </Link>
      <span css={[{ marginLeft: 30 }]}>
        Card {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + cards.length.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : null;
};

const CardPage: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header customMiddle={<CustomMiddle />} />
    <Hero />
    <More />
    <Footer />
  </>
);

export default withApollo(CardPage, { ssr: false });
