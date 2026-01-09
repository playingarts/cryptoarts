import { gql } from "@apollo/client";
import type { QueryHookOptions } from "@apollo/client/react";

import { useQuery } from "@apollo/client/react";

export const RatingsQuery = gql`
  query Ratings($title: String, $shuffle: Boolean, $limit: Int) {
    ratings(title: $title, shuffle: $shuffle, limit: $limit) {
      _id
      title
      who
      review
    }
  }
`;

interface RatingsVariables {
  title?: string;
  shuffle?: boolean;
  limit?: number;
}

export const useRatings = (
  options: QueryHookOptions<Pick<GQL.Query, "ratings">, RatingsVariables> = {}
) => {
  const { data: { ratings } = { ratings: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "ratings">,
    RatingsVariables
  >(RatingsQuery, {
    // Default to shuffle for random order on each page load
    variables: { shuffle: true, ...options.variables },
    // Don't cache shuffled results - get fresh random order each time
    fetchPolicy: options.variables?.shuffle === false ? "cache-first" : "no-cache",
    ...options,
  });

  return {
    ...methods,
    ratings,
  };
};
