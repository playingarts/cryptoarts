import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";

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
  const { data: { losers } = { cards: undefined }, ...methods } = useQuery(
    LosersQuery,
    options
  );

  return { ...methods, losers: losers };
};

export const useLoadLosers = (
  options: QueryHookOptions<Pick<GQL.Query, "losers">> = {}
) => {
  const [
    loadLosers,
    { data: { losers } = { losers: undefined }, ...methods },
  ] = useLazyQuery(LosersQuery, options);

  return { ...methods, loadLosers, losers };
};
