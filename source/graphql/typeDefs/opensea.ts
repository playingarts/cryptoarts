import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar JSON

  type Query {
    ownedAssets(deck: ID!, address: String!, signature: String!): [Nft]!
    opensea(deck: ID, slug: String): Opensea!
    holders(deck: ID, slug: String): Holders
    leaderboard(slug: String): Leaderboard
  }

  type Nft {
    identifier: String!
    contract: String!
    token_standard: String!
    name: String!
    description: String!
    traits: [Trait!]
    owners: [Owner!]!
  }

  type OpenseaContract {
    address: String!
  }

  type Trait {
    trait_type: String!
    value: String!
  }

  type Owner {
    address: String!
    quantity: String!
  }

  type LastSale {
    price: Float!
    symbol: String!
    seller: String!
    buyer: String!
    nft_name: String!
    nft_image: String!
    timestamp: Int!
  }

  type Opensea {
    id: ID!
    volume: Float!
    floor_price: Float!
    num_owners: String!
    total_supply: String!
    on_sale: String!
    sales_count: Int
    average_price: Float
    last_sale: LastSale
    updatedAt: String
  }

  type Holders {
    fullDecks: [String!]!
    fullDecksWithJokers: [String!]!
    spades: [String!]!
    diamonds: [String!]!
    hearts: [String!]!
    clubs: [String!]!
    jokers: [String!]!
  }

  type LeaderboardEntry {
    address: String!
    count: Int!
    username: String
    profileImage: String
  }

  type Leaderboard {
    topHolders: [LeaderboardEntry!]!
    activeTraders: [LeaderboardEntry!]!
    rareHolders: [LeaderboardEntry!]!
  }
`;
