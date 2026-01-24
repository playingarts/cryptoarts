import { gql } from "@apollo/client";

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
