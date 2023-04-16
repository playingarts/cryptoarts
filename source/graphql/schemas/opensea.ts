import { ApolloError, gql } from "@apollo/client";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import GraphQLJSON from "graphql-type-json";
import intersect from "just-intersect";
import memoizee from "memoizee";
import { model, Model, models, Schema } from "mongoose";
import { CardSuits } from "../../enums";
import { getCardByTraits, getCards } from "./card";
import { getContract, getContracts } from "./contract";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as T from "io-ts";

const { NEXT_PUBLIC_SIGNATURE_MESSAGE: signatureMessage, OPENSEA_KEY = "" } =
  process.env;

export interface Asset {
  token_id: string;
  asset_contract: {
    address: string;
  };
  top_ownerships: {
    owner: {
      address: string;
    };
  }[];
  name: string;
  seaport_sell_orders?: {
    order_hash: string;
    current_price: string;
  }[];
  traits: {
    trait_type: string;
    value: string;
  }[];
}

const schema = new Schema<GQL.Asset, Model<GQL.Asset>, GQL.Asset>({
  token_id: String,
  name: String,
  top_ownerships: [{ owner: { address: String } }],
  seaport_sell_orders: [{ order_hash: String, current_price: String }],
  traits: [{ trait_type: String, value: String }],
  asset_contract: {
    address: String,
  },
});

export const Asset =
  (models.Asset as Model<GQL.Asset>) || model("Asset", schema);

const AssetType = T.interface({
  token_id: T.string,
  asset_contract: T.type({
    address: T.string,
  }),
  name: T.string,
  seaport_sell_orders: T.union([
    T.null,
    T.array(
      T.type({
        order_hash: T.string,
        current_price: T.string,
      })
    ),
  ]),
  traits: T.array(
    T.type({
      trait_type: T.string,
      value: T.string,
    })
  ),
});

const OwnerType = T.interface({
  owner: T.type({
    address: T.string,
  }),
});
const OwnersType = T.array(OwnerType);
const AssetsType = T.array(AssetType);

const decodeWith =
  <ApplicationType = any, EncodeTo = ApplicationType, DecodeFrom = unknown>(
    codec: T.Type<ApplicationType, EncodeTo, DecodeFrom>
  ) =>
  (input: DecodeFrom): ApplicationType =>
    pipe(
      codec.decode(input),
      E.getOrElseW((errors) => {
        console.log(errors[0]);

        throw new Error("Error 666");
      })
    );

const queue: { name: string; contract: string }[] = [];

