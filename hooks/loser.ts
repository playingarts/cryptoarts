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

export const LosersValuesQuery = gql`
  query LosersValues($deck: ID!) {
    losersValues(deck: $deck) {
      _id
      value
      suit
      img
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

// export const useLosersValues = (
//   options: QueryHookOptions<Pick<GQL.Query, "losersValues">> = {}
// ) => {
//   const {
//     data: { losersValues } = { cards: undefined },
//     ...methods
//   } = useQuery(LosersValuesQuery, options);

//   return { ...methods, losers: losersValues };
// };

// export const useLoadLosersValues = (
//   options: QueryHookOptions<Pick<GQL.Query, "losersValues">> = {}
// ) => {
//   const [
//     loadLosersValues,
//     { data: { losersValues } = { losersValues: undefined }, ...methods },
//   ] = useLazyQuery(LosersValuesQuery, options);

//   return { ...methods, loadLosersValues, losers: losersValues };
// };
