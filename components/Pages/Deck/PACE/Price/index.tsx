import { FC, HTMLAttributes, ReactNode } from "react";
import { useOpensea } from "../../../../../hooks/opensea";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";

/** Eth symbol with Arial font */
const EthSymbol: FC = () => (
  <span css={{ fontFamily: "Arial, sans-serif" }}>Ξ</span>
);

/** Format ETH value with Ξ symbol */
const formatEth = (value: number | undefined | null, decimals = 3): ReactNode => {
  if (value === undefined || value === null) return "...";
  let numStr: string;
  if (value >= 1000) numStr = Math.round(value).toLocaleString();
  else if (value >= 1) numStr = value.toFixed(Math.min(decimals, 2));
  else if (value >= 0.01) numStr = value.toFixed(Math.min(decimals, 3));
  else numStr = value.toFixed(decimals);
  return <><EthSymbol />{numStr}</>;
};

const Price: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });

  // Use live data from OpenSea
  const stats = {
    "Trading volume": formatEth(opensea?.volume, 0),
    "Avg price": formatEth(opensea?.average_price, 3),
    "Record sale": <><EthSymbol />35</>,
  };

  return (
    <div
      css={(theme) => [
        {
          padding: 30,
          paddingBottom: 25,
          borderRadius: 20,

          background: theme.colors.darkBlack,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Price</Text>
      {Object.keys(stats).map((item) => (
        <ScandiBlock
          key={item}
          css={[
            { paddingTop: 15, display: "block", width: "170", marginTop: 30 },
          ]}
        >
          <Text typography="newh3">{stats[item as keyof typeof stats]}</Text>
          <Text typography="newh4" css={{ fontSize: 20 }}>{item}</Text>
        </ScandiBlock>
      ))}

      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30, fontSize: 15 }]}
      >
        {opensea?.updatedAt
          ? `Last updated: ${new Date(opensea.updatedAt).toLocaleDateString()}`
          : "Loading..."}
      </Text>
    </div>
  );
};

export default Price;
