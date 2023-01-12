import { FC, Fragment, HTMLAttributes, useEffect } from "react";
import { useLoadCard } from "../../../hooks/card";
import Button from "../../Button";
import Bag from "../../Icons/Bag";
import Eth from "../../Icons/Eth";
import Opensea from "../../Icons/Opensea";
import Line from "../../Line";
import Link from "../../Link";
import Loader from "../../Loader";
import Text from "../../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  artist: GQL.Artist;
  deck: GQL.Deck;
  cardId: string;
  contest?: boolean;
  cardOfTheDay?: boolean;
}

const CardInfo: FC<Props> = ({
  contest,
  artist,
  cardId,
  deck,
  cardOfTheDay,
  ...props
}) => {
  const { card, loadCard, loading } = useLoadCard();

  useEffect(() => {
    if (!deck.openseaCollection) {
      return;
    }

    loadCard({ variables: { id: cardId } });
  }, [deck.openseaCollection, cardId, loadCard]);

  return (
    <div {...props}>
      <Text
        component="h2"
        css={(theme) => [
          {
            color: theme.colors.white,
            margin: 0,
            [theme.maxMQ.sm]: {
              textAlign: "center",
            },
          },
        ]}
      >
        {artist.name}
      </Text>
      <Text
        component="div"
        variant="h6"
        css={(theme) => ({
          color: theme.colors.text_subtitle_light,
          [theme.maxMQ.sm]: {
            textAlign: "center",
          },
        })}
      >
        {artist.country}
      </Text>
      <Line
        palette="dark"
        spacing={3}
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(1.5),
              marginBottom: theme.spacing(1.5),
            },
          },
        ]}
      />
      {contest ? (
        <div css={(theme) => ({ color: theme.colors.text_subtitle_light })}>
          <Text variant="body2">
            This card was submitted for the contest.
          </Text>
          {/* <Arrowed>Read More</Arrowed> */}
        </div>
      ) : (
        !cardOfTheDay && (
          <div
            css={(theme) => ({
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: theme.spacing(2.5),
              [theme.mq.sm]: {
                height: theme.spacing(5),
              },
              [theme.maxMQ.sm]: [
                card &&
                  !card.price && {
                    flexDirection: "column",
                    gap: theme.spacing(2),
                  },
              ],
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
                        
                        [theme.maxMQ.sm]: [
                          card &&
                            !card.price ? {
                              width: "100%",
                              justifyContent: "center",
                            }:{
                              marginRight: theme.spacing(2),
                            },
                        ],
                      })}
                    >
                      {card.price ? "Buy NFT" : "Make An Offer"}
                    </Button>
                    {card.price ? (
                      <Text
                        variant="h4"
                        component="div"
                        css={(theme) => [
                          {
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            color: theme.colors.white,
                            [theme.maxMQ.sm]: {
                              fontSize: 35,
                              marginTop: theme.spacing(0.5),
                            },
                          },
                        ]}
                      >
                        {((price: string[] = (card.price + "").split(".")) =>
                          price[1] && price[1].length > 3
                            ? price[0] + "." + price[1].slice(0, 3)
                            : card.price)()}
                        <Eth
                          css={(theme) => ({
                            opacity: 0.2,
                            marginLeft: theme.spacing(1),
                            marginBottom: theme.spacing(0.7),
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
                        Not on Sale
                      </Text>
                    )}
                  </Fragment>
                )
              )
            ) : (
              <Button
                Icon={Bag}
                component={Link}
                href={{
                  pathname: "/shop",
                  query: {
                    scrollIntoView: `[data-id='${deck.slug}']`,
                    scrollIntoViewBehavior: "smooth",
                  },
                }}
                css={(theme) => ({
                  [theme.mq.sm]: {
                    marginRight: theme.spacing(2),
                  },
                  [theme.maxMQ.sm]: {
                    width: "100%",
                    justifyContent: "center",
                  },
                })}
              >
                Buy {deck.title}
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default CardInfo;
