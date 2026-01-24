import { gql } from "@apollo/client";
import { Product, type MongoProduct } from "../../models";
import { productService } from "../../services";

export { Product, type MongoProduct };

// Re-export service method for backward compatibility
export const getProduct = async (
  options: Pick<MongoProduct, "deck"> | Pick<MongoProduct, "_id">
): Promise<GQL.Product | undefined> => {
  if ("deck" in options) {
    return productService.getProduct({ deck: options.deck as string });
  }
  const idOptions = options as Pick<MongoProduct, "_id">;
  return productService.getProduct({ id: idOptions._id as string });
};

export const resolvers: GQL.Resolvers = {
  Query: {
    products: (_, { ids }) => productService.getProducts(ids || undefined),
    convertEurToUsd: (_, { eur }) => productService.convertEurToUsd(eur),
  },
  Mutation: {
    updateProductPhotos: (_, { productId, photos }) =>
      productService.updateProductPhotos(productId, photos),
    updateProductCardGalleryPhotos: (_, { productId, cardGalleryPhotos }) =>
      productService.updateProductCardGalleryPhotos(productId, cardGalleryPhotos),
  },
};

export const typeDefs = gql`
  type Query {
    products(ids: [ID!]): [Product!]!
    convertEurToUsd(eur: Float!): Float
  }

  type Currencies {
    eur: Float!
    usd: Float!
  }

  type Product {
    _id: ID!
    deck: Deck
    decks: [Product!]
    labels: [String!]
    title: String!
    price: Currencies!
    fullPrice: Currencies
    status: String!
    type: String!
    image: String!
    image2: String!
    photos: [String!]
    cardGalleryPhotos: [String!]
    info: String
    description: String
    short: String!
  }

  type Mutation {
    updateProductPhotos(productId: ID!, photos: [String!]!): Product
    updateProductCardGalleryPhotos(productId: ID!, cardGalleryPhotos: [String!]!): Product
  }
`;
