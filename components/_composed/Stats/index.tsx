import { FC } from "react";
import { socialLinks } from "../../../source/consts";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";

interface Props extends StatBlockProps {
  opensea?: GQL.Opensea;
}

const Content: FC<GQL.Opensea> = ({ num_owners, volume, floor_price }) => (
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
        palette="dark"
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
        palette="dark"
        label="FLOOR PRICE"
        value={parseFloat(floor_price.toFixed(3)).toLocaleString()}
        eth={true}
        css={(theme) => [
          {
            flexGrow: 1,
            flexBasis: `calc(50%-${theme.spacing(2)}px)`,
          },
        ]}
      />
    )}
    {volume && (
      <Stat
        palette="dark"
        label="VOLUME TRADED"
        value={parseFloat(Number(volume).toFixed(0)).toLocaleString()}
        eth={true}
        css={[{ flexGrow: 1 }]}
      />
    )}
  </div>
);

const ComposedStats: FC<Props> = ({ opensea, ...props }) => {
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
      {opensea && <Content {...opensea} />}
    </StatBlock>
  );
};

export default ComposedStats;
