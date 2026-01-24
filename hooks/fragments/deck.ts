import { gql } from "@apollo/client";

/**
 * Lightweight deck fragment for navigation (only slug needed)
 */
export const DeckNavFragment = gql`
  fragment DeckNavFragment on Deck {
    _id
    slug
  }
`;

/**
 * Basic deck info for lists and references
 */
export const DeckBasicFragment = gql`
  fragment DeckBasicFragment on Deck {
    _id
    slug
    title
    short
    image
  }
`;

/**
 * Full deck data fragment with all fields
 */
export const DeckDataFragment = gql`
  fragment DeckDataFragment on Deck {
    _id
    slug
    info
    intro
    title
    cardBackground
    short
    image
    description
    backgroundImage
    properties
    labels
    openseaCollection {
      name
      address
    }
    editions {
      img
      name
      url
    }
    product {
      _id
      short
      image
      status
      price {
        eur
        usd
      }
    }
  }
`;
