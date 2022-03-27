import { FC, Fragment } from "react";
import { useOpensea } from "../../../hooks/opensea";
import { theme } from "../../../pages/_app";
import Charts from "../../Charts";
import Line from "../../Line";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import { socialLinks } from "../../../source/consts";

interface Props extends StatBlockProps {
  collection: NonNullable<GQL.Deck["openseaCollection"]>;
}

const Content: FC<GQL.Opensea["stats"]> = ({ total_supply }) => (
  <Fragment>
    {total_supply && (
      <Stat value={total_supply.toLocaleString()} label="Total nft supply" />
    )}
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
        {
          name: "diamonds",
          value: 7,
          color: theme.colors.diamonds,
        },
        { name: "clubs", value: 15, color: theme.colors.clubs },
        {
          name: "2, 3, 4, ... Ace",
          value: 20,
          color: theme.colors.spades,
        },
      ]}
    />
  </Fragment>
);

const ComposedSupply: FC<Props> = ({ collection, ...props }) => {
  const { opensea } = useOpensea({ variables: { collection } });

  return (
    <StatBlock
      {...props}
      title="supply"
      action={{
        href: socialLinks.allTokens,
        children: "All tokens",
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
