import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const OpenseaQuery = gql`
  query Opensea($collection: String!) {
    opensea(collection: $collection) {
      stats {
        num_owners
        total_volume
        floor_price
        total_supply
      }
    }
  }
`;

export const HoldersQuery = gql`
  query Holders($contract: String!) {
    holders(contract: $contract) {
      fullDecks
      fullDecksWithJokers
      spades
      clubs
      hearts
      diamonds
      jokers
    }
  }
`;

export const useOpensea = (
  options: QueryHookOptions<Pick<GQL.Query, "opensea">> = {}
) => {
  const { data: { opensea } = { opensea: undefined }, ...methods } = useQuery(
    OpenseaQuery,
    options
  );

  return { ...methods, opensea };
};

export const useHolders = (
  options: QueryHookOptions<Pick<GQL.Query, "holders">> = {}
) => {
  const { data: { holders } = { holders: undefined }, ...methods } = useQuery(
    HoldersQuery,
    options
  );

  return { ...methods, holders };
};
