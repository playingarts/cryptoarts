import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    losersValues(deck: ID!): [Loser!]!
    losers(deck: ID!): [Loser!]!
  }

  type Loser {
    _id: ID
    img: String
    video: String
    artist: LoserArtist!
    info: String
    deck: Deck
    suit: String
    value: String
    background: String
    price: Float
    erc1155: ERC1155
    reversible: Boolean
  }
`;
