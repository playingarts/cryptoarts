import { FC, Fragment, HTMLAttributes, useEffect } from "react";
import Button from "../../Button";
import Text from "../../Text";
import Eth from "../../Icons/Eth";
import Opensea from "../../Icons/Opensea";
import Line from "../../Line";
import Bag from "../../Icons/Bag";
import Link from "../../Link";
import { useLoadCard } from "../../../hooks/card";
import Loader from "../../Loader";
import Arrowed from "../../Arrowed";

interface Props extends HTMLAttributes<HTMLDivElement> {
  artist: GQL.Artist;
  deck: GQL.Deck;
  cardId: string;
  contest?: boolean;
}

const CardInfo: FC<Props> = ({ contest, artist, cardId, deck, ...props }) => {
  const { card, loadCard, loading } = useLoadCard();

  useEffect(() => {
    if (!deck.openseaCollection) {
      return;
    }

    loadCard({ variables: { id: cardId } });
  }, [deck.openseaCollection, cardId, loadCard]);

  return (
    <div {...props}>
      <Text component="h2" css={{ margin: 0 }}>
        {artist.name}
      </Text>
      <Text
        component="div"
        variant="h6"
        css={(theme) => ({ color: theme.colors.text_subtitle_light })}
      >
        {artist.country}
      </Text>
      <Line size={1} spacing={3} />
      {contest ? (
        <div css={(theme) => ({ color: theme.colors.text_subtitle_light })}>
          <Text variant="body2">
            This card was submitted for the Special Edition contest.
          </Text>
          <Arrowed>Read More</Arrowed>
        </div>
      ) : (
        <div
          css={(theme) => ({
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: theme.spacing(5),
          })}
        >
          {deck.openseaCollection ? (
            loading ? (
              <Loader
                css={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "baseline",
                }}
              />
            ) : (
              card && (
                <Fragment>
                  <Button
                    Icon={Opensea}
                    component={Link}
                    href={
                      card.erc1155
                        ? `https://opensea.io/assets/${card.erc1155.contractAddress}/${card.erc1155.token_id}`
                        : `https://opensea.io/collection/${
                            deck.openseaCollection.name
                          }?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Value&search[stringTraits][0][values][0]=${
                            card.value.charAt(0).toUpperCase() +
                            card.value.slice(1)
                          }&search[stringTraits][1][name]=${
                            card.value === "joker" ? "Color" : "Suit"
                          }&search[stringTraits][1][values][0]=${
                            card.suit.charAt(0).toUpperCase() +
                            card.suit.slice(1)
                          }${card.price ? "&search[toggles][0]=BUY_NOW" : ""}`
                    }
                    target="_blank"
                    css={(theme) => ({
                      background: theme.colors.eth,
                      backgroundSize: "400% 100%",
                      animation: "gradient 5s ease infinite",
                      color: theme.colors.dark_gray,
                      marginRight: theme.spacing(2),
                    })}
                  >
                    {card.price ? "Buy NFT" : "Make An Offer"}
                  </Button>
                  {card.price ? (
                    <Text
                      variant="h4"
                      component="div"
                      css={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "baseline",
                      }}
                    >
                      <span>{card.price}</span>
                      <Eth
                        css={(theme) => ({
                          marginLeft: theme.spacing(1),
                        })}
                      />
                    </Text>
                  ) : (
                    <Text
                      component="div"
                      variant="h6"
                      css={(theme) => ({
                        color: theme.colors.text_subtitle_light,
                      })}
                    >
                      Sold Out
                    </Text>
                  )}
                </Fragment>
              )
            )
          ) : (
            <Button
              Icon={Bag}
              component={Link}
              href="/shop"
              css={(theme) => ({
                marginRight: theme.spacing(2),
              })}
            >
              Buy {deck.title}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
