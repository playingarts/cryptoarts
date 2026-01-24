import { gql } from "@apollo/client";
import { QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client/react";
import { DeckDataFragment, DeckNavFragment } from "./fragments";

// Re-export fragments for backwards compatibility
export { DeckDataFragment, DeckNavFragment } from "./fragments";

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
