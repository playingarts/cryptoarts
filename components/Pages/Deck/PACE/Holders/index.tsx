import { FC, HTMLAttributes } from "react";
import { useHolders, useOpensea } from "../../../../../hooks/opensea";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";
import Spades from "../../../../Icons/Spades";
import Hearts from "../../../../Icons/Hearts";
import Clubs from "../../../../Icons/Clubs";
import Diamonds from "../../../../Icons/Diamonds";
import Charts from "../../../../Charts";

const Holders: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { holders } = useHolders({
    variables: { slug: "crypto" },
  });
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });

  // Use live data from OpenSea, with fallbacks
  const stats = {
    Wallets: opensea?.num_owners || "...",
    "Full Decks": holders?.fullDecks?.length || "...",
    "52+ decks": holders?.fullDecksWithJokers?.length || "...",
  };

  return (
    <div
      css={(theme) => [
        {
          padding: 30,
          paddingBottom: 23,
          borderRadius: 20,

          background: theme.colors.darkBlack,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Holders</Text>
      <div css={[{ display: "flex", gap: 30, marginTop: 30 }]}>
        {Object.keys(stats).map((item) => (
          <ScandiBlock
            key={item}
            css={[{ paddingTop: 15, display: "block", width: "100%" }]}
          >
            <Text typography="newh3">{stats[item as keyof typeof stats]}</Text>
            <Text typography="newh4" css={{ fontSize: 20 }}>{item}</Text>
          </ScandiBlock>
        ))}
      </div>
      <Charts
        type="column"
        withTooltip={true}
        css={(theme) => ({
          height: "initial",
          flexGrow: 1,
          color: theme.colors.dark_gray,
          marginTop: theme.spacing(8.8),

          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
        dataPoints={[
          {
            name: "spades",
            // value: holders.spades.length,
            value: 41,
            color: "spades",
            icon: <Spades />,
          },
          {
            name: "hearts",
            // value: holders.hearts.length,
            value: 39,
            color: "hearts",
            icon: <Hearts />,
          },
          {
            name: "clubs",
            // value: holders.clubs.length,
            value: 40,
            color: "clubs",
            icon: <Clubs />,
          },
          {
            name: "diamonds",
            // value: holders.diamonds.length,
            value: 46,
            color: "diamonds",
            icon: <Diamonds />,
          },
        ]}
      />
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30, fontSize: 15 }]}
      >
        Diamonds are the most collected suit.
      </Text>
    </div>
  );
};

export default Holders;
