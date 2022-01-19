import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const ProductsQuery = gql`
  query Products($ids: [ID!]) {
    products(ids: $ids) {
      _id
      title
      price
      image
    }
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
