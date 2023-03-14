import { NormalizedCacheObject } from "@apollo/client";
import throttle from "just-throttle";
import { useMetaMask } from "metamask-react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FC,
  Fragment,
  memo,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import ShadertoyReact from "shadertoy-react";
import AugmentedReality from "../components/AugmentedReality";
import Button from "../components/Button";
import DeckBlock from "../components/DeckBlock";
import DeckNav from "../components/DeckNav";
import Hero from "../components/Hero";
import Bag from "../components/Icons/Bag";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Modal from "../components/Modal";
import { useSize } from "../components/SizeProvider";
import ComposedCardContent from "../components/_composed/CardContent";
import ComposedCardList from "../components/_composed/ComposedCardList";
import ComposedEntries from "../components/_composed/ComposedEntries";
import ComposedMain from "../components/_composed/ComposedMain";
import ComposedRoadmap from "../components/_composed/ComposedRoadmap";
import GamePromo from "../components/_composed/GamePromo";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import ComposedPace from "../components/_composed/Pace";
import { CardsQuery, HeroCardsQuery } from "../hooks/card";
import { DecksQuery, useDeck } from "../hooks/deck";
import { LosersQuery, useLoadLosers } from "../hooks/loser";
import { useOwnedAssets } from "../hooks/opensea";
import frag from "../Shaders/Xemantic/index.glsl";
import { initApolloClient, withApollo } from "../source/apollo";
import { breakpoints, Sections } from "../source/enums";
import { connectToDB } from "../source/mongoose";
import { theme } from "./_app";

export type OwnedCard = { value: string; suit: string; token_id: string };

