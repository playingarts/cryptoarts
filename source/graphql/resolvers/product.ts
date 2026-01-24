/**
 * Product Resolvers
 *
 * Thin resolvers that delegate to ProductService.
 */

import { productService } from "../../services";

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
