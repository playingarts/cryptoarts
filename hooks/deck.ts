import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const DecksQuery = gql`
  query Decks {
    decks {
      id
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
