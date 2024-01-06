import { gql } from "@apollo/client";
import { model, Model, models, Schema, Types } from "mongoose";
import Web3 from "web3";
import { getContracts } from "./contract";
import { getDeck } from "./deck";
import { Asset, getAssets } from "./opensea";

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
  edition: String,
  erc1155: {
    type: {
      contractAddress: String,
      token_id: String,
    },
    default: null,
  },
  artist: { type: Types.ObjectId, ref: "Artist" },
  animator: { type: Types.ObjectId, ref: "Artist" },
  deck: { type: Types.ObjectId, ref: "Deck" },
  reversible: Boolean,
});

export const Card = (models.Card as Model<MongoCard>) || model("Card", schema);

export const Loser =
  (models.Loser as Model<MongoCard>) || model("Loser", schema);

export const getCards = async ({
  deck,
  shuffle,
  limit,
  losers,
  edition,
}: GQL.QueryCardsArgs) => {
  if (deck && !Types.ObjectId.isValid(deck)) {
    const { _id } = (await getDeck({ slug: deck })) || {};

    deck = _id;
  }

  let cards = await ((losers ? Loser : Card)
    .find(deck ? (edition && { deck, edition }) || { deck } : {})
    .populate(["artist", "deck", "animator"]) as unknown as Promise<
    GQL.Card[]
  >);

  if (shuffle) {
    cards = cards.sort(() => Math.random() - Math.random());
  }

  if (limit) {
    cards = cards.slice(0, limit);
  }

  return cards;
};

export const getCard = ({ id }: GQL.QueryCardArgs) =>
  Card.findById(id).populate([
    "artist",
    "deck",
    "animator",
  ]) as unknown as Promise<GQL.Card>;

export const getCardByTraits = ({
  suit,
  value,
  deck,
}: Pick<MongoCard, "value" | "suit" | "deck">) =>
  Card.findOne({
    suit,
    value,
    deck,
  }) as unknown as Promise<GQL.Card>;

const setCards = {
  zero: [
    {
      suit: "spades",
      value: "queen",
    },
    {
      suit: "diamonds",
      value: "5",
    },
  ],
  one: [
    {
      suit: "clubs",
      value: "6",
    },
    {
      suit: "diamonds",
      value: "ace",
    },
  ],
  two: [
    {
      value: "5",
      suit: "spades",
    },
    {
      value: "8",
      suit: "clubs",
    },
  ],
  three: [
    {
      suit: "spades",
      value: "ace",
    },
    {
      suit: "clubs",
      value: "3",
    },
  ],
  special: [
    {
      value: "9",
      suit: "clubs",
    },
    {
      value: "4",
      suit: "hearts",
    },
  ],
  future: [
    {
      value: "queen",
      suit: "hearts",
    },
    {
      value: "ace",
      suit: "hearts",
    },
  ],
  crypto: [
    {
      suit: "clubs",
      value: "5",
    },
    {
      suit: "diamonds",
      value: "8",
    },
  ],
};

const getHeroCards = async ({ deck, slug }: GQL.QueryHeroCardsArgs) => {
  const cards = Promise.all(
    setCards[slug as keyof typeof setCards].map(
      async (card) =>
        (await (Card.findOne({
          ...card,
          deck,
        }).populate(["artist", "deck"]) as unknown)) as Promise<GQL.Card>
    )
  );
  return cards;
};

export const resolvers: GQL.Resolvers = {
  Card: {
    background: async ({ background, deck }) =>
      background ||
      deck.cardBackground ||
      (await getDeck({ _id: deck as unknown as string }).then(
        (deck) => deck && deck.cardBackground
      )),
    price: async (card: GQL.Card) => {
      if (!card.suit || !card.deck) {
        return;
      }

      const contracts = await getContracts({ deck: card.deck._id });

      const assets = (await Promise.all(
        contracts.map(
          async (contract) => await getAssets(contract.address, contract.name)
        )
      )) as Asset[][];

      const orders = assets
        .flat()
        .filter(
          ({ token_id, traits, seaport_sell_orders }) =>
            token_id &&
            seaport_sell_orders &&
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
        .map((item) => item.seaport_sell_orders)
        .flat();

      return (
        orders as {
          base_price?: string;
          current_price?: string;
        }[]
      ).reduce<number | undefined>((minPrice, order) => {
        const base_price = order.base_price || order.current_price;

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
    cards: async (_, args) => await getCards(args),
    card: (_, args) => getCard(args),
    randomCards: (_, args) => getCards(args),
    heroCards: (_, args) => getHeroCards(args),
  },
};

export const typeDefs = gql`
  type Query {
    cards(
      deck: ID
      shuffle: Boolean
      limit: Int
      losers: Boolean
      edition: String
    ): [Card!]!
    randomCards(shuffle: Boolean, limit: Int): [Card!]!
    card(id: ID!): Card
    heroCards(deck: ID, slug: String): [Card!]!
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
    reversible: Boolean
    edition: String
    animator: Artist
  }

  type ERC1155 {
    contractAddress: String!
    token_id: String!
  }
`;
