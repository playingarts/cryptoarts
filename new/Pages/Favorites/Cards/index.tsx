import {
  Dispatch,
  FC,
  Fragment,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Grid from "../../../../components/Grid";
import ScandiBlock from "../../../ScandiBlock";
import { useDecks } from "../../../../hooks/deck";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import AddToBag from "../../../Buttons/AddToBag";
import Button from "../../../Buttons/Button";
import { useBag } from "../../../Contexts/bag";
import Plus from "../../../Icons/Plus";
import { useFavorites } from "../../../Contexts/favorites";
import { useCards } from "../../../../hooks/card";
import Card from "../../../Card";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Pop from "../../CardPage/Pop";

const EmptyCard: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div
      {...props}
      css={(theme) => [
        {
          background: theme.colors.white50,
          opacity: 0.5,
          borderRadius: 15,
          width: 270,
          height: 380,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
            opacity: 1,
          },
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            background: theme.colors.white,
            color: theme.colors.spaceBlack,
            padding: 10.5,
            borderRadius: "100%",
          },
        ]}
      >
        <Plus />
      </div>
    </div>
  );
};

const DeckCards: FC<
  HTMLAttributes<HTMLElement> & {
    deck: GQL.Deck;
    setCardsState: Dispatch<
      SetStateAction<
        | {
            slug: string;
            deckSlug: string;
          }
        | undefined
      >
    >;
  }
> = ({ deck, setCardsState, ...props }) => {
  const { getPrice } = useBag();
  const { favorites, removeItem } = useFavorites();
  const { cards } = useCards({ variables: { deck: deck.slug } });

  return (
    <div {...props}>
      <Grid
        key={"Favorite" + deck.slug}
        // css={[
        //   {
        // },
        // ]}
      >
        <ScandiBlock css={[{ gridColumn: "span 6" }]}>
          <ArrowedButton>{deck.title}</ArrowedButton>{" "}
        </ScandiBlock>
        <ScandiBlock css={[{ gridColumn: "span 6", gap: 30 }]}>
          {!deck.product ? null : (
            <>
              <AddToBag productId={deck.product._id} />
              <Button noColor size="small" base>
                {getPrice(deck.product.price)}
              </Button>
            </>
          )}
        </ScandiBlock>
      </Grid>
      <Grid
        css={[
          {
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            // paddingRight: 120,
          },
        ]}
      >
        <div css={[{ gridColumn: "1/-1", marginTop: 60 }]}>
          <div
            css={[
              {
                display: "inline-flex",
                width: "fit-content",
                gap: 30,
                paddingRight: 120,
              },
            ]}
          >
            {favorites && cards
              ? favorites[deck.slug]
                  .map((fav) => {
                    const card = cards.find((card) => card._id === fav);
                    if (!card) {
                      removeItem(deck.slug, fav);
                    }
                    return card;
                  })
                  .map((card) =>
                    !card ? null : (
                      <Card
                        onClick={() =>
                          setCardsState({
                            slug: card.artist.slug,
                            deckSlug: deck.slug,
                          })
                        }
                        key={card._id}
                        size="preview"
                        card={{
                          ...card,
                          deck: { slug: deck.slug } as unknown as GQL.Deck,
                        }}
                      />
                    )
                  )
              : null}
            <EmptyCard
              onClick={() =>
                cards &&
                setCardsState({
                  slug: cards[Math.floor(Math.random() * (cards.length - 1))]
                    .artist.slug,
                  deckSlug: deck.slug,
                })
              }
            />
          </div>
        </div>
      </Grid>
    </div>
  );
};

const Cards: FC<HTMLAttributes<HTMLElement>> = ({}) => {
  const { decks } = useDecks();
  const { favorites } = useFavorites();
  const [cardState, setCardState] = useState<{
    slug: string;
    deckSlug: string;
  }>();

  return (
    <>
      <MenuPortal show={!!cardState}>
        {cardState ? (
          <Pop
            close={() => setCardState(undefined)}
            cardSlug={
              cardState.slug
              // cards[Math.floor(Math.random() * (cards.length - 1))].artist
              //   .slug
            }
            deckId={cardState.deckSlug}
          />
        ) : null}
      </MenuPortal>
      <div
        css={(theme) => [
          {
            background: theme.colors.pale_gray,
            paddingTop: 60,
            paddingBottom: 60,
            ">:not(:last-child)": { marginBottom: 120 },
          },
        ]}
      >
        {!(!decks || !favorites) &&
          Object.keys(favorites)
            .filter(
              (slug) => decks.findIndex((deck) => deck.slug === slug) !== -1
            )
            .map((slug) => {
              const deck = decks.find((deck) => deck.slug === slug);
              return !deck ? null : (
                <DeckCards
                  key={"DeckCards" + deck.slug}
                  deck={deck}
                  setCardsState={setCardState}
                />
              );
            })}
      </div>
    </>
  );
};

export default Cards;
