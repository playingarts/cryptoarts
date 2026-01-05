import { gql } from "@apollo/client";
import { ArtistFragment } from "./artist";

/**
 * ERC1155 token info fragment
 */
export const ERC1155Fragment = gql`
  fragment ERC1155Fragment on ERC1155 {
    contractAddress
    token_id
  }
`;

/**
 * Basic card fields (for minimal queries)
 */
export const CardBasicFragment = gql`
  fragment CardBasicFragment on Card {
    _id
    img
    video
  }
`;

/**
 * Card with deck and artist slugs (for navigation)
 */
export const CardWithSlugsFragment = gql`
  fragment CardWithSlugsFragment on Card {
    _id
    img
    video
    deck {
      slug
    }
    artist {
      slug
    }
  }
`;

/**
 * Full card fragment with all fields and artist details
 */
export const CardFragment = gql`
  ${ERC1155Fragment}
  ${ArtistFragment}

  fragment CardFragment on Card {
    _id
    img
    video
    info
    background
    cardBackground
    value
    suit
    edition
    erc1155 {
      ...ERC1155Fragment
    }
    price
    animator {
      ...ArtistFragment
    }
    artist {
      ...ArtistFragment
    }
  }
`;
