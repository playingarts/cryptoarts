import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    artist(id: ID!): Artist
    artists(hasPodcast: Boolean, shuffle: Boolean, limit: Int): [Artist]!
  }

  type LoserArtist {
    _id: ID
    name: String
    info: String
    slug: String!
    userpic: String
    website: String
    shop: String
    podcast: Podcast
    social: Socials
    country: String
  }

  type Artist {
    _id: ID!
    name: String!
    info: String
    slug: String!
    userpic: String!
    website: String
    shop: String
    podcast: Podcast
    social: Socials!
    country: String
  }

  type Socials {
    instagram: String
    facebook: String
    twitter: String
    behance: String
    dribbble: String
    foundation: String
    superrare: String
    makersplace: String
    knownorigin: String
    rarible: String
    niftygateway: String
    showtime: String
    website: String
  }
`;
