import Head from "next/head";
import { FC, Fragment, RefObject, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useDeck } from "../../hooks/deck";
import Layout from "../../components/Layout";
import { withApollo } from "../../source/apollo";
import { useLoadCards } from "../../hooks/card";
import { useRouter } from "next/router";
import CardList from "../../components/Card/List";
import Box from "../../components/Box";
import DeckBlock from "../../components/DeckBlock";
import BlockTitle from "../../components/BlockTitle";
import Bag from "../../components/Icons/Bag";
import Plus from "../../components/Icons/Plus";
import ComposedGallery from "../../components/_composed/Gallery";
import Text from "../../components/Text";
import Line from "../../components/Line";
import DeckNav from "../../components/DeckNav";
import Grid from "../../components/Grid";
import Esquire from "../../components/Icons/Esquire";
import FastCompany from "../../components/Icons/FastCompany";
import CreativeBloq from "../../components/Icons/CreativeBloq";
import DigitalArts from "../../components/Icons/DigitalArts";
import Quote from "../../components/Quote";
import throttle from "just-throttle";
import ComposedGlobalLayout from "../../components/_composed/GlobalLayout";
import ComposedCardContent from "../../components/_composed/CardContent";
import Opensea from "../../components/Icons/Opensea";
import StatBlock from "../../components/StatBlock";
import Stat from "../../components/Stat";
import Charts from "../../components/Charts";
import { theme } from "../_app";
import Spades from "../../components/Icons/Spades";
import Hearts from "../../components/Icons/Hearts";
import Clubs from "../../components/Icons/Clubs";
import Diamonds from "../../components/Icons/Diamonds";
import AugmentedReality from "../../components/AugmentedReality";

