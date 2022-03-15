import { FC } from "react";
import BlockTitle from "../../BlockTitle";
import Grid from "../../Grid";
import Opensea from "../../Icons/Opensea";
import Layout from "../../Layout";
import ComposedHolders from "../Holders";
import ComposedStats from "../Stats";
import ComposedSupply from "../Supply";

interface Props {
  collection: string;
}

const ComposedPace: FC<Props> = ({ collection }) => {
  return (
    <Layout
      css={(theme) => ({
        background: theme.colors.page_bg_dark,
        color: theme.colors.text_title_light,
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(15),
      })}
    >
      <Grid>
        <BlockTitle
          variant="h2"
          title={
            <span
              css={(theme) => ({
                background: theme.colors.eth,
                color: "transparent",
                backgroundClip: "text",
              })}
            >
              (PACE) NFT
            </span>
          }
          subTitleText="This card is a part of Crypto Edition NFT drop. Are you a holder? Connect your metamask to see what you are eligible for."
          css={{
            gridColumn: "2 / span 10",
          }}
          buttonProps={{
            Icon: Opensea,
            children: "Buy nft",
            css: (theme) => ({
              background: theme.colors.eth,
            }),
          }}
        />
      </Grid>

      <Grid
        css={(theme) => ({
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(3),
        })}
      >
        <ComposedSupply
          css={(theme) => ({
            gridColumn: "span 3",
            background: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
          })}
          deck={collection}
        />

        <ComposedHolders
          css={(theme) => ({
            gridColumn: "span 6",
            background: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
          })}
          deck={collection}
        />

        <ComposedStats
          css={(theme) => ({
            background: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
            gridColumn: "10 / span 3",
          })}
          deck={collection}
        />
      </Grid>
    </Layout>
  );
};

export default ComposedPace;
