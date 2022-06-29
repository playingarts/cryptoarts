import { ApolloError, gql } from "@apollo/client";
import GraphQLJSON from "graphql-type-json";
import Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import memoizee from "memoizee";
import { CardSuits } from "../../enums";
import intersect from "just-intersect";
import { getCardByTraits } from "./card";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { getContract, getContracts } from "./contract";

const {
  OPENSEA_KEY: apiKey = "",
  NEXT_PUBLIC_SIGNATURE_MESSAGE: signatureMessage,
} = process.env;
const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey,
});

export interface Asset {
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
  ownership?: {
    owner: {
      address: string;
    };
  };
}

const cachedAssets: Record<string, Asset[]> = {};

export const getAssetsRaw = (
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
        cachedAssets[contract] = allAssets;

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

export const getAssets = memoizee<typeof getAssetsRaw>(
  process.env.NODE_ENV === "development"
    ? async () =>
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        [
          ...require("../../../mocks/assets.json"),
          ...require("../../../mocks/myassets.json"),
          ...require("../../../mocks/pa-backside.json"),
        ] as Asset[]
    : (contract) => {
        if (cachedAssets[contract]) {
          getAssetsRaw(contract);

          return Promise.resolve(cachedAssets[contract]);
        }

        return getAssetsRaw(contract);
      },
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

const getHolders = async (deck: string) => {
  const contract = await getContract({ deck });

  const assets = await getAssets(contract.address);

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

export const setCard = (contractId: string) => async (asset: Asset) => {
  const contract = await getContract({
    address: contractId.toLowerCase(),
  });

  if (!contract) {
    return asset;
  }

  const valueTrait = asset.traits.find((trait) => trait.trait_type === "Value");
  const suitTrait = asset.traits.find(
    (trait) => trait.trait_type === "Suit" || trait.trait_type === "Color"
  );

  if (!suitTrait || !valueTrait) {
    return asset;
  }

  const card = await getCardByTraits({
    deck: contract.deck._id.toString(),
    suit: suitTrait.value.toLowerCase(),
    value: valueTrait.value.toLowerCase(),
  }).catch(() => null);

  return { ...asset, card };
};

const getOnSale = async (
  primary_asset_contracts: GQL.PrimaryAssetContract[]
) => {
  if (!primary_asset_contracts[0] || !primary_asset_contracts[0].address) {
    return;
  }

  const onSale = async (assets: Asset[]) => {
    return assets
      .filter(({ token_id, sell_orders }) => token_id && sell_orders)
      .map((item) => item.sell_orders)
      .flat().length;
  };

  return primary_asset_contracts.reduce<Promise<number> | number>(
    async (prev, { address }) => {
      if (!address) {
        return prev;
      }

      const assets = await getAssets(address);

      return (await prev) + (await onSale(assets));
    },
    0
  );
};
export const signatureValid = (address: string, signature: string) =>
  address.toLowerCase() ===
  recoverPersonalSignature({
    data: signatureMessage,
    signature,
  }).toLowerCase();

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Opensea: {
    id: ({ slug }) => slug,
    editors: ({ editors = [] }) => editors,
    payment_tokens: ({ payment_tokens = [] }) => payment_tokens,
    primary_asset_contracts: ({ primary_asset_contracts = [] }) =>
      primary_asset_contracts,
    traits: ({ traits = {} }) => traits,
    stats: async ({ stats = {}, primary_asset_contracts }) => {
      const onSale = await getOnSale(primary_asset_contracts);

      return {
        ...stats,
        onSale,
      };
    },
  },
  Query: {
    opensea: async (_, { deck }) => {
      const contract = await getContract({ deck });

      const response = await (
        await fetch(`https://api.opensea.io/api/v1/collection/${contract.name}`)
      ).json();

      return {
        ...response.collection,
        id: contract.name,
      };
    },
    ownedAssets: async (_, { deck, address, signature }) => {
      if (!signatureValid(address, signature)) {
        throw new ApolloError({
          errorMessage: "Failed to verify the account.",
        });
      }

      const contracts = await getContracts({ deck: deck });

      if (!contracts) {
        return;
      }

      const assets = (await Promise.all(
        contracts.map(async (contract) => await getAssets(contract.address))
      )) as Asset[][];

      return assets
        .flat()
        .filter(
          ({ owner }) => owner.address.toLowerCase() === address.toLowerCase()
        );
    },
    holders: (_, { deck }) => getHolders(deck),
  },
};

export const typeDefs = gql`
  scalar JSON

  type Query {
    ownedAssets(deck: ID!, address: String!, signature: String!): [Asset!]
    opensea(deck: ID!): Opensea!
    holders(deck: ID!): Holders!
  }

  type Asset {
    token_id: String!
    owner: Owner!
    sell_orders: [SellOrder]!
    traits: [Trait!]!
  }

  type Trait {
    trait_type: String!
    value: String!
  }

  type SellOrder {
    base_price: String!
  }

  type Owner {
    address: String!
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
    onSale: Int
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
