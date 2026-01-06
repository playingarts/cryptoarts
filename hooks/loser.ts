import { gql } from "@apollo/client";
import { QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client/react";

export const LosersQuery = gql`
  query Losers($deck: ID!) {
    losers(deck: $deck) {
      _id
      value
      suit
      img
      artist {
        slug
        name
        country
      }
    }
  }
`;

export const useLosers = (
  options: QueryHookOptions<Pick<GQL.Query, "losers">> = {}
) => {
  const { data, ...methods } = useQuery<Pick<GQL.Query, "losers">>(
    LosersQuery,
    options
  );

  return { ...methods, losers: data?.losers };
};

export const useLoadLosers = (
  options: QueryHookOptions<Pick<GQL.Query, "losers">> = {}
) => {
  const [loadLosers, { data, ...methods }] = useLazyQuery<
    Pick<GQL.Query, "losers">
  >(LosersQuery, options);

  return { ...methods, loadLosers, losers: data?.losers };
};
