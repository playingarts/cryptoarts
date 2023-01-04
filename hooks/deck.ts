import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";

export const DeckDataFragment = gql`
  fragment DeckDataFragment on Deck {
    _id
    info
    title
    slug
    labels
    openseaCollection {
      name
      address
    }
    editions {
      img
      name
      url
    }
    short
    image
    properties
    description
    backgroundImage
    product {
      image
      status
    }
  }
`;

export const DecksQuery = gql`
  ${DeckDataFragment}

  query Decks {
    decks {
      ...DeckDataFragment
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

export const useLoadDeck = (
  options: QueryHookOptions<Pick<GQL.Query, "deck">> = {}
) => {
  const [
    loadDeck,
    { data: { deck } = { deck: undefined }, ...methods },
  ] = useLazyQuery(DeckQuery, options);

  return { ...methods, loadDeck, deck };
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
