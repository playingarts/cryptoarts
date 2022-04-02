import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const DeckDataFragment = gql`
  fragment DeckDataFragment on Deck {
    _id
    info
    title
    slug
    openseaCollection
    openseaContract
    short
    image
    properties
    description
    backgroundImage
  }
`;

export const DecksQuery = gql`
  ${DeckDataFragment}

  query Decks($withProduct: Boolean!) {
    decks {
      ...DeckDataFragment
      product @include(if: $withProduct) {
        image
      }
    }
  }
`;

export const DeckQuery = gql`
  ${DeckDataFragment}

  query Deck($slug: String!) {
    deck(slug: $slug) {
      ...DeckDataFragment
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
