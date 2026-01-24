import { gql } from "@apollo/client";

import { useQuery } from "@apollo/client/react";
import { ProductWithDeckFragment } from "./fragments";

export const ProductsQuery = gql`
  ${ProductWithDeckFragment}

  query Products($ids: [ID!]) {
    products(ids: $ids) {
      ...ProductWithDeckFragment
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
