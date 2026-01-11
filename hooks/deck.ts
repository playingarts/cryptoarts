import { gql } from "@apollo/client";
import { QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client/react";

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
      short
      image
      status
      price {
        eur
        usd
      }
    }
  }
`;

/**
 * Lightweight deck fragment for navigation (only slug needed)
 */
export const DeckNavFragment = gql`
  fragment DeckNavFragment on Deck {
    _id
    slug
  }
`;

/**
 * Query for deck navigation - only fetches slugs to minimize payload
 */
export const DecksNavQuery = gql`
  ${DeckNavFragment}

  query DecksNav {
    decks {
      ...DeckNavFragment
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
  const { data, ...methods } = useQuery<Pick<GQL.Query, "decks">>(
    DecksQuery,
    options
  );

  return { ...methods, decks: data?.decks };
};

/**
 * Hook for deck navigation - uses lightweight query
 */
export const useDecksNav = (
  options: QueryHookOptions<Pick<GQL.Query, "decks">> = {}
) => {
  const { data, ...methods } = useQuery<Pick<GQL.Query, "decks">>(
    DecksNavQuery,
    options
  );

  return { ...methods, decks: data?.decks };
};

export const useLoadDeck = (
  options: QueryHookOptions<Pick<GQL.Query, "deck">> = {}
) => {
  const [loadDeck, { data, ...methods }] = useLazyQuery<Pick<GQL.Query, "deck">>(
    DeckQuery,
    options
  );

  return { ...methods, loadDeck, deck: data?.deck };
};

export const useDeck = (
  options: QueryHookOptions<Pick<GQL.Query, "deck">> = {}
) => {
  const { data, ...methods } = useQuery<Pick<GQL.Query, "deck">>(
    DeckQuery,
    options
  );

  return { ...methods, deck: data?.deck };
};
