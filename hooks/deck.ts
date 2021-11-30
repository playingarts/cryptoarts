import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const DecksQuery = gql`
  query Decks {
    decks {
      _id
      title
      slug
    }
  }
`;

export const DeckQuery = gql`
  query Deck($slug: String!) {
    deck(slug: $slug) {
      _id
      info
      title
      slug
    }
  }
`;

export const useDecks = (
  options: QueryHookOptions<Pick<GQL.Query, "decks">> = {}
) => {
  const { data: { decks } = { decks: undefined }, ...methods } = useQuery(
    DecksQuery,
    options
  );

  return { ...methods, decks };
};

export const useDeck = (
  options: QueryHookOptions<Pick<GQL.Query, "deck">> = {}
) => {
  const { data: { deck } = { deck: undefined }, ...methods } = useQuery(
    DeckQuery,
    options
  );

  return { ...methods, deck };
};
