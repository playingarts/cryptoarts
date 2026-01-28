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
          paddingTop: 60,
          paddingBottom: 120,
          gap: theme.spacing(3),
          [theme.maxMQ.xsm]: {
            paddingTop: 0,
          },
        },
      ]}
    >
      <Intro
        css={(theme) => [{ minHeight: 311, marginBottom: theme.spacing(3), boxSizing: "content-box" }]}
        arrowedText="PACE NFT Collection"
        paragraphText="Nerd out on the stats behind this iconic NFT collection."
        palette="dark"
        beforeLinkNew={
          <Link href="https://opensea.io/collection/cryptoedition" target="_blank" rel="noopener noreferrer">
            <Button color="accent" size="medium">View on OpenSea</Button>
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
            gridColumn: "1 / -1",
          },
        })}
      />

      <Holders
        css={(theme) => ({
          gridColumn: "span 6",
          [theme.maxMQ.sm]: {
            gridColumn: "1 / -1",
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
            gridColumn: "1 / -1",
          },
        })}
      />
      <Leaderboard
        css={(theme) => ({
          gridColumn: "span 9",
          [theme.maxMQ.sm]: {
            gridColumn: "1 / -1",
          },
        })}
      />
      <LastSale
        css={(theme) => ({
          gridColumn: "span 3",
          [theme.maxMQ.sm]: {
            gridColumn: "1 / -1",
          },
        })}
      />
    </Grid>
  );
};

export default PACE;
