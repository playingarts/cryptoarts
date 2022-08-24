import throttle from "just-throttle";
import { useMetaMask } from "metamask-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  FC,
  Fragment,
  memo,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import AugmentedReality from "../components/AugmentedReality";
import Button from "../components/Button";
import DeckBlock from "../components/DeckBlock";
import DeckNav from "../components/DeckNav";
import Grid from "../components/Grid";
import Bag from "../components/Icons/Bag";
import Layout from "../components/Layout";
import Line from "../components/Line";
import Link from "../components/Link";
import Modal from "../components/Modal";
import NFTHolder from "../components/NFTHolder";
import { useSize } from "../components/SizeProvider";
import Text from "../components/Text";
import ArtContest from "../components/_composed/ArtContest";
import ComposedCardContent from "../components/_composed/CardContent";
import ComposedCardList from "../components/_composed/ComposedCardList";
import ComposedEntries from "../components/_composed/ComposedEntries";
import ComposedRoadmap from "../components/_composed/ComposedRoadmap";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import ComposedPace from "../components/_composed/Pace";
import { useSignature } from "../contexts/SignatureContext";
import { useDeck } from "../hooks/deck";
import { useLoadLosersValues } from "../hooks/loser";
import { useLoadOwnedAssets } from "../hooks/opensea";
import { withApollo } from "../source/apollo";
import { breakpoints, Sections } from "../source/enums";

export type OwnedCard = { value: string; suit: string; token_id: string };

