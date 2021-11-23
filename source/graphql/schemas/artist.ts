import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    artist: Artist
  }

  type Artist {
    id: ID!
    name: String!
    country: String!
    info: String
    userpic: String!
    website: String
    shop: String
    social: Socials!
  }

  type Socials {
    instagram: String
    facebook: String
    behance: String
    foundation: String
    superrare: String
    makersplace: String
    hicetnunc: String
    knownorigin: String
    rarible: String
    showtime: String
    niftygw: String
    dribbble: String
  }
`;
