import { gql, QueryHookOptions, useQuery } from "@apollo/client";

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
      deck {
        _id
        slug
        labels
        short
        previewCards {
          _id
          img
          artist {
            _id
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
  options: QueryHookOptions<Pick<GQL.Query, "products">> = {}
) => {
  const { data: { products } = { products: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "products">
  >(ProductsQuery, options);

  return { ...methods, products };
};

export const useConvertEurToUsd = (
  options: QueryHookOptions<Pick<GQL.Query, "convertEurToUsd">> = {}
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