// This is so sad
export const getAssetsRaw: {
  state: "loaded" | "loading";
  get: (contract: string, name: string, hash?: string) => Promise<Asset[]>;
} = {
  state: "loaded",
  get(contract, name, hash) {
    const getOwners = (
      index: string,
      cursor?: string,
      restartCount = 0,
      allOwners: Asset["top_ownerships"] = []
    ): Promise<Asset["top_ownerships"]> =>
      fetch(
        `https://api.opensea.io/api/v1/asset/${contract}/${index}/owners?` +
          new URLSearchParams({
            limit: "50",
            ...(cursor && { cursor }),
          }),
        { headers: { accept: "application/json", "X-API-KEY": OPENSEA_KEY } }
      )
        .then((res) => res.json())
        .then(async ({ next, owners, detail }) => {
          if (detail) {
            throw new Error(detail);
          }

          decodeWith(OwnersType)(owners);

          allOwners = [...allOwners, ...owners];
          if (next) {
            return await getOwners(index, next, 0, allOwners);
          }

          return owners;
        })
        .catch((error) => {
          if (error.message.includes("Request was throttled")) {
            if (restartCount >= 50) {
              console.log(
                "Too much throttling, aborting while fetching owners"
              );

              queue.shift();

              this.state = "loaded";

              return;
            }
            // console.error(`Request was throttled while fetching owner`);
          } else {
            console.error("Failed to get OpenSea Owner:", error);

            queue.shift();

            this.state = "loaded";

            return [];
          }

          return new Promise<Asset["top_ownerships"]>((resolve) =>
            setTimeout(
              () =>
                resolve(getOwners(index, cursor, restartCount + 1, allOwners)),
              // error.message.includes("Error 429") ? 1000 : 500
              2000
            )
          );
        });

    const getInitAssets = (
      cursor?: string,
      index = 0,
      restartCount = 0
    ): Promise<any> =>
      fetch(
        "https://api.opensea.io/api/v1/assets?" +
          new URLSearchParams({
            collection_slug: queue[0].name,
            asset_contract_address: queue[0].contract,
            limit: "200",
            include_orders: "true",
            ...(cursor && { cursor }),
          }),
        { headers: { accept: "application/json", "X-API-KEY": OPENSEA_KEY } }
      )
        .then((res) => res.json())
        .then(async ({ assets, next, detail }) => {
          if (detail) {
            throw new Error(detail);
          }

          decodeWith(AssetsType)(assets);

          console.log("Fetched Assets: " + (index + assets.length));

          const newAssets: Asset[] = [];

          for (const asset of assets) {
            const owners = await getOwners(asset.token_id);
            if (!owners) {
              return;
            }

            newAssets.push({
              ...asset,
              asset_contract: {
                address: asset.asset_contract.address.toLowerCase(),
              },
              top_ownerships: owners.map((owner) => ({
                owner: { address: owner.owner.address.toLowerCase() },
              })),
            });
          }

          await Asset.deleteMany({
            $or: newAssets.map(({ token_id, asset_contract }) => ({
              token_id,
              asset_contract,
            })),
          });

          await Asset.insertMany(newAssets);

          const contract = await getContract({ address: queue[0].contract });

          const cards = await getCards({ deck: contract.deck._id });

          const pages = [];
          pages.push("/" + contract.deck.slug);

          (assets as GQL.Asset[]).map(({ traits }) => {
            const suit = (
              traits.find(
                ({ trait_type }) =>
                  trait_type === "Suit" || trait_type === "Color"
              ) as { value: string }
            ).value.toLowerCase();

            const value = (
              traits.find(({ trait_type }) => trait_type === "Value") as {
                value: string;
              }
            ).value.toLowerCase();

            const card = cards.find(
              (card) => card.value === value && card.suit === suit
            );

            if (!card) {
              throw new Error(
                "Cannot revalidate: " + suit + " " + value + " " + cards.length
              );
            }

            pages.push("/" + contract.deck.slug + "/" + card.artist.slug);
          });

          // If on dev, will cause an infinite loop and eventual memory overflow because next js
          await fetch(
            (process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : process.env.URL) +
              "/api/revalidate?" +
              new URLSearchParams({
                pages: JSON.stringify(pages),
                secret: process.env.REVALIDATE_SECRET || "",
              })
          );

          if (!next) {
            console.log("Updated assets for contract: " + queue[0].contract);

            queue.shift();

            this.state = "loaded";

            // return allAssets;
            return;
          }

          return getInitAssets(next, (index += assets.length));
        })

        .catch((error) => {
          if (error.message.includes("Request was throttled")) {
            if (restartCount >= 15) {
              console.log(
                "Too much throttling, aborting at: " + index + " assets"
              );

              queue.shift();

              this.state = "loaded";

              return;
            }

            console.error("Request was throttled while fetching assets");
          } else {
            console.error("Failed to get OpenSea Assets:", error);

            queue.shift();

            this.state = "loaded";

            return;
          }

          // if (error.message.includes("Error 666")) {
          //   return;
          // }
          return new Promise<any>((resolve) =>
            setTimeout(
              () => resolve(getInitAssets(cursor, index, restartCount + 1)),
              // error.message.includes("Error 429") ? 1000 : 500
              2000
            )
          );
        });

    if (queue.length === 0 && this.state !== "loaded") {
      this.state = "loaded";
    }

    if (
      queue.findIndex(
        (item) =>
          item.contract.toLowerCase() === contract.toLowerCase() &&
          item.name === name
      ) === -1
    ) {
      queue.push({ contract, name });
    }
    if (this.state !== "loading" && process.env.ALLOW_ASSETS_FETCH === "true") {
      this.state = "loading";
      console.log(queue);

      getInitAssets();
      // return Promise.resolve(cachedAssets[contract]);
    }
    if (hash) {
      return getCachedAssets(contract).then((assets) =>
        assets.filter(
          (asset) =>
            asset.top_ownerships.findIndex(
              ({ owner }) => owner.address === hash
            ) !== -1
        )
      );
    }

    return getCachedAssets(contract);
  },
};

const cachedAssets: Record<string, Asset[]> = {};

const getCachedAssets = memoizee<(contract: string) => Promise<Asset[]>>(
  async (contract) => {
    console.log({ queue });

    if (!cachedAssets[contract]) {
      const assets = await Asset.find({
        "asset_contract.address": contract,
      }).lean();
      cachedAssets[contract] = assets;
      return assets;
    }
    Asset.find({
      "asset_contract.address": contract,
    })
      .lean()
      .then((assets) => (cachedAssets[contract] = assets));
    return cachedAssets[contract];
  },
  {
    length: 1,
    primitive: true,
    maxAge: 1000 * 30,
    preFetch: true,
  }
);

export const getAssets: typeof getAssetsRaw.get =
  process.env.NODE_ENV === "development"
    ? async (_address, contract) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`../../../mocks/${contract}.json`) as Asset[];
        // return [];
      }
    : //
      (contract, name, hash) => getAssetsRaw.get(contract, name, hash);

