import { FC, Fragment, HTMLAttributes, lazy, Suspense } from "react";
import Header from "../../Header";
import Hero from "./Hero";
import CardList from "./CardList";
import TheProduct from "./TheProduct";
import Gallery from "./Gallery";
import Footer from "../../Footer";
import { initApolloClient, withApollo } from "../../../source/apollo";
import { getDeckSlugsWithoutDB } from "../../../dump/_decks";
import { GetStaticPaths, GetStaticProps } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { connect } from "../../../source/mongoose";
import { DecksQuery } from "../../../hooks/deck";
import { CardsQuery, HeroCardsQuery } from "../../../hooks/card";
import { LosersQuery } from "../../../hooks/loser";
import AugmentedReality from "../Home/AugmentedReality";
import { usePalette } from "./DeckPaletteContext";
import { useRouter } from "next/router";
import PACE from "./PACE";

const OnlyCrypto = () => {
  const {
    query: { deckId },
  } = useRouter();
  return deckId === "crypto" ? (
    <Fragment>
      <PACE />
      <AugmentedReality />
    </Fragment>
  ) : null;
};

const DeckGallery = () => {
  const {
    query: { deckId },
  } = useRouter();

  return deckId !== "crypto" ? <Gallery /> : null;
};

const Deck: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <Header />
    <Hero />
    <CardList />
    <TheProduct />
    <OnlyCrypto />
    <DeckGallery />
    <Footer />
  </>
);

// export const getStaticPaths: GetStaticPaths = async () => {
//   const decks = await getDeckSlugsWithoutDB();

//   return {
//     paths: decks.map((deckId) => ({ params: { deckId } })),
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps<
//   {
//     cache?: NormalizedCacheObject;
//   },
//   { deckId: string }
// > = async (context) => {
//   if (process.env.SHOW_NEW !== "true") {
//     return {
//       notFound: true,
//     };
//   }
//   await connect();

//   const { deckId } = context.params!;

//   const client = initApolloClient(undefined, {
//     schema: (await require("../../../source/graphql/schema")).schema,
//   });

//   const decks = (
//     (await client.query({ query: DecksQuery })) as {
//       data: { decks: GQL.Deck[] };
//     }
//   ).data.decks;

//   const deck = decks.find((deck) => deck.slug === deckId);

//   if (!deck) {
//     return {
//       notFound: true,
//     };
//   }

//   await client.query({
//     query: CardsQuery,
//     variables: { deck: deck._id },
//   });

//   await client.query({
//     query: LosersQuery,
//     variables: { deck: deck._id },
//   });

//   await client.query({
//     query: HeroCardsQuery,
//     variables: { deck: deck._id, slug: deck.slug },
//   });

//   return {
//     props: {
//       cache: client.cache.extract(),
//       ...(deck.slug === "crypto" && { revalidate: 60 }),
//     },
//   };
// };

export default withApollo(Deck, { ssr: false });
