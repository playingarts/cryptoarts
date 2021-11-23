import {
  resolvers as userResolvers,
  typeDefs as userTypeDefs,
} from "./schemas/user";
import { typeDefs as artistTypeDefs } from "./schemas/artist";
import { typeDefs as cardTypeDefs } from "./schemas/card";
import { stitchSchemas } from "@graphql-tools/stitch";

export const schema = stitchSchemas({
  resolvers: [userResolvers],
  typeDefs: [userTypeDefs, artistTypeDefs, cardTypeDefs],
});
