/* eslint-disable @typescript-eslint/no-require-imports */
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
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import ComposedPace from "../components/_composed/Pace";
import { getDeckSlugsWithoutDB } from "../dump/_decks";
import { CardsQuery, HeroCardsQuery } from "../hooks/card";
import { DecksQuery, useDeck } from "../hooks/deck";
import { LosersQuery, useLoadLosers } from "../hooks/loser";
import { useOwnedAssets } from "../hooks/opensea";
import frag from "../Shaders/Xemantic/index.glsl";
import { initApolloClient, withApollo } from "../source/apollo";
import { breakpoints, Sections } from "../source/enums";
import { theme } from "./_app";
import PodcastAndSocials from "../components/_composed/PodcastAndSocials";
import { connect } from "../source/mongoose";

export type OwnedCard = { value: string; suit: string; identifier: string };

const Content: FC<{
  losersExist?: boolean;
  aboutRef: RefObject<HTMLDivElement | null>;
  deckRef: RefObject<HTMLElement | null>;
  cardsRef: RefObject<HTMLElement | null>;
  contestRef: RefObject<HTMLElement | null>;
  gameRef: RefObject<HTMLElement | null>;
  deckNavRef: RefObject<HTMLElement | null>;
  nftRef: RefObject<HTMLElement | null>;
  roadmapRef: RefObject<HTMLElement | null>;
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
        (ownedAssets as GQL.Nft[]).flatMap(({ traits = [], identifier }) => {
          const value = traits.find((trait) => trait.trait_type === "Value");
          const suit = traits.find(
            (trait) =>
              trait.trait_type === "Suit" || trait.trait_type === "Color"
          );

          if (value && suit) {
            return {
              value: value.value.toLowerCase(),
              suit: suit.value.toLowerCase(),
              identifier,
            };
          }
          return { value: "", suit: "", identifier };
        })
      );
    }, [ownedAssets]);

    const { width } = useSize();

    if (!loading && !deck) {
      return null;
    }

    return (
      <Fragment>
        {typeof artistId === "string" && (
          <div
            css={(theme) => [
              deck && deck.slug === "crypto"
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
            title={deck && deck.short}
            subtitle={deck && deck.info}
            labels={deck && deck.labels}
            ref={aboutRef}
            slug={typeof deckId === "string" ? deckId : deck && deck.slug}
            css={(theme) => [
              typeof deckId === "string" &&
                theme.colors.decks[
                  deckId as keyof typeof theme.colors.decks
                ] && {
                  background:
                    theme.colors.decks[
                      deckId as keyof typeof theme.colors.decks
                    ].background,
                  color:
                    theme.colors.decks[
                      deckId as keyof typeof theme.colors.decks
                    ].textColor,
                },
            ]}
            outerChildren={
              <Hero
                slug={deck && deck.slug}
                deck={deck && deck._id}
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
              (deck && deck.slug === "special" && (
                <ShadertoyReact
                  fs={frag}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              )) ||
              undefined
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
            {deck && width >= breakpoints.sm && (
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
                deck && deck.slug === "crypto"
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

          {!contest && deck && (
            <Layout
              scrollIntoView={section === Sections.cards}
              ref={cardsRef}
              palette={
                // status === "connected" && deck.openseaCollection
                deck && deck.slug === "crypto" ? "dark" : "light"
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
                      deckId === "crypto"
                        ? theme.colors.text_title_light
                        : theme.colors.text_title_dark,
                    background:
                      // status === "connected" && deck.openseaCollection
                      deckId === "crypto"
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

          {/* {width >= breakpoints.sm && (
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
          )} */}

          {/* Contest block */}

          {/* {contest && <ArtContest deck={deck} />} */}

          {losersExist && (
            <ComposedEntries
              contest={contest}
              scrollIntoView={section === Sections.contest}
              ref={contestRef}
              deck={deck as GQL.Deck}
            />
          )}

          {/* NFT collection block */}

          {deck && !contest && (
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

              {deckId === "crypto" && !artistId && (
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
                    deckId === "crypto" ? "dark" : "light"
                  }
                >
                  <ComposedRoadmap
                    // palette={status === "connected" ? "dark" : "light"}
                    palette={deckId === "crypto" ? "dark" : "light"}
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
                        deckId === "crypto"
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
                  deckId === "crypto" ? "dark" : "light"
                }
              >
                <DeckBlock
                  palette={
                    width < breakpoints.sm &&
                    // status === "connected" &&
                    // deck.openseaCollection
                    deckId === "crypto"
                      ? "dark"
                      : "light"
                  }
                  deck={deck}
                />
              </Layout>

              {deck.slug === "crypto" && (
                <Fragment>
                  <Layout
                    css={(theme) => [
                      {
                        [theme.mq.sm]: {
                          paddingBottom: theme.spacing(3),
                          paddingTop: theme.spacing(0),
                          background: theme.colors.page_bg_light_gray,
                        },
                      },
                    ]}
                    palette={deck.slug === "crypto" ? "dark" : "light"}
                  >
                    <AugmentedReality
                      palette={
                        width >= breakpoints.sm
                          ? "light"
                          : deck.slug === "crypto"
                          ? "dark"
                          : "light"
                      }
                    />
                  </Layout>
                  <PodcastAndSocials
                    palette={deck.slug === "crypto" ? "dark" : "light"}
                    css={(theme) => [
                      {
                        [theme.mq.sm]: {
                          paddingBottom: theme.spacing(6),
                          background: theme.colors.page_bg_light_gray,
                        },
                      },
                    ]}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
);

Content.displayName = "Content";

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
  const decks = await getDeckSlugsWithoutDB();

  return {
    paths: decks.map((deckId) => ({ params: { deckId } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  {
    cache?: NormalizedCacheObject;
  },
  { deckId: string }
> = async (context) => {
  await connect();

  const { deckId } = context.params!;

  const client = initApolloClient(undefined, {
    schema: (await require("../source/graphql/schema")).schema,
  });

  const decks = (
    (await client.query({ query: DecksQuery })) as {
      data: { decks: GQL.Deck[] };
    }
  ).data.decks;

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
    props: {
      cache: client.cache.extract(),
      ...(deck.slug === "crypto" && { revalidate: 60 }),
    },
  };
};

export default withApollo(Page, { ssr: false });
// export default withApollo(Page);
