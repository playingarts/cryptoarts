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
  },
};

export const typeDefs = gql`
  type Query {
    product: Product!
    products(ids: [ID!]): [Product!]!
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
