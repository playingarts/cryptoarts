import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";

const schema = new Schema<GQL.Artist, Model<GQL.Artist>, GQL.Artist>({
  name: String,
  info: String,
  userpic: String,
  website: String,
  shop: String,
  slug: String,
  social: {
    instagram: String,
    facebook: String,
    behance: String,
    foundation: String,
    superrare: String,
    makersplace: String,
    hicetnunc: String,
    knownorigin: String,
    rarible: String,
    showtime: String,
    niftygw: String,
    dribbble: String,
  },
});

export const Artist =
  (models.Artist as Model<GQL.Artist>) || model("Artist", schema);

export const typeDefs = gql`
  type Query {
    artist(id: ID!): Artist
  }

  type Artist {
    _id: ID!
    name: String!
    info: String
    slug: String!
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
