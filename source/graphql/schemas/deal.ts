import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";

export type MongoDeal = Omit<GQL.Deal, "deck"> & {
  deck?: string;
};

const schema = new Schema<GQL.Deal, Model<GQL.Deal>, GQL.Deal>({
  code: String,
  hash: { type: String, default: null },
  decks: Number,
  deck: { type: Types.ObjectId, ref: "Deck", default: null },
  claimed: { type: Boolean, default: false },
});

export const Deal = (models.Deal as Model<MongoDeal>) || model("Deal", schema);

const getDeal = ({ hash, deck }: GQL.QueryDealArgs) =>
  Deal.findOne({ hash: hash.toLowerCase(), deck });

export const resolvers: GQL.Resolvers = {
  Query: {
    deal: (_, { hash, deck }) => {
      return (getDeal({ hash, deck }).populate([
        "deck",
      ]) as unknown) as Promise<GQL.Deal>;
    },
  },
};

export const typeDefs = gql`
  type Query {
    deal(hash: String!, deck: String!): Deal
  }

  type Deal {
    _id: ID!
    code: String!
    hash: String
    decks: Int
    deck: Deck
    claimed: Boolean
  }
`;
