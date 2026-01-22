import { FC, HTMLAttributes } from "react";
import { useOpensea } from "../../../../../hooks/opensea";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";
import AnimatedNumber from "../../../../AnimatedNumber";

/** Fixed ETH price in USD */
const ETH_PRICE_USD = 4000;

/** Eth symbol with Arial font */
const EthSymbol: FC = () => (
  <span css={{ fontFamily: "Arial, sans-serif" }}>Ξ</span>
);

/** Format ETH value with Ξ symbol */
const formatEth = (value: number | undefined | null, decimals = 3): string => {
  if (value === undefined || value === null) return "...";
  if (value >= 1000) return Math.round(value).toLocaleString();
  else if (value >= 1) return value.toFixed(Math.min(decimals, 2));
  else if (value >= 0.01) return value.toFixed(Math.min(decimals, 3));
  else return value.toFixed(decimals);
};

/** Format USD value */
const formatUsd = (ethValue: number | undefined | null): string | null => {
  if (ethValue === undefined || ethValue === null) return null;
  const usd = ethValue * ETH_PRICE_USD;
  if (usd >= 1000000) return `$${(usd / 1000000).toFixed(1)}M`;
  if (usd >= 1000) return `$${Math.round(usd / 1000)}k`;
  return `$${usd.toFixed(2)}`;
};

const Price: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });

  // Use live data from OpenSea
  const stats: Array<{ label: string; ethValue: number | undefined | null; decimals?: number }> = [
    { label: "Trading volume", ethValue: opensea?.volume, decimals: 0 },
    { label: "Avg price", ethValue: opensea?.average_price, decimals: 3 },
    { label: "Record sale", ethValue: 35, decimals: 0 },
  ];

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
      {stats.map((stat) => {
        const ethFormatted = formatEth(stat.ethValue, stat.decimals);
        const usdFormatted = formatUsd(stat.ethValue);

        return (
          <ScandiBlock
            key={stat.label}
            css={[
              { paddingTop: 15, display: "block", width: "170", marginTop: 25 },
            ]}
          >
            <Text typography="newh3" css={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span>
                <EthSymbol />
                {stat.ethValue !== undefined && stat.ethValue !== null ? (
                  <AnimatedNumber value={stat.ethValue} decimals={stat.decimals === 0 ? 0 : (stat.ethValue >= 1 ? 2 : 3)} />
                ) : (
                  "..."
                )}
              </span>
              <span css={(theme) => ({ fontSize: 20, color: theme.colors.white50 })}>
                {usdFormatted ?? ""}
              </span>
            </Text>
            <Text typography="newh4" css={{ fontSize: 20 }}>{stat.label}</Text>
          </ScandiBlock>
        );
      })}

      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 30, fontSize: 15 }]}
      >
        {opensea?.sales_count
          ? <>Total sales: <AnimatedNumber value={opensea.sales_count} /></>
          : "Loading..."}
      </Text>
    </div>
  );
};

export default Price;
