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
import { Content } from "./content";
import * as crypto from "crypto";
import { Listing, getListings } from "./listing";

const {
  NEXT_PUBLIC_SIGNATURE_MESSAGE: signatureMessage,
  OPENSEA_ASSETS_KEY = "",
  OPENSEA_KEY = "",
} = process.env;

// export interface Nft {
//   identifier: string;
//   contract: string;
//   token_standard: string;
//   name: string;
//   description: string;
//   traits: [
//     {
//       trait_type: string;
//       value: string;
//     }
//   ];
//   owners: Array<{
//     address: string;
//     quantity: string;
//   }>;
// }

const schema = new Schema<GQL.Nft, Model<GQL.Nft>, GQL.Nft>({
  identifier: String,
  contract: String,
  token_standard: String,
  name: String,
  description: String,
  traits: [
    {
      trait_type: String,
      value: String,
    },
  ],
  owners: [
    {
      address: String,
      quantity: String,
    },
  ],
});

export const Nft = (models.Nft as Model<GQL.Nft>) || model("Nft", schema);

const NftType = T.interface({
  identifier: T.string,
  contract: T.string,
  token_standard: T.string,
  name: T.string,
  description: T.string,
  // traits: T.array(
  //   T.type({
  //     trait_type: T.string,
  //     value: T.string,
  //   })
  // ),
  owners: T.array(
    T.type({
      address: T.string,
      quantity: T.number,
    })
  ),
});

const NftsType = T.array(
  T.interface({
    identifier: T.string,
    contract: T.string,
    token_standard: T.string,
    name: T.string,
    description: T.string,
  })
);

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

// const queue: { name: string; contract: string }[] = [];
type queueObject = {
  key: "queue";
  data: { contract: string; name: string; hash: string | null };
};

