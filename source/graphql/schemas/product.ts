import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";

export type MongoProduct = Omit<GQL.Product, "deck"> & {
  deck?: string;
};

const schema = new Schema<GQL.Product, Model<GQL.Product>, GQL.Product>({
  title: String,
  price: Number,
  image: String,
  info: String,
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Product =
  (models.Product as Model<MongoProduct>) || model("Product", schema);

const getProducts = (ids?: string[]) =>
  ids ? Product.find({ _id: { $in: ids } }) : Product.find();

export const resolvers: GQL.Resolvers = {
  Query: {
    products: (_, { ids }) => {
      return (getProducts(ids).populate(["deck"]) as unknown) as Promise<
        GQL.Product[]
      >;
    },
    convertEurToUsd: async (_, { eur }) => {
      try {
        console.info(`Fetching an exchange rate for ${eur} euros.`);

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

  type Product {
    _id: ID!
    title: String!
    price: Float!
    image: String!
    deck: Deck
    info: String
  }
`;
