import { gql } from "@apollo/client";
import { Loser } from "./card";

const getLosers = async ({ deck }: GQL.QueryLosersArgs) => {
  const cards = await ((Loser.find({ deck }).populate([
    "artist",
    "deck",
  ]) as unknown) as Promise<GQL.Loser[]>);

  //   return cards.map((card) => ({ value: card.value, suit: card.suit }));
  return cards;
};

const getLosersValues = async ({ deck }: GQL.QueryLosersValuesArgs) => {
  const cards = await Loser.find({ deck }).populate(["deck"]);

  //   return cards.map((card) => ({ value: card.value, suit: card.suit }));
  return cards as GQL.Loser[];
};

export const resolvers: GQL.Resolvers = {
  Query: {
    losersValues: async (_, args) => await getLosersValues(args),
    losers: async (_, args) => await getLosers(args),
  },
};

export const typeDefs = gql`
  type Query {
    losersValues(deck: ID!): [Loser!]!
    losers(deck: ID!): [Loser!]!
  }

  type Loser {
    _id: ID
    img: String
    video: String
    artist: LoserArtist
    info: String
    deck: Deck
    suit: String
    value: String
    background: String
    price: Float
    erc1155: ERC1155
    reversible: Boolean
  }
`;
