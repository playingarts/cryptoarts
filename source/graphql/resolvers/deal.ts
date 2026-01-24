/**
 * Deal Resolvers
 */

import { GraphQLError } from "graphql";
import { Deal } from "../../models";
import { getContract } from "../schemas/contract";
import { getDeck } from "../schemas/deck";
import { getAssets, signatureValid } from "../schemas/opensea";

const { DISCOUNT_CODE: discountCode } = process.env;

const getDeal = ({ hash, deckId }: Omit<GQL.QueryDealArgs, "signature">) =>
  Deal.findOne({ hash: hash.toLowerCase(), deck: deckId });

export const resolvers: GQL.Resolvers = {
  Query: {
    deal: async (_, { hash, deckId, signature }) => {
      if (!signatureValid(hash, signature)) {
        throw new GraphQLError("Failed to verify the account.");
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
            ({ owners }) =>
              owners &&
              owners.findIndex(({ address }) => address === hash) !== -1
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
