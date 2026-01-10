import { gql } from "@apollo/client";
import { Podcast } from "../../models";

export { Podcast };

const getPodcasts = async ({ name, shuffle, limit }: GQL.QueryPodcastsArgs) => {
  let podcasts = await Podcast.find(name ? { name } : {});

  if (shuffle) {
    // Fisher-Yates shuffle for proper randomization
    for (let i = podcasts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [podcasts[i], podcasts[j]] = [podcasts[j], podcasts[i]];
    }
  }

  if (limit) {
    podcasts = podcasts.slice(0, limit);
  }

  return podcasts;
};

export const resolvers: GQL.Resolvers = {
  Query: {
    podcasts: (_, args) => getPodcasts(args),
  },
};

export const typeDefs = gql`
  type Query {
    podcasts(name: String, shuffle: Boolean, limit: Int): [Podcast]!
  }

  type Podcast {
    image: String
    youtube: String
    apple: String
    spotify: String
    episode: Int!
    name: String
    podcastName: String
    desc: String!
    time: String!
  }
`;
