import { gql } from "@apollo/client";
import S3 from "aws-sdk/clients/s3";
import GraphQLJSON from "graphql-type-json";
import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import memoizee from "memoizee";

const {
  FULL_DECK_HOLDERS_FILE_NAME = "",
  DIAMONDS_SET_OWNERS_FILE_NAME = "",
  CLUBS_SET_OWNERS_FILE_NAME = "",
  HEARTS_SET_OWNERS_FILE_NAME = "",
  SPADES_SET_OWNERS_FILE_NAME = "",
  S3_BUCKET: Bucket = "",
  S3_KEY: accessKeyId = "",
  S3_SECRET: secretAccessKey = "",
  OPENSEA_KEY: apiKey = "",
} = process.env;
const s3Client = new S3({ accessKeyId, secretAccessKey });
const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey,
});

interface Asset {
  token_id: string;
  sell_orders: {
    base_price: string;
  }[];
  traits: {
    trait_type: string;
    value: string;
  }[];
}

const getAssetsRaw = (
  contract: string,
  allAssets: Asset[] = [],
  cursor = ""
): Promise<Asset[]> =>
  seaport.api
    .get<{
      assets: Asset[];
      next: string | null;
    }>("/api/v1/assets", {
      asset_contract_address: contract,
      limit: 200,
      include_orders: true,
      cursor,
    })
    .then(({ assets, next }) => {
      allAssets = [...allAssets, ...assets];

      if (!next) {
        return allAssets;
      }

      return getAssetsRaw(contract, allAssets, next);
    })
    .catch((error) => {
      console.log("Failed to get OpenSea Assets:", error);

      return new Promise<Asset[]>((resolve) =>
        setTimeout(
          () => resolve(getAssetsRaw(contract, allAssets, cursor)),
          error.message.includes("Error 429") ? 1000 : 500
        )
      );
    });

export const getCardPrice = async (card: GQL.Card) => {
  if (!card.suit || !card.deck || !card.deck.openseaContract) {
    return;
  }

  const assets = await getAssets(card.deck.openseaContract);
  const orders = assets
    .filter(
      ({ token_id, sell_orders, traits }) =>
        token_id &&
        sell_orders &&
        traits.filter(
          ({ trait_type, value }) =>
            (trait_type === "Suit" && value.toLowerCase() === card.suit) ||
            (trait_type === "Value" && value.toLowerCase() === card.value)
        ).length === 2
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
};

const getAssets = memoizee(
  process.env.NODE_ENV === "development"
    ? async () =>
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../../mocks/assets.json") as Asset[]
    : getAssetsRaw,
  {
    length: 1,
    primitive: true,
    maxAge: 1000 * 60 * 60,
    preFetch: true,
  }
);

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
