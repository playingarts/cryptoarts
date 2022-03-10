import { gql } from "@apollo/client";
import { Schema, model, models, Model } from "mongoose";

const schema = new Schema<GQL.Artist, Model<GQL.Artist>, GQL.Artist>({
  name: String,
  info: String,
  userpic: String,
  website: String,
  shop: String,
  country: String,
  slug: String,
  social: {
    instagram: String,
    facebook: String,
    twitter: String,
    behance: String,
    dribbble: String,
    foundation: String,
    superrare: String,
    makersplace: String,
    knownorigin: String,
    rarible: String,
    niftygateway: String,
    showtime: String,
  },
});

export const Artist =
  (models.Artist as Model<GQL.Artist>) || model("Artist", schema);

export const resolvers: GQL.Resolvers = {
  Artist: {
    social: ({ website, social }) => ({ website, ...social }),
  },
};

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
