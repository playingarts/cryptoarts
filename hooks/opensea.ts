import { gql } from "@apollo/client";
import { QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client/react";
import { useEffect } from "react";
import { useSignature } from "../contexts/SignatureContext";
import { useLoadDeck } from "./deck";

export const OpenseaQuery = gql`
  query Opensea($deck: ID, $slug: String) {
    opensea(deck: $deck, slug: $slug) {
      id
      volume
      floor_price
      num_owners
      total_supply
      on_sale
      sales_count
      average_price
      updatedAt
      last_sale {
        price
        symbol
        seller
        buyer
        nft_name
        nft_image
        timestamp
      }
    }
  }
`;

export const HoldersQuery = gql`
  query Holders($deck: ID, $slug: String) {
    holders(deck: $deck, slug: $slug) {
      fullDecks
      fullDecksWithJokers
      spades
      clubs
      hearts
      diamonds
      jokers
    }
  }
`;

export const OwnedAssetsQuery = gql`
  query OwnedAssets($deck: ID!, $address: String!, $signature: String!) {
    ownedAssets(deck: $deck, address: $address, signature: $signature) {
      traits {
        trait_type
        value
      }
      identifier
    }
  }
`;

export const LeaderboardQuery = gql`
  query Leaderboard($slug: String) {
    leaderboard(slug: $slug) {
      topHolders {
        address
        count
        username
        profileImage
      }
      activeTraders {
        address
        count
        username
        profileImage
      }
      rareHolders {
        address
        count
        username
        profileImage
      }
    }
  }
`;

export const useOpensea = (
  options: QueryHookOptions<Pick<GQL.Query, "opensea">> = {}
) => {
  const { data, ...methods } = useQuery<Pick<GQL.Query, "opensea">>(
    OpenseaQuery,
    options
  );

  return { ...methods, opensea: data?.opensea };
};

export const useHolders = (
  options: QueryHookOptions<Pick<GQL.Query, "holders">> = {}
) => {
  const { data, ...methods } = useQuery<Pick<GQL.Query, "holders">>(
    HoldersQuery,
    options
  );

  return { ...methods, holders: data?.holders };
};

export const useLeaderboard = (
  options: QueryHookOptions<Pick<GQL.Query, "leaderboard">> = {}
) => {
  const { data, ...methods } = useQuery<Pick<GQL.Query, "leaderboard">>(
    LeaderboardQuery,
    options
  );

  return { ...methods, leaderboard: data?.leaderboard };
};

export const useLoadOwnedAssets = (
  options: QueryHookOptions<Pick<GQL.Query, "ownedAssets">> = {}
) => {
  const [loadOwnedAssets, { data, ...methods }] = useLazyQuery<
    Pick<GQL.Query, "ownedAssets">
  >(OwnedAssetsQuery, options);

  return { loadOwnedAssets, ...methods, ownedAssets: data?.ownedAssets };
};

export const useOwnedAssets = (slug?: string) => {
  const { ownedAssets, loadOwnedAssets } = useLoadOwnedAssets();

  const { deck, loadDeck } = useLoadDeck();

  const { getSig } = useSignature();

  useEffect(() => {
    if (slug) {
      loadDeck({ variables: { slug } });
    }
  }, [slug, loadDeck]);

  useEffect(() => {
    if (!deck) {
      return;
    }

    const currentSig = getSig();

    if (!currentSig || !currentSig.signature || !currentSig.account) {
      return;
    }

    const { account: signedAccount, signature } = currentSig;

    loadOwnedAssets({
      variables: {
        deck: deck._id,
        address: signedAccount,
        signature,
      },
    });
  }, [deck, getSig, loadOwnedAssets]);

  return ownedAssets;
};
