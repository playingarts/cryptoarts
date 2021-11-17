import { graphqlHTTP } from "express-graphql";
import { schema } from "../../../source/graphql/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default graphqlHTTP((req) => ({
  schema,
  graphiql: process.env.NODE_ENV === "development",
  context: { req },
}));
