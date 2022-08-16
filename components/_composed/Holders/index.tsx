import { FC } from "react";
import { useHolders } from "../../../hooks/opensea";
import { theme } from "../../../pages/_app";
import { socialLinks } from "../../../source/consts";
import { breakpoints } from "../../../source/enums";
import Charts from "../../Charts";
import Grid from "../../Grid";
import Clubs from "../../Icons/Clubs";
import Diamonds from "../../Icons/Diamonds";
import Hearts from "../../Icons/Hearts";
import Joker from "../../Icons/Joker";
import Spades from "../../Icons/Spades";
import Line from "../../Line";
import { useSize } from "../../SizeProvider";
import Stat from "../../Stat";
import StatBlock, { Props as StatBlockProps } from "../../StatBlock";
import Text from "../../Text";

interface Props extends StatBlockProps {
  deckId: string;
}

const ComposedHolders: FC<Props> = ({ deckId, ...props }) => {
  const { holders } = useHolders({
    variables: { deck: deckId },
  });

  const { width } = useSize();

  if (!holders) {
    return null;
  }

  return (
    <StatBlock
      {...props}
      title="holders"
      action={{
        children: "Leaderboard",
        href: socialLinks.leaderboard,
        target: "_blank",
      }}
    >
      <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Grid css={{ gridTemplateColumns: "1fr 1fr !important" }}>
          <Stat
            palette="dark"
            label={`54-card deck${
              (width >= breakpoints.sm && " (incl jokers)") || ""
            }`}
            value={holders.fullDecksWithJokers.length}
          />
          <Stat
            palette="dark"
            label={`52-card deck${
              (width >= breakpoints.sm && " (excl jokers)") || ""
            }`}
            value={holders.fullDecks.length}
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
            color: theme.colors.dark_gray,
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
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
            {
              name: "jokers",
              value: holders.jokers.length,
              color: theme.colors.joker,
              icon: <Joker />,
            },
          ]}
        />
        <div>
          <Line palette="dark" spacing={0} />
        </div>
      </div>
    </StatBlock>
  );
};

export default ComposedHolders;
