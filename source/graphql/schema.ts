import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schemas";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
