import { FC, Fragment, HTMLAttributes } from "react";
import Button from "../../Button";
import Text from "../../Text";
import Eth from "../../Icons/Eth";
import Opensea from "../../Icons/Opensea";
import Share from "../../Icons/Share";
import Line from "../../Line";
import Bag from "../../Icons/Bag";
import Link from "../../Link";

interface Props extends HTMLAttributes<HTMLDivElement> {
  artist: GQL.Artist;
  price: number;
  deck: GQL.Deck;
  opensea?: string;
}

const CardInfo: FC<Props> = ({ artist, deck, opensea, price, ...props }) => {
  return (
    <div {...props}>
      <Text component="h2" css={{ margin: 0 }}>
        {artist.name}
      </Text>
      <Text component="div" variant="h6">
        {artist.country}
      </Text>
      {price && (
        <Fragment>
          <Line size={1} spacing={3} />
          <div
            css={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {deck.slug === "crypto" ? (
              opensea ? (
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
              ) : null
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
            <Button Icon={Share} variant="bordered" />
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
              <span>{price}</span>
              <Eth
                css={(theme) => ({
                  marginLeft: theme.spacing(1),
                })}
              />
            </Text>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CardInfo;
