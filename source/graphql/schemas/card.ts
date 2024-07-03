import { gql } from "@apollo/client";
import { model, Model, models, Schema, Types } from "mongoose";
import Web3 from "web3";
import { getContracts } from "./contract";
import { getDeck, getDecks } from "./deck";
import { getAssets } from "./opensea";
import { getListings } from "./listing";

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
  withoutDeck,
}: GQL.QueryCardsArgs) => {
  if (deck && !Types.ObjectId.isValid(deck)) {
    const { _id } = (await getDeck({ slug: deck })) || {};

    deck = _id;
  }

  if (withoutDeck) {
    const decks = await getDecks();

    withoutDeck = decks
      .filter(
        (deck) =>
          (withoutDeck as unknown as string[]).findIndex(
            (item) => item !== deck.slug
          ) === -1
      )
      .map((deck) => deck._id);
  }

  let cards = await ((losers ? Loser : Card)
    .find(
      deck
        ? (edition && { deck, edition }) || { deck }
        : withoutDeck
        ? { deck: { $nin: withoutDeck } }
        : {}
    )
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

      if (contracts.length === 0) {
        return;
      }

      let assets: GQL.Nft[][] | undefined = undefined;

      assets = (await Promise.all(
        contracts.map(
          async (contract) => await getAssets(contract.address, contract.name)
        )
      )) as GQL.Nft[][];

      // try {
      //       } catch (error) {
      //   console.log(error);
      // }

      if (!assets) {
        return;
      }

      const nftIds = assets
        .flat()
        .filter(
          ({ identifier, traits = [], owners }) =>
            identifier &&
            owners &&
            (card.erc1155
              ? card.erc1155.token_id === identifier
              : traits &&
                traits.filter(
                  ({ trait_type, value }) =>
                    ((trait_type === "Suit" || trait_type === "Color") &&
                      value.toLowerCase() === card.suit) ||
                    (trait_type === "Value" &&
                      value.toLowerCase() === card.value)
                ).length === 2)
        );

      const listings = await getListings({
        addresses: contracts.map((contract) => contract.address.toLowerCase()),
        tokenIds: nftIds.map((item) => item.identifier),
      });

      const price =
        listings.length > 0
          ? parseFloat(
              Web3.utils.fromWei(listings[0].price.current.value, "ether")
            )
          : undefined;

      return price;
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
      withoutDeck: [ID!]
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
