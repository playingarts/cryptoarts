/**
 * GraphQL Type Definitions
 *
 * Centralized exports for all GraphQL type definitions.
 * Each entity has its own typeDefs file for better organization.
 */

export { typeDefs as artistTypeDefs } from "./artist";
export { typeDefs as cardTypeDefs } from "./card";
export { typeDefs as deckTypeDefs } from "./deck";
export { typeDefs as productTypeDefs } from "./product";
export { typeDefs as openseaTypeDefs } from "./opensea";
export { typeDefs as dealTypeDefs } from "./deal";
export { typeDefs as contentTypeDefs } from "./content";
export { typeDefs as podcastTypeDefs } from "./podcast";
export { typeDefs as contractTypeDefs } from "./contract";
export { typeDefs as loserTypeDefs } from "./loser";
export { typeDefs as listingTypeDefs } from "./listing";
export { typeDefs as ratingTypeDefs } from "./rating";

// Re-export all typeDefs as an array for schema stitching
import { typeDefs as artistTypeDefs } from "./artist";
import { typeDefs as cardTypeDefs } from "./card";
import { typeDefs as deckTypeDefs } from "./deck";
import { typeDefs as productTypeDefs } from "./product";
import { typeDefs as openseaTypeDefs } from "./opensea";
import { typeDefs as dealTypeDefs } from "./deal";
import { typeDefs as contentTypeDefs } from "./content";
import { typeDefs as podcastTypeDefs } from "./podcast";
import { typeDefs as contractTypeDefs } from "./contract";
import { typeDefs as loserTypeDefs } from "./loser";
import { typeDefs as listingTypeDefs } from "./listing";
import { typeDefs as ratingTypeDefs } from "./rating";

export const allTypeDefs = [
  deckTypeDefs,
  artistTypeDefs,
  cardTypeDefs,
  productTypeDefs,
  openseaTypeDefs,
  dealTypeDefs,
  contentTypeDefs,
  podcastTypeDefs,
  contractTypeDefs,
  loserTypeDefs,
  listingTypeDefs,
  ratingTypeDefs,
];
