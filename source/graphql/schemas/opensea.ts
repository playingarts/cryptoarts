import { gql } from "@apollo/client";
import S3 from "aws-sdk/clients/s3";
import GraphQLJSON from "graphql-type-json";

const {
  FULL_DECK_HOLDERS_FILE_NAME = "",
  DIAMONDS_SET_OWNERS_FILE_NAME = "",
  CLUBS_SET_OWNERS_FILE_NAME = "",
  HEARTS_SET_OWNERS_FILE_NAME = "",
  SPADES_SET_OWNERS_FILE_NAME = "",
  S3_BUCKET: Bucket = "",
  S3_KEY: accessKeyId = "",
  S3_SECRET: secretAccessKey = "",
} = process.env;

const s3Client = new S3({
  accessKeyId,
  secretAccessKey,
});

const readKey: <T = GQL.Holder[]>(Key: string) => Promise<T> = (Key) =>
  new Promise((resolve) =>
    s3Client.getObject({ Bucket, Key }, (error, data) => {
      if (error || !data.Body) {
        throw error;
      }

      const fullDeckHolders = JSON.parse(data.Body.toString());

      resolve(fullDeckHolders);
    })
  );

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Opensea: {
    id: ({ slug }) => slug,
    editors: ({ editors = [] }) => editors,
    payment_tokens: ({ payment_tokens = [] }) => payment_tokens,
    primary_asset_contracts: ({ primary_asset_contracts = [] }) =>
      primary_asset_contracts,
    traits: ({ traits = {} }) => traits,
    stats: ({ stats = {} }) => stats,
  },
  Query: {
    opensea: async (_, { deck }) => {
      const { collection } = await (
        await fetch(`https://api.opensea.io/api/v1/collection/${deck}`)
      ).json();

      return {
        ...collection,
        id: deck,
      };
    },
    holders: async () => ({
      fullDeck: await readKey(FULL_DECK_HOLDERS_FILE_NAME),
      spades: await readKey(SPADES_SET_OWNERS_FILE_NAME),
      hearts: await readKey(HEARTS_SET_OWNERS_FILE_NAME),
      diamonds: await readKey(DIAMONDS_SET_OWNERS_FILE_NAME),
      clubs: await readKey(CLUBS_SET_OWNERS_FILE_NAME),
    }),
  },
};

export const typeDefs = gql`
  scalar JSON

  type Query {
    opensea(deck: ID!): Opensea!
    holders(deck: ID!): Holders!
  }

  type Opensea {
    id: ID!
    editors: [String!]!
    payment_tokens: [PaymentToken!]!
    primary_asset_contracts: [PrimaryAssetContract!]!
    traits: JSON!
    stats: Stats!
    banner_image_url: String
    created_date: String
    default_to_fiat: Boolean
    description: String
    dev_buyer_fee_basis_points: String
    dev_seller_fee_basis_points: String
    discord_url: String
    external_url: String
    featured: Boolean
    featured_image_url: String
    hidden: Boolean
    safelist_request_status: String
    image_url: String
    is_subject_to_whitelist: Boolean
    large_image_url: String
    name: String
    only_proxied_transfers: Boolean
    opensea_buyer_fee_basis_points: String
    opensea_seller_fee_basis_points: String
    payout_address: String
    require_email: Boolean
    slug: ID!
    twitter_username: String
    instagram_username: String
  }

  type PaymentToken {
    id: Int
    symbol: String
    address: String
    image_url: String
    name: String
    decimals: Int
    eth_price: Float
    usd_price: Float
  }

  type PrimaryAssetContract {
    address: String
    asset_contract_type: String
    created_date: String
    name: String
    nft_version: String
    owner: Int
    schema_name: String
    symbol: String
    total_supply: String
    description: String
    external_link: String
    image_url: String
    default_to_fiat: Boolean
    dev_buyer_fee_basis_points: Int
    dev_seller_fee_basis_points: Int
    only_proxied_transfers: Boolean
    opensea_buyer_fee_basis_points: Int
    opensea_seller_fee_basis_points: Int
    buyer_fee_basis_points: Int
    seller_fee_basis_points: Int
    payout_address: String
  }

  type Stats {
    one_day_volume: Float
    one_day_change: Float
    one_day_sales: Float
    one_day_average_price: Float
    seven_day_volume: Float
    seven_day_change: Float
    seven_day_sales: Float
    seven_day_average_price: Float
    thirty_day_volume: Float
    thirty_day_change: Float
    thirty_day_sales: Float
    thirty_day_average_price: Float
    total_volume: Float
    total_sales: Float
    total_supply: Float
    count: Float
    num_owners: Int
    average_price: Float
    num_reports: Int
    market_cap: Float
    floor_price: Float
  }

  type Holders {
    fullDeck: [Holder!]!
    spades: [String!]!
    diamonds: [String!]!
    hearts: [String!]!
    clubs: [String!]!
  }

  type Holder {
    address: String
    jokers: Boolean
    profile_img_url: String
    profile_url: String
    user: String
  }
`;
