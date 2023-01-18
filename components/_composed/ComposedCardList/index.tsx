import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useCards } from "../../../hooks/card";
import { OwnedCard } from "../../../pages/[deckId]";
import { breakpoints } from "../../../source/enums";
import BlockTitle from "../../BlockTitle";
import Button from "../../Button";
import CardList, { Props as ListProps } from "../../Card/List";
import Grid from "../../Grid";
import defaultSort from "../../Icons/defaultSort";
import Sort from "../../Icons/Sort";
import SelectButton, { Props as SelectButtonProps } from "../../SelectButton";
import { useSize } from "../../SizeProvider";

interface Props extends Omit<ListProps, "status" | "deckId" | "cards"> {
  deck: GQL.Deck;
  ownedCards: OwnedCard[];
}

const SortSelectButton: FC<
  Omit<SelectButtonProps, "states"> & { cards: GQL.Card[]; deck: GQL.Deck }
> = ({ cards, deck, setter, ...props }) =>
  (cards &&
    cards.find(({ price }) => price !== undefined && price !== null) && (
      <SelectButton
        {...props}
        css={{ overflow: "visible" }}
        states={[
          {
            children: "default",
            Icon: defaultSort,
          },
          {
            Icon: Sort,
            IconProps: { css: { transform: "scaleY(-1)" } },
            children: "ascending",
          },
          { Icon: Sort, children: "descending" },
        ]}
        setter={setter}
        palette={
          // status === "connected" && deck.openseaCollection ? "dark" : "light"
          deck.slug === "crypto" ? "dark" : "light"
        }
      />
    )) ||
  null;
