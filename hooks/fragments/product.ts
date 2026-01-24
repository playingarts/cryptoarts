import { gql } from "@apollo/client";

/**
 * Price fragment for consistent pricing fields
 */
export const PriceFragment = gql`
  fragment PriceFragment on Price {
    eur
    usd
  }
`;

/**
 * Basic product info for lists and cards
 */
export const ProductBasicFragment = gql`
  fragment ProductBasicFragment on Product {
    _id
    title
    short
    status
    type
    image
    price {
      eur
      usd
    }
  }
`;

/**
 * Product with deck preview (for shop pages)
 */
export const ProductWithDeckFragment = gql`
  fragment ProductWithDeckFragment on Product {
    _id
    title
    short
    info
    status
    type
    labels
    description
    fullPrice {
      usd
      eur
    }
    price {
      eur
      usd
    }
    image
    image2
    photos
    cardGalleryPhotos
    decks {
      _id
    }
    deck {
      _id
      slug
      labels
      short
      info
      previewCards {
        _id
        img
        artist {
          _id
          name
          slug
        }
      }
      openseaCollection {
        name
        address
      }
    }
  }
`;

/**
 * Full product fragment with all fields
 */
export const ProductFragment = gql`
  fragment ProductFragment on Product {
    _id
    title
    short
    info
    status
    type
    labels
    description
    fullPrice {
      usd
      eur
    }
    price {
      eur
      usd
    }
    image
    image2
    photos
    cardGalleryPhotos
    decks {
      _id
    }
    deck {
      _id
      slug
      labels
      short
      info
      previewCards {
        _id
        img
        artist {
          _id
          name
          slug
        }
      }
      openseaCollection {
        name
        address
      }
    }
  }
`;
