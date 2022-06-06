import { FC, Fragment } from "react";
import { useOpensea } from "../../../hooks/opensea";
import Charts from "../../Charts";
import Line from "../../Line";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import { socialLinks } from "../../../source/consts";
import { theme } from "../../../pages/_app";

interface Props extends StatBlockProps {
  collection: NonNullable<GQL.Deck["openseaCollection"]>;
}

const Content: FC<GQL.Opensea["stats"]> = ({ onSale, total_supply }) => (
  <Fragment>
    {total_supply && (
      <Stat value={total_supply.toLocaleString()} label="Total nft supply" />
    )}
    {total_supply && onSale && (
      <Charts
        type="pie"
        withTooltip={true}
        css={(theme) => ({
          flexGrow: 1,
          marginBottom: theme.spacing(1.5),
          marginTop: theme.spacing(1.5),
          alignItems: "flex-end",
        })}
        dataPoints={[
          { name: "onSale", value: onSale },
          {
            name: "off sale",
            value: total_supply - onSale,
            color: theme.colors.charcoal_gray,
          },
        ]}
      />
    )}
  </Fragment>
);
const ComposedSupply: FC<Props> = ({ collection, ...props }) => {
  const { opensea } = useOpensea({ variables: { collection } });

  return (
    <StatBlock
      {...props}
      title="supply"
      action={{
        href: socialLinks.onSale,
        children: `On Sale ${opensea ? opensea.stats.onSale : ""}`,
        target: "_blank",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {opensea && <Content {...opensea.stats} />}
        <div>
          <Line spacing={0} />
        </div>
      </div>
    </StatBlock>
  );
};

export default ComposedSupply;
