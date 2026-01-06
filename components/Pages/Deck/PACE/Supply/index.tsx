import { FC, HTMLAttributes } from "react";
import { useOpensea } from "../../../../../hooks/opensea";
import Text from "../../../../Text";
import ScandiBlock from "../../../../ScandiBlock";
import Charts from "../../../../Charts";

const Supply: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.darkBlack,
          padding: 30,
          paddingBottom: 25,
          borderRadius: 20,
        },
      ]}
      {...props}
    >
      <Text typography="newh4">Supply</Text>
      <ScandiBlock
        css={[
          { paddingTop: 15, marginTop: 30, display: "block", maxWidth: 170 },
        ]}
      >
        <Text typography="newh3">{opensea ? opensea.total_supply : "..."}</Text>
        <Text typography="newh4">Total NFTs</Text>
      </ScandiBlock>
      <Charts
        type="pie"
        withTooltip={true}
        css={(theme) => ({
          flexGrow: 1,
          alignItems: "flex-end",
          marginTop: 51,
          width: "100%",
        })}
        dataPoints={[
          { name: "on sale", value: Number(opensea ? opensea.on_sale : 0) },
          {
            name: "off sale",
            value: opensea
              ? Number(opensea.total_supply) - Number(opensea.on_sale)
              : 0,
            color: "charcoal_gray",
          },
        ]}
      />
      <Text
        typography="paragraphSmall"
        css={(theme) => [{ color: theme.colors.white50, marginTop: 25 }]}
      >
        {opensea
          ? (
              (Number(opensea.on_sale) / Number(opensea.total_supply)) *
              100
            ).toFixed(1) + "%"
          : "... "}{" "}
        on sale
      </Text>
    </div>
  );
};

export default Supply;
