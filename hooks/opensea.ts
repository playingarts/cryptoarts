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

export const HoldersQuery = gql`
  query Holders($deck: ID!) {
    holders(deck: $deck) {
      fullDeck {
        jokers
        user
      }
      spades
      clubs
      hearts
      diamonds
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
