import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";

export const DeckDataFragment = gql`
  fragment DeckDataFragment on Deck {
    _id
    slug
    info
    intro
    title
    cardBackground
    short
    image
    description
    backgroundImage
    properties
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
    product {
      _id
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
  const { data: { decks } = { decks: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "decks">
  >(DecksQuery, options);

  return { ...methods, decks };
};

export const useLoadDeck = (
  options: QueryHookOptions<Pick<GQL.Query, "deck">> = {}
) => {
  const [loadDeck, { data: { deck } = { deck: undefined }, ...methods }] =
    useLazyQuery(DeckQuery, options);

  return { ...methods, loadDeck, deck };
};

export const useDeck = (options = {}) => {
  const { data: { deck } = { deck: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "deck">
  >(DeckQuery, options);

  return { ...methods, deck };
};
