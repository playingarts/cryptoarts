import { FC } from "react";
import { breakpoints } from "../../../source/enums";
import Arrowed from "../../Arrowed";
import BlockTitle from "../../BlockTitle";
import Button from "../../Button";
import Grid from "../../Grid";
import Bag from "../../Icons/Bag";
import Opensea from "../../Icons/Opensea";
import { Props as LayoutProps } from "../../Layout";
import Line from "../../Line";
import Link from "../../Link";
import NFTHolder from "../../NFTHolder";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";
import ComposedHolders from "../Holders";
import ComposedStats from "../Stats";
import ComposedSupply from "../Supply";

interface Props extends LayoutProps {
  deck: GQL.Deck & {
    openseaCollection: {
      address: string;
      name: string;
    };
  };
  palette?: "dark" | "light";
}

const ComposedPace: FC<Props> = ({ palette, deck, ...props }) => {

  const { width } = useSize();

  return (
    <div {...props}>
      <BlockTitle
        palette={width >= breakpoints.sm ? "dark" : palette}
        variant={width >= breakpoints.sm ? "h3" : "h3"}
        title={
          <span
            css={(theme) => [
              {
                [theme.mq.sm]: {
                  // background: theme.colors.eth,
                  // backgroundSize: "400% 100%",
                  // animation: "gradient 5s ease infinite",
                  color: "#fff",
                  // backgroundClip: "text",
                },
              },
            ]}
          >
            NFT Collection
          </span>
        }
        // {...(artistId && {
        //   subTitleText:
        //     "This card is a part of Crypto Edition NFT drop. Are you a holder? Connect your metamask to see what you are eligible for.",
        // })}
        buttonProps={
          width >= breakpoints.sm
            ? {
                target: "_blank",
                href: `https://opensea.io/collection/${
                  (deck as GQL.Deck & { openseaCollection: { name: string } })
                    .openseaCollection.name
                }`,
                component: Link,
                Icon: Opensea,
                children: "Opensea",
                css: (theme) => ({
                  background: theme.colors.eth,
                  backgroundSize: "400% 100%",
                  animation: "gradient 5s ease infinite",
                }),
              }
            : {}
        }
        css={(theme) => [
          {
            [theme.mq.sm]: {
              color: theme.colors.white,
            },
          },
        ]}
      >
        <Grid
          css={(theme) => [
            {
              paddingTop: theme.spacing(3),
              gap: theme.spacing(3),
              [theme.mq.sm]: {
                gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px) `,
              },
              [theme.mq.md]: {
                gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px) `,
              },
              [theme.maxMQ.sm]: [{ rowGap: theme.spacing(1.5) }],
            },
          ]}
        >
          <Grid
            short={true}
            css={(theme) => [
              {
                gridColumn: "1/-1",
                rowGap: 0,
                color: theme.colors.white,
                [theme.maxMQ.sm]: [
                  palette === "light" && {
                    color: theme.colors.black,
                  },
                ],
              },
            ]}
          >
            <Text
              variant="h7"
              css={(theme) => [
                palette !== undefined && {
                  color:
                    palette === "dark"
                      ? theme.colors.text_subtitle_light
                      : theme.colors.text_subtitle_dark,
                },
                {
                  gridColumn: "1 / 3",
                  [theme.mq.sm]: {
                    color: theme.colors.text_subtitle_light,
                  },
                  margin: 0,
                },
              ]}
            >
              DROP DATE
            </Text>
            <Text
              variant="body"
              css={(theme) => [
                palette !== undefined && {
                  color:
                    palette === "dark"
                      ? theme.colors.page_bg_light
                      : theme.colors.text_title_dark,
                },
                {
                  width: "100%",
                  margin: 0,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  gridColumn: "3 / -1",
                  [theme.maxMQ.sm]: {
                    fontSize: 16,
                  },
                  [theme.mq.sm]: {
                    color: theme.colors.page_bg_light,
                  },
                },
              ]}
            >
              19 August 2021
            </Text>
            <Line
              palette={width < breakpoints.sm ? palette : "dark"}
              spacing={1.5}
              css={{ gridColumn: "1/-1", width: "100%" }}
            />

            <Text
              variant="h7"
              css={(theme) => [
                palette !== undefined && {
                  color:
                    palette === "dark"
                      ? theme.colors.text_subtitle_light
                      : theme.colors.text_subtitle_dark,
                },
                {
                  gridColumn: "1 / 3",
                  margin: 0,
                  [theme.mq.sm]: {
                    color: theme.colors.text_subtitle_light,
                  },
                },
              ]}
            >
              CONTRACT
            </Text>

            <Link
              href="https://etherscan.io/address/0xc22616e971a670e72f35570337e562c3e515fbfe"
              target="_blank"
              css={{
                gridColumn: "3 / -1",
              }}
            >
              <Text
                variant="body"
                css={(theme) => [
                  {
                    width: "100%",
                    margin: 0,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: theme.colors.text_subtitle_light,
                  },
                  palette !== undefined && {
                    [theme.maxMQ.sm]: {
                      color:
                        palette === "dark"
                          ? theme.colors.text_subtitle_light
                          : theme.colors.text_subtitle_dark,
                    },
                  },
                ]}
              >
                <Arrowed rotation={135}>
                  <span
                    css={(theme) => [
                      palette !== undefined && {},
                      {
                        color: theme.colors.text_title_light,
                        [theme.maxMQ.sm]: {
                          color:
                            palette === "dark"
                              ? theme.colors.page_bg_light
                              : theme.colors.text_title_dark,
                        },
                      },
                    ]}
                  >
                    {width >= breakpoints.sm
                      ? "0xC22616E971a670E72F35570337e562c3E515FBFE"
                      : "0xC22616E.....515FBFE"}
                  </span>
                </Arrowed>
              </Text>
            </Link>
            <Line
                palette={width < breakpoints.sm ? palette : "dark"}
                spacing={1.5}
                css={{ gridColumn: "1/-1", width: "100%" }}
              />
              <Text
              variant="h7"
              css={(theme) => [
                palette !== undefined && {
                  color:
                    palette === "dark"
                      ? theme.colors.text_subtitle_light
                      : theme.colors.text_subtitle_dark,
                },
                {
                  gridColumn: "1 / 3",
                  [theme.mq.sm]: {
                    color: theme.colors.text_subtitle_light,
                  },
                  margin: 0,
                },
              ]}
            >
              TOKEN STANDART
            </Text>
            <Text
              variant="body"
              css={(theme) => [
                palette !== undefined && {
                  color:
                    palette === "dark"
                      ? theme.colors.page_bg_light
                      : theme.colors.text_title_dark,
                },
                {
                  width: "100%",
                  margin: 0,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  gridColumn: "3 / -1",
                  [theme.maxMQ.sm]: {
                    fontSize: 16,
                  },
                  [theme.mq.sm]: {
                    color: theme.colors.page_bg_light,
                  },
                },
              ]}
            >
              ERC-721
            </Text>
            <Line
              palette={width < breakpoints.sm ? palette : "dark"}
              spacing={1.5}
              css={{ gridColumn: "1/-1", width: "100%" }}
            />
          </Grid>

          {width < breakpoints.sm && (
            <Button
              Icon={Bag}
              component={Link}
              target="_blank"
              css={(theme) => ({
                background: theme.colors.eth,
                width: "100%",
                gridColumn: "1/-1",
                justifyContent: "center",
                [theme.maxMQ.sm]: {
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                },
              })}
              href={`https://opensea.io/collection/${deck.openseaCollection.name}`}
            >
              Opensea
            </Button>
          )}

          <ComposedSupply
            css={(theme) => ({
              gridColumn: "span 3",
              [theme.maxMQ.sm]: {
                gridColumn: "1 / -1",
              },
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
            })}
            deckId={deck._id}
          />

          <ComposedHolders
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
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
            })}
            deckId={deck._id}
          />

          <ComposedStats
            css={(theme) => ({
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
              gridColumn: "span 3",
              [theme.maxMQ.sm]: {
                gridColumn: "1 / -1",
              },
            })}
            deckId={deck._id}
          />

          {width < breakpoints.sm && (
            <NFTHolder
              gradient={true}
              noDesc={true}
              css={(theme) => [
                {
                  [theme.maxMQ.sm]: {
                    gridColumn: "1 / -1",
                    marginBottom: theme.spacing(2.5),
                  },
                },
              ]}
            />
          )}
        </Grid>
      </BlockTitle>
    </div>
  );
};

export default ComposedPace;
