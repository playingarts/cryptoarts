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
 * Card for deck page listing and card page navigation
 * Includes fields used by Card component, CardList, and Hero section
 * This data is cached when viewing the deck, enabling instant card-to-card navigation
 */
export const CardForDeckFragment = gql`
  fragment CardForDeckFragment on Card {
    _id
    img
    video
    value
    suit
    info
    background
    cardBackground
    edition
    mainPhoto
    additionalPhotos
    artist {
      name
      slug
      userpic
      country
      info
      social {
        website
        instagram
        facebook
        twitter
        behance
        dribbble
        foundation
      }
    }
  }
`;

/**
 * Lightweight card fragment for popup display
 * Only includes fields needed for popup: image, video, background, edition, artist name/country
 */
export const CardPopFragment = gql`
  fragment CardPopFragment on Card {
    _id
    img
    video
    background
    cardBackground
    edition
    artist {
      name
      slug
      country
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
    mainPhoto
    additionalPhotos
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