// This is better than how it used to be
export const getAssetsRaw: (hash: string) => void = async (hash) => {
  const contractObject = (await Content.findOne({
    "data.hash": { $ne: null },
  })) as unknown as queueObject;

  if (contractObject.data.hash !== hash) {
    return;
  }

  let listingsnext = "";

  const listingsArray: GQL.Listing[] = [];

  do {
    const ires = await fetch(
      `https://api.opensea.io/api/v2/listings/collection/${
        contractObject.data.name
      }/best?limit=100${listingsnext === "" ? "" : "&next=" + listingsnext}`,
      {
        headers: {
          accept: "application/json",
          "X-API-KEY": OPENSEA_ASSETS_KEY,
        },
      }
    );

    const res = await ires.json();
    const { listings, next } = res as {
      next?: string;
      listings: GQL.Listing[];
    };

    listingsArray.push(
      ...listings.map((listing) => ({
        ...listing,
        protocol_data: {
          parameters: {
            offer: listing.protocol_data.parameters.offer.map((offer) => ({
              ...offer,
              token: offer.token.toLowerCase(),
              identifierOrCriteria: offer.identifierOrCriteria.toLowerCase(),
            })),
          },
        },
      }))
    );

    listingsnext = next || "";
  } while (listingsnext !== "");

  await Listing.deleteMany({
    "protocol_data.parameters.offer.token": contractObject.data.contract,
  });

  await Listing.insertMany(listingsArray);

  console.log("done with listings");

  const getNft = (id: string, restartCount = 0): Promise<GQL.Nft> =>
    fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/contract/${contractObject.data.contract}/nfts/${id}`,
      {
        headers: {
          accept: "application/json",
          "X-API-KEY": OPENSEA_ASSETS_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(async ({ nft }) => {
        decodeWith(NftType)(nft);

        return nft;
      })
      .catch(async (error) => {
        if (error.message.includes("Request was throttled")) {
          // if (restartCount >= 50) {
          //   console.log(
          //     "Too much throttling, aborting while fetching owners"
          //   );
          //   queue.shift();
          //   getAssetsRaw.state = "loaded";
          //   return;
          // }
          // console.error(`Request was throttled while fetching owner`);
        } else {
          // console.error("Failed to get OpenSea Owner:", error);

          if (restartCount >= 10) {
            console.log("Restarted more than 10 times, dropping queue");

            await Content.deleteMany({
              key: "queue",
            });

            return;
          }
        }

        return new Promise<GQL.Nft>((resolve) =>
          setTimeout(
            () => resolve(getNft(id, restartCount + 1)),
            // error.message.includes("Error 429") ? 1000 : 500
            3000
          )
        );
      });

  const getInitNfts = (
    next?: string,
    index = 0,
    restartCount = 0
  ): Promise<any> =>
    fetch(
      `https://api.opensea.io/api/v2/collection/${
        contractObject.data.name
      }/nfts?limit=200${!next ? "" : "&next=" + next}`,
      {
        headers: {
          accept: "application/json",
          "X-API-KEY": OPENSEA_ASSETS_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(async ({ nfts, next, detail }) => {
        if (detail) {
          throw new Error(detail);
        }

        decodeWith(NftsType)(nfts);

        console.log("Fetched Assets: " + (index + nfts.length));

        const newNfts: GQL.Nft[] = [];

        if (index === 0) {
          await Content.deleteMany({
            "data.hash": { $nin: [contractObject.data.hash, null] },
          });
        }

        for (const nft of nfts) {
          const fullnft = await getNft(nft.identifier);

          newNfts.push({
            ...fullnft,
          });
        }

        await Nft.deleteMany({
          $or: newNfts.map(({ identifier, contract }) => ({
            identifier,
            contract,
          })),
        });

        await Nft.insertMany(newNfts);

        const contract = await getContract({
          address: contractObject.data.contract,
        });

        const cards = await getCards({ deck: contract.deck._id });

        const pages: string[] = [];

        (newNfts as GQL.Nft[]).map(({ traits, identifier }) => {
          if (traits) {
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
          } else {
            const card = cards.find(
              (card) => card.erc1155 && card.erc1155.token_id === identifier
            );

            if (!card) {
              throw new Error("Cannot revalidate: token_id " + identifier);
            }

            pages.push("/" + contract.deck.slug + "/" + card.artist.slug);
          }
        });

        // if (process.env.NODE_ENV !== "development") {
        fetch(
          (process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.URL) +
            "/api/revalidate?" +
            new URLSearchParams({
              pages: JSON.stringify(["/" + contract.deck.slug]),
              secret: process.env.REVALIDATE_SECRET || "",
            })
        );

        fetch(
          (process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.URL) +
            "/api/revalidate?" +
            new URLSearchParams({
              pages: JSON.stringify(pages),
              secret: process.env.REVALIDATE_SECRET || "",
            })
        );
        // }

        if (!next) {
          console.log(
            "Updated assets for contract: " + contractObject.data.contract
          );

          await Content.deleteMany({
            "data.name": contractObject.data.name,
            "data.contract": contractObject.data.contract,
          });

          return;
        }

        return getInitNfts(next, (index += nfts.length));
      })

      .catch(async (error) => {
        if (error.message.includes("Request was throttled")) {
          // if (restartCount >= 15) {
          //   console.log(
          //     "Too much throttling, aborting at: " + index + " assets"
          //   );
          //   queue.shift();
          //   getAssetsRaw.state = "loaded";
          //   return;
          // }
          // console.error("Request was throttled while fetching assets");
        } else {
          console.error("Failed to get OpenSea Assets:", error);

          if (restartCount >= 10) {
            console.log("Restarted more than 10 times, dropping queue");

            await Content.deleteMany({
              key: "queue",
            });

            return;
          }
        }

        // if (error.message.includes("Error 666")) {
        //   return;
        // }
        return new Promise<any>((resolve) =>
          setTimeout(
            () => resolve(getInitNfts(next, index, restartCount + 1)),
            // error.message.includes("Error 429") ? 1000 : 500
            3000
          )
        );
      });

  getInitNfts();
};

const cachedAssets: Record<string, GQL.Nft[]> = {};

const getCachedAssets = memoizee<(contract: string) => Promise<GQL.Nft[]>>(
  async (contract) => {
    if (!cachedAssets[contract]) {
      const assets = await Nft.find({ contract }).lean();
      cachedAssets[contract] = assets;
      return assets;
    }

    Nft.find({
      contract,
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

export const getAssets = memoizee<
  (contract: string, name: string, hash?: string) => Promise<GQL.Nft[]>
>(
  process.env.NODE_ENV === "development"
    ? async (_address, contract) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`../../../mocks/${contract}.json`) as GQL.Nft[];
        // return [];
      }
    : //
      async (contract, name, hash) => {
        if (process.env.ALLOW_ASSETS_FETCH === "true") {
          const queueEntries = await Content.find({ key: "queue" });

          if (!queueEntries.find((entry) => entry.data.hash !== null)) {
            const newHash = crypto.randomUUID();
            if (queueEntries[0]) {
              await Content.insertMany({
                key: "queue",
                data: {
                  contract: queueEntries[0].data.contract,
                  name: queueEntries[0].data.name,
                  hash: newHash,
                },
              });
            } else {
              await Content.insertMany({
                key: "queue",
                data: { contract, name, hash: newHash },
              });
            }
            getAssetsRaw(newHash);
          } else {
            const sameContract = queueEntries.find(
              ({ data }) => data.contract === contract && data.name === name
            );

            if (!sameContract) {
              await Content.insertMany({
                key: "queue",
                data: { contract, name, hash: null },
              });
            }
          }
        }

        if (hash) {
          return getCachedAssets(contract).then((assets) =>
            assets.filter(
              (asset) =>
                asset.owners.findIndex(({ address }) => address === hash) !== -1
            )
          );
        }

        return getCachedAssets(contract);
      },
  {
    maxAge: 1000 * 1,
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

  if (!contract) {
    return;
  }

  const assets = await getAssets(contract.address, contract.name);

  const holders = (
    assets.filter((asset) => !!asset.owners) as unknown as (Omit<
      GQL.Nft,
      "owner"
    > &
      GQL.Nft["owners"])[]
  ).reduce<
    Record<string, { suit: CardSuitsType; value: string; tokens: string[] }[]>
  >((data, { owners, traits = [], identifier }) => {
    owners.map(({ address }) => {
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
          tokens: [identifier],
        });
      } else {
        exists.tokens.push(identifier);
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

export const setCard =
  (contractId: string) => async (asset: GQL.Nft & { on_sale: boolean }) => {
    const contract = await getContract({
      address: contractId.toLowerCase(),
    });

    if (!contract) {
      return asset;
    }

    if (!asset.traits) {
      return asset;
    }

    const valueTrait = asset.traits.find(
      (trait) => trait.trait_type === "Value"
    );
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

// const getOnSale = async (
//   primary_asset_contracts: GQL.PrimaryAssetContract[],
//   slug: string
// ) => {
//   if (!primary_asset_contracts[0] || !primary_asset_contracts[0].address) {
//     return;
//   }

//   const onSale = async (assets: Nft[]) => {
//     return assets
//       .filter(
//         ({ identifier, seaport_sell_orders }) => token_id && seaport_sell_orders
//       )
//       .map((item) => item.seaport_sell_orders)
//       .flat().length;
//   };

//   return primary_asset_contracts.reduce<Promise<number> | number>(
//     async (prev, { address }) => {
//       if (!address) {
//         return prev;
//       }

//       const assets = await getAssets(address, slug);

//       return (await prev) + (await onSale(assets));
//     },
//     0
//   );
// };

export const signatureValid = (address: string, signature: string) =>
  address.toLowerCase() ===
  recoverPersonalSignature({
    data: signatureMessage,
    signature,
  }).toLowerCase();

export const resolvers: GQL.Resolvers = {
  JSON: GraphQLJSON,
  Opensea: {
    id: ({ id }) => id,
    volume: ({ volume }) => volume,
    num_owners: ({ num_owners }) => num_owners,
    floor_price: ({ floor_price }) => floor_price,
    total_supply: ({ total_supply }) => total_supply,
    on_sale: ({ on_sale }) => on_sale,
  },
  Query: {
    opensea: async (_, { deck }) => {
      const contract = await getContract({ deck });

      const response = await (
        await fetch(
          `https://api.opensea.io/api/v2/collections/${contract.name}/stats`,
          { headers: { "X-API-KEY": OPENSEA_KEY } }
        )
      ).json();

      const collection = await (
        await fetch(
          `https://api.opensea.io/api/v2/collections/${contract.name}`,
          {
            headers: { "X-API-KEY": OPENSEA_KEY },
          }
        )
      ).json();

      const listings = await getListings({});

      const res = {
        ...response.total,
        // volume: response.total.volume,
        // num_owners: response.total.num_owners,
        // floor_price: response.total.floor_price,
        total_supply: collection.total_supply,
        on_sale: listings.length,
        id: contract.name,
      };

      return res;
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
        )) as GQL.Nft[][]
      ).flat();

      return assets.filter(
        (asset) =>
          asset.owners &&
          asset.owners.findIndex(
            (owner) => owner.address.toLowerCase() === address.toLowerCase()
          ) !== -1
      );
    },
    holders: (_, { deck }) => getHolders(deck),
  },
};

export const typeDefs = gql`
  scalar JSON

  type Query {
    ownedAssets(deck: ID!, address: String!, signature: String!): [Nft]!
    opensea(deck: ID!): Opensea!
    holders(deck: ID!): Holders
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

  type Opensea {
    id: ID!
    volume: Float!
    floor_price: Float!
    num_owners: String!
    total_supply: String!
    on_sale: String!
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
