import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const OpenseaQuery = gql`
  query Opensea($deck: ID!) {
    opensea(deck: $deck) {
      stats {
        num_owners
        total_volume
        floor_price
      }
    }
  }
`;

export const useOpensea = (
  options: QueryHookOptions<Pick<GQL.Query, "opensea">> = {}
) => {
  const { data: { opensea } = { cards: undefined }, ...methods } = useQuery(
    OpenseaQuery,
    options
  );

  return { ...methods, opensea };
};
