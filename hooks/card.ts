import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const CardsQuery = gql`
  query Cards($deck: ID) {
    cards(deck: $deck) {
      img
    }
  }
`;

export const useCards = (
  options: QueryHookOptions<Pick<GQL.Query, "cards">> = {}
) => {
  const { data: { cards } = { cards: undefined }, ...methods } = useQuery(
    CardsQuery,
    options
  );

  return { ...methods, cards };
};