const Content: FC<{
  losersExist?: boolean;
  aboutRef: RefObject<HTMLDivElement>;
  deckRef: RefObject<HTMLElement>;
  cardsRef: RefObject<HTMLElement>;
  contestRef: RefObject<HTMLElement>;
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
  }) => {
    const {
      query: { artistId, deckId, section },
      pathname,
    } = useRouter();
    const { account, status } = useMetaMask();
    const { getSig } = useSignature();
    const { deck, loading } = useDeck({ variables: { slug: deckId } });

    const { ownedAssets, loadOwnedAssets } = useLoadOwnedAssets();

    const [ownedCards, setOwnedCards] = useState<OwnedCard[]>([]);

    const contest = pathname.includes("/contest/");

    useLayoutEffect(() => {
      if (!deck) {
        return;
      }

      const currentSig = getSig();

      if (!currentSig || !currentSig.signature || !currentSig.account) {
        return;
      }

      const { account: signedAccount, signature } = currentSig;

      loadOwnedAssets({
        variables: {
          deck: deck._id,
          address: signedAccount,
          signature,
        },
      });
    }, [deck, getSig, loadOwnedAssets]);

    useLayoutEffect(() => {
      setOwnedCards([]);
    }, [account]);

    useLayoutEffect(() => {
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
          <ComposedCardContent
            css={(theme) => ({
              color: theme.colors.text_subtitle_light,
              background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            })}
            ownedCards={ownedCards}
            deck={deck}
            contest={contest}
            artistId={artistId}
            ref={aboutRef}
          />
        )}

        {!artistId && (
          <Layout
            css={(theme) => ({
              background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
              color: theme.colors.light_gray,
              paddingTop: theme.spacing(26),
              paddingBottom: theme.spacing(6),
              [theme.maxMQ.sm]: {
                paddingTop: theme.spacing(19),
                paddingBottom: theme.spacing(4),
              },
            })}
            ref={aboutRef}
          >
            <div
              css={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                background: `url(${deck.backgroundImage}) 50% 50%`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                minHeight: "100%",
              }}
            />
            <Grid css={{ zIndex: 1, position: "relative" }} short={true}>
              <div css={{ gridColumn: "1 / -1" }}>
                <Text component="h1" css={{ margin: 0 }}>
                  {deck.title}
                </Text>
                <Text variant="body3" css={{ margin: 0 }}>
                  {deck.info}
                </Text>
                <Line
                  palette="dark"
                  css={(theme) => [
                    deck.slug === "crypto" && {
                      background: theme.colors.eth,
                      animation: "gradient 5s ease infinite",
                      backgroundSize: "400% 100%",
                      opacity: 1,
                    },
                  ]}
                  spacing={3}
                />
                {deck.openseaCollection && width < breakpoints.sm && (
                  <Button
                    Icon={Bag}
                    component={Link}
                    target="_blank"
                    css={(theme) => ({
                      background: theme.colors.eth,
                      width: "100%",
                      justifyContent: "center",
                    })}
                    href={`https://opensea.io/collection/${deck.openseaCollection.name}`}
                  >
                    buy nft
                  </Button>
                )}
                {width >= breakpoints.sm && (
                  <DeckNav
                    ref={deckNavRef}
                    refs={{
                      roadmapRef,
                      nftRef:
                        (deck &&
                          deck.openseaCollection &&
                          !artistId &&
                          nftRef) ||
                        undefined,
                      cardsRef,
                      contestRef: (losersExist && contestRef) || undefined,
                      deckRef,
                    }}
                    links={{
                      ...(deck.openseaCollection
                        ? {
                            opensea: `https://opensea.io/collection/${deck.openseaCollection.name}`,
                          }
                        : { buyNow: "/shop" }),
                      shop: "/shop",
                    }}
                  />
                )}
              </div>
            </Grid>
          </Layout>
        )}

        <div
          css={(theme) => [
            {
              [theme.maxMQ.sm]: [
                deck.openseaCollection && status === "connected"
                  ? {
                      background: theme.colors.page_bg_dark,
                    }
                  : {
                      background: theme.colors.white,
                    },
                {
                  display: "grid",
                  paddingBottom: theme.spacing(2.5),
                },
                !contest && {
                  gap: theme.spacing(1),
                },
              ],
            },
          ]}
        >
          {deck.openseaCollection && width < breakpoints.sm && (
            <Layout>
              <NFTHolder
                gradient={true}
                noDesc={true}
                css={(theme) => [
                  {
                    marginTop: theme.spacing(2.5),
                    marginBottom: theme.spacing(1.5),
                    [theme.maxMQ.sm]: {
                      gridColumn: "1 / -1",
                    },
                  },
                ]}
              />
            </Layout>
          )}
          {!contest && (
            <Layout
              scrollIntoView={section === Sections.cards}
              ref={cardsRef}
              palette={
                status === "connected" && deck.openseaCollection
                  ? "dark"
                  : "light"
              }
              css={(theme) => [
                {
                  paddingRight: theme.spacing(0),
                  paddingLeft: theme.spacing(0),
                  [theme.mq.sm]: {
                    color:
                      status === "connected" && deck.openseaCollection
                        ? theme.colors.text_title_light
                        : theme.colors.text_title_dark,
                    background:
                      status === "connected" && deck.openseaCollection
                        ? theme.colors.page_bg_dark
                        : theme.colors.page_bg_light,
                    paddingTop: theme.spacing(15),
                    paddingBottom: theme.spacing(15),
                  },
                },
              ]}
              truncateInit={false}
            >
              <ComposedCardList deck={deck} ownedCards={ownedCards} />
            </Layout>
          )}

          {contest && <ArtContest deck={deck} />}

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
              {deck.openseaCollection && (
                <Layout
                  css={(theme) => ({
                    [theme.mq.sm]: {
                      background: theme.colors.page_bg_dark,
                      paddingTop: theme.spacing(15),
                    },
                  })}
                  ref={nftRef}
                  scrollIntoView={section === Sections.nft}
                  palette={
                    status === "connected" && deck.openseaCollection
                      ? "dark"
                      : "light"
                  }
                >
                  <ComposedPace
                    palette={
                      status === "connected" && deck.openseaCollection
                        ? "dark"
                        : "light"
                    }
                    deck={
                      deck as GQL.Deck & {
                        openseaCollection: Record<string, string>;
                      }
                    }
                  />
                </Layout>
              )}
              {deck.slug === "crypto" && !artistId && (
                <Layout
                  css={(theme) => ({
                    [theme.mq.sm]: {
                      background: theme.colors.page_bg_dark,
                      color: theme.colors.text_title_light,
                      paddingTop: theme.spacing(15),
                      paddingBottom: theme.spacing(15),
                    },
                  })}
                  ref={roadmapRef}
                  scrollIntoView={section === Sections.roadmap}
                  palette={
                    status === "connected" && deck.openseaCollection
                      ? "dark"
                      : "light"
                  }
                >
                  <ComposedRoadmap
                    palette={status === "connected" ? "dark" : "light"}
                  />
                </Layout>
              )}
              <Layout
                css={(theme) => [
                  {
                    [theme.mq.sm]: {
                      paddingTop: theme.spacing(15),
                      paddingBottom: theme.spacing(5.4),
                      background: theme.colors.page_bg_light_gray,
                    },
                  },
                ]}
                ref={deckRef}
                scrollIntoView={section === Sections.deck}
                palette={
                  status === "connected" && deck.openseaCollection
                    ? "dark"
                    : "light"
                }
              >
                <DeckBlock
                  palette={
                    width < breakpoints.sm &&
                    status === "connected" &&
                    deck.openseaCollection
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
                        paddingTop: theme.spacing(6),
                        background: theme.colors.page_bg_light_gray,
                      },
                    },
                  ]}
                  palette={
                    status === "connected" && deck.openseaCollection
                      ? "dark"
                      : "light"
                  }
                >
                  <AugmentedReality
                    palette={
                      status === "connected" && deck.openseaCollection
                        ? "dark"
                        : "light"
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
  const aboutRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const contestRef = useRef<HTMLElement>(null);
  const deckNavRef = useRef<HTMLElement>(null);
  const nftRef = useRef<HTMLElement>(null);
  const roadmapRef = useRef<HTMLElement>(null);

  const [altNavVisible, showAltNav] = useState(false);
  const [isCardPage, setIsCardPage] = useState(false);
  const { deck } = useDeck({ variables: { slug: deckId } });

  const { losers, loadLosersValues } = useLoadLosersValues();

  useEffect(() => {
    if (deck) {
      loadLosersValues({
        variables: { deck: deck._id },
      });
    }
  }, [deck]);

  const losersExist = losers && losers.length !== 0;

  useLayoutEffect(() => {
    if (!aboutRef.current) {
      showAltNav(false);
    }

    setIsCardPage(!!artistId);

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
      <Modal />
      <ComposedGlobalLayout
        extended={true}
        altNav={
          <DeckNav
            refs={{
              roadmapRef,
              contestRef: (losersExist && contestRef) || undefined,
              nftRef: (deck && deck.openseaCollection && nftRef) || undefined,
              cardsRef,
              deckRef,
              aboutRef,
            }}
          />
        }
        showAltNav={altNavVisible}
        deckId={deckId instanceof Array ? deckId[0] : deckId}
        palette={artistId ? undefined : "gradient"}
        isCardPage={isCardPage}
      >
        <Content
          losersExist={losersExist}
          aboutRef={aboutRef}
          deckRef={deckRef}
          cardsRef={cardsRef}
          contestRef={contestRef}
          deckNavRef={deckNavRef}
          nftRef={nftRef}
          roadmapRef={roadmapRef}
        />
      </ComposedGlobalLayout>
    </Fragment>
  );
};

export default withApollo(Page);
