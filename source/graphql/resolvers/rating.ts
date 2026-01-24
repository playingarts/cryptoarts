/**
 * Rating Resolvers
 */

import { Rating } from "../../models";

interface RatingsArgs {
  title?: string;
  deckSlug?: string;
  shuffle?: boolean;
  limit?: number;
}

const getRatings = async ({ title, deckSlug, shuffle, limit }: RatingsArgs) => {
  // Build match filter
  const matchFilter: Record<string, unknown> = {};
  if (title) {
    matchFilter.title = title;
  }
  if (deckSlug) {
    matchFilter.deckSlugs = deckSlug;
  }

  const hasFilter = Object.keys(matchFilter).length > 0;

  // Use MongoDB $sample for random order
  if (shuffle) {
    const pipeline: Parameters<typeof Rating.aggregate>[0] = [];
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
