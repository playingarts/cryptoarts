import { useRouter } from "next/router";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { Sections } from "../../../source/enums";
import BlockTitle from "../../BlockTitle";
import Grid from "../../Grid";
import Opensea from "../../Icons/Opensea";
import Layout, { Props as LayoutProps } from "../../Layout";
import ComposedHolders from "../Holders";
import ComposedStats from "../Stats";
import ComposedSupply from "../Supply";

interface Props extends LayoutProps {
  deckId: string;
}

const ComposedPace: ForwardRefRenderFunction<HTMLElement, Props> = (
  { deckId, ...props },
  ref
) => {
  const {
    query: { section, artistId },
  } = useRouter();

  return (
    <Layout
      css={(theme) => ({
        background: theme.colors.page_bg_dark,
        color: theme.colors.text_title_light,
        paddingTop: theme.spacing(15),
      })}
      ref={ref}
      scrollIntoView={section === Sections.nft}
      {...props}
    >
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
        {...(artistId && {
          subTitleText:
            "This card is a part of Crypto Edition NFT drop. Are you a holder? Connect your metamask to see what you are eligible for.",
        })}
        buttonProps={{
          Icon: Opensea,
          children: "Buy nft",
          css: (theme) => ({
            background: theme.colors.eth,
          }),
        }}
      />

      <Grid
        css={(theme) => ({
          paddingTop: theme.spacing(4),
          gap: theme.spacing(3),
          [theme.mq.xsm]: {
            gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px) `,
          },
          [theme.mq.md]: {
            gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px) `,
          },
        })}
      >
        <ComposedSupply
          css={(theme) => ({
            gridColumn: "span 3",
            background: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
          })}
          deckId={deckId}
        />

        <ComposedHolders
          css={(theme) => ({
            gridColumn: "span 6",
            [theme.maxMQ.xsm]: {
              gridColumn: "span 3",
            },
            [theme.maxMQ.md]: {
              order: 3,
            },
            background: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
          })}
          deckId={deckId}
        />

        <ComposedStats
          css={(theme) => ({
            background: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
            gridColumn: "span 3",
          })}
          deckId={deckId}
        />
      </Grid>
    </Layout>
  );
};

export default forwardRef(ComposedPace);
