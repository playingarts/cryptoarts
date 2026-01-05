/**
 * GraphQL Fragments
 *
 * Reusable field selections for GraphQL queries.
 * Use fragments to reduce query duplication.
 */

export {
  SocialFragment,
  PodcastFragment,
  ArtistBasicFragment,
  ArtistFragment,
} from "./artist";

export {
  ERC1155Fragment,
  CardBasicFragment,
  CardWithSlugsFragment,
  CardFragment,
} from "./card";

// Re-export deck fragment from hooks/deck.ts for consistency
export { DeckDataFragment } from "../deck";
