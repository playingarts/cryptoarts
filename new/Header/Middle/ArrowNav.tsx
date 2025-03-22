import { useRouter } from "next/router";
import { useDecks } from "../../../hooks/deck";
import { useEffect, useState } from "react";
import Text from "../../Text";
import Link from "../../Link";
import NavButton from "../../Buttons/NavButton";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

export default () => {
  const {
    query: { deckId },
  } = useRouter();

  const [counter, setCounter] = useState(0);
  const [max, setMax] = useState(0);

  const { decks } = useDecks();

  const { palette } = usePalette();

  useEffect(() => {
    if (deckId && decks) {
      setCounter(decks.findIndex((deck) => deck.slug === deckId));
      setMax(decks.length);
    }
  }, [deckId, decks]);

  return deckId && decks ? (
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
          counter > 0 ? decks[counter - 1].slug : decks[decks.length - 1].slug
        }
        shallow={true}
      >
        <NavButton css={[{ transform: "rotate(180deg)" }]} />
      </Link>
      <Link
        css={[{ marginRight: 5 }]}
        href={
          counter < decks.length - 1 ? decks[counter + 1].slug : decks[0].slug
        }
        shallow={true}
      >
        <NavButton />
      </Link>
      <span
        css={(theme) => [
          { marginLeft: 30 },
          palette === "dark" && { color: theme.colors.white75 },
        ]}
      >
        {decks ? "Deck " : ""}
        {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + max.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : undefined;
};
