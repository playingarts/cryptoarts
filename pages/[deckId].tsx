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
import DeckBlock from "../components/DeckBlock";
import BlockTitle from "../components/BlockTitle";
import Text from "../components/Text";
import Line from "../components/Line";
import DeckNav from "../components/DeckNav";
import Grid from "../components/Grid";
import Esquire from "../components/Icons/Esquire";
import FastCompany from "../components/Icons/FastCompany";
import CreativeBloq from "../components/Icons/CreativeBloq";
import DigitalArts from "../components/Icons/DigitalArts";
import Quote from "../components/Quote";
import throttle from "just-throttle";
import ComposedGlobalLayout from "../components/_composed/GlobalLayout";
import ComposedCardContent from "../components/_composed/CardContent";
import ComposedPace from "../components/_composed/Pace";
import CardList from "../components/Card/List";
import { Sections } from "../source/enums";
import AugmentedReality from "../components/AugmentedReality";
import Error from "next/error";

const Content: FC<{
  aboutRef: RefObject<HTMLDivElement>;
  deckRef: RefObject<HTMLElement>;
  cardsRef: RefObject<HTMLElement>;
  deckNavRef: RefObject<HTMLElement>;
  nftRef: RefObject<HTMLElement>;
}> = memo(({ aboutRef, deckRef, cardsRef, deckNavRef, nftRef }) => {
  const {
    query: { artistId, deckId, section },
  } = useRouter();
  const { deck, loading } = useDeck({ variables: { slug: deckId } });

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
              width: "100vw",
              height: "100vh",
              background: `url(${deck.backgroundImage}) 50% 50%`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              minHeight: "100%",
            }}
          />
          <Grid css={{ zIndex: 1, position: "relative" }}>
            <div css={{ gridColumn: "2 / span 10" }}>
              <Text component="h1" css={{ margin: 0 }}>
                {deck.title}
              </Text>
              <Text variant="body3">{deck.info}</Text>
              <Line spacing={3} />
              <DeckNav
                ref={deckNavRef}
                refs={{
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
          background: theme.colors.page_bg_gray,
          paddingTop: theme.spacing(15),
          paddingBottom: theme.spacing(15),
        })}
      >
        <Grid>
          <BlockTitle
            title={artistId ? deck.title : "Cards"}
            subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
            css={(theme) => ({
              gridColumn: "2 / span 10",
              marginBottom: theme.spacing(4),
            })}
          />
        </Grid>

        <CardList deckId={deck._id} />
      </Layout>

      {deck.openseaCollection && deck.openseaContract && !artistId && (
        <ComposedPace
          ref={nftRef}
          collection={deck.openseaCollection}
          contract={deck.openseaContract}
        />
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
        <DeckBlock deck={deck} />

        {deck.slug === "crypto" && (
          <AugmentedReality
            css={(theme) => ({ marginTop: theme.spacing(9) })}
          />
        )}
      </Layout>

      <Layout
        css={(theme) => ({
          paddingTop: theme.spacing(12),
          paddingBottom: theme.spacing(12),
        })}
      >
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
        <Grid
          css={(theme) => ({
            marginTop: theme.spacing(10),
          })}
        >
          <Quote css={{ gridColumn: "2 / span 10" }}>
            “This really is a unique deck. The concept is playful, and elegant
            at the same time. The colors are vibrant. A wonderful price of art.”
          </Quote>
        </Grid>
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
      altNav={
        <DeckNav
          refs={{
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
        aboutRef={aboutRef}
      />
    </ComposedGlobalLayout>
  );
};

export default withApollo(Page);
