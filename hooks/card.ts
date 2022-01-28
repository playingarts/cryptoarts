import { gql, QueryHookOptions, useLazyQuery } from "@apollo/client";

const CardsQuery = gql`
  query Cards($deck: ID) {
    cards(deck: $deck) {
      _id
      img
      video
      info
      artist {
        name
        userpic
        info
        social {
          facebook
        }
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
      info
      artist {
        name
        userpic
        info
        social {
          facebook
        }
      }
    }
  }
`;

export const useLoadCards = (
  options: QueryHookOptions<Pick<GQL.Query, "cards">> = {}
) => {
  const [
    loadCards,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery(CardsQuery, options);

  return { loadCards, ...methods, cards };
};

export const useLoadCard = (
  options: QueryHookOptions<Pick<GQL.Query, "card">> = {}
) => {
  const [
    loadCard,
    { data: { card } = { card: undefined }, ...methods },
  ] = useLazyQuery(CardQuery, options);

  return { ...methods, loadCard, card };
};
