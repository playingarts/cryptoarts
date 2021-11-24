import * as artist from "./schemas/artist";
import * as card from "./schemas/card";
import * as deck from "./schemas/deck";
import { stitchSchemas } from "@graphql-tools/stitch";
import { DocumentNode } from "apollo-link";

const entities: {
  resolvers?: GQL.Resolvers;
  typeDefs: DocumentNode;
}[] = [deck, artist, card];

export const schema = stitchSchemas(
  entities.reduce<{
    resolvers: GQL.Resolvers[];
    typeDefs: DocumentNode[];
  }>(
    (result, { resolvers, typeDefs }) => ({
      resolvers: [...result.resolvers, ...(resolvers ? [resolvers] : [])],
      typeDefs: [...result.typeDefs, typeDefs],
    }),
    { resolvers: [], typeDefs: [] }
  )
);
