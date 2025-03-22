import { gql } from "@apollo/client";
import { model, Model, models, Schema } from "mongoose";

const schema = new Schema<GQL.Rating, Model<GQL.Rating>, GQL.Rating>({
  who: String,
  review: String,
  title: String,
});

export const Rating =
  (models.Rating as Model<GQL.Rating>) || model("Rating", schema);

export const getRatings = async ({ title }: GQL.QueryRatingsArgs) => {
  let ratings = await Rating.find(title ? { title } : {});

  return ratings;
};

export const resolvers: GQL.Resolvers = {
  Query: {
    ratings: async (_, args) => await getRatings(args),
  },
};

export const typeDefs = gql`
  type Query {
    ratings(title: string): [Rating!]!
  }

  type Rating {
    _id: ID!
    who: String!
    review: String!
    title: String!
  }
`;
