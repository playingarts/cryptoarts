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

interface Props extends HTMLAttributes<HTMLDivElement> {
  artist: GQL.Artist;
  deck: GQL.Deck;
  opensea?: string;
  cardId: string;
}

const CardInfo: FC<Props> = ({ artist, cardId, deck, opensea, ...props }) => {
  const { card, loadCard, loading } = useLoadCard();

  useEffect(() => {
    if (!opensea) {
      return;
    }

    loadCard({ variables: { id: cardId } });
  }, [opensea, cardId, loadCard]);

  return (
    <div {...props}>
      <Text component="h2" css={{ margin: 0 }}>
        {artist.name}
      </Text>
      <Text component="div" variant="h6">
        {artist.country}
      </Text>
      <Line size={1} spacing={3} />
      <div
        css={(theme) => ({
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: theme.spacing(5),
        })}
      >
        {opensea ? (
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
            card &&
            (card.price ? (
              <Fragment>
                <Button
                  Icon={Opensea}
                  component={Link}
                  href={opensea}
                  target="_blank"
                  css={(theme) => ({
                    color: theme.colors.dark_gray,
                    background: theme.colors.gradient,
                    marginRight: theme.spacing(2),
                  })}
                >
                  Buy NFT
                </Button>
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
              </Fragment>
            ) : (
              <Button disabled={true}>Sold out</Button>
            ))
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
    </div>
  );
};

export default CardInfo;
