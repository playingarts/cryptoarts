/**
 * @jest-environment node
 */

/**
 * Integration tests for deck-related GraphQL queries
 *
 * Tests that the GraphQL queries and fragments are correctly structured.
 */

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DecksQuery, DeckQuery, DeckDataFragment } from "../../hooks/deck";

// Minimal schema for testing
const typeDefs = `
  type Query {
    decks: [Deck!]!
    deck(slug: String!): Deck
  }

  type Deck {
    _id: ID!
    slug: String!
    title: String
    info: String
    intro: String
    cardBackground: String
    short: String
    image: String
    description: String
    backgroundImage: String
    properties: [String]
    labels: [String]
    openseaCollection: OpenseaCollection
    editions: [Edition]
    product: Product
  }

  type OpenseaCollection {
    name: String
    address: String
  }

  type Edition {
    img: String
    name: String
    url: String
  }

  type Product {
    _id: ID!
    image: String
    status: String
    price: Price
  }

  type Price {
    eur: Float
    usd: Float
  }
`;

const mockDeck = {
  _id: "deck-1",
  slug: "crypto",
  title: "Crypto",
  info: "Crypto deck info",
  intro: "Welcome to Crypto",
  cardBackground: "#000000",
  short: "CRYPTO",
  image: "/images/crypto.jpg",
  description: "Crypto deck description",
  backgroundImage: "/images/bg.jpg",
  properties: [],
  labels: ["nft"],
  openseaCollection: {
    name: "Playing Arts Crypto",
    address: "0x123",
  },
  editions: [
    {
      img: "/editions/1.jpg",
      name: "First Edition",
      url: "/editions/1",
    },
  ],
  product: null,
};

const resolvers = {
  Query: {
    decks: () => [mockDeck],
    deck: (_: unknown, { slug }: { slug: string }) =>
      slug === "crypto" ? mockDeck : null,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const createTestClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
};

// Type definitions for test query results
type DecksQueryResult = { decks: typeof mockDeck[] };
type DeckQueryResult = { deck: typeof mockDeck | null };

describe("Deck GraphQL Queries Integration", () => {
  let client: ApolloClient;

  beforeEach(() => {
    client = createTestClient();
  });

  describe("DecksQuery", () => {
    it("should fetch all decks with DeckDataFragment fields", async () => {
      const result = await client.query<DecksQueryResult>({
        query: DecksQuery,
      });

      expect(result.data!.decks).toHaveLength(1);
      expect(result.data!.decks[0].slug).toBe("crypto");
      expect(result.data!.decks[0].title).toBe("Crypto");
      expect(result.data!.decks[0].openseaCollection?.name).toBe(
        "Playing Arts Crypto"
      );
    });

    it("should include edition data", async () => {
      const result = await client.query<DecksQueryResult>({
        query: DecksQuery,
      });

      const deck = result.data!.decks[0];
      expect(deck.editions).toHaveLength(1);
      expect(deck.editions![0].name).toBe("First Edition");
    });
  });

  describe("DeckQuery", () => {
    it("should fetch a single deck by slug", async () => {
      const result = await client.query<DeckQueryResult>({
        query: DeckQuery,
        variables: { slug: "crypto" },
      });

      expect(result.data!.deck).not.toBeNull();
      expect(result.data!.deck!.slug).toBe("crypto");
      expect(result.data!.deck!.title).toBe("Crypto");
    });

    it("should return null for non-existent deck", async () => {
      const result = await client.query<DeckQueryResult>({
        query: DeckQuery,
        variables: { slug: "non-existent" },
      });

      expect(result.data!.deck).toBeNull();
    });
  });
});
