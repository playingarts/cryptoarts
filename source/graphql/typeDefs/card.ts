import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    cards(
      withoutDeck: [ID!]
      deck: ID
      deckSlug: String
      shuffle: Boolean
      limit: Int
      losers: Boolean
      edition: String
    ): [Card!]!
    randomCards(shuffle: Boolean, limit: Int): [Card!]!
    card(id: ID, slug: String, deckSlug: String): Card
    cardByImg(img: ID!): Card
    cardsByIds(ids: [ID!]!): [Card!]!
    cardsByPaths(paths: [String!]!): [Card!]!
    heroCards(deck: ID, slug: String): [Card!]!
    homeCards: [Card!]!
  }

  type Mutation {
    updateCardPhotos(
      cardId: ID!
      mainPhoto: String
      additionalPhotos: [String!]
    ): Card
  }

  type Card {
    _id: ID!
    img: String!
    video: String
    artist: Artist!
    info: String
    deck: Deck!
    suit: String!
    value: String!
    background: String
    price: Float
    erc1155: ERC1155
    reversible: Boolean
    edition: String
    animator: Artist
    cardBackground: String
    mainPhoto: String
    additionalPhotos: [String!]
  }

  type ERC1155 {
    contractAddress: String!
    token_id: String!
  }
`;
