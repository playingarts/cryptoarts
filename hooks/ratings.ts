import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";

export const RatingsQuery = gql`
  query Ratings($title: string) {
    ratings(title: $title) {
      _id
      title
      who
      review
    }
  }
`;

export const useRatings = (
  options: QueryHookOptions<Pick<GQL.Query, "ratings">> = {}
) => {
  const { data: { ratings } = { ratings: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "ratings">
  >(RatingsQuery, options);

  return {
    ...methods,
    ratings,
  };
};