const Content: FC<{
  galleryRef: RefObject<HTMLElement>;
  deckRef: RefObject<HTMLElement>;
  cardsRef: RefObject<HTMLElement>;
  deckNavRef: RefObject<HTMLElement>;
}> = ({ galleryRef, deckRef, cardsRef, deckNavRef }) => {
  const {
    query: { cardId, deckId },
  } = useRouter();
  const { deck } = useDeck({ variables: { slug: deckId } });
  const { loadCards, cards, loading } = useLoadCards();

  useEffect(() => {
    if (deck) {
      loadCards({
        variables: {
          deck: deck._id,
        },
      });
    }
  }, [deck, loadCards]);

  if (loading || !cards || !deck) {
    return null;
  }

  return (
    <Fragment>
      {typeof cardId === "string" && (
        <ComposedCardContent
          css={(theme) => ({
            background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            color: theme.colors.page_bg_light,
          })}
          deck={deck}
          cardId={cardId}
          cards={cards}
        />
      )}

      {!cardId && (
        <Layout
          css={(theme) => ({
            background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            color: theme.colors.light_gray,
            paddingTop: theme.spacing(18),
          })}
        >
          <Box>
            <Text component="h1" css={{ margin: 0 }}>
              {deck.title}
            </Text>
            <Text variant="body3">{deck.info}</Text>
            <Line spacing={3} />
            <DeckNav
              ref={deckNavRef}
              refs={{ cardsRef, deckRef, galleryRef }}
              links={{
                ...(deck.slug === "crypto"
                  ? {
                      opensea: "/opensea",
                    }
                  : { buyNow: "/buyNow" }),
                share: "/share",
                shop: "/shop",
              }}
            />
          </Box>
        </Layout>
      )}

      <Layout ref={cardsRef}>
        <Box>
          <BlockTitle
            title="Cards"
            subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
            buttonProps={{
              children: (
                <span
                  css={(theme) => ({
                    background: theme.colors.gradient,
                    backgroundClip: "text",
                    color: "transparent",
                  })}
                >
                  metamask
                </span>
              ),
              Icon: Plus,
              css: (theme) => ({
                background: theme.colors.dark_gray,
                color: "#82A7F8",
              }),
            }}
          />
        </Box>
        <CardList cards={cards} />
      </Layout>

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
          <StatBlock
            css={(theme) => ({
              gridColumn: "span 3",
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
            })}
            title="supply"
            action={{ href: "/", children: "All tokens" }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Stat value={(7830).toLocaleString()} label="total nft supply" />
              <Charts
                type="pie"
                withTooltip={true}
                css={(theme) => ({
                  flexGrow: 1,
                  marginBottom: theme.spacing(2),
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
              <div>
                <Line spacing={0} />
              </div>
            </div>
          </StatBlock>
          <StatBlock
            css={(theme) => ({
              gridColumn: "span 6",
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
            })}
            title="holders"
            action={{ children: "Leaderboard", href: "/" }}
          >
            <div
              css={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Grid css={{ gridTemplateColumns: "1fr 1fr" }}>
                <Stat label="54-card deck (incl jokers)" value="08" />
                <Stat label="52-card deck (excl jokers)" value="34" />
              </Grid>
              <Text
                variant="h7"
                css={(theme) => ({
                  opacity: 0.5,
                  margin: 0,
                  marginTop: theme.spacing(2),
                })}
              >
                full suit
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
                    value: 42,
                    color: theme.colors.spades,
                    icon: <Spades />,
                  },
                  {
                    name: "hearts",
                    value: 41,
                    color: theme.colors.hearts,
                    icon: <Hearts />,
                  },
                  {
                    name: "clubs",
                    value: 43,
                    color: theme.colors.clubs,
                    icon: <Clubs />,
                  },
                  {
                    name: "diamonds",
                    value: 46,
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
          <StatBlock
            css={(theme) => ({
              background: theme.colors.dark_gray,
              color: theme.colors.text_title_light,
              gridColumn: "span 3",
            })}
            title="Stats"
            action={{ children: "All stats", href: "/" }}
          >
            <Stat label="Total holders" value="1.55k" />
            <Stat
              label="Total volume"
              value="4.41k"
              eth={true}
              css={(theme) => ({ marginTop: theme.spacing(4.2) })}
            />
            <Stat
              label="Current floor price"
              value={"0.04"}
              eth={true}
              css={(theme) => ({ marginTop: theme.spacing(4.2) })}
            />
          </StatBlock>
        </Grid>

        <AugmentedReality />
      </Layout>

      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
        })}
        ref={deckRef}
      >
        <Box>
          <BlockTitle
            variant="h3"
            title="Deck"
            subTitleText="Enjoy colorful, original artwork from 55 todays leading international illustrators, all in the palm of your hand!"
            buttonProps={{
              Icon: Bag,
              children: "Buy now",
              css: (theme) => ({
                background: theme.colors.dark_gray,
                color: theme.colors.text_title_light,
              }),
            }}
          />
          <DeckBlock
            css={(theme) => ({
              marginTop: theme.spacing(14),
            })}
            properties={{
              size: "Poker, 88.9 × 63.5mm",
              material: "Bicycle® paper with Air-cushion finish",
              inside: "52 Playing cards + 2 Jokers + Info card",
            }}
          />
        </Box>
      </Layout>

      <Layout ref={galleryRef}>
        <ComposedGallery />
        <Grid>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <Esquire />
          </div>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <FastCompany />
          </div>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <CreativeBloq />
          </div>
          <div css={{ gridColumn: "span 3", textAlign: "center" }}>
            <DigitalArts />
          </div>
        </Grid>
        <Box>
          <Quote>
            “Two is a sign of union. And diamonds are a sign of prosperity. I
            wanted to show the duality using my Ugly character wearing a
            twofaced mask.”
          </Quote>
        </Box>
      </Layout>
    </Fragment>
  );
};

const Deck: NextPage = () => {
  const {
    query: { cardId },
  } = useRouter();
  const galleryRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const deckNavRef = useRef<HTMLElement>(null);
  const [altNavVisible, showAltNav] = useState(false);

  useEffect(() => {
    const handler = throttle(() => {
      if (!deckNavRef.current) {
        return;
      }

      const { top, height } = deckNavRef.current.getBoundingClientRect();

      showAltNav(top + height < 0);
    }, 100);

    showAltNav(!!cardId);

    if (!cardId) {
      handler();
    }

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [cardId]);

  return (
    <ComposedGlobalLayout
      altNav={<DeckNav refs={{ cardsRef, deckRef, galleryRef }} />}
      showAltNav={altNavVisible}
    >
      <Head>
        <title>Crypto Arts</title>
      </Head>

      <Content
        galleryRef={galleryRef}
        deckRef={deckRef}
        cardsRef={cardsRef}
        deckNavRef={deckNavRef}
      />
    </ComposedGlobalLayout>
  );
};

export default withApollo(Deck);
