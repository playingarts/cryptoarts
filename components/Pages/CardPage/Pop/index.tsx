import { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useCardPop, useCardsForDeck } from "../../../../hooks/card";
import { useDecks } from "../../../../hooks/deck";
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
import { sortCards } from "../../../../source/utils/sortCards";

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
        {
          padding: 0,
          width: 45,
          height: 45,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        },
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
  deck: GQL.Deck | undefined;
  edition?: string;
  showNavigation?: boolean;
}> = ({ cardState, deck, setCardState, edition, showNavigation = true }) => {
  const { cards: rawCards } = useCardsForDeck(deck && showNavigation ? { variables: { deck: deck._id, edition } } : { skip: true });
  const [counter, setCounter] = useState(0);

  // Sort cards to match the order shown in CardList
  const cards = useMemo(() => rawCards ? sortCards(rawCards) : undefined, [rawCards]);

  useEffect(() => {
    if (!cards) {
      return;
    }
    setCounter(cards.findIndex((card) => card.artist.slug === cardState));
  }, [cardState, cards]);

  // Don't show navigation controls when disabled
  if (!showNavigation) {
    return null;
  }

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
    edition?: string;
    initialImg?: string;
    initialArtistName?: string;
    initialArtistCountry?: string;
    showNavigation?: boolean;
  }
> = ({ close, cardSlug, deckId, edition, initialImg, initialArtistName, initialArtistCountry, showNavigation = true, ...props }) => {
  const [cardState, setCardState] = useState<string | undefined>(cardSlug);
  const router = useRouter();

  // Get deck from cached decks array instead of separate query
  const { decks } = useDecks();
  const deck = useMemo(() => decks?.find((d) => d.slug === deckId), [decks, deckId]);

  // Use lightweight popup query (cache-first for preloaded data)
  const { card } = useCardPop({
    variables: { deckSlug: deckId, slug: cardState },
  });

  const { palette } = usePalette();

  // Check if we're already on this deck's page
  const isOnDeckPage = router.query.deckId === deckId;

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black50,
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
              card?.background || card?.cardBackground || theme.colors[palette === "dark" ? "black" : "pale_gray"],
            display: "flex",
            gap: 30,
            borderRadius: 15,
            margin: "0 auto",
            marginTop: 60,
            minHeight: 715,
            transition: "background-color 0.3s ease",
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div css={[{ flex: 1 }]}>
          <Text typography="newh4">
            {deck
              ? (edition || card?.edition) === "chapter i" || deckId === "future"
                ? "Future Chapter I"
                : (edition || card?.edition) === "chapter ii" || deckId === "future-ii"
                ? "Future Chapter II"
                : deck.title
              : null}{" "}
          </Text>
          <div
            css={{
              marginTop: 30,
              animation: "slideDown 0.4s ease-out",
              "@keyframes slideDown": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {card ? (
              <Card
                key={"PopCard" + card._id}
                css={[{ margin: "0 auto" }]}
                card={{
                  ...card,
                  deck: { slug: deckId } as unknown as GQL.Deck,
                }}
                noArtist
                size="big"
              />
            ) : initialImg ? (
              // Show initial image instantly while card data loads
              <Card
                key="PopCard-initial"
                css={[{ margin: "0 auto" }]}
                card={{
                  _id: "initial",
                  img: initialImg,
                  deck: { slug: deckId } as unknown as GQL.Deck,
                } as GQL.Card}
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
              deck={deck}
              cardState={cardState}
              setCardState={setCardState}
              edition={edition}
              showNavigation={showNavigation}
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
                  marginLeft: "auto", // Always push to right
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
            {/* Artist name and country - use initial values or card data, skeleton only if neither available */}
            {card || initialArtistName ? (
              <div
                css={{
                  animation: "fadeIn 0.3s ease-out",
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0, transform: "translateY(8px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Text typography="newh2"> {card?.artist.name || initialArtistName} </Text>
                <Text typography="newh4"> {card?.artist.country || initialArtistCountry} </Text>
              </div>
            ) : (
              // Skeleton loading for artist info - matches newh2 (lineHeight: 66px) and newh4 (lineHeight: 45px)
              <div>
                <div
                  css={{
                    height: 66,
                    width: 280,
                    borderRadius: 8,
                    background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite linear",
                    "@keyframes shimmer": {
                      "0%": { backgroundPosition: "200% 0" },
                      "100%": { backgroundPosition: "-200% 0" },
                    },
                  }}
                />
                <div
                  css={{
                    height: 45,
                    width: 150,
                    borderRadius: 6,
                    background: "linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite linear",
                  }}
                />
              </div>
            )}
            {/* Buttons - always visible, same design for all cards */}
            <div
              css={[
                {
                  marginTop: 30,
                  display: "flex",
                  gap: 15,
                  alignItems: "center",
                },
              ]}
            >
              <FavButton deckSlug={deckId} id={card?._id || ""} />

              {card ? (
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
              ) : (
                <Button color="accent" css={{ opacity: 0.5, cursor: "default" }}>
                  Card details
                </Button>
              )}
              <Link
                href={
                  (process.env.NEXT_PUBLIC_BASELINK || "") +
                  "/" +
                  deckId
                }
                onClick={(e) => {
                  e.preventDefault();
                  close();
                  // If already on this deck's page, just close popup
                  // Otherwise navigate to the deck page
                  if (!isOnDeckPage) {
                    router.push("/" + deckId);
                  }
                }}
                css={{ marginLeft: 15 }}
              >
                <ArrowButton noColor base size="small">
                  The deck
                </ArrowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pop;
