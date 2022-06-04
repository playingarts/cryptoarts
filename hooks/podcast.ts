import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const podcastsQuery = gql`
  query Podcasts($name: String, $shuffle: Boolean, $limit: Int) {
    podcasts(name: $name, shuffle: $shuffle, limit: $limit) {
      image
      episode
      youtube
      spotify
      apple
      podcastName
    }
  }
`;

export const usePodcasts = (
  options: QueryHookOptions<Pick<GQL.Query, "podcasts">> = {}
) => {
  const { data: { podcasts } = { artists: undefined }, ...methods } = useQuery(
    podcastsQuery,
    options
  );

  return { ...methods, podcasts };
};
