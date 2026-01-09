import { gql } from "@apollo/client";
import { Rating } from "../../models";

export { Rating };

interface RatingsArgs {
  title?: string;
  shuffle?: boolean;
  limit?: number;
}

export const getRatings = async ({ title, shuffle, limit }: RatingsArgs) => {
  let query = Rating.find(title ? { title } : {});

  // Use MongoDB $sample for random order (more efficient than client-side shuffle)
  if (shuffle) {
    const pipeline: any[] = [];
    if (title) {
      pipeline.push({ $match: { title } });
    }
    pipeline.push({ $sample: { size: limit || 100 } });
    return await Rating.aggregate(pipeline);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export const resolvers: GQL.Resolvers = {
  Query: {
    ratings: async (_, args) => await getRatings(args as RatingsArgs),
  },
};

export const typeDefs = gql`
  type Query {
    ratings(title: String, shuffle: Boolean, limit: Int): [Rating!]!
  }

  type Rating {
    _id: ID!
    who: String!
    review: String!
    title: String!
  }
`;
