import { FC, HTMLAttributes } from "react";
import { useOpensea } from "../../../../hooks/opensea";
import Grid from "../../../Grid";
import Intro from "../../../Intro";
import Button from "../../../Buttons/Button";
import Link from "../../../Link";
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
    >
      <Intro
        css={[{ minHeight: 311, marginBottom: 30, boxSizing: "content-box" }]}
        arrowedText="PACE NFT Collection"
        paragraphText="Nerd out on the stats behind this iconic NFT collection."
        titleAsText
        palette="dark"
        beforeLinkNew={
          <Link href="https://opensea.io/collection/cryptoedition" target="_blank" rel="noopener noreferrer">
            <Button color="accent" css={{ fontSize: 20 }}>View on OpenSea</Button>
          </Link>
        }
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
