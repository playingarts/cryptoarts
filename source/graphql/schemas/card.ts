import { gql } from "@apollo/client";
import { Schema, model, models, Model, Types } from "mongoose";
import { getDeck } from "./deck";
import { Asset, getAssets } from "./opensea";
import Web3 from "web3";
import { getContracts } from "./contract";

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
  erc1155: {
    type: {
      contractAddress: String,
      token_id: String,
    },
    default: null,
  },
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

export const getCardByTraits = ({
  suit,
  value,
  deck,
}: Pick<MongoCard, "value" | "suit" | "deck">) =>
  (Card.findOne({
    suit,
    value,
    deck,
  }) as unknown) as Promise<GQL.Card>;

export const resolvers: GQL.Resolvers = {
  Card: {
    background: async ({ background, deck }) =>
      background ||
      deck.cardBackground ||
      (await getDeck({ _id: (deck as unknown) as string }).then(
        (deck) => deck && deck.cardBackground
      )),
    price: async (card: GQL.Card) => {
      if (!card.suit || !card.deck) {
        return;
      }
      const contracts = await getContracts({ deck: card.deck._id });

      if (!contracts) {
        return;
      }

      const assets = ((await Promise.all(
        contracts.map(async (contract) => await getAssets(contract.address))
      )) as Asset[][]).flat();

      const orders = assets
        .filter(
          ({ token_id, sell_orders, traits }) =>
            token_id &&
            sell_orders &&
            (card.erc1155
              ? card.erc1155.token_id === token_id
              : traits.filter(
                  ({ trait_type, value }) =>
                    ((trait_type === "Suit" || trait_type === "Color") &&
                      value.toLowerCase() === card.suit) ||
                    (trait_type === "Value" &&
                      value.toLowerCase() === card.value)
                ).length === 2)
        )
        .map((item) => item.sell_orders)
        .flat();

      return orders.reduce<number | undefined>((minPrice, { base_price }) => {
        if (!base_price) {
          return minPrice;
        }

        const price = parseFloat(Web3.utils.fromWei(base_price, "ether"));

        if (!minPrice) {
          return price;
        }

        return Math.min(price, minPrice);
      }, undefined);
    },
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
    suit: String!
    value: String!
    background: String
    price: Float
    erc1155: ERC1155
  }

  type ERC1155 {
    contractAddress: String!
    token_id: String!
  }
`;
