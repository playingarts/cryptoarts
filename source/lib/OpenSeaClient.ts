/**
 * OpenSea API Client
 *
 * Encapsulates all HTTP calls to OpenSea API.
 * Handles authentication, rate limiting, and error handling.
 */

import { logger, OpenSeaError } from "./appLogger";

const {
  OPENSEA_ASSETS_KEY = "",
  OPENSEA_KEY = "",
} = process.env;

const OPENSEA_BASE_URL = "https://api.opensea.io/api/v2";

interface OpenSeaClientConfig {
  assetsApiKey?: string;
  apiKey?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

interface FetchOptions {
  useAssetsKey?: boolean;
}

export interface OpenSeaCollectionStats {
  total: {
    volume: number;
    num_owners: number;
    floor_price: number;
    sales: number;
    average_price: number;
  };
}

export interface OpenSeaCollection {
  name: string;
  total_supply: string;
}

export interface OpenSeaNft {
  identifier: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  traits?: Array<{
    trait_type: string;
    value: string;
  }>;
  owners?: Array<{
    address: string;
    quantity: string;
  }>;
}

export interface OpenSeaListing {
  price: {
    current: {
      value: string;
    };
  };
  protocol_data: {
    parameters: {
      offer: Array<{
        token: string;
        identifierOrCriteria: string;
      }>;
    };
  };
}

export interface ListingsResponse {
  listings: OpenSeaListing[];
  next?: string;
}

export interface OpenSeaSaleEvent {
  event_type: "sale";
  event_timestamp: number;
  payment: {
    quantity: string;
    token_address: string;
    decimals: number;
    symbol: string;
  };
  seller: string;
  buyer: string;
  nft: {
    identifier: string;
    name: string;
    image_url: string;
    display_image_url: string;
  };
}

export interface EventsResponse {
  asset_events: OpenSeaSaleEvent[];
  next?: string;
}

export interface NftsResponse {
  nfts: OpenSeaNft[];
  next?: string;
}

export interface OpenSeaAccount {
  address: string;
  username: string;
  profile_image_url: string;
  banner_image_url: string;
  website: string;
  bio: string;
  joined_date: string;
}

export class OpenSeaClient {
  private assetsApiKey: string;
  private apiKey: string;
  private retryAttempts: number;
  private retryDelay: number;

  constructor(config: OpenSeaClientConfig = {}) {
    this.assetsApiKey = config.assetsApiKey || OPENSEA_ASSETS_KEY || OPENSEA_KEY;
    this.apiKey = config.apiKey || OPENSEA_KEY;
    this.retryAttempts = config.retryAttempts ?? 10;
    this.retryDelay = config.retryDelay ?? 3000;
  }

