import { gql } from "@apollo/client";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import {
  CardFragment,
  CardBasicFragment,
  CardWithSlugsFragment,
  ERC1155Fragment,
} from "./fragments";

export const CardsQuery = gql`
  ${CardFragment}

  query Cards($deck: ID, $losers: Boolean, $edition: String) {
    cards(deck: $deck, losers: $losers, edition: $edition) {
      ...CardFragment
    }
  }
`;

export const CardQuery = gql`
  ${CardFragment}

  query Card($id: ID, $slug: String, $deckSlug: String) {
    card(id: $id, slug: $slug, deckSlug: $deckSlug) {
      ...CardFragment
    }
  }
`;

export const RandomCardsQueryWithoutDeck = gql`
  query RandomCardsWithoutDeck($limit: Int) {
    cards(limit: $limit, shuffle: true, withoutDeck: ["crypto"]) {
      _id
      img
      video
      background
      deck {
        slug
      }
      artist {
        slug
      }
    }
  }
`;

export const RandomCardsQuery = gql`
  ${CardBasicFragment}

  query RandomCards($deck: ID, $limit: Int) {
    cards(deck: $deck, limit: $limit, shuffle: true) {
      ...CardBasicFragment
    }
  }
`;

export const RandomCardsWithInfoQuery = gql`
  ${CardWithSlugsFragment}

  query RandomCards($deck: ID, $limit: Int) {
    cards(deck: $deck, limit: $limit, shuffle: true) {
      ...CardWithSlugsFragment
    }
  }
`;

export const DailyCardQuery = gql`
  query DailyCard {
    dailyCard {
      _id
      img
      video
      info
      background
      artist {
        name
        slug
        country
        userpic
        info
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
      deck {
        slug
        title
        cardBackground
      }
    }
  }
`;

export const HeroCardsQuery = gql`
  ${ERC1155Fragment}

  query HeroCards($deck: ID, $slug: String) {
    heroCards(deck: $deck, slug: $slug) {
      _id
      img
      video
      info
      background
      value
      suit
      edition
      erc1155 {
        ...ERC1155Fragment
      }
      price
      deck {
        slug
      }
      artist {
        name
        userpic
        info
        country
        website
        slug
      }
    }
  }
`;

export const HomeCards = gql`
  query HomeCards {
    homeCards {
      _id
      img
      cardBackground
    }
  }
`;

export const useCard = (
  options: useQuery.Options<Pick<GQL.Query, "card">> = {}
) => {
  const { data: { card } = { card: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "card">
  >(CardQuery, options);

  return {
    ...methods,
    card,
  };
};

export const useCards = (
  options: useQuery.Options<Pick<GQL.Query, "cards">> = {}
) => {
  const { data: { cards } = { cards: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "cards">
  >(CardsQuery, options);

  return {
    ...methods,
    cards,
  };
};

export const useHomeCards = (
  options: useQuery.Options<Pick<GQL.Query, "homeCards">> = {}
) => {
  const { data: { homeCards: cards } = { cards: undefined }, ...methods } =
    useQuery<Pick<GQL.Query, "homeCards">>(HomeCards, options);

  return {
    ...methods,
    cards,
  };
};

export const useLoadCards = (
  options: useQuery.Options<Pick<GQL.Query, "cards">> = {}
) => {
  const [loadCards, { data: { cards } = { cards: undefined }, ...methods }] =
    useLazyQuery<Pick<GQL.Query, "cards">>(CardsQuery, options);

  return {
    loadCards,
    ...methods,
    cards,
  };
};

export const useLoadHeroCards = (
  options: useQuery.Options<Pick<GQL.Query, "heroCards">> = {}
) => {
  const [
    loadHeroCards,
    { data: { heroCards } = { heroCards: undefined }, ...methods },
  ] = useLazyQuery<Pick<GQL.Query, "heroCards">>(HeroCardsQuery, options);

  return {
    loadHeroCards,
    ...methods,
    heroCards,
  };
};

export const useHeroCards = (
  options: useQuery.Options<Pick<GQL.Query, "heroCards">> = {}
) => {
  const { data: { heroCards } = { heroCards: undefined }, ...methods } =
    useQuery<Pick<GQL.Query, "heroCards">>(HeroCardsQuery, options);

  return {
    ...methods,
    heroCards,
  };
};

export const useLoadCard = (
  options: useQuery.Options<Pick<GQL.Query, "card">> = {}
) => {
  const [loadCard, { data: { card } = { card: undefined }, ...methods }] =
    useLazyQuery<Pick<GQL.Query, "card">>(CardQuery, options);

  return { ...methods, loadCard, card };
};

export const useLoadRandomCards = (
  options: useQuery.Options<Pick<GQL.Query, "cards">> = {}
) => {
  const [
    loadRandomCards,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<Pick<GQL.Query, "cards">>(RandomCardsQuery, options);

  return { loadRandomCards, ...methods, cards };
};

export const useLoadRandomCardsWithInfo = (
  options: useQuery.Options<Pick<GQL.Query, "cards">> = {}
) => {
  const [
    loadRandomCardsWithInfo,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<Pick<GQL.Query, "cards">>(RandomCardsWithInfoQuery, options);

  return { loadRandomCardsWithInfo, ...methods, cards };
};
export const useLoadRandomCardsWithoutDeck = (
  options: useQuery.Options<Pick<GQL.Query, "cards">> = {}
) => {
  const [
    loadRandomCardsWithoutDeck,
    { data: { cards } = { cards: undefined }, ...methods },
  ] = useLazyQuery<Pick<GQL.Query, "cards">>(
    RandomCardsQueryWithoutDeck,
    options
  );

  return { loadRandomCardsWithoutDeck, ...methods, cards };
};

export const useRandomCardsWithoutDeck = (
  options: useQuery.Options<Pick<GQL.Query, "cards">> = {}
) => {
  const { data: { cards } = { randomCards: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "cards">
  >(RandomCardsQueryWithoutDeck, options);

  return {
    ...methods,
    cards,
  };
};

export const useDailyCard = (
  options: useQuery.Options<Pick<GQL.Query, "dailyCard">> = {}
) => {
  const { data: { dailyCard } = { dailyCard: undefined }, ...methods } =
    useQuery<Pick<GQL.Query, "dailyCard">>(DailyCardQuery, options);

  return { ...methods, dailyCard };
};
