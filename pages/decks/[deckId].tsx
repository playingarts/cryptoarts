import Head from "next/head";
import {
  FC,
  Fragment,
  memo,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { NextPage } from "next";
import { useDeck } from "../../hooks/deck";
import Layout from "../../components/Layout";
import { withApollo } from "../../source/apollo";
import { useRouter } from "next/router";
import DeckBlock from "../../components/DeckBlock";
import BlockTitle from "../../components/BlockTitle";
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
import ComposedPace from "../../components/_composed/Pace";
import MetamaskButton from "../../components/MetamaskButton";
import CardList from "../../components/Card/List";
import { Sections } from "../../source/enums";
import AugmentedReality from "../../components/AugmentedReality";

const Content: FC<{
  galleryRef: RefObject<HTMLElement>;
  deckRef: RefObject<HTMLElement>;
  cardsRef: RefObject<HTMLElement>;
  deckNavRef: RefObject<HTMLElement>;
}> = memo(({ galleryRef, deckRef, cardsRef, deckNavRef }) => {
  const {
    query: { cardId, deckId, section },
  } = useRouter();
  const { deck, loading } = useDeck({ variables: { slug: deckId } });

  if (loading || !deck) {
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
        />
      )}

      {!cardId && (
        <Layout
          css={(theme) => ({
            background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            color: theme.colors.light_gray,
            paddingTop: theme.spacing(36.5),
            paddingBottom: theme.spacing(6),
          })}
        >
          <Grid>
            <div css={{ gridColumn: "2 / span 10" }}>
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
            title="Cards"
            subTitleText="Hover the card to see animation. Click to read the story behind the artwork."
            {...(deckId === "crypto" && {
              action: <MetamaskButton />,
            })}
            css={(theme) => ({
              gridColumn: "2 / span 10",
              marginBottom: theme.spacing(4),
            })}
          />
        </Grid>

        <CardList deckId={deck._id} />
      </Layout>

      {deck.opensea && <ComposedPace collection={deck.opensea} />}

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

        <AugmentedReality css={(theme) => ({ marginTop: theme.spacing(9) })} />
      </Layout>

      <Layout
        scrollIntoView={section === Sections.gallery}
        ref={galleryRef}
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
            “Two is a sign of union. And diamonds are a sign of prosperity. I
            wanted to show the duality using my Ugly character wearing a
            twofaced mask.”
          </Quote>
        </Grid>
      </Layout>
    </Fragment>
  );
});

const Deck: NextPage = () => {
  const {
    query: { cardId, deckId },
  } = useRouter();
  const galleryRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);
  const deckNavRef = useRef<HTMLElement>(null);
  const [altNavVisible, showAltNav] = useState(false);

  useEffect(() => {
    if (cardId) {
      return showAltNav(true);
    }

    const handler = throttle(() => {
      if (!deckNavRef.current) {
        return;
      }

      const { top, height } = deckNavRef.current.getBoundingClientRect();

      showAltNav(top + height < 0);
    }, 100);

    handler();

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [cardId, deckId]);

  return (
    <ComposedGlobalLayout
      altNav={<DeckNav refs={{ cardsRef, deckRef, galleryRef }} />}
      showAltNav={altNavVisible}
      deckId={deckId instanceof Array ? deckId[0] : deckId}
      palette="gradient"
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
