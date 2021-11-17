import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const UserQuery = gql`
  query User {
    user {
      id
      username
    }
  }
`;

const UserQuery2 = gql`
  query User {
    user {
      id
      name
    }
  }
`;

export const useUser = (
  options: QueryHookOptions<Pick<GQL.Query, "user">> = {}
) => {
  const { data: { user } = { user: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "user">
  >(UserQuery, options);

  return { ...methods, user };
};

export const useUser2 = (
  options: QueryHookOptions<Pick<GQL.Query, "user">> = {}
) => {
  const { data: { user } = { user: undefined }, ...methods } = useQuery<
    Pick<GQL.Query, "user">
  >(UserQuery2, options);

  return { ...methods, user };
};
