import { gql } from "@apollo/client";
import GraphQLJSON from "graphql-type-json";
import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import memoizee from "memoizee";
import { CardSuits } from "../../enums";
import intersect from "just-intersect";

const { OPENSEA_KEY: apiKey = "" } = process.env;
const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey,
});

interface Asset {
  token_id: string;
  owner: {
    address: string;
  };
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
      console.error("Failed to get OpenSea Assets:", error);

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

export const getAssets = memoizee(
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

type CardSuitsType =
  | CardSuits.s
  | CardSuits.c
  | CardSuits.h
  | CardSuits.d
  | CardSuits.r
  | CardSuits.b;

const getHolders = async (contract: string) => {
  const assets = await getAssets(contract);

  const holders = assets.reduce<
    Record<string, { suit: CardSuitsType; value: string; tokens: string[] }[]>
  >((data, { owner: { address }, traits, token_id }) => {
    if (!data[address]) {
      data[address] = [];
    }

    const suitTrait = traits.find(
      ({ trait_type }) => trait_type === "Suit" || trait_type === "Color"
    );
    const valueTrait = traits.find(({ trait_type }) => trait_type === "Value");

    if (!suitTrait || !valueTrait) {
      return data;
    }

    const exists = data[address].find(
      ({ suit, value }) =>
        suit === suitTrait.value.toLowerCase() &&
        value === valueTrait.value.toLowerCase()
    );

    if (!exists) {
      data[address].push({
        suit: suitTrait.value.toLowerCase() as CardSuitsType,
        value: valueTrait.value.toLowerCase(),
        tokens: [token_id],
      });
    } else {
      exists.tokens.push(token_id);
    }

    return data;
  }, {});

  const deckHolders = Object.entries(holders).reduce<{
    fullDecks: string[];
    fullDecksWithJokers: string[];
  }>(
    (data, [owner, cards]) => {
      if (cards.length >= 52) {
        if (cards.length === 54) {
          data.fullDecksWithJokers.push(owner);
        }

        return {
          ...data,
          fullDecks: [...data.fullDecks, owner],
        };
      }

      return data;
    },
    { fullDecks: [], fullDecksWithJokers: [] }
  );

  const suitHolders = Object.entries(holders).reduce<
    Record<CardSuitsType, string[]>
  >(
    (data, [owner, cards]) => {
      const suits = cards.reduce<Record<CardSuitsType, number>>(
        (data, { suit }) => ({
          ...data,
          [suit]: data[suit] + 1,
        }),
        { spades: 0, diamonds: 0, clubs: 0, hearts: 0, red: 0, black: 0 }
      );

      return {
        spades: [...data.spades, ...(suits.spades === 13 ? [owner] : [])],
        diamonds: [...data.diamonds, ...(suits.diamonds === 13 ? [owner] : [])],
        clubs: [...data.clubs, ...(suits.clubs === 13 ? [owner] : [])],
        hearts: [...data.hearts, ...(suits.hearts === 13 ? [owner] : [])],
        red: [...data.red, ...(suits.red === 1 ? [owner] : [])],
        black: [...data.hearts, ...(suits.black === 1 ? [owner] : [])],
      };
    },
    {
      spades: [],
      diamonds: [],
      clubs: [],
      hearts: [],
      red: [],
      black: [],
    }
  );

  return {
    jokers: intersect(suitHolders.black, suitHolders.red),
    ...deckHolders,
    ...suitHolders,
  };
};

export const setOnSale = (asset: Asset) => ({
  ...asset,
  on_sale: !!asset.sell_orders,
});

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
    opensea: async (_, { collection }) => {
      const response = await (
        await fetch(`https://api.opensea.io/api/v1/collection/${collection}`)
      ).json();

      return {
        ...response.collection,
        id: collection,
      };
    },
    holders: (_, { contract }) => getHolders(contract),
  },
};

export const typeDefs = gql`
  scalar JSON

  type Query {
    opensea(collection: String!): Opensea!
    holders(contract: String!): Holders!
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
    fullDecks: [String!]!
    fullDecksWithJokers: [String!]!
    spades: [String!]!
    diamonds: [String!]!
    hearts: [String!]!
    clubs: [String!]!
    jokers: [String!]!
  }
`;
