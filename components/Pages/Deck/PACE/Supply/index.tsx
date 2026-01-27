import { FC, HTMLAttributes } from "react";
import { useOpensea } from "../../../../../hooks/opensea";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";
import Charts from "../../../../Charts";
import AnimatedNumber from "../../../../AnimatedNumber";
import Link from "../../../../Link";

const Supply: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });

  return (
    <div
      css={(theme) => [
        {
          display: "flex",
          flexDirection: "column",
          background: theme.colors.darkBlack,
          padding: theme.spacing(3),
          paddingBottom: 25,
          borderRadius: theme.spacing(2),
          height: "100%",
          boxSizing: "border-box",
        },
      ]}
      {...props}
    >
      <Text typography="h4">Supply</Text>
      <ScandiBlock
        css={(theme) => [
          { paddingTop: 15, marginTop: theme.spacing(3), display: "block", width: "100%" },
        ]}
      >
        <Text typography="h3">{opensea ? <AnimatedNumber value={opensea.total_supply} /> : "..."}</Text>
        <Text typography="p-m">Total NFTs</Text>
      </ScandiBlock>
      <Charts
        type="pie"
        withTooltip={true}
        css={(theme) => ({
          marginTop: "auto",
          paddingTop: 51,
          width: "100%",
        })}
        dataPoints={[
          { name: "On sale", value: Number(opensea ? opensea.on_sale : 0) },
          {
            name: "Off sale",
            value: opensea
              ? Number(opensea.total_supply) - Number(opensea.on_sale)
              : 0,
            color: "charcoal_gray",
          },
        ]}
      />
      <Text
        typography="p-s"
        css={(theme) => [{ color: theme.colors.white50, marginTop: theme.spacing(3), fontSize: 15 }]}
      >
        {opensea ? (
          <Link
            href="https://opensea.io/collection/cryptoedition?status=listed"
            target="_blank"
            rel="noopener noreferrer"
            css={(theme) => ({
              color: theme.colors.white50,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            })}
          >
            {Number(opensea.on_sale).toLocaleString()} NFTs listed for sale
          </Link>
        ) : "..."}
      </Text>
    </div>
  );
};

export default Supply;
