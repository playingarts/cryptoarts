/**
 * GraphQL Schema
 *
 * Combines all typeDefs and resolvers using schema stitching.
 * TypeDefs and resolvers are now in separate directories for better organization.
 */

import { stitchSchemas } from "@graphql-tools/stitch";
import { allTypeDefs } from "./typeDefs";
import { allResolvers } from "./resolvers";

export const schema = stitchSchemas({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
});
