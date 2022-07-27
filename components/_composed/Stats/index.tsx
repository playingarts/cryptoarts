import { FC } from "react";
import { useOpensea } from "../../../hooks/opensea";
import { socialLinks } from "../../../source/consts";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";

interface Props extends StatBlockProps {
  deckId: string;
}

const Content: FC<GQL.Opensea["stats"]> = ({
  num_owners,
  total_volume,
  floor_price,
}) => (
  <div
    css={(theme) => [
      {
        rowGap: theme.spacing(4),
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        [theme.maxMQ.sm]: {
          columnGap: theme.spacing(2),
        },
      },
    ]}
  >
    {num_owners && (
      <Stat
        label="Total holders"
        value={num_owners.toLocaleString()}
        css={(theme) => [
          {
            flexGrow: 1,
            flexBasis: `calc(50%-${theme.spacing(2)}px)`,
          },
        ]}
      />
    )}
    {floor_price && (
      <Stat
        label="FLOOR PRICE"
        value={parseFloat(floor_price.toFixed(2)).toLocaleString()}
        eth={true}
        css={(theme) => [
          {
            flexGrow: 1,
            flexBasis: `calc(50%-${theme.spacing(2)}px)`,
          },
        ]}
      />
    )}
    {total_volume && (
      <Stat
        label="VOLUME TRADED"
        value={parseFloat(total_volume.toFixed(2)).toLocaleString()}
        eth={true}
        css={[{ flexGrow: 1 }]}
      />
    )}
  </div>
);

const ComposedStats: FC<Props> = ({ deckId, ...props }) => {
  const { opensea } = useOpensea({ variables: { deck: deckId } });

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
