import { gql, QueryHookOptions, useLazyQuery } from "@apollo/client";

export const DealQuery = gql`
  query Deal($hash: String!, $deckId: String!, $signature: String!) {
    deal(hash: $hash, deckId: $deckId, signature: $signature) {
      _id
      code
      hash
      decks
      deck {
        slug
      }
    }
  }
`;

export const useLoadDeal = (
  options: QueryHookOptions<Pick<GQL.Query, "deal">> = {}
) => {
  const [
    loadDeal,
    { data: { deal } = { deal: undefined }, ...methods },
  ] = useLazyQuery(DealQuery, options);

  return { ...methods, loadDeal, deal };
};
