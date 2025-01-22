import { useRouter } from "next/router";
import Arrow from "../../Icons/Arrow";
import { useDecks } from "../../../hooks/deck";
import { useEffect, useState } from "react";
import Text from "../../Text";

export default () => {
  const {
    query: { deckId },
  } = useRouter();

  const [counter, setCounter] = useState(0);
  const [max, setMax] = useState(0);

  const { decks } = useDecks();

  useEffect(() => {
    if (deckId && decks) {
      console.log({ decks });

      setCounter(decks.findIndex((deck) => deck.slug === deckId));
      setMax(decks.length);
    }
  }, [deckId, decks]);

  return deckId && decks ? (
    // <div
    //   css={[
    //     {
    //       display:"inline",
    //       "> *": {
    //         display: "inline-block",
    //         lineHeight: "45px",
    //         width: 45,
    //         verticalAlign: "middle",
    //         textAlign: "center",
    //       },
    //     },
    //   ]}
    // >
    // </div>
    <Text
      typography="paragraphSmall"
      css={[
        {
          display: "flex",
          alignItems: "center",
        },
      ]}
    >
      <Arrow css={[{ transform: "rotate(180deg)", marginRight: 28 }]} />
      <Arrow />
      <span css={[{ marginLeft: 41 }]}>
        {decks ? "Deck " : ""}
        {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + max.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : undefined;
};
