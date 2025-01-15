import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const podcastsQuery = gql`
  query Podcasts($name: String, $shuffle: Boolean, $limit: Int) {
    podcasts(name: $name, shuffle: $shuffle, limit: $limit) {
      name
      image
      episode
      youtube
      spotify
      apple
      podcastName
      desc
      time
    }
  }
`;

export const usePodcasts = (
  options: QueryHookOptions<Pick<GQL.Query, "podcasts">> = {}
) => {
  const { data: { podcasts } = { artists: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "podcasts">
  >(podcastsQuery, options);

  return { ...methods, podcasts };
};
