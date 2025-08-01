import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useCard, useCards } from "../../../../hooks/card";
import { useDeck } from "../../../../hooks/deck";
import ArrowButton from "../../../Buttons/ArrowButton";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import Card from "../../../Card";
import { useFavorites } from "../../../Contexts/favorites";
import Plus from "../../../Icons/Plus";
import Star from "../../../Icons/Star";
import Link from "../../../Link";
import Text from "../../../Text";
import { usePalette } from "../../Deck/DeckPaletteContext";

const FavButton: FC<
  HTMLAttributes<HTMLElement> & { deckSlug: string; id: string }
> = ({ deckSlug, id }) => {
  const { isFavorite, addItem } = useFavorites();

  const [favState, setFavState] = useState(false);

  useEffect(() => {
    setFavState(isFavorite(deckSlug, id));
  }, [isFavorite, deckSlug, id]);

  const Btn = (
    <Button
      color={favState ? "white" : "accent"}
      css={(theme) => [
        { paddingRight: 8, paddingLeft: 8 },
        favState && {
          color: theme.colors.accent,
          "&:hover": {
            color: theme.colors.accent,
          },
        },
      ]}
      onClick={() => {
        !favState && addItem(deckSlug, id);
      }}
    >
      <Star />
    </Button>
  );

  return favState ? (
    <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/favorites"}>
      {Btn}
    </Link>
  ) : (
    Btn
  );
};

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

  return (
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
          cards &&
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
          cards &&
          setCardState(
            counter < cards.length - 1
              ? cards[counter + 1].artist.slug
              : cards[0].artist.slug
          )
        }
      />
      <span css={[{ marginLeft: 30 }]}>
        Card {(counter + 1).toString().padStart(2, "0") + " "}/
        {" " + (cards ? cards.length.toString().padStart(2, "0") : "")}
      </span>
    </Text>
  );
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
            {deck && card ? (
              <Card
                key={"PopCard" + card._id}
                css={[{ margin: "0 auto" }]}
                card={{
                  ...card,
                  deck: { slug: deck.slug } as unknown as GQL.Deck,
                }}
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
                {deck && <FavButton deckSlug={deck.slug} id={card._id} />}

                <Link
                  href={
                    (process.env.NEXT_PUBLIC_BASELINK || "") +
                    "/" +
                    deckId +
                    "/" +
                    card.artist.slug
                  }
                  onClick={close}
                >
                  <Button color="accent">Card details</Button>
                </Link>
                <Link
                  href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/" + deckId}
                  onClick={close}
                >
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
