import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";

const CardsQuery = gql`
  query Cards($deck: ID) {
    cards(deck: $deck) {
      _id
      img
      video
      artist {
        name
      }
    }
  }
`;

const CardQuery = gql`
  query Card($id: ID!) {
    card(id: $id) {
      _id
      img
      video
      artist {
        name
      }
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

export const useCard = (
  options: QueryHookOptions<Pick<GQL.Query, "card">> = {}
) => {
  const [
    loadCard,
    { data: { card } = { card: undefined }, ...methods },
  ] = useLazyQuery(CardQuery, options);

  return { ...methods, loadCard, card };
};
