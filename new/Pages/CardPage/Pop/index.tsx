import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useDeck } from "../../../../hooks/deck";
import Text from "../../../Text";
import Button from "../../../Buttons/Button";
import Card from "../../../Card";
import { useCard, useCards } from "../../../../hooks/card";
import Star from "../../../Icons/Star";
import ArrowButton from "../../../Buttons/ArrowButton";
import Plus from "../../../Icons/Plus";
import Link from "../../../Link";
import NavButton from "../../../Buttons/NavButton";
import { usePalette } from "../../Deck/DeckPaletteContext";

const CustomMiddle: FC<{
  cardState: string | undefined;
  setCardState: (arg0: string | undefined) => void;
  deckId: string;
}> = ({ cardState, deckId, setCardState }) => {
  const { cards } = useCards({ variables: { deck: deckId } });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!cards) {
      return;
    }
    setCounter(cards.findIndex((card) => card.artist.slug === cardState));
  }, [cardState, cards]);

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
      <NavButton
        onClick={() =>
          setCardState(
            counter > 0
              ? cards[counter - 1].artist.slug
              : cards[cards.length - 1].artist.slug
          )
        }
        css={[{ transform: "rotate(180deg)" }]}
      />

      <NavButton
        onClick={() =>
          setCardState(
            counter < cards.length - 1
              ? cards[counter + 1].artist.slug
              : cards[0].artist.slug
          )
        }
      />
      <span css={[{ marginLeft: 30 }]}>
        Card {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + cards.length.toString().padStart(2, "0")}
      </span>
    </Text>
  ) : null;
};

const Pop: FC<
  HTMLAttributes<HTMLElement> & {
    close: () => void;
    cardSlug: string;
    deckId: string;
  }
> = ({ close, cardSlug, deckId, ...props }) => {
  const [cardState, setCardState] = useState<string | undefined>(cardSlug);

  const { deck } = useDeck({
    variables: { slug: deckId },
  });

  const { card } = useCard({
    variables: { deckSlug: deckId, slug: cardState },
  });

  const { palette } = usePalette();

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black30,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,

          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      ]}
      onClick={close}
      {...props}
    >
      <div
        css={(theme) => [
          {
            width: "100%",
            maxWidth: 1130,
            padding: 30,
            paddingBottom: 90,
            backgroundColor:
              theme.colors[palette === "dark" ? "black" : "pale_gray"],
            display: "flex",
            gap: 30,
            borderRadius: 15,
            margin: "0 auto",
            marginTop: 60,
            minHeight: 715,
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div css={[{ flex: 1 }]}>
          <Text typography="newh4">{deck ? deck.title : null} </Text>
          <div css={[{ marginTop: 30 }]}>
            {card ? (
              <Card
                key={"PopCard" + card._id}
                css={[{ margin: "0 auto" }]}
                card={card}
                noArtist
                size="big"
              />
            ) : null}
          </div>
        </div>
        <div
          css={[
            {
              flex: 1,
              display: "flex",
              flexDirection: "column",
            },
          ]}
        >
          <div css={[{ display: "flex", justifyContent: "space-between" }]}>
            <CustomMiddle
              deckId={deckId}
              cardState={cardState}
              setCardState={setCardState}
            />
            <Button
              palette={palette}
              css={(theme) => [
                {
                  borderRadius: "100%",
                  padding: 0,
                  width: 45,
                  height: 45,
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                },
                palette === "dark" && {
                  background: theme.colors.white,
                  // color: theme.colors.black,
                },
              ]}
              onClick={close}
            >
              <Plus css={[{ rotate: "45deg" }]} />
            </Button>
          </div>
          {card ? (
            <div
              css={[
                {
                  marginTop: 30,
                  display: "grid",
                  alignContent: "center",
                  maxWidth: 410,
                  flex: 1,
                },
              ]}
            >
              <Text typography="newh2"> {card.artist.name} </Text>
              <Text typography="newh4"> {card.artist.country} </Text>
              <div
                css={[
                  {
                    marginTop: 30,
                    display: "flex",
                    gap: 30,
                    alignItems: "center",
                  },
                ]}
              >
                <Button
                  color="accent"
                  css={[{ paddingRight: 8, paddingLeft: 8 }]}
                >
                  <Star />
                </Button>

                <Link
                  href={"/new/" + deckId + "/" + card.artist.slug}
                  onClick={close}
                >
                  <Button color="accent">Card details</Button>
                </Link>
                <Link href={"/new/" + deckId} onClick={close}>
                  <ArrowButton noColor base size="small">
                    All cards
                  </ArrowButton>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Pop;
