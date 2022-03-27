import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";

export const CardsQuery = gql`
  query Cards($deck: ID) {
    cards(deck: $deck) {
      _id
      img
      video
      info
      background
      opensea
      artist {
        name
        userpic
        info
        country
        website
        slug
        social {
          website
          instagram
          facebook
          twitter
          behance
          dribbble
          foundation
          superrare
          makersplace
          knownorigin
          rarible
          niftygateway
          showtime
        }
      }
    }
  }
`;

export const RandomCardsQuery = gql`
  query RandomCards($deck: ID, $limit: Int) {
    cards(deck: $deck, limit: $limit, shuffle: true) {
      _id
      img
      video
    }
  }
`;

export const CardQuery = gql`
  query Card($id: ID!) {
    card(id: $id) {
      _id
      price
    }
  }
`;

const DailyCardQuery = gql`
  query DailyCard {
    dailyCard {
      _id
      img
      video
      info
      background
      artist {
        name
      }
      deck {
        slug
        title
        cardBackground
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

export const useLoadRandomCards = (
  options: QueryHookOptions<Pick<GQL.Query, "cards">> = {}
) => {
  const [
    loadRandomCards,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery(RandomCardsQuery, options);

  return { loadRandomCards, ...methods, cards };
};

export const useDailyCard = (
  options: QueryHookOptions<Pick<GQL.Query, "dailyCard">> = {}
) => {
  const {
    data: { dailyCard } = { dailyCard: undefined },
    ...methods
  } = useQuery(DailyCardQuery, options);

  return { ...methods, dailyCard };
};
