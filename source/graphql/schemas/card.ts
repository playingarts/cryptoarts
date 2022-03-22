import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";
import { getDeck } from "./deck";
import { getCardPrice } from "./opensea";

export type MongoCard = Omit<GQL.Card, "artist" | "deck"> & {
  artist?: string;
  deck?: string;
};

const schema = new Schema<MongoCard, Model<MongoCard>, MongoCard>({
  img: String,
  video: String,
  info: String,
  value: String,
  background: { type: String, default: null },
  suit: String,
  opensea: String,
  artist: { type: Types.ObjectId, ref: "Artist" },
  deck: { type: Types.ObjectId, ref: "Deck" },
});

export const Card = (models.Card as Model<MongoCard>) || model("Card", schema);

export const getCards = async ({
  deck,
  shuffle,
  limit,
}: GQL.QueryCardsArgs) => {
  if (deck && !Types.ObjectId.isValid(deck)) {
    const { _id } = (await getDeck({ slug: deck })) || {};

    deck = _id;
  }

  return ((Card.find(deck ? { deck } : {}).populate([
    "artist",
    "deck",
  ]) as unknown) as Promise<GQL.Card[]>)
    .then((cards) =>
      shuffle ? cards.sort(() => Math.random() - Math.random()) : cards
    )
    .then((cards) => (limit ? cards.slice(0, limit) : cards));
};

export const getCard = ({ id }: GQL.QueryCardArgs) =>
  (Card.findById(id).populate([
    "artist",
    "deck",
  ]) as unknown) as Promise<GQL.Card>;

export const resolvers: GQL.Resolvers = {
  Card: {
    background: async ({ background, deck }) =>
      background ||
      deck.cardBackground ||
      (await getDeck({ _id: (deck as unknown) as string }).then(
        (deck) => deck && deck.cardBackground
      )),
    price: getCardPrice,
  },
  Query: {
    cards: (_, args) => getCards(args),
    card: (_, args) => getCard(args),
  },
};

export const typeDefs = gql`
  type Query {
    cards(deck: ID, shuffle: Boolean, limit: Int): [Card!]!
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
    value: String!
    opensea: String
    background: String
    price: Float
  }
`;
