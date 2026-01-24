/**
 * Loser Resolvers
 */

import { Loser } from "../../models";

const getLosers = async ({ deck }: GQL.QueryLosersArgs) => {
  const cards = await ((Loser.find({ deck }).populate([
    "artist",
    "deck",
  ]) as unknown) as Promise<GQL.Loser[]>);

  return cards;
};

const getLosersValues = async ({ deck }: GQL.QueryLosersValuesArgs) => {
  const cards = await Loser.find({ deck }).populate(["deck"]);

  return (cards as unknown) as GQL.Loser[];
};

export const resolvers: GQL.Resolvers = {
  Query: {
    losersValues: async (_, args) => await getLosersValues(args),
    losers: async (_, args) => await getLosers(args),
  },
};
