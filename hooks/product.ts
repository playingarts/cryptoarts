import { gql } from "@apollo/client";

import { useQuery } from "@apollo/client/react";

export const ProductsQuery = gql`
  query Products($ids: [ID!]) {
    products(ids: $ids) {
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
  }
`;

export const ConvertEurToUsdQuery = gql`
  query ConvertEurToUsd($eur: Float!) {
    convertEurToUsd(eur: $eur)
  }
`;

export const useProducts = (
  options: useQuery.Options<Pick<GQL.Query, "products">> = {}
) => {
  const { data: { products } = { products: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "products">
  >(ProductsQuery, {
    // Cache products to avoid refetching on navigation - data rarely changes
    fetchPolicy: "cache-first",
    ...options,
  });

  return { ...methods, products };
};

export const useConvertEurToUsd = (
  options: useQuery.Options<Pick<GQL.Query, "convertEurToUsd">> = {}
) => {
  const {
    data: { convertEurToUsd: usd } = { convertEurToUsd: undefined },
    ...methods
  } = useQuery<Pick<GQL.Query, "convertEurToUsd">>(
    ConvertEurToUsdQuery,
    options
  );

  return {
    ...methods,
    usd,
  };
};
