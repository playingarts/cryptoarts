/**
 * GraphQL Fragments
 *
 * Reusable field selections for GraphQL queries.
 * Use fragments to reduce query duplication and ensure consistency.
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
  CardForDeckFragment,
  CardPopFragment,
  CardFragment,
} from "./card";

export {
  DeckNavFragment,
  DeckBasicFragment,
  DeckDataFragment,
} from "./deck";

export {
  PriceFragment,
  ProductBasicFragment,
  ProductWithDeckFragment,
  ProductFragment,
} from "./product";