// export const getAssetsRaw = (
//   contract: string,
//   contractSlug?: string,
//   allAssets: Asset[] = [],
//   cursor = ""
// ): Promise<Asset[]> =>
//   seaport.api
//     .get<{
//       assets: Asset[];
//       next: string | null;
//     }>("/api/v1/assets", {
//       asset_contract_address: contract,
//       ...(contractSlug && { collection_slug: contractSlug }),
//       limit: 200,
//       include_orders: true,
//       cursor,
//     })
//     .then(({ assets, next }) => {
//       allAssets = [...allAssets, ...assets];

//       if (!next) {
//         cachedAssets[contract] = allAssets;

//         return allAssets;
//       }

//       return getAssetsRaw(contract, contractSlug, allAssets, next);
//     })
//     .catch((error) => {
//       console.error("Failed to get OpenSea Assets:", error);

//       return new Promise<Asset[]>((resolve) =>
//         setTimeout(
//           () =>
//             resolve(getAssetsRaw(contract, contractSlug, allAssets, cursor)),
//           error.message.includes("Error 429") ? 1000 : 500
//         )
//       );
//     });

// export const getAssets = memoizee<typeof getAssetsRaw>(
//   process.env.NODE_ENV === "development"
//     ? async (_contract, contractSlug) =>
//         // eslint-disable-next-line @typescript-eslint/no-var-requires
//         require(`../../../mocks/${contractSlug}.json`) as Asset[]
//     : (contract, contractSlug) => {
//         if (cachedAssets[contract]) {
//           getAssetsRaw(contract, contractSlug);

//           return Promise.resolve(cachedAssets[contract]);
//         }

//         return getAssetsRaw(contract, contractSlug);
//       },
//   {
//     length: 1,
//     primitive: true,
//     maxAge: 1000 * 60 * 60,
//     preFetch: true,
//   }
// );
type CardSuitsType =
  | CardSuits.s
  | CardSuits.c
  | CardSuits.h
  | CardSuits.d
  | CardSuits.r
  | CardSuits.b;

const getHolders = async (deck: string) => {
  const contract = await getContract({ deck });

  if (!contract) {
    return;
  }

  const assets = await getAssets(contract.address, contract.name);

  const holders = (
    assets.filter((asset) => !!asset.top_ownerships) as unknown as (Omit<
      Asset,
      "owner"
    > &
      Asset["top_ownerships"])[]
  ).reduce<
    Record<string, { suit: CardSuitsType; value: string; tokens: string[] }[]>
  >((data, { top_ownerships, traits, token_id }) => {
    top_ownerships.map(({ owner: { address } }) => {
      if (!data[address]) {
        data[address] = [];
      }

      const suitTrait = traits.find(
        ({ trait_type }) => trait_type === "Suit" || trait_type === "Color"
      );
      const valueTrait = traits.find(
        ({ trait_type }) => trait_type === "Value"
      );

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
    });

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
  on_sale: !!asset.seaport_sell_orders,
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
  primary_asset_contracts: GQL.PrimaryAssetContract[],
  slug: string
) => {
  if (!primary_asset_contracts[0] || !primary_asset_contracts[0].address) {
    return;
  }

  const onSale = async (assets: Asset[]) => {
    return assets
      .filter(
        ({ token_id, seaport_sell_orders }) => token_id && seaport_sell_orders
      )
      .map((item) => item.seaport_sell_orders)
      .flat().length;
  };

  return primary_asset_contracts.reduce<Promise<number> | number>(
    async (prev, { address }) => {
      if (!address) {
        return prev;
      }

      const assets = await getAssets(address, slug);

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
    stats: async ({ stats = {}, primary_asset_contracts, slug }) => {
      const onSale = await getOnSale(primary_asset_contracts, slug);

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
        return [];
      }

      const assets = (
        (await Promise.all(
          contracts.map(
            async (contract) => await getAssets(contract.address, contract.name)
          )
        )) as Asset[][]
      ).flat();

      return assets.filter(
        (asset) =>
          asset.top_ownerships &&
          asset.top_ownerships.findIndex(
            ({ owner }) => owner.address.toLowerCase() === address.toLowerCase()
          ) !== -1
      );
    },
    holders: (_, { deck }) => getHolders(deck),
  },
};

// sell_orders: [SellOrder]!
//   type SellOrder {
//     base_price: String!
//   }
export const typeDefs = gql`
  scalar JSON

  type Query {
    ownedAssets(deck: ID!, address: String!, signature: String!): [Asset]!
    opensea(deck: ID!): Opensea!
    holders(deck: ID!): Holders
  }

  type Asset {
    token_id: String!
    name: String!
    top_ownerships: [TopOwnerships!]!
    seaport_sell_orders: [SeaportSellOrders!]
    traits: [Trait!]!
    asset_contract: OpenseaContract!
  }

  type SeaportSellOrders {
    order_hash: String!
    current_price: String!
  }

  type OpenseaContract {
    address: String!
  }

  type TopOwnerships {
    owner: Owner!
  }

  type Trait {
    trait_type: String!
    value: String!
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
