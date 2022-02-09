import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";

export type MongoCard = Omit<GQL.Card, "artist" | "deck"> & {
  artist?: string;
  deck?: string;
};

const schema = new Schema<MongoCard, Model<MongoCard>, MongoCard>({
  img: String,
  video: String,
  info: String,
  value: String,
  suit: String,
  artist: { type: Types.ObjectId, ref: "Artist" },
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Card = (models.Card as Model<MongoCard>) || model("Card", schema);

const getDeckCards = (deck?: string) => Card.find({ deck });
const getCard = (id: string) => Card.findById(id);

export const resolvers: GQL.Resolvers = {
  Query: {
    cards: (_, { deck, shuffle }) => {
      return ((getDeckCards(deck).populate([
        "artist",
        "deck",
      ]) as unknown) as Promise<GQL.Card[]>).then((cards) =>
        shuffle
          ? cards
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
          : cards
      );
    },
    card: (_, { id }) => {
      return (getCard(id).populate([
        "artist",
        "deck",
      ]) as unknown) as Promise<GQL.Card>;
    },
  },
};

export const typeDefs = gql`
  type Query {
    cards(deck: ID, shuffle: Boolean): [Card!]!
    card(id: ID!): Card
  }

  type Card {
    _id: ID!
    img: String!
    video: String
    artist: Artist!
    info: String
    deck: Deck!
    suit: String
    value: String
    opensea: String
  }
`;
