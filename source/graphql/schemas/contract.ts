import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";

export type MongoContract = Omit<GQL.Contract, "deck"> & {
  deck?: string;
};

const schema = new Schema<MongoContract, Model<MongoContract>, MongoContract>({
  name: String,
  address: String,
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Contract =
  (models.Contract as Model<MongoContract>) || model("Contract", schema);

export const getContract = async (
  options:
    | Pick<GQL.Contract, "name">
    | Pick<GQL.Contract, "address">
    | Pick<MongoContract, "deck">
) =>
  (((await Contract.findOne(options).populate([
    "deck",
  ])) as unknown) as Promise<GQL.Contract>) || undefined;

export const getContracts = async (options: Pick<MongoContract, "deck">) =>
  process.env.NODE_ENV === "development"
    ? (([
        ...(await Contract.find(options)),
        { name: "myassets", address: "", deck: "" },
      ] as unknown) as GQL.Contract[])
    : await Contract.find(options);

export const resolvers: GQL.Resolvers = {
  // Query: {
  //   contract: (_, args) => getContract(args),
  // },
};

export const typeDefs = gql`
  type Query {
    contract(name: String, address: String, deck: ID): Contract
  }

  type Contract {
    name: String!
    address: String!
    deck: Deck!
  }
`;
