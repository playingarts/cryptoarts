import Head from "next/head";
import { FC, Fragment, RefObject, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useDeck } from "../../hooks/deck";
import Layout from "../../components/Layout";
import { withApollo } from "../../source/apollo";
import { useLoadCards } from "../../hooks/card";
import { useRouter } from "next/router";
import CardsBlock from "../../components/CardsBlock";
import CardNav from "../../components/CardNav";
import Box from "../../components/Box";
import DeckBlock from "../../components/DeckBlock";
import BlockTitle from "../../components/BlockTitle";
import Bag from "../../components/Icons/Bag";
import Plus from "../../components/Icons/Plus";
import Gallery from "../../components/_composed/Gallery";
import Text from "../../components/Text";
import Line from "../../components/Line";
import DeckNav from "../../components/DeckNav";
import Grid from "../../components/Grid";
import Esquire from "../../components/Icons/Esquire";
import FastCompany from "../../components/Icons/FastCompany";
import CreativeBloq from "../../components/Icons/CreativeBloq";
import DigitalArts from "../../components/Icons/DigitalArts";
import Quote from "../../components/Quote";
import Card from "../../components/Card";
import CardInfo from "../../components/CardsPage/Info";
import throttle from "just-throttle";
import GlobalLayout from "../../components/_composed/GlobalLayout";

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
  const card =
    cards && cardId ? cards.find(({ _id }) => _id === cardId) : undefined;

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

  const currentCardIndex = card
    ? cards.findIndex(({ _id }) => _id === card._id)
    : -2;
  const prevCardLink = card && cards[currentCardIndex - 1];
  const nextCardLink = card && cards[currentCardIndex + 1];

  return (
    <Fragment>
      {cardId && (
        <CardNav
          css={(theme) => ({
            background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            color: theme.colors.page_bg_light,
          })}
          prevLink={
            prevCardLink && {
              pathname: `/decks/${deck.slug}`,
              query: { cardId: prevCardLink._id },
            }
          }
          nextLink={
            nextCardLink && {
              pathname: `/decks/${deck.slug}`,
              query: { cardId: nextCardLink._id },
            }
          }
          closeLink={`/decks/${deck.slug}`}
        >
          <Layout
            css={(theme) => ({
              paddingBottom: theme.spacing(14),
              paddingTop: theme.spacing(14),
            })}
          >
            {card && (
              <Fragment>
                <div
                  css={{
                    display: "flex",
                    alignItems: "top",
                  }}
                >
                  <div
                    css={{
                      width: "50%",
                    }}
                  >
                    {card && (
                      <Card
                        key={card._id}
                        card={card}
                        animated={true}
                        size="big"
                        interactive={true}
                        css={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          position: "sticky",
                          top: 140,
                        }}
                      />
                    )}
                  </div>
                  <div css={{ width: "50%" }}>
                    <div
                      css={{
                        height: 400,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CardInfo
                        artist={card.artist}
                        price={1}
                        css={{ flexGrow: 1 }}
                      />
                    </div>
                    <Quote
                      fullArtist={true}
                      artist={card.artist}
                      css={(theme) => ({
                        marginTop: theme.spacing(9),
                      })}
                      vertical={true}
                      truncate={7}
                    >
                      {card.info}
                    </Quote>
                  </div>
                </div>
              </Fragment>
            )}
          </Layout>
        </CardNav>
      )}

      {!cardId && (
        <Layout
          css={(theme) => ({
            background: `linear-gradient(180deg, ${theme.colors.page_bg_dark} 0%, ${theme.colors.dark_gray} 100%)`,
            color: theme.colors.light_gray,
            paddingTop: theme.spacing(18),
          })}
        >
          <Box padding={2}>
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
          <Box>
            <BlockTitle
              titleText="Cards"
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
          <CardsBlock cards={cards} />
        </Box>
      </Layout>

      <Layout
        css={(theme) => ({
          background: theme.colors.light_gray,
        })}
        ref={deckRef}
      >
        <Box padding={2}>
          <BlockTitle
            variant="h3"
            titleText="Deck"
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
        <Gallery />
        <Box>
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
    <GlobalLayout
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
    </GlobalLayout>
  );
};

export default withApollo(Deck);
