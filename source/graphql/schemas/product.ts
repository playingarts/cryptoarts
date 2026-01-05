import { gql } from "@apollo/client";
import fetch from "../../fetch";
import { Product, type MongoProduct } from "../../models";

export { Product, type MongoProduct };

export const getProduct = async (
  options: Pick<MongoProduct, "deck"> | Pick<MongoProduct, "_id">
) => ((await Product.findOne(options)) as GQL.Product) || undefined;

const getProducts = (ids?: string[]) =>
  ids ? Product.find({ _id: { $in: ids } }) : Product.find();

export const resolvers: GQL.Resolvers = {
  Query: {
    products: (_, { ids }) => {
      return getProducts(ids)
        .populate([
          {
            path: "deck",
            populate: { path: "previewCards", populate: { path: "artist" } },
          },
        ])
        .populate("decks") as unknown as Promise<GQL.Product[]>;
    },
    convertEurToUsd: async (_, { eur }) => {
      try {
        const {
          data: { amount },
        } = await (
          await fetch("https://api.coinbase.com/v2/prices/USDC-EUR/sell")
        ).json();

        return eur / amount;
      } catch (error) {
        const rate = parseFloat(process.env.NEXT_PUBLIC_EUR_TO_USD_RATE || "0");

        if (!rate) {
          throw new Error("Failed to get an exchange rate for ${eur} euros.");
        }

        return rate * eur;
      }
    },
  },
};

export const typeDefs = gql`
  type Query {
    products(ids: [ID!]): [Product!]!
    convertEurToUsd(eur: Float!): Float
  }

  type Currencies {
    eur: Float!
    usd: Float!
  }

  type Product {
    _id: ID!
    deck: Deck
    decks: [Product!]
    labels: [String!]
    title: String!
    price: Currencies!
    fullPrice: Currencies
    status: String!
    type: String!
    image: String!
    image2: String!
    info: String
    description: String
    short: String!
  }
`;
