import { ApolloError, gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";
import { getDeck } from "./deck";
import { getAssets } from "./opensea";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

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

const {
  DISCOUNT_CODE: discountCode,
  NEXT_PUBLIC_SIGNATURE_MESSAGE: signatureMessage,
} = process.env;

const getDeal = ({ hash, deckId }: Omit<GQL.QueryDealArgs, "signature">) =>
  Deal.findOne({ hash: hash.toLowerCase(), deck: deckId });

export const resolvers: GQL.Resolvers = {
  Query: {
    deal: async (_, { hash, deckId, signature }) => {
      const recoveredAddress = recoverPersonalSignature({
        data: signatureMessage,
        signature,
      });

      if (hash.toLowerCase() !== recoveredAddress.toLowerCase()) {
        throw new ApolloError({
          errorMessage: "Failed to verify the account.",
        });
      }

      const deal = (await (getDeal({
        hash: hash.toLowerCase(),
        deckId,
      }).populate(["deck"]) as unknown)) as GQL.Deal;

      if (!deal && discountCode) {
        const deck = await getDeck({ _id: deckId });

        if (deck && deck.openseaContract) {
          const assets = await getAssets(deck.openseaContract);

          const assetsOwned = assets.filter(
            ({ owner: { address } }) => address === hash
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
