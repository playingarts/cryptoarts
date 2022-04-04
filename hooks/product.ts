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
      price
      image
      image2
      deck {
        _id
        slug
        openseaContract
        openseaCollection
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
  const { data: { products } = { products: undefined }, ...methods } = useQuery(
    ProductsQuery,
    options
  );

  return { ...methods, products };
};

export const useConvertEurToUsd = (
  options: QueryHookOptions<Pick<GQL.Query, "convertEurToUsd">> = {}
) => {
  const {
    data: { convertEurToUsd: usd } = { convertEurToUsd: undefined },
    ...methods
  } = useQuery(ConvertEurToUsdQuery, options);

  return {
    ...methods,
    usd,
  };
};
