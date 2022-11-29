import { ApolloError, gql } from "@apollo/client";
import { model, Model, models, Schema, Types } from "mongoose";
import { getContract } from "./contract";
import { getDeck } from "./deck";
import { getAssets, signatureValid } from "./opensea";

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

const { DISCOUNT_CODE: discountCode } = process.env;

const getDeal = ({ hash, deckId }: Omit<GQL.QueryDealArgs, "signature">) =>
  Deal.findOne({ hash: hash.toLowerCase(), deck: deckId });

export const resolvers: GQL.Resolvers = {
  Query: {
    deal: async (_, { hash, deckId, signature }) => {
      if (!signatureValid(hash, signature)) {
        throw new ApolloError({
          errorMessage: "Failed to verify the account.",
        });
      }

      const deal =
        process.env.NODE_ENV !== "development"
          ? ((await (getDeal({
              hash: hash.toLowerCase(),
              deckId,
            }).populate(["deck"]) as unknown)) as GQL.Deal)
          : ([...require("../../../mocks/deals.json")] as GQL.Deal[]).find(
              (deal) => deal.hash?.toLowerCase() === hash
            );

      if (!deal && discountCode) {
        const deck = await getDeck({ _id: deckId });

        if (!deck) {
          return;
        }

        const contract = await getContract({ deck: deck._id });

        if (contract) {
          const assets = await getAssets(contract.address, contract.name);

          const assetsOwned = assets.filter(
            ({ top_ownerships }) =>
              top_ownerships &&
              top_ownerships.findIndex(
                ({ owner }) => owner.address === hash
              ) !== -1
          ).length;

          if (assetsOwned > 0) {
            return {
              _id: "discountCode",
              code: discountCode,
              hash,
              decks: assetsOwned,
              deck,
            };
          }
        }
      }

      return deal;
    },
  },
};

export const typeDefs = gql`
  type Query {
    deal(hash: String!, deckId: String!, signature: String!): Deal
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
