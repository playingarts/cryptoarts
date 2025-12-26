import { connect } from "../../source/mongoose";

export { default } from "../../new/Pages/Favorites";

export const getServerSideProps = async () => {
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

  //    await client.query({
  //     query: CardsQuery,
  //     variables: { deck: deck._id },
  //   });
  await connect();

  return {
    // returns the default 404 page with a status code of 404 in production
    props: {
      notFound: process.env.SHOW_NEW !== "true",
    },
  };
};
