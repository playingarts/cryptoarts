import { FC, useEffect, useState } from "react";
import { breakpoints } from "../../../source/enums";
import Arrowed from "../../Arrowed";
import Button from "../../Button";
import Grid from "../../Grid";
import Bag from "../../Icons/Bag";
import { Props as LayoutProps } from "../../Layout";
import Link from "../../Link";
import NFTHolder from "../../NFTHolder";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";
import BlockWithProperties from "../BlockWithProperties";
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

  const [opensea, setOpensea] = useState<GQL.Opensea>();

  useEffect(() => {
    fetch(
      `https://api.opensea.io/api/v1/collection/${deck.openseaCollection.name}`
    )
      .then((res) => res.json())
      .then((data) => setOpensea(data.collection));
  }, [deck]);

  return (
    <div {...props}>
      <BlockWithProperties
        title={
          <span
            css={(theme) => [
              {
                [theme.mq.sm]: {
                  color: "#fff",
                },
              },
            ]}
          >
            NFT Collection
          </span>
        }
        action={
          <Button
            Icon={Bag}
            component={Link}
            target="_blank"
            css={(theme) => ({
              width: "100%",
              gridColumn: "1/-1",
              justifyContent: "center",
              background: theme.colors.eth,
              backgroundSize: "400% 100%",
              animation: "gradient 5s ease infinite",

              [theme.maxMQ.sm]: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
              },
            })}
            href={`https://opensea.io/collection/${deck.openseaCollection.name}`}
          >
            Opensea
          </Button>
        }
        properties={[
          {
            key: "DROP DATE",
            value: "19 August 2021",
          },
          {
            key: "CONTRACT",
            value: (
              <Link
                href="https://etherscan.io/address/0xc22616e971a670e72f35570337e562c3e515fbfe"
                target="_blank"
                css={(theme) => [
                  {
                    gridColumn: "3 / -1",
                    [theme.maxMQ.sm]: {
                      gridColumn: "1 / -1",
                    },
                  },
                ]}
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
                            fontSize: 16,
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
                        : "0xC22616E97.....2c3E515FBFE"}
                    </span>
                  </Arrowed>
                </Text>
              </Link>
            ),
          },
          {
            key: "TOKEN STANDART",
            value: "ERC-721",
          },
        ]}
      >
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
        <Grid
          css={(theme) => [
            {
              gridColumn: "1/-1",
              // paddingTop: theme.spacing(3),
              gap: theme.spacing(3),
              [theme.maxMQ.sm]: {
                marginTop: theme.spacing(1.5),
                gap: theme.spacing(2),
              },
              [theme.mq.sm]: {
                gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px) `,
              },
              [theme.mq.md]: {
                gridTemplateColumns: `repeat(12, ${theme.spacing(7.5)}px) `,
              },
              // [theme.maxMQ.sm]: [{ rowGap: theme.spacing(1.5) }],
            },
          ]}
        >
          <ComposedSupply
            css={(theme) => ({
              gridColumn: "span 3",
              [theme.maxMQ.sm]: {
                gridColumn: "1 / -1",
              },
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
            })}
            opensea={opensea}
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
            opensea={opensea}
          />

          {width < breakpoints.sm && (
            <NFTHolder
              gradient={true}
              // noDesc={true}
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
      </BlockWithProperties>
    </div>
  );
};

export default ComposedPace;
