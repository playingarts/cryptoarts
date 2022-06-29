import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from "react";
import { Sections } from "../../../source/enums";
import BlockTitle from "../../BlockTitle";
import Layout from "../../Layout";
import CardList, { Props as ListProps } from "../../Card/List";
import { useRouter } from "next/router";
import Button from "../../Button";
import Sort from "../../Icons/Sort";
import Chevron from "../../Icons/Chevron";
import { theme } from "../../../pages/_app";
import { useCards } from "../../../hooks/card";
import { Asset } from "../../../source/graphql/schemas/opensea";
import { OwnedCard } from "../../../pages/[deckId]";
import { useMetaMask } from "metamask-react";

interface Props
  extends Omit<ListProps, "metamaskProps" | "status" | "deckId" | "cards"> {
  deck: GQL.Deck;
  ownedCards: OwnedCard[];
}

const ComposedCardList: ForwardRefRenderFunction<HTMLElement, Props> = (
  { deck, ownedCards, ...props },
  ref
) => {
  const { status, account } = useMetaMask();
  const {
    query: { artistId, section },
  } = useRouter();

  const { cards, loading } = useCards({
    variables: { deck: deck._id },
  });

  const [listState, setListState] = useState(false);

  const [buttonState, setButtonState] = useState<
    {
      children: "default" | "ascending" | "descending";
      selected: boolean;
    }[]
  >([
    {
      children: "default",
      selected: true,
    },
    {
      children: "ascending",
      selected: false,
    },
    {
      children: "descending",
      selected: false,
    },
  ]);

  const [ERC1155, setERC1155] = useState<OwnedCard[]>([]);
  const currentSelected = buttonState.find(({ selected }) => selected === true);

  useEffect(() => {
    if (!cards || ownedCards.length === 0) {
      return;
    }

    Promise.all(
      cards
        .filter((card) => card.erc1155)
        .flatMap(async (card) => {
          if (!card.erc1155) {
            return { value: "", suit: "", token_id: "" };
          }

          const res: Asset = await (
            await fetch(
              `https://api.opensea.io/api/v1/asset/${card.erc1155.contractAddress}/${card.erc1155.token_id}/?account_address=${account}`
            )
          ).json();
          if (res.ownership) {
            return { value: "", suit: "", token_id: res.token_id };
          }
          return { value: "", suit: "", token_id: "" };
        })
    ).then((compl) =>
      setERC1155((prev) => [
        ...prev.filter(
          (ownd) =>
            compl.findIndex((erc) => erc.token_id === ownd.token_id) === -1
        ),
        ...compl,
      ])
    );
  }, [cards, ownedCards, account]);

  return (
    <Layout
      scrollIntoView={section === Sections.cards}
      ref={ref}
      css={(theme) => ({
        background:
          status === "connected" && deck.openseaCollection
            ? "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)"
            : theme.colors.page_bg_light,
        color:
          status === "connected" && deck.openseaCollection
            ? theme.colors.text_title_light
            : theme.colors.text_title_dark,
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
      })}
      {...props}
    >
      <BlockTitle
        action={
          cards &&
          cards.find(({ price }) => price !== undefined && price !== null) && (
            <div
              css={(theme) => ({
                height: theme.spacing(5),
                width: "min-content",
                position: "relative",
                transform: `translateX(-${theme.spacing(2.2)}px)`,
                color:
                  status === "connected" && deck.openseaCollection
                    ? theme.colors.text_title_light
                    : theme.colors.black,
              })}
            >
              <Chevron
                css={(theme) => ({
                  zIndex: 3,
                  right: 0,
                  width: theme.spacing(0.8),
                  height: theme.spacing(1.2),
                  transform: listState
                    ? "rotate(90deg) translate(-75%, 10%)"
                    : "rotate(-90deg) translate(75%, -10%)",
                  position: "absolute",
                  top: "50%",
                  pointerEvents: "none",
                  color: "inherit",
                })}
              />
              <ul
                css={(theme) => ({
                  borderRadius: theme.spacing(1),
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  overflow: "hidden",
                  width: `calc(100% + ${theme.spacing(2.2)}px)`,
                })}
              >
                {buttonState.map((btn, index) => (
                  <li
                    key={btn.children}
                    css={(theme) => [
                      {
                        display: "block",
                        height: "fit-content",
                        transition: theme.transitions.fast("margin-top"),
                        marginTop: 0,
                        background:
                          status === "connected" && deck.openseaCollection
                            ? theme.colors.dark_gray
                            : theme.colors.white,
                      },
                    ]}
                    style={{
                      zIndex: btn.selected ? 1 : "initial",
                      marginTop:
                        (!listState && index !== 0 && -theme.spacing(5)) || 0,
                    }}
                  >
                    <Button
                      Icon={Sort}
                      shape="square"
                      css={{
                        width: "100%",
                        color: "inherit",
                        background: "inherit",
                      }}
                      onClick={() => {
                        if (!listState) {
                          setListState(true);
                          return;
                        }
                        setButtonState((prev) => [
                          ...prev.map((state) => ({
                            ...state,
                            selected: state.children === btn.children,
                          })),
                        ]);
                        setListState(false);
                      }}
                    >
                      {btn.children}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        title={artistId ? deck.title : "Cards"}
        subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
        css={(theme) => ({
          marginBottom: theme.spacing(1),
        })}
      />

      {loading || !cards || !currentSelected ? null : (
        <CardList
          status={status}
          cards={
            currentSelected.children === "ascending"
              ? [...cards].sort((a, b) =>
                  a.price ? (b.price ? a.price - b.price : -1) : 0
                )
              : currentSelected.children === "descending"
              ? [...cards].sort((a, b) =>
                  a.price ? (b.price ? b.price - a.price : -1) : 0
                )
              : cards
          }
          {...(deck.openseaCollection && {
            metamaskProps: {
              account,
              ownedCards: [...ownedCards, ...ERC1155],
            },
          })}
          sorted={
            deck.openseaCollection && currentSelected.children !== "default"
          }
        />
      )}
    </Layout>
  );
};

export default forwardRef(ComposedCardList);
