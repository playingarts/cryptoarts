import { FC, HTMLAttributes, ReactNode, useMemo } from "react";
import { useOpensea } from "../../../../../hooks/opensea";
import { useCardsForDeck } from "../../../../../hooks/card";
import Text from "../../../../Text";
import Card from "../../../../Card";
import Link from "../../../../Link";

/** Truncate wallet address for display */
const truncateAddress = (address: string): string => {
  if (!address) return "...";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/** Eth symbol with Arial font */
const EthSymbol: FC = () => (
  <span css={{ fontFamily: "Arial, sans-serif" }}>Ξ</span>
);

/** Format ETH value */
const formatEth = (value: number | undefined): ReactNode => {
  if (value === undefined) return "...";
  return <><EthSymbol />{value.toFixed(4)}</>;
};

/** Parse OpenSea NFT name (e.g., "8 of Clubs") to value and suit */
const parseNftName = (name: string): { value: string; suit: string } | null => {
  if (!name) return null;
  const match = name.match(/^(\w+)\s+of\s+(\w+)$/i);
  if (!match) return null;
  return {
    value: match[1].toLowerCase(),
    suit: match[2].toLowerCase(),
  };
};

/** Map word values to card values (Ace -> a, King -> k, etc.) */
const valueMap: Record<string, string> = {
  ace: "a", king: "k", queen: "q", jack: "j",
  "10": "10", "9": "9", "8": "8", "7": "7", "6": "6",
  "5": "5", "4": "4", "3": "3", "2": "2",
};

const LastSale: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });
  const { cards: cryptoCards } = useCardsForDeck({
    variables: { deckSlug: "crypto" },
  });
  const lastSale = opensea?.last_sale;

  // Find the matching card from our database
  const matchingCard = useMemo(() => {
    if (!lastSale?.nft_name || !cryptoCards) return null;
    const parsed = parseNftName(lastSale.nft_name);
    if (!parsed) return null;
    const cardValue = valueMap[parsed.value] || parsed.value;
    return cryptoCards.find(
      (c) => c.value === cardValue && c.suit === parsed.suit
    );
  }, [lastSale?.nft_name, cryptoCards]);

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.darkBlack,
          padding: 30,
          borderRadius: 20,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Last sale</Text>
      <Card
        noArtist={true}
        size="nano"
        card={
          matchingCard ||
          ({
            img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/a-h-x89CxW27.jpg",
          } as unknown as GQL.Card)
        }
        css={[{ margin: "30px auto 0" }]}
      />
      <Text typography="paragraphSmall" css={[{ marginTop: 30 }]}>
        {formatEth(lastSale?.price)}
      </Text>
      <div css={[{ marginTop: 2, ">*": { display: "inline-block" } }]}>
        <Text
          typography="paragraphSmall"
          css={[{ width: 60, marginRight: 10 }]}
        >
          From
        </Text>
        <Text typography="paragraphSmall">{truncateAddress(lastSale?.seller || "")}</Text>
      </div>
      <div css={[{ marginTop: 2, ">*": { display: "inline-block" } }]}>
        <Text
          typography="paragraphSmall"
          css={[{ width: 60, marginRight: 10 }]}
        >
          To
        </Text>
        <Text typography="paragraphSmall">{truncateAddress(lastSale?.buyer || "")}</Text>
      </div>
      <Link
        href="https://opensea.io/collection/cryptoedition/activity"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ color: theme.colors.white50, marginTop: 30, fontSize: 15 }]}
        >
          All activity
        </Text>
      </Link>
    </div>
  );
};

export default LastSale;