  /**
   * Make an authenticated request to OpenSea API
   */
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const url = `${OPENSEA_BASE_URL}${endpoint}`;
    const apiKey = options.useAssetsKey ? this.assetsApiKey : this.apiKey;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-KEY": apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new OpenSeaError(
        `OpenSea API error: ${response.status} - ${errorText}`,
        { metadata: { url, status: response.status } }
      );
    }

    return response.json();
  }

  /**
   * Make a request with retry logic for rate limiting
   */
  private async fetchWithRetry<T>(
    endpoint: string,
    options: FetchOptions = {},
    attempt = 0
  ): Promise<T> {
    try {
      return await this.fetch<T>(endpoint, options);
    } catch (error) {
      const isThrottled =
        error instanceof Error &&
        (error.message.includes("Request was throttled") ||
          error.message.includes("429"));

      if (attempt >= this.retryAttempts) {
        logger.error("OpenSea API: Max retries exceeded", error, {
          endpoint,
          attempt,
        });
        throw error;
      }

      if (isThrottled || attempt < this.retryAttempts) {
        logger.warn(`OpenSea API: Retry attempt ${attempt + 1}/${this.retryAttempts}`, {
          endpoint,
        });

        await this.delay(this.retryDelay);
        return this.fetchWithRetry<T>(endpoint, options, attempt + 1);
      }

      throw error;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get collection statistics
   */
  async getCollectionStats(collectionName: string): Promise<OpenSeaCollectionStats> {
    return this.fetch<OpenSeaCollectionStats>(
      `/collections/${collectionName}/stats`
    );
  }

  /**
   * Get collection info
   */
  async getCollection(collectionName: string): Promise<OpenSeaCollection> {
    return this.fetch<OpenSeaCollection>(`/collections/${collectionName}`);
  }

  /**
   * Get best listings for a collection
   */
  async getCollectionListings(
    collectionName: string,
    options: { limit?: number; next?: string } = {}
  ): Promise<ListingsResponse> {
    const { limit = 100, next } = options;
    const params = new URLSearchParams({ limit: limit.toString() });
    if (next) params.append("next", next);

    return this.fetch<ListingsResponse>(
      `/listings/collection/${collectionName}/best?${params}`,
      { useAssetsKey: true }
    );
  }

  /**
   * Get all listings for a collection (paginated)
   */
  async getAllCollectionListings(
    collectionName: string
  ): Promise<OpenSeaListing[]> {
    const allListings: OpenSeaListing[] = [];
    let nextCursor: string | undefined;

    do {
      const response = await this.getCollectionListings(collectionName, {
        next: nextCursor,
      });

      // Normalize token addresses to lowercase
      const normalizedListings = response.listings.map((listing) => ({
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
      }));

      allListings.push(...normalizedListings);
      nextCursor = response.next;
    } while (nextCursor);

    return allListings;
  }

  /**
   * Get count of unique NFTs listed for sale (not total listings)
   */
  async getUniqueListingsCount(collectionName: string): Promise<number> {
    const uniqueTokenIds = new Set<string>();
    let nextCursor: string | undefined;

    do {
      const response = await this.getCollectionListings(collectionName, {
        next: nextCursor,
      });

      for (const listing of response.listings) {
        const tokenId = listing.protocol_data?.parameters?.offer?.[0]?.identifierOrCriteria;
        if (tokenId) {
          uniqueTokenIds.add(tokenId);
        }
      }

      nextCursor = response.next;
    } while (nextCursor);

    return uniqueTokenIds.size;
  }

  /**
   * Get NFTs in a collection (paginated)
   */
  async getCollectionNfts(
    collectionName: string,
    options: { limit?: number; next?: string } = {}
  ): Promise<NftsResponse> {
    const { limit = 200, next } = options;
    const params = new URLSearchParams({ limit: limit.toString() });
    if (next) params.append("next", next);

    return this.fetchWithRetry<NftsResponse>(
      `/collection/${collectionName}/nfts?${params}`,
      { useAssetsKey: true }
    );
  }

  /**
   * Get a single NFT by contract and identifier
   */
  async getNft(
    contractAddress: string,
    tokenId: string
  ): Promise<OpenSeaNft> {
    const response = await this.fetchWithRetry<{ nft: OpenSeaNft }>(
      `/chain/ethereum/contract/${contractAddress}/nfts/${tokenId}`,
      { useAssetsKey: true }
    );
    return response.nft;
  }

  /**
   * Get recent sale events for a collection
   */
  async getCollectionEvents(
    collectionName: string,
    options: { limit?: number; eventType?: string } = {}
  ): Promise<EventsResponse> {
    const { limit = 50, eventType = "sale" } = options;
    const params = new URLSearchParams({
      limit: limit.toString(),
      event_type: eventType,
    });

    return this.fetch<EventsResponse>(
      `/events/collection/${collectionName}?${params}`
    );
  }

  /**
   * Get the most recent sale event
   */
  async getLastSale(collectionName: string): Promise<OpenSeaSaleEvent | null> {
    const response = await this.getCollectionEvents(collectionName, { limit: 1 });
    return response.asset_events[0] || null;
  }

  /**
   * Get account profile by address
   */
  async getAccount(address: string): Promise<OpenSeaAccount | null> {
    try {
      return await this.fetch<OpenSeaAccount>(`/accounts/${address}`);
    } catch {
      return null;
    }
  }

  /**
   * Get all NFTs in a collection with full details
   * This fetches the list then enriches each NFT with owner info
   */
  async getAllCollectionNftsWithOwners(
    collectionName: string,
    contractAddress: string,
    onProgress?: (count: number) => void
  ): Promise<OpenSeaNft[]> {
    const allNfts: OpenSeaNft[] = [];
    let nextCursor: string | undefined;
    let totalFetched = 0;

    do {
      const response = await this.getCollectionNfts(collectionName, {
        next: nextCursor,
      });

      // Fetch full details (including owners) for each NFT
      for (const nft of response.nfts) {
        const fullNft = await this.getNft(contractAddress, nft.identifier);
        allNfts.push(fullNft);
        totalFetched++;

        if (onProgress) {
          onProgress(totalFetched);
        }
      }

      nextCursor = response.next;
    } while (nextCursor);

    return allNfts;
  }
}

// Export singleton instance
export const openSeaClient = new OpenSeaClient();
