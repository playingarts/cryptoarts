import { gql } from "@apollo/client";
import { Rating } from "../../models";

export { Rating };

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
