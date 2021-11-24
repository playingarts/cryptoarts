import { gql } from "@apollo/client";

export const resolvers: GQL.Resolvers = {
  Query: {
    decks: () => [
      {
        id: "zero",
        title: "Edition Zero",
        slug: "zero",
        info:
          "Edition Zero was released in 2012 and marked the beginning of Playing Arts series. Now we are bringing it back, powering by beautiful animations in Augmented Reality from today’s leading motion designers.",
      },

      {
        id: "one",
        title: "Edition One",
        slug: "one",
        info:
          "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
      },

      {
        id: "two",
        title: "Edition Two",
        slug: "two",
        info:
          "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
      },

      {
        id: "three",
        title: "Edition Three",
        slug: "three",
        info:
          "From the two of clubs to the ace of spades, each card in this deck has been individually designed by one of the 55 selected international artists in their distinct style and technique.",
      },

      {
        id: "special",
        title: "Special Edition",
        slug: "special",
        info:
          "537 artists from 67 countries participated in design contest, showing their vision of the custom playing cards. Each contestant was asked to create an artwork for one particular card in their distinct style.",
      },

      {
        id: "future",
        title: "Future Edition",
        slug: "future",
        info:
          "299 international artists, designers and studios were using playing card as a canvas to illustrate their vision of what the world will look like 100 years from now. Selected artworks formed two Future Edition decks.",
      },

      {
        id: "crypto",
        title: "Crypto Edition",
        slug: "crypto",
        info:
          "A deck of playing cards featuring works of 55 leading artists. Unique digital art collectibles living on the Ethereum blockchain.",
      },
    ],
  },
};

export const typeDefs = gql`
  type Query {
    decks: [Deck!]!
  }

  type Deck {
    id: ID!
    title: String!
    info: String!
    slug: String!
  }
`;
