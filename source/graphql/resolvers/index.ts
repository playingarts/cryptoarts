export const resolvers: GQL.Resolvers = {
  Query: {
    user: async (_, __, { req }) => {
      console.log("!!!!", !!req);
      return (req as any).user;
    },
  },
};