const ComposedCardList: FC<Props> = ({ deck, ownedCards, ...props }) => {
  const { status } = useMetaMask();
  const {
    query: { artistId },
  } = useRouter();

  const [edition, setEdition] = useState(0);

  const { cards: queryCards, loading } = useCards({
    variables: {
      deck: deck._id,
      ...(deck.editions && { edition: deck.editions[edition].name }),
    },
  });

  const cards =
    queryCards &&
    queryCards.map((card) => ({
      ...card,
      href: `/${deck.slug}/${card.artist.slug}`,
      owned:
        deck.openseaCollection &&
        status === "connected" &&
        ownedCards.findIndex(
          (owned) =>
            (owned.suit.toLowerCase() === card.suit &&
              owned.value === card.value) ||
            (card.erc1155 && card.erc1155.token_id === owned.token_id)
        ) !== -1,
    }));

  // const [ERC1155, setERC1155] = useState<OwnedCard[]>([]);
  const [currentSelected, setCurrentSelected] = useState("default");
  //  buttonState.find(({ selected }) => selected === true);

  // useEffect(() => {
  //   if (!queryCards || ownedCards.length === 0) {
  //     return;
  //   }

  //   Promise.all(
  //     queryCards
  //       .filter((card) => card.erc1155)
  //       .flatMap(async (card) => {
  //         if (!card.erc1155) {
  //           return { value: "", suit: "", token_id: "" };
  //         }

  //         const res: Asset = await (
  //           await fetch(
  //             `https://api.opensea.io/api/v1/asset/${card.erc1155.contractAddress}/${card.erc1155.token_id}/?account_address=${account}`
  //           )
  //         ).json();
  //         if (res.ownership) {
  //           return { value: "", suit: "", token_id: res.token_id };
  //         }
  //         return { value: "", suit: "", token_id: "" };
  //       })
  //   ).then((compl) =>
  //     setERC1155((prev) => [
  //       ...prev.filter(
  //         (ownd) =>
  //           compl.findIndex((erc) => erc.token_id === ownd.token_id) === -1
  //       ),
  //       ...compl,
  //     ])
  //   );
  // }, [queryCards, ownedCards, account]);

  const { width } = useSize();

  return loading || !cards ? null : (
    <BlockTitle
      variant="h3"
      palette={
        // status === "connected" && deck.openseaCollection ? "dark" : "light"
        deck.slug === "crypto" ? "dark" : "light"
      }
      action={
        width >= breakpoints.sm && deck.openseaCollection ? (
          <SortSelectButton
            cards={cards}
            deck={deck}
            setter={setCurrentSelected}
          />
        ) : undefined
      }
      title={
        artistId
          ? deck.title
          : ((deck.slug === "special" || deck.slug === "future") && "Cards") ||
            "Cards"
      }
      // subTitleText={
      //   deck.slug === "crypto"
      //     ? "Hover the card to see animation. Click to read the story behind the artwork."
      //     : deck.slug === "future_i" || deck.slug === "future_ii"
      //     ? "Click to read the story behind the artwork."
      //     : undefined
      // }
      css={(theme) => [
        {
          marginRight: theme.spacing(3),
          marginLeft: theme.spacing(3),

          [theme.maxMQ.sm]: [theme.typography.h3],
          gridColumn: "1/-1",
          paddingTop: theme.spacing(1),
        },
      ]}
    >
      {deck.editions && (
        <div
          css={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            css={{
              position: "sticky",
              zIndex: 1,
              top: "calc(100% - 100px)",
              marginTop: "500px",
              height: 46,
              marginBottom: "50px",
              alignSelf: "flex-start",
            }}
          >
            <div
              css={(theme) => ({
                margin: "0 auto",
                width: "fit-content",
                borderRadius: theme.spacing(1.5),
                backgroundColor: "black",
                position: "relative",
                border: "5px solid black",
              })}
            >
              <Button
                color="black"
                onClick={() => setEdition(0)}
                css={[
                  edition === 0 && {
                    background: "#A6D4B7",
                    color: "black",
                  },
                ]}
              >
                {deck.editions[0].name}
              </Button>
              <Button
                color="black"
                onClick={() => setEdition(1)}
                css={[
                  edition === 1 && {
                    background: "#A6D4B7",
                    color: "black",
                  },
                  {
                    // borderRadius: `0 ${theme.spacing(5)}px ${theme.spacing(
                    //   5
                    // )}px 0`,
                  },
                ]}
              >
                {deck.editions[1].name}
              </Button>
            </div>
          </div>
        </div>
      )}
      <Grid
        {...props}
        css={(theme) => [
          {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
          },
        ]}
      >
        {width < breakpoints.sm && (
          <SortSelectButton
            cards={cards}
            deck={deck}
            setter={setCurrentSelected}
            css={(theme) => [
              {
                paddingRight: theme.spacing(1.5),
                paddingLeft: theme.spacing(1.5),
                paddingTop: theme.spacing(1),
                marginBottom: theme.spacing(2),
                width: "100%",
                gridColumn: "1/-1",
              },
            ]}
          />
        )}
        <CardList
          // status={status}
          cards={
            currentSelected === "ascending"
              ? [
                  ...[...cards]
                    .sort((a, b) => (a.price as number) - (b.price as number))
                    .filter(({ price }) => price !== null),
                  ...[...cards].filter(({ price }) => price === null),
                ]
              : currentSelected === "descending"
              ? [...cards].sort(
                  (a, b) => (b.price as number) - (a.price as number)
                )
              : cards
          }
          // {...(deck.openseaCollection && {
          //   metamaskProps: {
          //     account,
          //     ownedCards: [...ownedCards],
          //   },
          // })}
          sorted={!!deck.openseaCollection}
          palette={deck.slug === "crypto" ? "dark" : "light"}
          css={(theme) => [
            {
              [theme.maxMQ.sm]: [
                {
                  [theme.maxMQ.sm]: {
                    paddingBottom: theme.spacing(8),
                  },
                  [theme.maxMQ.xsm]: {
                    paddingBottom: theme.spacing(4),
                  },
                },
              ],
              marginTop: theme.spacing(2),
            },
          ]}
        />
      </Grid>
    </BlockTitle>
  );
};

export default ComposedCardList;
