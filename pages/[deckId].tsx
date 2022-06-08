import {
  FC,
  Fragment,
  memo,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { NextPage } from "next";
import { useDeck } from "../hooks/deck";
import Layout from "../components/Layout";
import { withApollo } from "../source/apollo";
import { useRouter } from "next/router";
import BlockTitle from "../components/BlockTitle";
import Text from "../components/Text";
import Line from "../components/Line";
import DeckNav from "../components/DeckNav";
import Grid from "../components/Grid";
import throttle from "just-throttle";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import ComposedCardContent from "../components/_composed/CardContent";
import ComposedPace from "../components/_composed/Pace";
import CardList from "../components/Card/List";
import { Sections } from "../source/enums";
import AugmentedReality from "../components/AugmentedReality";
import Error from "next/error";
import ComposedRoadmap from "../components/_composed/ComposedRoadmap";
import { useMetaMask } from "metamask-react";
import { useSignature } from "../components/SignatureContext";
import { useLoadOwnedAssets } from "../hooks/opensea";

export type OwnedCard = { value: string; suit: string };
import DeckBlock from "../components/DeckBlock";

const Content: FC<{
  aboutRef: RefObject<HTMLDivElement>;
  deckRef: RefObject<HTMLElement>;
  cardsRef: RefObject<HTMLElement>;
  deckNavRef: RefObject<HTMLElement>;
  nftRef: RefObject<HTMLElement>;
  roadmapRef: RefObject<HTMLElement>;
}> = memo(({ aboutRef, deckRef, cardsRef, deckNavRef, nftRef, roadmapRef }) => {
  const {
    query: { artistId, deckId, section },
  } = useRouter();
  const { status, account } = useMetaMask();
  const { getSig } = useSignature();
  const { deck, loading } = useDeck({ variables: { slug: deckId } });

  const { ownedAssets, loadOwnedAssets } = useLoadOwnedAssets();

  const [ownedCards, setOwnedCards] = useState<OwnedCard[]>([]);

  useLayoutEffect(() => {
    if (!deck || !deck.openseaContract) {
      return;
    }

    const currentSig = getSig();

    if (!currentSig || !currentSig.signature || !currentSig.account) {
      return;
    }

    const { account: signedAccount, signature } = currentSig;

    loadOwnedAssets({
      variables: {
        contractAddress: deck.openseaContract,
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
      ownedAssets.map(({ traits }) => {
        const value = traits.find((trait) => trait.trait_type === "Value");
        const suit = traits.find(
          (trait) => trait.trait_type === "Suit" || trait.trait_type === "Color"
        );

        if (value && suit) {
          return {
            value: value.value.toLowerCase(),
            suit: suit.value.toLowerCase(),
          };
        }
        return { value: "", suit: "" };
      })
    );
  }, [ownedAssets]);

  if (loading) {
    return null;
  }

  if (!deck) {
    return <Error statusCode={404} />;
  }

  return (
    <Fragment>
      {typeof artistId === "string" && (
        <ComposedCardContent
          css={(theme) => ({
            background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            color: theme.colors.page_bg_light,
          })}
          ownedCards={ownedCards}
          deck={deck}
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
              <Text variant="body3">{deck.info}</Text>
              <Line spacing={3} />
              <DeckNav
                ref={deckNavRef}
                refs={{
                  roadmapRef,
                  nftRef:
                    (deck &&
                      deck.openseaCollection &&
                      deck.openseaContract &&
                      !artistId &&
                      nftRef) ||
                    undefined,
                  cardsRef,
                  deckRef,
                }}
                links={{
                  ...(deck.slug === "crypto"
                    ? {
                        opensea: `https://opensea.io/collection/${deck.openseaCollection}`,
                      }
                    : { buyNow: "/shop" }),
                  shop: "/shop",
                }}
              />
            </div>
          </Grid>
        </Layout>
      )}

      <Layout
        scrollIntoView={section === Sections.cards}
        ref={cardsRef}
        css={(theme) => ({
          background:
            status === "connected" && deckId === "crypto"
              ? "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)"
              : theme.colors.page_bg_light,
          color:
            status === "connected" && deckId === "crypto"
              ? theme.colors.text_title_light
              : theme.colors.text_title_dark,
          paddingTop: theme.spacing(15),
          paddingBottom: theme.spacing(15),
        })}
      >
        <BlockTitle
          title={artistId ? deck.title : "Cards"}
          subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
          css={(theme) => ({
            marginBottom: theme.spacing(1),
          })}
        />

        <CardList
          {...(deck.openseaContract && {
            openseaContract: deck.openseaContract,
          })}
          {...(deck.openseaCollection && {
            metamaskProps: {
              account,
              ownedCards,
            },
          })}
          deckId={deck._id}
        />
      </Layout>

      {deck.openseaCollection && deck.openseaContract && !artistId && (
        <ComposedPace
          ref={nftRef}
          collection={deck.openseaCollection}
          contract={deck.openseaContract}
        />
      )}
      {deck.slug === "crypto" && !artistId && (
        <Layout
          css={(theme) => ({
            backgroundColor: theme.colors.page_bg_dark,
            paddingTop: theme.spacing(15),
            paddingBottom: theme.spacing(15),
          })}
          ref={roadmapRef}
          scrollIntoView={section === Sections.roadmap}
        >
          <BlockTitle
            css={(theme) => ({
              color: theme.colors.white,
              gridColumn: "2/ span 10",
              marginBottom: theme.spacing(6),
            })}
            title="Roadmap"
          />
          <ComposedRoadmap />
        </Layout>
      )}
      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(15),
          paddingBottom: theme.spacing(6),
          background: theme.colors.page_bg_light_gray,
        })}
        ref={deckRef}
        scrollIntoView={section === Sections.deck}
      >
        <Grid>
          <DeckBlock deck={deck} css={{ gridColumn: "1/-1" }} />
        </Grid>

        {deck.slug === "crypto" && (
          <Grid>
            <AugmentedReality
              css={(theme) => ({
                marginTop: theme.spacing(9),
                gridColumn: "1 / -1",
              })}
            />
          </Grid>
        )}
      </Layout>
    </Fragment>
  );
});

const Page: NextPage = () => {
  const {
    query: { artistId, deckId },
  } = useRouter();
  const aboutRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const deckNavRef = useRef<HTMLElement>(null);
  const nftRef = useRef<HTMLElement>(null);
  const roadmapRef = useRef<HTMLElement>(null);

  const [altNavVisible, showAltNav] = useState(false);
  const [isCardPage, setIsCardPage] = useState(false);
  const { deck } = useDeck({ variables: { slug: deckId } });

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

      showAltNav(top + height < 0);
    }, 100);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [artistId, deckId]);

  return (
    <ComposedGlobalLayout
      extended={true}
      altNav={
        <DeckNav
          refs={{
            roadmapRef,
            nftRef:
              (deck &&
                deck.openseaCollection &&
                deck.openseaContract &&
                !artistId &&
                nftRef) ||
              undefined,
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
        deckRef={deckRef}
        cardsRef={cardsRef}
        deckNavRef={deckNavRef}
        nftRef={nftRef}
        roadmapRef={roadmapRef}
        aboutRef={aboutRef}
      />
    </ComposedGlobalLayout>
  );
};

export default withApollo(Page);