const Content: FC<{
  losersExist?: boolean;
  aboutRef: RefObject<HTMLDivElement>;
  deckRef: RefObject<HTMLElement>;
  cardsRef: RefObject<HTMLElement>;
  contestRef: RefObject<HTMLElement>;
  gameRef: RefObject<HTMLElement>;
  deckNavRef: RefObject<HTMLElement>;
  nftRef: RefObject<HTMLElement>;
  roadmapRef: RefObject<HTMLElement>;
}> = memo(
  ({
    losersExist,
    aboutRef,
    deckRef,
    cardsRef,
    deckNavRef,
    nftRef,
    roadmapRef,
    contestRef,
    gameRef,
  }) => {
    const {
      query: { artistId, section, deckId },
      pathname,
    } = useRouter();

    const { account } = useMetaMask();

    const { deck, loading } = useDeck({
      variables: { slug: deckId },
    });

    const ownedAssets = useOwnedAssets(deck && deck.slug);

    const [ownedCards, setOwnedCards] = useState<OwnedCard[]>([]);

    const contest = pathname.includes("/contest/");

    useEffect(() => {
      setOwnedCards([]);
    }, [account]);

    useEffect(() => {
      if (!ownedAssets) {
        return;
      }

      setOwnedCards(
        (ownedAssets as GQL.Asset[]).flatMap(({ traits, token_id }) => {
          const value = traits.find((trait) => trait.trait_type === "Value");
          const suit = traits.find(
            (trait) =>
              trait.trait_type === "Suit" || trait.trait_type === "Color"
          );

          if (value && suit) {
            return {
              value: value.value.toLowerCase(),
              suit: suit.value.toLowerCase(),
              token_id,
            };
          }
          return { value: "", suit: "", token_id };
        })
      );
    }, [ownedAssets]);

    const { width } = useSize();

    if (loading || !deck) {
      return null;
    }

    return (
      <Fragment>
        {typeof artistId === "string" && (
          <div
            css={(theme) => [
              deck.slug === "crypto"
                ? {
                    background: theme.colors.page_bg_dark,
                  }
                : {
                    background: theme.colors.white,
                    [theme.mq.sm]: {
                      background: theme.colors.page_bg_light_gray,
                    },
                  },
            ]}
          >
            <ComposedCardContent
              css={(theme) => ({
                color: theme.colors.text_subtitle_light,
                background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, #111111 100%)`,
                borderRadius: "0px 0px 30px 30px",
                [theme.mq.sm]: {
                  borderRadius: "0px 0px 50px 50px",
                },
              })}
              ownedCards={ownedCards}
              deck={deck}
              contest={contest}
              artistId={artistId}
              ref={aboutRef}
            />
          </div>
        )}

        {!artistId && (
          <ComposedMain
            title={deck.short}
            subtitle={deck.info}
            labels={deck.labels}
            ref={aboutRef}
            slug={deck.slug}
            css={(theme) => [
              {
                background:
                  theme.colors.decks[
                    deck.slug as keyof typeof theme.colors.decks
                  ].background,
                color:
                  theme.colors.decks[
                    deck.slug as keyof typeof theme.colors.decks
                  ].textColor,
              },
            ]}
            outerChildren={
              <Hero
                slug={deck.slug}
                deck={deck._id}
                css={(theme) => [
                  {
                    width: "100%",
                    [theme.mq.sm]: {
                      gridColumn: "span 3 / -1",
                      marginLeft: theme.spacing(0.5),
                    },
                    [theme.mq.md]: {
                      gridColumn: "span 5 / -1",
                      marginTop: theme.spacing(0),
                    },
                    [theme.maxMQ.md]: {
                      marginTop: theme.spacing(3),
                      marginLeft: theme.spacing(-4),
                    },
                    [theme.maxMQ.sm]: {
                      marginLeft: theme.spacing(-1),
                      position: "relative",
                      marginTop: -theme.spacing(4),
                      order: -1,
                    },
                  },
                ]}
              />
            }
            layoutChildren={
              deck.slug === "special" && (
                <ShadertoyReact
                  fs={frag}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              )
            }
          >
            {width < breakpoints.sm && deck && deck.product && (
              <Button
                component={Link}
                href={{
                  pathname: "/shop",
                  query: {
                    scrollIntoView: `[data-id='${deck.slug}']`,
                    scrollIntoViewBehavior: "smooth",
                  },
                }}
                Icon={Bag}
                css={(theme) => ({
                  background:
                    theme.colors.decks[
                      deck.slug as keyof typeof theme.colors.decks
                    ].nav.button.background,
                  color:
                    theme.colors.decks[
                      deck.slug as keyof typeof theme.colors.decks
                    ].nav.button.color,
                  justifyContent: "center",
                })}
              >
                {deck.openseaCollection
                  ? "Claim"
                  : deck.product.status === "soldout"
                  ? "Sold out"
                  : "Buy now"}
              </Button>
            )}
            {width >= breakpoints.sm && (
              <DeckNav
                deck={deck}
                linkCss={{
                  [theme.mq.sm]: {
                    transition: theme.transitions.fast("color"),
                    "&:hover": {
                      color:
                        theme.colors.decks[
                          deck.slug as keyof typeof theme.colors.decks
                        ].nav.hoverColor,
                    },
                  },
                }}
                css={(theme) => [
                  {
                    color:
                      theme.colors.decks[
                        deck.slug as keyof typeof theme.colors.decks
                      ].nav.color,
                  },
                ]}
                ref={deckNavRef}
                refs={{
                  roadmapRef,
                  nftRef:
                    (deck && deck.openseaCollection && !artistId && nftRef) ||
                    undefined,
                  cardsRef,
                  gameRef,
                  contestRef: (losersExist && contestRef) || undefined,
                  deckRef,
                }}
              />
            )}
          </ComposedMain>
        )}

        <div
          css={(theme) => [
            {
              [theme.maxMQ.sm]: [
                // deck.openseaCollection && status === "connected"
                deck.slug === "crypto"
                  ? {
                      background: theme.colors.page_bg_dark,
                    }
                  : {
                      background: theme.colors.white,
                    },
                {
                  display: "grid",
                  // paddingBottom: theme.spacing(2.5),
                },
                !contest && {
                  gap: theme.spacing(1),
                  paddingTop: theme.spacing(3),
                  paddingBottom: theme.spacing(5),
                },
              ],
            },
          ]}
        >
          {/* {deck.openseaCollection && width < breakpoints.sm && (
            <Layout>
              <NFTHolder
                gradient={true}
                noDesc={true}
                css={(theme) => [
                  {
                    [theme.maxMQ.sm]: {
                      gridColumn: "1 / -1",
                    },
                  },
                ]}
              />
            </Layout>
          )} */}

          {/* Cards block */}

          {!contest && (
            <Layout
              scrollIntoView={section === Sections.cards}
              ref={cardsRef}
              palette={
                // status === "connected" && deck.openseaCollection
                deck.slug === "crypto" ? "dark" : "light"
              }
              data-id="block-cards"
              css={(theme) => [
                {
                  paddingRight: theme.spacing(0),
                  paddingLeft: theme.spacing(0),
                  [theme.maxMQ.sm]: {
                    marginTop: theme.spacing(1),
                  },
                  [theme.mq.sm]: {
                    color:
                      // status === "connected" && deck.openseaCollection
                      deck.slug === "crypto"
                        ? theme.colors.text_title_light
                        : theme.colors.text_title_dark,
                    background:
                      // status === "connected" && deck.openseaCollection
                      deck.slug === "crypto"
                        ? `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, #111111 100%)`
                        : `linear-gradient(180deg, ${theme.colors.page_bg_light_gray} 0%, #eaeaea 100%)`,
                    paddingTop: theme.spacing(12),
                    paddingBottom: theme.spacing(10),
                  },
                },
              ]}
              truncateInit={false}
            >
              <ComposedCardList deck={deck} ownedCards={ownedCards} />
            </Layout>
          )}

          {/* Game promo block */}

          {width >= breakpoints.sm && (
            <Layout
              scrollIntoView={section === Sections.game}
              ref={gameRef}
              data-id="game-promo"
              css={(theme) => [
                {
                  paddingRight: theme.spacing(0),
                  paddingLeft: theme.spacing(0),
                },
              ]}
            >
              <GamePromo />
            </Layout>
          )}

          {/* Contest block */}

          {/* {contest && <ArtContest deck={deck} />} */}

          {losersExist && (
            <ComposedEntries
              contest={contest}
              scrollIntoView={section === Sections.contest}
              ref={contestRef}
              deck={deck}
            />
          )}

          {!contest && (
            <Fragment>
              {/* NFT collection block */}

              {deck.openseaCollection && !artistId && (
                <Layout
                  css={(theme) => ({
                    [theme.mq.sm]: {
                      background: theme.colors.page_bg_dark,
                      paddingTop: theme.spacing(12),
                      paddingBottom: theme.spacing(0),
                    },
                  })}
                  ref={nftRef}
                  scrollIntoView={section === Sections.nft}
                  palette={
                    // status === "connected" && deck.openseaCollection
                    deck.slug === "crypto" ? "dark" : "light"
                  }
                >
                  <ComposedPace
                    palette={
                      // status === "connected" && deck.openseaCollection
                      deck.slug === "crypto" ? "dark" : "light"
                    }
                    deck={
                      deck as GQL.Deck & {
                        openseaCollection: Record<string, string>;
                      }
                    }
                  />
                </Layout>
              )}

              {/* Roadmap block */}

              {deck.slug === "crypto" && !artistId && (
                <Layout
                  css={(theme) => ({
                    [theme.mq.sm]: {
                      background: theme.colors.page_bg_dark,
                      color: theme.colors.text_title_light,
                      paddingTop: theme.spacing(12),
                      paddingBottom: theme.spacing(15),
                      borderRadius: "0 0 50px 50px",
                    },
                  })}
                  ref={roadmapRef}
                  scrollIntoView={section === Sections.roadmap}
                  palette={
                    // status === "connected" && deck.openseaCollection
                    deck.slug === "crypto" ? "dark" : "light"
                  }
                >
                  <ComposedRoadmap
                    // palette={status === "connected" ? "dark" : "light"}
                    palette={deck.slug === "crypto" ? "dark" : "light"}
                  />
                </Layout>
              )}

              {/* Physical deck block */}

              <Layout
                css={(theme) => [
                  {
                    [theme.mq.sm]: {
                      paddingTop: theme.spacing(12),
                      paddingBottom:
                        deck.slug === "crypto"
                          ? theme.spacing(3)
                          : theme.spacing(10),
                      background: theme.colors.page_bg_light_gray,
                    },
                  },
                ]}
                ref={deckRef}
                scrollIntoView={section === Sections.deck}
                palette={
                  // status === "connected" && deck.openseaCollection
                  deck.slug === "crypto" ? "dark" : "light"
                }
              >
                <DeckBlock
                  palette={
                    width < breakpoints.sm &&
                    // status === "connected" &&
                    // deck.openseaCollection
                    deck.slug === "crypto"
                      ? "dark"
                      : "light"
                  }
                  deck={deck}
                />
              </Layout>

              {deck.slug === "crypto" && (
                <Layout
                  css={(theme) => [
                    {
                      [theme.mq.sm]: {
                        paddingBottom: theme.spacing(6),
                        paddingTop: theme.spacing(0),
                        background: theme.colors.page_bg_light_gray,
                      },
                    },
                  ]}
                  palette={
                    // status === "connected" && deck.openseaCollection
                    deck.slug === "crypto" ? "dark" : "light"
                  }
                >
                  <AugmentedReality
                    palette={
                      // status === "connected" && deck.openseaCollection
                      deck.slug === "crypto" ? "dark" : "light"
                    }
                  />
                </Layout>
              )}
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
);

const Page: NextPage = () => {
  const {
    query: { artistId, deckId },
  } = useRouter();

  // const abstractQuery = pathname.split("/").filter((item) => item !== "");
  // const query = asPath.split("/").filter((item) => item !== "");
  // console.log({ query, abstractQuery });

  // const deckId = query[0];
  // const artistId = query[1] === "contest" ? query[2] : query[1];
  // console.log({ deckId });

  // const client = useApolloClient();

  // console.log("data", client.cache);

  // return null;
  const aboutRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const contestRef = useRef<HTMLElement>(null);
  const gameRef = useRef<HTMLElement>(null);
  const deckNavRef = useRef<HTMLElement>(null);
  const nftRef = useRef<HTMLElement>(null);
  const roadmapRef = useRef<HTMLElement>(null);

  const [altNavVisible, showAltNav] = useState(false);
  const [isCardPage, setIsCardPage] = useState(0);

  const { deck } = useDeck({ variables: { slug: deckId } });

  const { losers, loadLosers } = useLoadLosers();

  useEffect(() => {
    if (deck) {
      loadLosers({
        variables: { deck: deck._id },
      });
    }
  }, [deck]);

  const losersExist = losers && losers.length !== 0;

  useEffect(() => {
    if (!aboutRef.current) {
      showAltNav(false);
    }

    setIsCardPage(artistId ? isCardPage + 1 : 0);

    const handler = throttle(() => {
      if (!aboutRef.current) {
        return;
      }

      const { top, height } = aboutRef.current.getBoundingClientRect();

      showAltNav(top + height - 1 < 0);
    }, 12);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [artistId, deckId]);

  return (
    <Fragment>
      {deck && !artistId && (
        <Head>
          <title>{deck.title} - Playing Arts</title>
          <meta name="description" content={deck.info} />
        </Head>
      )}
      <Modal />
      <ComposedGlobalLayout
        extended={true}
        scrollArrow="block-cards"
        altNav={
          <DeckNav
            refs={{
              roadmapRef,
              contestRef: (losersExist && contestRef) || undefined,
              nftRef: (deck && deck.openseaCollection && nftRef) || undefined,
              cardsRef,
              gameRef,
              deckRef,
              aboutRef,
            }}
          />
        }
        showAltNav={altNavVisible}
        deckId={deckId instanceof Array ? deckId[0] : deckId}
        {...(isCardPage === 0 && {
          palette:
            deck &&
            theme.colors.decks[deck.slug as keyof typeof theme.colors.decks]
              .palette,
        })}
        isCardPage={isCardPage}
      >
        <Content
          losersExist={losersExist}
          aboutRef={aboutRef}
          deckRef={deckRef}
          cardsRef={cardsRef}
          contestRef={contestRef}
          gameRef={gameRef}
          deckNavRef={deckNavRef}
          nftRef={nftRef}
          roadmapRef={roadmapRef}
        />
      </ComposedGlobalLayout>
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  { cache: NormalizedCacheObject },
  { deckId: string }
> = async (context) => {
  const { deckId } = context.params!;
  const client = initApolloClient(undefined, {
    schema: (await require("../source/graphql/schema")).schema,
  });

  const fetchDecks: (numb?: number) => Promise<GQL.Deck[]> = async (
    numb = 1
  ) => {
    try {
      return ((await client.query({ query: DecksQuery })) as {
        data: { decks: GQL.Deck[] };
      }).data.decks;
    } catch (error) {
      if (numb >= 6) {
        throw new Error("Can't fetch decks");
      }
      // await connect();
      await connectToDB();

      return await fetchDecks(numb + 1);
    }
  };

  const decks = await fetchDecks();

  const deck = decks.find((deck) => deck.slug === deckId);

  if (!deck) {
    return {
      notFound: true,
    };
  }

  await client.query({
    query: CardsQuery,
    variables: { deck: deck._id },
  });
  await client.query({
    query: LosersQuery,
    variables: { deck: deck._id },
  });
  await client.query({
    query: HeroCardsQuery,
    variables: { deck: deck._id, slug: deck.slug },
  });

  return {
    props: { cache: client.cache.extract() },
  };
};

export default withApollo(Page, { ssr: false });
// export default withApollo(Page);
