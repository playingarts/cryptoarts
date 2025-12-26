import { graphqlHTTP } from "express-graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../../source/graphql/schema";
import { connect } from "../../../source/mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = graphqlHTTP((req) => ({
  schema,
  graphiql: process.env.NODE_ENV === "development",
  context: { req },
}));

export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  return handler(req as unknown as Request, res as unknown as Response);
}
