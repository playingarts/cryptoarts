import { FC, HTMLAttributes } from "react";
import { useOpensea } from "../../../../hooks/opensea";
import Grid from "../../../Grid";
import Intro from "../../../Intro";
import Button from "../../../Buttons/Button";
import Supply from "./Supply";
import Holders from "./Holders";
import Price from "./Price";
import Leaderboard from "./Leaderboard";
import LastSale from "./LastSale";

const PACE: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { opensea } = useOpensea({ variables: { slug: "crypto" } });
  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.spaceBlack,
          paddingBottom: 120,
          gap: 30,
        },
      ]}
      id="pace"
    >
      <Intro
        css={[{ minHeight: 311, marginBottom: 30, boxSizing: "content-box" }]}
        arrowedText="Crypto Edition NFT"
        paragraphText="Nerd out on the stats behind this iconic NFT collection."
        titleAsText
        beforeLinkNew={<Button color="accent">View on Opensea</Button>}
      />

      {/* <ComposedSupply
        css={(theme) => ({
          gridColumn: "span 3",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
          background: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
        })}
        opensea={opensea}
      /> */}
      <Supply
        css={(theme) => ({
          gridColumn: "span 3",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
      />

      <Holders
        css={(theme) => ({
          gridColumn: "span 6",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
          [theme.mq.sm]: {
            [theme.maxMQ.md]: {
              order: 3,
            },
          },
        })}
      />
      <Price
        css={(theme) => ({
          gridColumn: "span 3",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
      />
      <Leaderboard
        css={(theme) => ({
          gridColumn: "span 9",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
      />
      <LastSale
        css={(theme) => ({
          gridColumn: "span 3",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        })}
      />
    </Grid>
  );
};

export default PACE;
