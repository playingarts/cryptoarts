import { FC, Fragment } from "react";
import { useOpensea } from "../../../hooks/opensea";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import { socialLinks } from "../../../source/consts";

interface Props extends StatBlockProps {
  collection: NonNullable<GQL.Deck["openseaCollection"]>;
}

const Content: FC<GQL.Opensea["stats"]> = ({
  num_owners,
  total_volume,
  floor_price,
}) => (
  <Fragment>
    {num_owners && (
      <Stat label="Total holders" value={num_owners.toLocaleString()} />
    )}
    {total_volume && (
      <Stat
        label="VOLUME TRADED"
        value={parseFloat(total_volume.toFixed(2)).toLocaleString()}
        eth={true}
        css={(theme) => ({ marginTop: theme.spacing(4) })}
      />
    )}
    {floor_price && (
      <Stat
        label="FLOOR PRICE"
        value={parseFloat(floor_price.toFixed(2)).toLocaleString()}
        eth={true}
        css={(theme) => ({ marginTop: theme.spacing(4) })}
      />
    )}
  </Fragment>
);

const ComposedStats: FC<Props> = ({ collection, ...props }) => {
  const { opensea } = useOpensea({ variables: { collection } });

  return (
    <StatBlock
      {...props}
      title="Stats"
      action={{
        children: "All stats",
        href: socialLinks.allStats,
        target: "_blank",
      }}
    >
      {opensea && <Content {...opensea.stats} />}
    </StatBlock>
  );
};

export default ComposedStats;
