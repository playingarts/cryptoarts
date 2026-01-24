/**
 * GraphQL Resolvers
 *
 * Centralized exports for all GraphQL resolvers.
 * Each entity has its own resolvers file for better organization.
 * Resolvers are thin wrappers that delegate to services.
 */

export { resolvers as artistResolvers } from "./artist";
export { resolvers as cardResolvers } from "./card";
export { resolvers as deckResolvers } from "./deck";
export { resolvers as productResolvers } from "./product";
export { resolvers as openseaResolvers } from "./opensea";
export { resolvers as dealResolvers } from "./deal";
export { resolvers as contentResolvers } from "./content";
export { resolvers as podcastResolvers } from "./podcast";
export { resolvers as contractResolvers } from "./contract";
export { resolvers as loserResolvers } from "./loser";
export { resolvers as listingResolvers } from "./listing";
export { resolvers as ratingResolvers } from "./rating";

// Re-export all resolvers as an array for schema stitching
import { resolvers as artistResolvers } from "./artist";
import { resolvers as cardResolvers } from "./card";
import { resolvers as deckResolvers } from "./deck";
import { resolvers as productResolvers } from "./product";
import { resolvers as openseaResolvers } from "./opensea";
import { resolvers as dealResolvers } from "./deal";
import { resolvers as contentResolvers } from "./content";
import { resolvers as podcastResolvers } from "./podcast";
import { resolvers as contractResolvers } from "./contract";
import { resolvers as loserResolvers } from "./loser";
import { resolvers as listingResolvers } from "./listing";
import { resolvers as ratingResolvers } from "./rating";

export const allResolvers = [
  deckResolvers,
  artistResolvers,
  cardResolvers,
  productResolvers,
  openseaResolvers,
  dealResolvers,
  contentResolvers,
  podcastResolvers,
  contractResolvers,
  loserResolvers,
  listingResolvers,
  ratingResolvers,
].filter(Boolean) as GQL.Resolvers[];
