import { gql, QueryHookOptions, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSignature } from "../contexts/SignatureContext";
import { useLoadDeck } from "./deck";

export const OpenseaQuery = gql`
  query Opensea($deck: ID!) {
    opensea(deck: $deck) {
      id
      volume
      floor_price
      num_owners
      total_supply
      on_sale
    }
  }
`;

export const HoldersQuery = gql`
  query Holders($deck: ID!) {
    holders(deck: $deck) {
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

export const useOpensea = (
  options: QueryHookOptions<Pick<GQL.Query, "opensea">> = {}
) => {
  const { data: { opensea } = { opensea: undefined }, ...methods } = useQuery(
    OpenseaQuery,
    options
  );

  return { ...methods, opensea };
};

export const useHolders = (
  options: QueryHookOptions<Pick<GQL.Query, "holders">> = {}
) => {
  const { data: { holders } = { holders: undefined }, ...methods } = useQuery(
    HoldersQuery,
    options
  );

  return { ...methods, holders };
};

export const useLoadOwnedAssets = (
  options: QueryHookOptions<Pick<GQL.Query, "ownedAssets">> = {}
) => {
  const [
    loadOwnedAssets,
    { data: { ownedAssets } = { ownedAssets: undefined }, ...methods },
  ] = useLazyQuery(OwnedAssetsQuery, options);

  return { loadOwnedAssets, ...methods, ownedAssets };
};

export const useOwnedAssets = (slug?: string) => {
  const { ownedAssets, loadOwnedAssets } = useLoadOwnedAssets();

  const { deck, loadDeck } = useLoadDeck();

  const { getSig } = useSignature();

  useEffect(() => {
    if (slug) {
      loadDeck({ variables: { slug } });
    }
  }, [slug]);

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
