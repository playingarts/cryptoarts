import { FC, HTMLAttributes, useMemo } from "react";
import { useHolders, useOpensea } from "../../../../../hooks/opensea";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";
import Spades from "../../../../Icons/Spades";
import Hearts from "../../../../Icons/Hearts";
import Clubs from "../../../../Icons/Clubs";
import Diamonds from "../../../../Icons/Diamonds";
import Charts from "../../../../Charts";
import AnimatedNumber from "../../../../AnimatedNumber";

const Holders: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { holders } = useHolders({
    variables: { slug: "crypto" },
  });
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });

  // Use live data from OpenSea, with fallbacks
  const stats = {
    "Unique wallets": opensea?.num_owners ? <AnimatedNumber value={opensea.num_owners} /> : "...",
    "52+ card decks": holders?.fullDecks?.length ? (
      <span css={{ display: "inline-flex", alignItems: "baseline", height: 40 }}>
        <AnimatedNumber value={holders.fullDecks.length} />
        <span css={(theme) => ({ ...theme.typography.linkNewTypography, color: theme.colors.white50, marginLeft: 10 })}>/150</span>
      </span>
    ) : "...",
    "Full decks": holders?.fullDecksWithJokers ? (
      <span css={{ display: "inline-flex", alignItems: "baseline", height: 40 }}>
        <AnimatedNumber value={holders.fullDecksWithJokers.length} />
        <span css={(theme) => ({ ...theme.typography.linkNewTypography, color: theme.colors.white50, marginLeft: 10 })}>/15</span>
      </span>
    ) : "...",
  };

  // Suit data for chart - use live data when available
  const suitData = useMemo(() => {
    const data = [
      { name: "Spades", value: holders?.spades?.length ?? 0, color: "spades" as const, icon: <Spades /> },
      { name: "Hearts", value: holders?.hearts?.length ?? 0, color: "hearts" as const, icon: <Hearts /> },
      { name: "Clubs", value: holders?.clubs?.length ?? 0, color: "clubs" as const, icon: <Clubs /> },
      { name: "Diamonds", value: holders?.diamonds?.length ?? 0, color: "diamonds" as const, icon: <Diamonds /> },
    ];
    return data;
  }, [holders]);

  // Find most collected suit dynamically
  const mostCollectedSuit = useMemo(() => {
    if (!holders) return null;
    const maxSuit = suitData.reduce((max, suit) =>
      suit.value > max.value ? suit : max
    , suitData[0]);
    return maxSuit.value > 0 ? maxSuit.name : null;
  }, [suitData, holders]);

  return (
    <div
      css={(theme) => [
        {
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(3),
          paddingBottom: 23,
          borderRadius: theme.spacing(2),
          height: "100%",
          boxSizing: "border-box",
          background: theme.colors.darkBlack,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Holders</Text>
      <div css={(theme) => [{ display: "flex", gap: theme.spacing(3), marginTop: theme.spacing(3), flexWrap: "wrap" }]}>
        {Object.keys(stats).map((item) => (
          <ScandiBlock
            key={item}
            css={(theme) => [{ paddingTop: 15, display: "block", width: "100%", flex: "1 1 30%", minWidth: 120, [theme.maxMQ.xsm]: { flex: "1 1 100%" } }]}
          >
            <Text typography="newh3">{stats[item as keyof typeof stats]}</Text>
            <Text typography="linkNewTypography">{item}</Text>
          </ScandiBlock>
        ))}
      </div>
      <Charts
        type="column"
        withTooltip={true}
        css={(theme) => ({
          height: "initial",
          color: theme.colors.dark_gray,
          marginTop: "auto",
          paddingTop: theme.spacing(8.8),

          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
        dataPoints={suitData}
      />
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: theme.spacing(3), fontSize: 15 }]}
      >
        {mostCollectedSuit
          ? `${mostCollectedSuit} are the most collected suit.`
          : "Loading suit data..."}
      </Text>
    </div>
  );
};

export default Holders;
