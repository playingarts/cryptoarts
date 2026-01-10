/**
 * OpenSea Service
 *
 * Business logic for OpenSea data management:
 * - Asset queue management for background fetching
 * - Asset caching with memoization
 * - Holders calculation (full decks, suits, jokers)
 * - Signature validation for wallet ownership
 */

import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import intersect from "just-intersect";
import memoizee from "memoizee";
import * as crypto from "crypto";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as T from "io-ts";

import { Content, Listing, Nft } from "../models";
import { openSeaClient } from "../lib/OpenSeaClient";
import { logger } from "../lib/appLogger";
import { CardSuits } from "../enums";

const { NEXT_PUBLIC_SIGNATURE_MESSAGE: signatureMessage } = process.env;

// io-ts validators for OpenSea responses
const NftType = T.interface({
  identifier: T.string,
  contract: T.string,
  token_standard: T.string,
  name: T.string,
  description: T.string,
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
  <ApplicationType = unknown, EncodeTo = ApplicationType, DecodeFrom = unknown>(
    codec: T.Type<ApplicationType, EncodeTo, DecodeFrom>
  ) =>
  (input: DecodeFrom): ApplicationType =>
    pipe(
      codec.decode(input),
      E.getOrElseW((errors) => {
        console.log(errors[0]);
        throw new Error("Validation Error");
      })
    );

type CardSuitsType =
  | CardSuits.s
  | CardSuits.c
  | CardSuits.h
  | CardSuits.d
  | CardSuits.r
  | CardSuits.b;

interface QueueEntry {
  key: "queue";
  data: { contract: string; name: string; hash: string | null };
}

interface HoldersResult {
  fullDecks: string[];
  fullDecksWithJokers: string[];
  spades: string[];
  diamonds: string[];
  clubs: string[];
  hearts: string[];
  jokers: string[];
}

export class OpenSeaService {
  private cachedAssets: Record<string, GQL.Nft[]> = {};

  /**
   * Validate a wallet signature
   */
  signatureValid(address: string, signature: string): boolean {
    return (
      address.toLowerCase() ===
      recoverPersonalSignature({
        data: signatureMessage,
        signature,
      }).toLowerCase()
    );
  }

  /**
   * Get cached assets with background refresh
   */
  private getCachedAssets = memoizee<(contract: string) => Promise<GQL.Nft[]>>(
    async (contract) => {
      if (!this.cachedAssets[contract]) {
        const assets = await Nft.find({ contract }).lean();
        this.cachedAssets[contract] = assets;
        return assets;
      }

      // Background refresh
      Nft.find({ contract })
        .lean()
        .then((assets) => (this.cachedAssets[contract] = assets));

      return this.cachedAssets[contract];
    },
    {
      length: 1,
      primitive: true,
      maxAge: 1000 * 30,
      preFetch: true,
    }
  );

  /**
   * Get assets for a contract, optionally filtered by owner address
   * In development, returns mock data
   */
  getAssets = memoizee<
    (contract: string, name: string, ownerAddress?: string) => Promise<GQL.Nft[]>
  >(
    process.env.NODE_ENV === "development"
      ? async (_address, contract) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          return require(`../../mocks/${contract}.json`) as GQL.Nft[];
        }
      : async (contract, name, ownerAddress) => {
          if (process.env.ALLOW_ASSETS_FETCH === "true") {
            await this.enqueueAssetFetch(contract, name);
          }

          if (ownerAddress) {
            return this.getCachedAssets(contract).then((assets) =>
              assets.filter(
                (asset) =>
                  asset.owners.findIndex(
                    ({ address }) => address === ownerAddress
                  ) !== -1
              )
            );
          }

          return this.getCachedAssets(contract);
        },
    {
      maxAge: 1000 * 1,
    }
  );

  /**
   * Queue asset fetch if not already queued
   */
  private async enqueueAssetFetch(
    contract: string,
    name: string
  ): Promise<void> {
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
      this.processAssetQueue(newHash);
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

  /**
   * Process the asset fetch queue
   */
  async processAssetQueue(hash: string): Promise<void> {
    const contractObject = (await Content.findOne({
      "data.hash": { $ne: null },
    })) as unknown as QueueEntry;

    if (contractObject.data.hash !== hash) {
      return;
    }

    // Fetch and store listings
    const listings = await openSeaClient.getAllCollectionListings(
      contractObject.data.name
    );

    await Listing.deleteMany({
      "protocol_data.parameters.offer.token": contractObject.data.contract,
    });

    await Listing.insertMany(listings);
    console.log("done with listings");

    // Fetch NFTs with owners
    await this.fetchAndStoreNfts(contractObject);
  }

  /**
   * Fetch NFTs and store them, with progress tracking
   */
  private async fetchAndStoreNfts(contractObject: QueueEntry): Promise<void> {
    const { contract, name, hash } = contractObject.data;

    const processNfts = async (
      next?: string,
      index = 0,
      restartCount = 0
    ): Promise<void> => {
      try {
        const response = await openSeaClient.getCollectionNfts(name, { next });

        decodeWith(NftsType)(response.nfts);
        console.log("Fetched Assets: " + (index + response.nfts.length));

        const newNfts: GQL.Nft[] = [];

        if (index === 0) {
          await Content.deleteMany({
            "data.hash": { $nin: [hash, null] },
          });
        }

        // Fetch full details for each NFT
        for (const nft of response.nfts) {
          const fullNft = await this.fetchNftWithRetry(contract, nft.identifier);
          if (fullNft) {
            newNfts.push(fullNft);
          }
        }

        // Store NFTs
        await Nft.deleteMany({
          $or: newNfts.map(({ identifier, contract: c }) => ({
            identifier,
            contract: c,
          })),
        });

        await Nft.insertMany(newNfts);

        // Trigger revalidation (delegated to caller via callback if needed)
        this.triggerRevalidation(contract, newNfts);

        if (!response.next) {
          console.log("Updated assets for contract: " + contract);
          await Content.deleteMany({
            "data.name": name,
            "data.contract": contract,
          });
          return;
        }

        return processNfts(response.next, index + response.nfts.length);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        const isThrottled =
          errorMessage.includes("Request was throttled") ||
          errorMessage.includes("429");

        if (!isThrottled) {
          logger.error("Failed to get OpenSea Assets", error, { restartCount });
        }

        if (restartCount >= 10) {
          logger.warn(
            "OpenSea asset fetch: Restarted more than 10 times, dropping queue"
          );
          await Content.deleteMany({ key: "queue" });
          return;
        }

        await this.delay(3000);
        return processNfts(next, index, restartCount + 1);
      }
    };

    await processNfts();
  }

  /**
   * Fetch a single NFT with retry logic
   */
  private async fetchNftWithRetry(
    contract: string,
    identifier: string,
    restartCount = 0
  ): Promise<GQL.Nft | undefined> {
    try {
      const nft = await openSeaClient.getNft(contract, identifier);
      decodeWith(NftType)(nft);
      return nft as unknown as GQL.Nft;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (!errorMessage.includes("Request was throttled")) {
        if (restartCount >= 10) {
          logger.warn(
            "OpenSea NFT fetch: Restarted more than 10 times, dropping queue"
          );
          await Content.deleteMany({ key: "queue" });
          return undefined;
        }
      }

      await this.delay(3000);
      return this.fetchNftWithRetry(contract, identifier, restartCount + 1);
    }
  }

  /**
   * Trigger page revalidation after NFT updates
   */
  private triggerRevalidation(contract: string, nfts: GQL.Nft[]): void {
    // This is a fire-and-forget operation
    // In a future refactor, this could be moved to a separate service
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.URL;

    // Revalidation is handled by the calling code that has access to deck/card info
    // This method is a placeholder for the revalidation logic
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Calculate holder statistics for a deck
   */
  async calculateHolders(
    getContract: (params: { deck: string }) => Promise<GQL.Contract>,
    deckId: string
  ): Promise<HoldersResult | undefined> {
    const contract = await getContract({ deck: deckId });

    if (!contract) {
      return undefined;
    }

    const assets = await this.getAssets(contract.address, contract.name);

    // Build holders map: address -> cards owned
    const holders = this.buildHoldersMap(assets);

    // Calculate deck holders
    const deckHolders = this.calculateDeckHolders(holders);

    // Calculate suit holders
    const suitHolders = this.calculateSuitHolders(holders);

    return {
      jokers: intersect(suitHolders.black, suitHolders.red),
      ...deckHolders,
      ...suitHolders,
    };
  }

  /**
   * Build a map of addresses to their held cards
   */
  private buildHoldersMap(
    assets: GQL.Nft[]
  ): Record<string, { suit: CardSuitsType; value: string; tokens: string[] }[]> {
    const assetsWithOwners = assets.filter(
      (asset) => !!asset.owners
    ) as unknown as (Omit<GQL.Nft, "owner"> & GQL.Nft["owners"])[];

    return assetsWithOwners.reduce<
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
  }

  /**
   * Calculate full deck holders
   */
  private calculateDeckHolders(
    holders: Record<
      string,
      { suit: CardSuitsType; value: string; tokens: string[] }[]
    >
  ): { fullDecks: string[]; fullDecksWithJokers: string[] } {
    return Object.entries(holders).reduce<{
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
  }

  /**
   * Calculate suit holders (owners of complete suits)
   */
  private calculateSuitHolders(
    holders: Record<
      string,
      { suit: CardSuitsType; value: string; tokens: string[] }[]
    >
  ): Record<CardSuitsType, string[]> {
    return Object.entries(holders).reduce<Record<CardSuitsType, string[]>>(
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
          diamonds: [
            ...data.diamonds,
            ...(suits.diamonds === 13 ? [owner] : []),
          ],
          clubs: [...data.clubs, ...(suits.clubs === 13 ? [owner] : [])],
          hearts: [...data.hearts, ...(suits.hearts === 13 ? [owner] : [])],
          red: [...data.red, ...(suits.red === 1 ? [owner] : [])],
          black: [...data.black, ...(suits.black === 1 ? [owner] : [])],
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
  }

  /**
   * Associate an NFT with its corresponding card
   */
  async setCardOnAsset(
    asset: GQL.Nft & { on_sale: boolean },
    getContract: (params: { address: string }) => Promise<GQL.Contract | null>,
    getCardByTraits: (params: {
      deck: string;
      suit: string;
      value: string;
    }) => Promise<GQL.Card | undefined>
  ): Promise<(GQL.Nft & { on_sale: boolean; card?: GQL.Card | null }) | GQL.Nft> {
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

    // Contract ID should be passed as lowercase
    const contract = await getContract({
      address: asset.contract.toLowerCase(),
    });

    if (!contract) {
      return asset;
    }

    const card = await getCardByTraits({
      deck: contract.deck._id.toString(),
      suit: suitTrait.value.toLowerCase(),
      value: valueTrait.value.toLowerCase(),
    }).catch(() => null);

    return { ...asset, card };
  }
}

// Export singleton instance
export const openSeaService = new OpenSeaService();
