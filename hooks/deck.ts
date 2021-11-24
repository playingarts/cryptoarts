import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const DecksQuery = gql`
  query Decks {
    decks {
      title
      slug
    }
  }
`;

const DecksQuery2 = gql`
  query Decks {
    decks {
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

export const useDecks2 = (
  options: QueryHookOptions<Pick<GQL.Query, "decks">> = {}
) => {
  const { data: { decks } = { decks: undefined }, ...methods } = useQuery(
    DecksQuery2,
    options
  );

  return { ...methods, decks };
};
