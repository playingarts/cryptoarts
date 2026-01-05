/**
 * @jest-environment node
 */

/**
 * Integration tests for card-related GraphQL queries
 *
 * Tests that the GraphQL queries and fragments are correctly structured.
 */

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { CardsQuery, CardQuery } from "../../hooks/card";

// Minimal schema for testing
const typeDefs = `
  type Query {
    cards(deck: ID, losers: Boolean, edition: String): [Card!]!
    card(id: ID, slug: String, deckSlug: String): Card
  }

  type Card {
    _id: ID!
    img: String
    video: String
    info: String
    background: String
    cardBackground: String
    value: String
    suit: String
    edition: String
    erc1155: ERC1155
    price: Float
    animator: Artist
    artist: Artist
  }

  type ERC1155 {
    contractAddress: String
    token_id: String
  }

  type Artist {
    name: String
    userpic: String
    info: String
    country: String
    website: String
    slug: String
    podcast: Podcast
    social: Socials
  }

  type Podcast {
    image: String
    youtube: String
    spotify: String
    apple: String
    episode: Int
  }

  type Socials {
    website: String
    instagram: String
    facebook: String
    twitter: String
    behance: String
    dribbble: String
    foundation: String
    superrare: String
    makersplace: String
    knownorigin: String
    rarible: String
    niftygateway: String
    showtime: String
  }
`;

const mockArtist = {
  name: "Test Artist",
  slug: "test-artist",
  userpic: "/artists/test.jpg",
  info: "Artist bio",
  country: "US",
  website: "https://example.com",
  podcast: null,
  social: {
    website: "https://example.com",
    instagram: "@testartist",
    facebook: null,
    twitter: null,
    behance: null,
    dribbble: null,
    foundation: null,
    superrare: null,
    makersplace: null,
    knownorigin: null,
    rarible: null,
    niftygateway: null,
    showtime: null,
  },
};

const mockCard = {
  _id: "card-1",
  img: "/cards/ace-spades.jpg",
  video: null,
  info: "Ace of Spades",
  background: "#1a1a1a",
  cardBackground: "#000000",
  value: "A",
  suit: "spades",
  edition: "first",
  erc1155: {
    contractAddress: "0xabc",
    token_id: "1",
  },
  price: 0.5,
  animator: null,
  artist: mockArtist,
};

const resolvers = {
  Query: {
    cards: () => [mockCard],
    card: (
      _: unknown,
      { id, slug, deckSlug }: { id?: string; slug?: string; deckSlug?: string }
    ) => {
      if (id === "card-1") return mockCard;
      if (slug === "test-artist" && deckSlug === "crypto") return mockCard;
      return null;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const createTestClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
  });
};

describe("Card GraphQL Queries Integration", () => {
  let client: ApolloClient<unknown>;

  beforeEach(() => {
    client = createTestClient();
  });

  describe("CardsQuery", () => {
    it("should fetch cards for a deck", async () => {
      const result = await client.query({
        query: CardsQuery,
        variables: { deck: "deck-1" },
      });

      expect(result.data.cards).toHaveLength(1);
      expect(result.data.cards[0]._id).toBe("card-1");
      expect(result.data.cards[0].value).toBe("A");
      expect(result.data.cards[0].suit).toBe("spades");
    });

    it("should include artist data with cards", async () => {
      const result = await client.query({
        query: CardsQuery,
        variables: { deck: "deck-1" },
      });

      const card = result.data.cards[0];
      expect(card.artist?.name).toBe("Test Artist");
      expect(card.artist?.slug).toBe("test-artist");
    });

    it("should include ERC1155 data", async () => {
      const result = await client.query({
        query: CardsQuery,
        variables: { deck: "deck-1" },
      });

      const card = result.data.cards[0];
      expect(card.erc1155?.contractAddress).toBe("0xabc");
      expect(card.erc1155?.token_id).toBe("1");
    });
  });

  describe("CardQuery", () => {
    it("should fetch a single card by id", async () => {
      const result = await client.query({
        query: CardQuery,
        variables: { id: "card-1" },
      });

      expect(result.data.card).not.toBeNull();
      expect(result.data.card._id).toBe("card-1");
      expect(result.data.card.value).toBe("A");
      expect(result.data.card.suit).toBe("spades");
    });

    it("should fetch a card by artist slug and deck slug", async () => {
      const result = await client.query({
        query: CardQuery,
        variables: { slug: "test-artist", deckSlug: "crypto" },
      });

      expect(result.data.card).not.toBeNull();
      expect(result.data.card.artist?.slug).toBe("test-artist");
    });

    it("should return null for non-existent card", async () => {
      const result = await client.query({
        query: CardQuery,
        variables: { id: "non-existent" },
      });

      expect(result.data.card).toBeNull();
    });

    it("should include artist social links", async () => {
      const result = await client.query({
        query: CardQuery,
        variables: { id: "card-1" },
      });

      const card = result.data.card;
      expect(card.artist?.social?.instagram).toBe("@testartist");
    });
  });
});
