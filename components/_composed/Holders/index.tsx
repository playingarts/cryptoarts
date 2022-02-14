import { FC } from "react";
import { useHolders } from "../../../hooks/opensea";
import { theme } from "../../../pages/_app";
import Charts from "../../Charts";
import Grid from "../../Grid";
import Clubs from "../../Icons/Clubs";
import Diamonds from "../../Icons/Diamonds";
import Hearts from "../../Icons/Hearts";
import Spades from "../../Icons/Spades";
import Line from "../../Line";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import Text from "../../Text";

interface Props extends StatBlockProps {
  deck: string;
}

const ComposedHolders: FC<Props> = ({ deck, ...props }) => {
  const { holders } = useHolders({ variables: { deck } });

  if (!holders) {
    return null;
  }

  return (
    <StatBlock
      {...props}
      title="holders"
      action={{ children: "Leaderboard", href: "/" }}
    >
      <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Grid css={{ gridTemplateColumns: "1fr 1fr" }}>
          <Stat
            label="54-card deck (incl jokers)"
            value={holders.fullDeck.filter(({ jokers }) => !!jokers).length}
          />
          <Stat
            label="52-card deck (excl jokers)"
            value={holders.fullDeck.length}
          />
        </Grid>
        <Text
          variant="h7"
          css={(theme) => ({
            opacity: 0.5,
            margin: 0,
            marginTop: theme.spacing(2),
          })}
        >
          Full suit
        </Text>
        <Charts
          type="column"
          withTooltip={true}
          css={(theme) => ({
            flexGrow: 1,
            width: theme.spacing(41.2),
            color: theme.colors.dark_gray,
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(2),
          })}
          dataPoints={[
            {
              name: "spades",
              value: holders.spades.length,
              color: theme.colors.spades,
              icon: <Spades />,
            },
            {
              name: "hearts",
              value: holders.hearts.length,
              color: theme.colors.hearts,
              icon: <Hearts />,
            },
            {
              name: "clubs",
              value: holders.clubs.length,
              color: theme.colors.clubs,
              icon: <Clubs />,
            },
            {
              name: "diamonds",
              value: holders.diamonds.length,
              color: theme.colors.diamonds,
              icon: <Diamonds />,
            },
          ]}
        />
        <div>
          <Line spacing={0} />
        </div>
      </div>
    </StatBlock>
  );
};

export default ComposedHolders;
