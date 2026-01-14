import { gql } from "@apollo/client";
import { Rating } from "../../models";

export { Rating };

interface RatingsArgs {
  title?: string;
  deckSlug?: string;
  shuffle?: boolean;
  limit?: number;
}

export const getRatings = async ({ title, deckSlug, shuffle, limit }: RatingsArgs) => {
  // Build match filter
  const matchFilter: Record<string, unknown> = {};
  if (title) {
    matchFilter.title = title;
  }
  if (deckSlug) {
    // Match ratings where deckSlugs array contains this slug
    matchFilter.deckSlugs = deckSlug;
  }

  const hasFilter = Object.keys(matchFilter).length > 0;

  // Use MongoDB $sample for random order (more efficient than client-side shuffle)
  if (shuffle) {
    const pipeline: any[] = [];
    if (hasFilter) {
      pipeline.push({ $match: matchFilter });
    }
    pipeline.push({ $sample: { size: limit || 100 } });
    return await Rating.aggregate(pipeline);
  }

  let query = Rating.find(hasFilter ? matchFilter : {});

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
    ratings(title: String, deckSlug: String, shuffle: Boolean, limit: Int): [Rating!]!
  }

  type Rating {
    _id: ID!
    who: String!
    review: String!
    title: String!
    deckSlugs: [String!]
  }
`;
